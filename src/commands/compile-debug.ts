import * as vscode from "vscode"

import { Command } from "../command-manager"
import { Inform6TaskProvider } from "../Inform6TaskProvider"
import { TaskManager } from "../task-manager"


/**
 * Command that executes the Inform 6 task to compile in debug mode the file at the given Uri.
 *
 * If no Uri is given, the Uri of the active text editor is used.
 *
 * @param uri The uri of the file to compile.
 */
export class CompileDebugCommand implements Command {
	readonly id = "inform6.compileDebug"
	private taskManager: TaskManager

	constructor(taskManager: TaskManager) {
		this.taskManager = taskManager
	}

	execute(uri: vscode.Uri | undefined) {
		// When using the command palette, no uri is provided.
		// We use the currently active editor in that case.
		if (!uri) {
			if (!vscode.window.activeTextEditor) {
				vscode.window.showErrorMessage("There is no open file to compile with Inform 6")
				return
			}
			uri = vscode.window.activeTextEditor.document.uri
		}

		vscode.tasks.executeTask(this.taskManager.getInform6Task({
			type: Inform6TaskProvider.Inform6TaskType,
			source: uri.fsPath,
			iclCommands: ["-SD"]
		}))
	}
}
