# TODO

## Features

- Syntax-colouring of executions of actions: `<Enter self>`, `<<Look>>`…
- Snippets (routine, for, class, object).
- Language server (for autocompletion, linting…)
- Increase indentation after having typed the head of a routine.

## Bugs

- The colours go wrong in "Load-*" templates. (But that's not very serious).
- Make the syntax colouring of JavaScript better.

## Other considerations

- Should the scope of `action`, `actor`, `consult_from`, `consult_word`, `inp1`, `inp2`, `noun`, `second` `thedark` `location`, `real_location`, `etype` `deadflag`, `the_time`, `score` `notify_mode`, `lm_n`, `lm_o` `inventory_stage`, `c_style`, `parser_one`, `parser_two`, `parser_action`, `verb_word`, `action_to_be`, `scope_stage`, `scope_reason`, `vague_word`, `indef_mode`, `standard_interpreter`, `gg_mainwin`, `gg_statuswin`, `gg_statuswin_size`, `gg_arguments`, `wn` be "variable.language.inform6" or "support.variable.inform6"?
- Change the scope of dictionary words and their end sequence (such as `//p`), of printing variables in strings (such as `@14`)?
- `replace`, `first`, `last`, `only`, `alias` in the directives?
- Add all constant used by translations of Inform ("or" words, "undo" words and such) and functions like `LanguageContraction`?
- Add Z-machine V6 opcodes?
- Add a special case for the Glulx argument `_vararg_count`?
- Object and class declarations can only be on one line and at the start of the line for the moment.
- Put `Stub` directive in deprecated?
- Change the category of the `Order` and `NotUnderstood` actions?
- Change the category of the `REPARSE_CODE` constant?
- Do something with entry points routines (§A5 of DM4, `LibraryMessages`, `LanguageAnimateGender`, `LanguageInanimateGender`, `LanguageContractionForms`), constants used by the Library if defined (`NO_PLACES`, `Story`, `Headline`, `MAX_CARRIED`, `SACK_OBJECT`, `AMUSING_PROVIDED`, `DEATH_MENTION_UNDO`, `MAX_SCORE`, `OBJECT_SCORE`, `ROOM_SCORE`, `TASK_PROVIDED`, `NUMBER_TASK`, `USE_MODULES`), `task_scores`, Glk entry points (`HandleGlkEvent`, `InitGlkWindow`, `IdentifyGlkObject`)?
