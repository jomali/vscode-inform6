import * as vscode from "vscode"

import { Inform6TaskProvider, getInform6Task } from "./Inform6TaskProvider"


/**
 * The current Inform 6 task provider.
 */
let inform6TaskProvider: vscode.Disposable | undefined


export function activate(context: vscode.ExtensionContext): void {
	inform6TaskProvider = vscode.tasks.registerTaskProvider(
		Inform6TaskProvider.Inform6TaskType,
		new Inform6TaskProvider()
	)

	const compileCommand = vscode.commands.registerCommand("inform6.compile", (uri: vscode.Uri | undefined) => {
		// When using the command palette, no uri is provided.
		// We use the currently active editor in that case.
		if (!uri) {
			if (!vscode.window.activeTextEditor) {
				vscode.window.showErrorMessage("There is no open file to compile with Inform 6")
				return
			}
			uri = vscode.window.activeTextEditor.document.uri
		}
		compile(uri)
	})
	context.subscriptions.push(compileCommand)
}


/**
 * Execute the Inform 6 task to compile the given file.
 * @param uri The uri of the file to compile.
 */
function compile(uri: vscode.Uri) {
	vscode.tasks.executeTask(getInform6Task({
		type: Inform6TaskProvider.Inform6TaskType,
		source: uri.fsPath
	}))
}


export function deactivate(): void {
	if (inform6TaskProvider) {
		inform6TaskProvider.dispose()
	}
}
