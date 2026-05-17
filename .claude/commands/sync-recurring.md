Full sync of the recurring system. Reads people files for birthdays/anniversaries, ensures all Google Calendar events exist, fires prep packet emails for tasks in their lead window, and regenerates `recurring/_index.md`.

This is the workhorse — meant to run daily (manually now, scheduled later via `/automate`).

## Steps

1. **Get today's date.**

2. **Read all task files in parallel:**
   - `recurring/home.md`, `recurring/vehicles.md`, `recurring/relationships.md`, `recurring/personal.md`, `recurring/gifts.md`
   - All `people/*.md`

3. **Parse recurring tasks.** Each `##` heading inside a category file is a task. Extract all fields. Skip anything inside `<!-- -->` comment blocks.

4. **Parse people files for date-anchored events:** Look for fields like:
   - `**Birthday:** YYYY-MM-DD` or `**Birthday:** Month DD`
   - `**Anniversary:** YYYY-MM-DD` or `**Anniversary:** Month DD`

   For each: compute the next upcoming occurrence (this year if it hasn't passed, otherwise next year). Treat these as synthetic recurring tasks with:
   - Frequency: yearly
   - Next due: computed
   - Prep lead: 14 days (default — adjust per person if their file specifies `**Gift prep lead:** N days`)
   - Alert lead: 0
   - Category: gifts

5. **For each task (real + synthetic):**

   a. **Ensure Google Calendar event exists.** If `Calendar event ID` is missing or stale (event doesn't exist anymore), create one. All-day event on `Next due`. Title = task name. Description = link to the recurring or people file + notes. Alert per `Alert lead`. Write event ID back to the file.

   b. **Check prep packet window.** If `today + Prep lead >= Next due` AND a prep packet hasn't already been sent for this occurrence, generate and send one via Gmail. Mark it sent by adding `**Last prep packet sent:** YYYY-MM-DD` to the task block.

6. **Prep packet email format:**
   - **To:** the user's own email (nlehrer@messengerinternational.org)
   - **Subject:** `[Prep] <task name> — due <date> (<N> days)`
   - **Body:** human, friendly, actionable. Include:
     - What's due and when
     - Context from the file (vendor, notes, location)
     - For people-related tasks (birthdays, anniversaries, date nights): pull insights from `people/<person>.md` (love languages, gift ideas, what worked last time)
     - For chores (filters, tires): vendor link, what to order, where to find deals if the task notes mention a preferred vendor
     - Suggested next concrete step ("Block 30 min Wednesday to decide and book")

7. **Regenerate `recurring/_index.md`** with all tasks bucketed:
   - Overdue (next_due < today)
   - This week (next 7 days)
   - This month (next 30 days)
   - Next 90 days
   - Update the "Last synced" timestamp at the top.

8. **Summary report:** print
   - Tasks scanned
   - Calendar events created/updated
   - Prep packets sent
   - People-derived events (birthdays/anniversaries) found and scheduled
   - Any tasks with malformed fields that need attention

## Important

- **Never duplicate calendar events.** Before creating one, search Google Calendar for an event with the same title and date — if it exists, just write its ID back into the task block.
- **Never send a duplicate prep packet** for the same occurrence — that's what `Last prep packet sent` tracks.
- **Birthdays/anniversaries are read-only from people files** — don't write back to people files unless the user explicitly says to (that's the job of `/sync-people` or a future `/birthday` skill).
- **Be defensive about date parsing.** Birthdays without a year (`**Birthday:** June 4`) are fine — just use the current year. Malformed dates → skip and report.
- **Skip template examples** inside `<!-- -->` comment blocks.
- **Path:** read/write `/Users/nlehrer/Desktop/life-os/` (not any worktree). Commit and push after.
