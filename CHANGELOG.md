# Changelog

## Unreleased

### Added

- The `openStoryAfterCompilation` setting can take a value of `"vscode"` so that compiled stories are opened in a VS Code tab. The new `openStoryBeside` setting will make the story open beside the active editor instead of in the current column after compilation, if `openStoryAfterCompilation` is set to `"vscode"`.

## 0.4.0

### Added

- New command to compile a story in debug mode (with the `-SD` argument).

### Changed

- The compile command now explicitly sets the `-~S~D` argument.
- The play button at the top right of the window now compiles in debug mode by default. It's still possible to compile in non-debug mode by pressing `alt` before clicking the button.

### Fixed

- Stories in formats other than Z5 are correctly opened after compilation. (Previously, only Z5 stories were opened.) Thanks @JasonLautzenheiser for spotting this bug!

## 0.3.0

### Added

- Stories can now be automatically opened after being compiled. This can be enabled with the `inform6.openStoryAfterCompilation` setting.

### Changed

- There is now a warning if the ICL commands set in the settings do not start with "-", "+" or "$".
- The extension no longer provides tasks by default. It's still possible for users to define their own `inform6` tasks, or to compile a source with the provided command.
- The definition of tasks have changed. They now have a mandatory `source` property, and the optional `output` and `iclCommands` properties

### Fixed

- No more internal error when compiling from the command palette. (It was only internal and didn't impact users nor functionality.)

## 0.2.0 (2020-07-09)

### Added

- A new command to compile Inform 6 files, available as a play button at the top right of the window, and by right-clicking a file in the explorer. It is also possible to compile a file with a new task.
- Errors reported by the Inform 6 compiler are now showed in the Problems panel and in the source when using the new command or task.
- Two new settings: one for the path of the Inform 6 compiler, one for the arguments passed when using the new command or task.
- Directives for declaring static arrays are highlighted.

### Changed

- JavaScript strings inside arguments of `VorpleExecuteJavaScriptCommand` and `BuildCommand` are not highlighted anymore. This is because it's impossible to know exactly when a JS string begins and ends when it's split into multiple parts that are concatenated.

### Fixed

- `Array x ->` and `Array x -->`, `move x to` and `Zcharacter table` are properly highlighted.
- `Version` is not highlighted as a deprecated directive. It's now highlighted as a variable, since it's also the name of an action.
- Binary and hexadecimal numbers greater than `$FFFF` are highlighted.
- Custom Glulx opcodes (e.g. `@"S3:123"`) are highlighted.
- Characters consisting of a Unicode escape (e.g. `'@{2014}'`) are properly highlighted as characters instead of dictionary words.
- Characters consisting of an acute escape (e.g. `'@'e'`) are properly highlighted.
- The character `'@'` and characters consisting of a Unicode escape with more than 6 digits (e.g. `'@{fffffff}'`) are highlighted as illegal.
- Capital thorn and eth escapes are properly highlighted in strings.
- In strings and dictionary words, @ signs not part of escapes are highlighted as illegal.
- Unicode escapes in dictionary words are highlighted.

## 0.1.2

### Added

- Highlighting of features of newer Inform 6 compiler and library. (Amongst them: new support functions, constants and properties; Glulx floating-point numbers.)

## 0.1.1

### Changed

- Improved JavaScript highlighting: escape sequences are now highlighted in strings and function are now in a different colour than variables.
- Inform 7 inclusions in Inform 6 templates (with `(+` an `+)`) are now not coloured, since that is specific to Inform 7 included in Inform 6 which is itself included in Inform 7, and is not used in `i6t` files.
- Improved highlighting of special variables in Inform 6 templates (delimited with `{` and `}`): some characters inside them are now forbidden, such as `"`.

## 0.1.0

- Initial release
