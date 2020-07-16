import * as vscode from "vscode"

import { Command } from "../command-manager"
import { Inform6TaskProvider, getInform6Task } from "../Inform6TaskProvider"


/**
 * Command that execute the Inform 6 task to compile the file at the given Uri.
 *
 * If no Uri is given, the Uri of the active text editor is used.
 *
 * @param uri The uri of the file to compile.
 */
export class CompileCommand implements Command {
	readonly id = "inform6.compile"

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

		vscode.tasks.executeTask(getInform6Task({
			type: Inform6TaskProvider.Inform6TaskType,
			source: uri.fsPath
		}))
	}
}
