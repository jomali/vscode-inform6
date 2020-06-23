import * as vscode from "vscode"

import { Inform6TaskProvider } from "./Inform6TaskProvider"

let inform6TaskProvider: vscode.Disposable | undefined

export function activate(context: vscode.ExtensionContext): void {
	registerInform6TaskProvider()

	// Register a new Inform 6 task provider when settings affecting it change.
	context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(e => {
		if (e.affectsConfiguration("inform6.inform6Path") || e.affectsConfiguration("inform6.compilerCommands")) {
			registerInform6TaskProvider()
			console.log("Settings changed!")
		}
	}))

	const command_compile = vscode.commands.registerCommand("inform6.compile", (uri: vscode.Uri) => {
		compile(uri)
	})
	context.subscriptions.push(command_compile)
}

function registerInform6TaskProvider() {
	if (inform6TaskProvider) {
		inform6TaskProvider.dispose()
	}
	inform6TaskProvider = vscode.tasks.registerTaskProvider(
		Inform6TaskProvider.Inform6TaskType,
		new Inform6TaskProvider()
	)
}

/**
 * Execute the Inform 6 task to compile the given file.
 * @param uri The uri of the file to compile.
 */
async function compile(uri: vscode.Uri) {
	/* We open the file being compile so that the `${file}` variable, which the task uses, is defined. */
	vscode.commands.executeCommand("vscode.open", uri)

	/* We directly take the first task returned by the provider, because there is only one task created by the provider.
	This will have to be changed should the extension create more Inform 6 tasks. */
	const tasks = await vscode.tasks.fetchTasks({
		type: Inform6TaskProvider.Inform6TaskType
	})
	vscode.tasks.executeTask(tasks[0])
}

export function deactivate(): void {
	if (inform6TaskProvider) {
		inform6TaskProvider.dispose()
	}
}
