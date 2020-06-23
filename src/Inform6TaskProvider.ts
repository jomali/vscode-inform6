/**
 * The Inform 6 Task provider, allowing to compile an Inform 6 source.
 * Based on
 * https://github.com/microsoft/vscode-extension-samples/tree/master/task-provider-sample
 */

import * as vscode from "vscode"
import { PRIORITY_HIGHEST } from "constants"

interface Inform6TaskDefinition extends vscode.TaskDefinition {
	type: string
}

export class Inform6TaskProvider implements vscode.TaskProvider {
	static Inform6TaskType = "inform6"
	private tasks: vscode.Task[] | undefined

	async provideTasks(): Promise<vscode.Task[]> {
		return this.getTasks()
	}

	/* This one is simple because the task has no properties, so there's only one to get.
	Has to change change if other Inform 6 tasks are created. */
	resolveTask(_task: vscode.Task): vscode.Task | undefined {
		const definition: Inform6TaskDefinition = <any>_task.definition
		return this.getTask(definition)
	}

	private getTasks(): vscode.Task[] {
		if (this.tasks !== undefined) {
			return this.tasks
		}
		this.tasks = [this.getTask()]
		return this.tasks
	}

	private getTask(definition?: Inform6TaskDefinition) : vscode.Task {
		if (definition === undefined) {
			definition = {
				type: Inform6TaskProvider.Inform6TaskType,
			}
		}

		// Get the compiler and its args from the settings.
		const compiler = vscode.workspace.getConfiguration("inform6").get<string>("inform6Path") || "inform6"
		const compilerArgs = vscode.workspace.getConfiguration("inform6").get<string[]>("compilerCommands") || []

		// Add the mandatory args.
		compilerArgs.push("-E1") // Microsoft error style (for the problem matcher).
		compilerArgs.push("${file}") // The source to compile.

		return new vscode.Task(
			definition,
			vscode.TaskScope.Workspace,
			"Compile Inform source",
			"inform6",
			new vscode.ProcessExecution(compiler, compilerArgs),
			"$inform6"
		)
	}
}
