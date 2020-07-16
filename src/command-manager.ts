import * as vscode from "vscode"

import { CompileCommand } from "./commands/compile"


export interface Command {
	readonly id: string
	execute(...arg: any[]): void
}


export class CommandManager {
	private readonly commands = new Map<string, vscode.Disposable>()

	constructor() {
		this.register(new CompileCommand())
	}

	private register<T extends Command>(cmd: T) {
		if (this.commands.has(cmd.id)) {
			// It's already registered.
			return
		}

		this.commands.set(cmd.id, vscode.commands.registerCommand(
			cmd.id,
			cmd.execute,
			cmd
		))
	}

	dispose() {
		for (const disposable of this.commands.values()) {
			disposable.dispose()
		}
		this.commands.clear()
	}
}
