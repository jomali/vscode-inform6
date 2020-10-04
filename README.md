# Inform 6 extension for VS Code

This extension adds support for Inform 6 in VS Code.

## Features

### Syntax colouring

This extension adds syntax colouring to Inform 6 source (`.inf` and `.h` file extensions) and to Inform 6 templates (`.i6t` file extension, mainly used by Inform 7 when including Inform 6 within the source).

Additionally, strings used as arguments in Vorple's `VorpleExecuteJavaScriptCommand` and `BuildCommand` routines have basic JavaScript syntax highlighting.

### Compiling `.inf` files from VS Code

The extension adds two commands to compile Inform 6 files: one to compile in debug mode (with `-SD`) and one to compile in non-debug mode, for releasing your story.

They are accessible in the command palette, or by right-clicking an Inform 6 file in the explorer, or with the play button at the top right of the window when an Inform 6 file is open. In the case of the play button, pressing `alt` before clicking will compile in non-debug mode; clicking without `alt` compiles in debug mode.

By using these commands, compiler errors and warnings will be reported in the Problems panel as well as in your source.

You can change the path of the compiler in the settings. It defaults to "inform6" (i.e. assumes the compiler is in your `PATH`). You can also add additional arguments to pass to the compiler (such as `+include_path` to point to the folder where you store your `.h` files). For story-specific arguments, it's better to add `!%` lines at the top of your source, though.

When compiling, the current working directory of the inform6 process is set to the folder containing the compiled source, so that the output story file is created next to it.

## Extension settings

This extension contributes the following settings. All the settings are prefixed with `inform6.` (e.g. `inform6.compilerCommands`).

- `inform6Path`: The path to the inform 6 compiler. Defaults to `inform6`.
- `compilerCommands`: Additional ICL commands to pass to the compiler when compiling from VS Code.
- `openStoryAfterCompilation`: If set to `"external"`, story files will be opened with their default application (e.g. Lectrote for `.ulx`) after being compiled. If set to `"vscode"`, story files will be opened in a VS Code tab (the [IF Player extension](https://marketplace.visualstudio.com/items?itemName=natrium729.if-player) is recommended).
- `openStoryBeside`: If set to true and if `openStoryAfterCompilation` is set to `"vscode"`, the compiled story will be opened beside the active editor instead of in the current column.

## Known issues

- If a line of Inform 6 source contains multiple errors, only the last one is reported in the source and the Problems panel when compiling.
- When opening a newly compiled story, the extension tries the formats in this order: `.ulx`, `.z8`, `.z5`, `.z3`. So if you first compiled a source to `.z8` then to `.z5`, the extension will open the older `.z8` file. You have to delete it to make the extension open the right file.
- Errors in the ICL commands (lines with `!%`) are not shown in the source and in the Problems panel. You have to look directly in the output of the compiler to find them.

(See also the file `TODO.md` in the repository for more.)

## Licence

Copyright (c) 2019-present Nathanaël Marion

Licenced under the MIT License (see the LICENSE file).
