# Inform 6 extension for VS Code

This extension adds support for Inform 6 in VS Code.

## Features

### Syntax colouring

This extension adds syntax colouring to Inform 6 source (`.inf` and `.h` file extensions) and to Inform 6 templates (`.i6t` file extension, mainly used by Inform 7 when including Inform 6 within the source).

Additionally, strings used as arguments in Vorple's `VorpleExecuteJavaScriptCommand` and `BuildCommand` routines have JavaScript syntax highlighting.

### Compiling `.inf` files from VS Code

The extension adds a play button at the top right of the window when an Inform 6 file is opened. Clicking on it will compile the file. It's also possible to compile a file by right-clicking it in the explorer and selecting the "Compile with Inform 6" option.

Compiler errors and warnings will be reported in the Problems panel as well as in your source.

You can change the path of the compiler in the settings. It defaults to "inform6" (i.e. assumes the compiler is in your `PATH`). You can also add additional arguments to pass to the compiler (such as `+include_path` to point to the folder where you store your `.h` files). For story-specific arguments, it's better to add `!%` lines at the top of your source, though.

This compiling feature is mainly for testing. When releasing your story, use the command line directly, setting the right options (such as `-~D` to disable debug if you enabled it with `!% -D`).

## Known issues

- If a line of Inform 6 source contains multiple errors, only the last one is reported in the source and the Problems panel when compiling.
- Errors in the ICL commands (lines with `!%`) are not shown in the source and in the Problems panel. You have to look directly in the output of the compiler to find them.

(See also the file `TODO.md` in the repository for more.)

## Licence

Copyright (c) 2019-present Nathanaël Marion

Licenced under the MIT License (see the LICENSE file).
