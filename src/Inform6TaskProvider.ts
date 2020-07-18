/**
 * The Inform 6 Task provider and other task-related functions.
 */

import path = require("path")

import * as vscode from "vscode"

import { TaskManager } from "./task-manager"


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
	private taskManager: TaskManager

	constructor(taskManager: TaskManager) {
		this.taskManager = taskManager
	}

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
			return this.taskManager.getInform6Task({
				type: "inform6",
				source: source,
				output: _task.definition.output || undefined,
				iclCommands: _task.definition.iclCommands || undefined
			})
		}

		return undefined
	}
}
