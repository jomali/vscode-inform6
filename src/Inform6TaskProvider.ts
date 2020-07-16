/**
 * The Inform 6 Task provider and other task-related functions.
 */

import path = require("path")

import * as vscode from "vscode"


export interface Inform6TaskDefinition extends vscode.TaskDefinition {
	/**
	 * The type of an Inform 6 task is always `inform6`.
	 */
	type: "inform6",
	/**
	 * The Inform file to compile.
	 */
	source: string,
	/**
	 * The destination of the compiled story file.
	 */
	output?: string,
	/**
	 * The additional ICL commands to pass to the compiler.
	 */
	iclCommands?: string[]
}


export class Inform6TaskProvider implements vscode.TaskProvider {
	static readonly Inform6TaskType = "inform6"

	async provideTasks(): Promise<vscode.Task[]> {
		// No tasks are auto-detected for the moment.
		// TODO: Maybe scan all Inform files in the workspace and create a task for each
		// one of them ?
		return []
	}

	resolveTask(_task: vscode.Task): vscode.Task | undefined {
		// Check if the mandatory source is present.
		const source = _task.definition.source
		if (source) {
			return getInform6Task({
				type: "inform6",
				source: source,
				output: _task.definition.output || undefined,
				iclCommands: _task.definition.iclCommands || undefined
			})
		}

		return undefined
	}
}

/**
 * Create an Inform 6 task from an Inform 6 task definition.
 *
 * The task will use the compiler and the compiler commands from the settings The latter
 * will be overriden by the ICL commands provided in the definition.
 *
 * @param definition - The Inform 6 task definition to use.
 */
export function getInform6Task(definition: Inform6TaskDefinition): vscode.Task {
	// Get the compiler from the settings.
	// TODO: add compiler as a task definition field so that a user provided task can
	// specify a compiler?
	const compiler = vscode.workspace.getConfiguration("inform6").get<string>("inform6Path", "inform6")

	// Will contains the arguments passed to the compiler.
	let args: string[]

	// Get the global ICL commands from the settings.
	const settingsArgs = vscode.workspace.getConfiguration("inform6").get<string[]>("compilerCommands")


	// We spread the args instead of using the array from the settings above directly,
	// because VS Code will always return the same object from the config instead of a
	// new copy, and it will mutate in place, causing errors (we need a brand new array
	// for each new task).
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
			// So that the story file is next to the source.
			cwd: path.dirname(definition.source)
		}),
		"$inform6"
	)
}
