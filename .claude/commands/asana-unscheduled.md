Check Asana "My Tasks" for any incomplete tasks that have no due date and log a reminder to `notes/inbox.md`. Designed to run daily. Stays silent when every task has a due date — only writes when there's something to flag.

## Steps

1. **Get the current date and time** (format: `YYYY-MM-DD HH:MM`).

2. **Look up the Asana user.** Call `mcp__1f3a7fe1-7273-4392-b790-0f500b95d440__get_me` to get the user's Asana `gid` and workspace.

3. **Fetch My Tasks.** Call `mcp__1f3a7fe1-7273-4392-b790-0f500b95d440__get_my_tasks` for the user. Request incomplete tasks only. Make sure the returned fields include at minimum: `name`, `due_on` (or `due_at`), `completed`, `parent`, `permalink_url`.

4. **Filter the list.** Keep only tasks where ALL of the following are true:
   - `completed` is false
   - `due_on` is null/empty AND `due_at` is null/empty (no scheduled date of any kind)
   - `parent` is null/empty (top-level task only — skip subtasks)

5. **Decide whether to notify.**

   - **If the filtered list is empty:** do nothing. Do not append to the inbox. Print a single short line to the terminal: `All My Tasks have a due date. Nothing to flag.` Then stop.

   - **If the filtered list has one or more tasks:** continue to step 6.

6. **Append a reminder block to `/Users/nlehrer/Desktop/life-os/notes/inbox.md`.** Append after the last entry. Never rewrite existing entries. Use this exact format:

   ```markdown
   ## YYYY-MM-DD HH:MM
   ⚠️ **Asana — unscheduled tasks in My Tasks (N)**

   These incomplete tasks have no due date:

   - [Task name exactly as it appears in Asana](permalink_url)
   - [Another task name](permalink_url)
   ```

   - Replace `N` with the count of unscheduled tasks.
   - One bullet per task. Use the task's `permalink_url` as the markdown link href so it's clickable from Obsidian.
   - If a task has no `permalink_url`, just list the name as plain text — don't fabricate a URL.
   - Keep task names verbatim. Don't summarize, rewrite, or clean them up.

7. **Confirm in the terminal** with a single short line. Example:
   - `Flagged 3 unscheduled Asana tasks to notes/inbox.md.`
   - `Flagged 1 unscheduled Asana task to notes/inbox.md.`

   No summary of the tasks themselves, no elaboration.

## Important

- **Only notify when there's something to flag.** If every task has a due date, write nothing to the inbox and exit quietly. This is the whole point of the skill — no daily noise when there's nothing to do.
- **Top-level tasks only.** Subtasks usually get scheduled with their parent; don't double-flag.
- **Never delete or overwrite existing inbox entries.** Always append.
- Write to `/Users/nlehrer/Desktop/life-os/` (not any worktree path) so Obsidian sees the change immediately.
- This skill is read-only against Asana. Don't modify, complete, or reschedule any tasks — just report them.

## Wiki-Linking

The task names come straight from Asana and shouldn't be edited. Don't wrap them in `[[brackets]]` — they're external task titles, not entities in the second-brain graph. The skill's own framing line ("Asana — unscheduled tasks in My Tasks") also doesn't need linking since "Asana" isn't a tracked entity here.
