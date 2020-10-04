
import fsCallbacks = require("fs")
const fs = fsCallbacks.promises
import path = require("path")

import * as vscode from "vscode"

import { Inform6TaskProvider, Inform6TaskDefinition } from "./Inform6TaskProvider"


export class TaskManager {
	private disposables: vscode.Disposable[] = []

	constructor() {
		// Open the compiled story if the settings say so.
		vscode.tasks.onDidEndTaskProcess(async (event) => {
			if (event.execution.task.definition.type !== Inform6TaskProvider.Inform6TaskType) {
				return
			}

			const definition = event.execution.task.definition as Inform6TaskDefinition

			const openStory = vscode.workspace.getConfiguration("inform6").get<string>("openStoryAfterCompilation", "no")

			if (openStory !== "no") {
				if (event.exitCode) {
					vscode.window.showErrorMessage(
						"Inform 6 encountered errors during the compilation."
					)
					return
				}
				if (openStory === "external" || openStory === "vscode") {
					const success = await openStoryFromSource(definition.source, openStory)
					if (!success) {
						vscode.window.showErrorMessage("The compiled story could not be opened.")
					}
				}
			}
		}, this, this.disposables)
	}

	/**
	 * Create an Inform 6 task from an Inform 6 task definition.
	 *
	 * The task will use the compiler and the compiler commands from the settings The
	 * latter will be overridden by the ICL commands provided in the definition.
	 *
	 * @param definition - The Inform 6 task definition to use.
	 */
	getInform6Task(definition: Inform6TaskDefinition): vscode.Task {
		// Get the compiler from the settings.
		// TODO: add compiler as a task definition field so that a user provided task
		// can specify a compiler?
		const compiler = vscode.workspace.getConfiguration("inform6").get<string>("inform6Path", "inform6")

		// Will contains the arguments passed to the compiler.
		let args: string[]

		// Get the global ICL commands from the settings.
		const settingsArgs = vscode.workspace.getConfiguration("inform6").get<string[]>("compilerCommands")

		// We spread the args instead of using the array from the settings above
		// directly, because VS Code will always return the same object from the config
		// instead of a new copy, and it will mutate in place, causing errors (we need
		// a brand new array for each new task).
		if (settingsArgs) {
			args = [...settingsArgs]
		} else {
			args = []
		}

		// Add the ICL commands from the task definition.
		if (definition.iclCommands) {
			args.push(...definition.iclCommands)
		}

		// Add the mandatory args.
		args.push("-c") // No code excerpt in error messages.
		args.push("-E1") // Microsoft error style (for the problem matcher).
		args.push(definition.source) // The source to compile.
		if (definition.output) {
			args.push(definition.output) // The destination of the compiled file if present.
		}

		return new vscode.Task(
			definition,
			vscode.TaskScope.Workspace,
			`compile ${path.basename(definition.source)}`,
			"inform6",
			new vscode.ProcessExecution(compiler, args, {
				// So that the compiled story file is next to the source.
				cwd: path.dirname(definition.source)
			}),
			"$inform6"
		)
	}

	dispose() {
		for (const disposable of this.disposables) {
			disposable.dispose()
		}
		this.disposables = []
	}
}


async function openStoryFromSource(source: string, method: "external" | "vscode"): Promise<boolean> {
	const parsedPath = path.parse(source)

	// First the most common formats sorted by descending capability, so that if a
	// story grows too large for a format (e.g. Z5) and is switched to the one above
	// (e.g. Z8), then the Z8 will be tried first and be opened, even if the Z5 is
	// still present.
	// The three last formats are sorted by descending rarity.
	// TODO: Ideally, we would inspect the !% lines in the source to determine what
	// format to open, but it'll do for now.
	const extensions = [
		".ulx",
		".z8",
		".z5",
		".z3",
		".z6",
		".z4",
		".z7"
	]

	for (const extension of extensions) {
		const storyUri = vscode.Uri.file(path.join(
			parsedPath.dir,
			parsedPath.name + extension
		))

		// Check if the file exists.
		try {
			await fs.access(storyUri.fsPath, fsCallbacks.constants.F_OK)
		} catch(err) {
			continue
		}

		if (method === "external") {
			/* Apparently openExternal returns true even if the file does not exist, hence checking whether the file exists above. */
			return await vscode.env.openExternal(storyUri)
		} else if (method === "vscode") {
			vscode.commands.executeCommand("vscode.open", storyUri, {
				preview: false,
				viewColumn: vscode.workspace.getConfiguration("inform6").get<boolean>("openStoryBeside", true) ? vscode.ViewColumn.Beside : undefined
			})
			return true
		}
	}

	// Nothing could be opened.
	return false
}
