Full sync of the recurring system. Reads people files for birthdays/anniversaries, ensures all Google Calendar events exist on the personal calendar, fires prep packet emails for tasks in their lead window, regenerates `recurring/_index.md`, and (on Sundays) sends the weekly loose-ends nudge.

This is the workhorse — meant to run daily (manually now, scheduled later via `/automate`).

## Steps

1. **Get today's date** (`YYYY-MM-DD`) and today's day of week.

2. **Read `recurring/_config.md`** at the start. Extract:
   - **Target calendar ID** (the personal calendar). If missing / set to `_pending_`, abort with a clear message: "Personal calendar not yet linked. Share `nlehrer@gmail.com`'s calendar with `nlehrer@messengerinternational.org` (Make changes to events), then I'll auto-discover the ID."
   - **Prep packet TO email** (`nlehrer@gmail.com`)
   - **Default prep leads by category**
   - **Relationship → prep-lead mapping**
   - **Loose-ends cleanup day** (default Sunday)

3. **Read all task files in parallel:**
   - `recurring/home.md`, `recurring/vehicles.md`, `recurring/relationships.md`, `recurring/personal.md`, `recurring/gifts.md`
   - All `people/*.md`

4. **Parse recurring tasks.** Each `##` heading inside a category file is a task. Extract all fields. Skip anything inside `<!-- -->` comment blocks (templates).

5. **Parse people files for date-anchored events.** Look for:
   - `**Birthday:** YYYY-MM-DD` or `**Birthday:** Month DD`
   - `**Anniversary:** YYYY-MM-DD` or `**Anniversary:** Month DD`
   - And the person's `**Relationship:**` field — use it to pick a default prep lead from the config's relationship mapping. Special case: spouse anniversary uses the **Spouse anniversary** lead, not the birthday lead.

   For each found: compute the next upcoming occurrence (this year if it hasn't passed, otherwise next year). Treat as a synthetic task with:
   - Frequency: yearly
   - Next due: computed
   - Prep lead: from relationship mapping (or `**Gift prep lead:** N days` in the person's file if specified)
   - Alert lead: 0
   - Category: gifts

6. **For each task (real + synthetic):**

   a. **Apply default prep lead** if the task doesn't specify one. Match the category against the config table. (Tasks in `gifts.md` for major holidays default to the Valentine's/Christmas lead; tasks in `home.md` and `vehicles.md` default to standard or big chore lead based on the task name; etc.)

   b. **Ensure Google Calendar event exists on the target calendar.** If `**Calendar event ID:**` is missing or stale (event doesn't exist in the target calendar), create one:
   - Calendar: target calendar ID from config (NOT the user's primary work calendar)
   - All-day event on `Next due`
   - Title: task name (for birthdays: "🎂 Ellie's birthday"; for anniversaries: "💍 Anniversary with Ellie")
   - Description: link to the recurring or people file + notes + vendor info
   - Alert: per `**Alert lead:**` (e.g. 0 = morning of, 7 = 7 days before)
   - Write event ID back to the task file (for synthetic tasks from people files, don't write back to people files — just track in memory for this sync)

   c. **Check prep packet window.** If `today + Prep lead >= Next due` AND a prep packet hasn't already been sent for this occurrence, generate and send one via Gmail. For real tasks, mark sent by adding `**Last prep packet sent:** YYYY-MM-DD` to the task block. For synthetic person-derived tasks, track in `recurring/_prep-log.md` (append a line `YYYY-MM-DD — sent prep for <task name> due <next-due>`) to avoid duplicate sends.

7. **Prep packet email format:**
   - **From:** `nlehrer@messengerinternational.org` (Gmail MCP default)
   - **To:** prep packet TO email from config (`nlehrer@gmail.com`)
   - **Subject:** `[Prep] <task name> — due <date> (<N> days)`
   - **Body:** human, friendly, actionable. Include:
     - What's due and when
     - Context from the file (vendor, notes, location)
     - For people-related tasks (birthdays, anniversaries, date nights): pull insights from `people/<person>.md` (love languages, gift ideas, what worked last time)
     - For chores (filters, tires): vendor link, what to order, where to find deals if the task notes mention a preferred vendor
     - Suggested next concrete step ("Block 30 min Wednesday to decide and book")

8. **Regenerate `recurring/_index.md`** with all tasks bucketed:
   - Overdue
   - Due this week
   - Due this month
   - Due next 90 days
   - Update the "Last synced" timestamp at the top.

9. **Sunday-only step — loose-ends cleanup email.** If today's day of week matches the config's `Loose-ends cleanup day` (default Sunday):

   a. Scan all real tasks. A task is a "loose end" if `Next due` has passed by ≥ 1 day AND there's no `Last done` date on or after that `Next due`.

   b. If any loose ends exist, send a single email:
   - **To:** prep packet TO email
   - **Subject:** `Loose ends — which did you finish this week?`
   - **Body:** bulleted list of loose-end tasks with their original due dates. Bottom of email: "Reply with `/done <task>` for anything you actually finished, or `/skip <task>` to defer."

   c. Note the run in `recurring/_prep-log.md` so we don't double-send if `/sync-recurring` runs more than once that day.

10. **Summary report:** print
    - Tasks scanned
    - Calendar events created/updated
    - Prep packets sent (with task name + due date)
    - People-derived events found and scheduled
    - Loose-ends email sent (yes/no)
    - Any tasks with malformed fields needing attention

## Important

- **Always write events to the target calendar from config**, never to the work primary. If config is missing or `Target calendar ID` is unset, abort and tell the user how to fix it.
- **Never duplicate calendar events.** Before creating one, search the target calendar for an event with the same title and date — if it exists, just write its ID back into the task block.
- **Never send a duplicate prep packet** for the same occurrence. Real tasks: check `Last prep packet sent`. Synthetic (people-derived) tasks: check `recurring/_prep-log.md`.
- **Birthdays/anniversaries are read-only from people files** — don't write back to people files.
- **Be defensive about date parsing.** Birthdays without a year (`**Birthday:** June 4`) are fine — use the current year (or next year if June 4 has passed). Malformed dates → skip and report.
- **Skip template examples** inside `<!-- -->` comment blocks.
- **Path:** read/write `/Users/nlehrer/Desktop/life-os/` (not any worktree). Commit and push after.
