import * as vscode from "vscode"

import { CommandManager } from "./command-manager"
import { Inform6TaskProvider } from "./Inform6TaskProvider"


/**
 * The current Inform 6 task provider.
 */
let inform6TaskProvider: vscode.Disposable | undefined


export function activate(context: vscode.ExtensionContext): void {
	inform6TaskProvider = vscode.tasks.registerTaskProvider(
		Inform6TaskProvider.Inform6TaskType,
		new Inform6TaskProvider()
	)

	const commandManager = new CommandManager()
	context.subscriptions.push(commandManager)
}


export function deactivate(): void {
	if (inform6TaskProvider) {
		inform6TaskProvider.dispose()
	}
}
