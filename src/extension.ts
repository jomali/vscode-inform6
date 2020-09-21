import * as vscode from "vscode"

import { CommandManager } from "./command-manager"
import { Inform6TaskProvider } from "./Inform6TaskProvider"
import { TaskManager } from "./task-manager"


/**
 * The current Inform 6 task provider.
 */
let inform6TaskProvider: vscode.Disposable | undefined


export function activate(context: vscode.ExtensionContext): void {
	const taskManager = new TaskManager()
	context.subscriptions.push(taskManager)

	inform6TaskProvider = vscode.tasks.registerTaskProvider(
		Inform6TaskProvider.Inform6TaskType,
		new Inform6TaskProvider(taskManager)
	)

	const commandManager = new CommandManager(taskManager)
	context.subscriptions.push(commandManager)
}


export function deactivate(): void {
	if (inform6TaskProvider) {
		inform6TaskProvider.dispose()
	}
}
