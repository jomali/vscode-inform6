# Inform 6 extension for VS Code

This extension adds support for Inform 6 in VS Code.

## Features

### Syntax colouring

This extension adds syntax colouring to Inform 6 source (`.inf` and `.h` file extensions) and to Inform 6 templates (`.i6t` file extension, mainly used by Inform 7 when including Inform 6 within the source).

Additionally, strings used as arguments in Vorple's `VorpleExecuteJavaScriptCommand` and `BuildCommand` routines have basic JavaScript syntax highlighting.

### Compiling `.inf` files from VS Code

The extension adds a command to compile Inform 6 files. It is accessible in the command palette, or with the play button at the top right of the window when an Inform 6 file is open, or by right-clicking an Inform 6 file in the explorer.

By using this command, compiler errors and warnings will be reported in the Problems panel as well as in your source.

You can change the path of the compiler in the settings. It defaults to "inform6" (i.e. assumes the compiler is in your `PATH`). You can also add additional arguments to pass to the compiler (such as `+include_path` to point to the folder where you store your `.h` files). For story-specific arguments, it's better to add `!%` lines at the top of your source, though.

When compiling, the current working directory of the inform6 process is set to the folder containing the compiled source, so that the output story file is created next to it.

This compiling feature is mainly for testing. When releasing your story, use the command line directly, setting the right options (such as `-~D` to disable debug if you enabled it with `!% -D`).

## Extension settings

This extension contributes the following settings:

- `inform6.inform6Path`: The path to the inform 6 compiler. Defaults to `inform6`.
- `inform6.compilerCommands`: Additional ICL commands to pass to the compiler when compiling from VS Code.
- `inform6.openStoryAfterCompilation`: Whether or not to open the story after compilation (with the default application associated with the file's extension).

## Known issues

- If a line of Inform 6 source contains multiple errors, only the last one is reported in the source and the Problems panel when compiling.
- When opening a newly compiled story, the extension tries the formats in this order: `.ulx`, `.z8`, `.z5`, `.z3`. So if you first compiled a source to `.z8` then to `.z5`, the extension will open the older `.z8` file. You have to delete it to make the extension open the right file.
- Errors in the ICL commands (lines with `!%`) are not shown in the source and in the Problems panel. You have to look directly in the output of the compiler to find them.

(See also the file `TODO.md` in the repository for more.)

## Licence

Copyright (c) 2019-present Nathanaël Marion

Licenced under the MIT License (see the LICENSE file).
