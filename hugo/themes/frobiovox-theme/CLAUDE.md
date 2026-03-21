# Claude Instructions

## Task Execution

Always run tasks through the Taskfile (`Taskfile.yml`) rather than executing commands directly.

- Before running any command, check if a corresponding task exists in `Taskfile.yml`.
- If no task exists for what needs to be done, ask the user whether to add one before proceeding.
- Use `task <name>` to run tasks.
