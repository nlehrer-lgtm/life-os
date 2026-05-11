Approve the draft 1:1 action items reviewed by Nathaniel in Asana and create the individual action-item tasks with the right assignees. Run this after `/1on1-debrief` once Nathaniel has reviewed (and possibly edited) the draft action items in the Asana review task.

## Trigger
Use this command whenever Nathaniel asks to "approve the action items", "create the 1:1 tasks", "run 1on1-approve", or invokes `/1on1-approve [Name]` for Andrew or Lindy.

## What this skill does
1. Find the most recent open **review task** in the person's growth plan project
2. Read its current description (which Nathaniel may have edited)
3. Parse the action items out of the description
4. Create one Asana task per action item, with the right assignee and due date
5. Mark the **review task** and the **trigger reminder task** complete
6. Report back

## Known People & Resources

### Andrew McIntosh
- **Asana user GID:** `1209716385781630`

### Lindy Wood
- **Asana user GID:** `1209634024000757`

### Nathaniel
- Use `"me"` as the assignee identifier.
- **Personal project (Leadership OS – 2026):** `1212708795030806` — where the review + trigger tasks live.
- **Asana workspace:** `1208467900542489`

## Task Placement Rules

When this skill creates the individual action item tasks, **none of them go in a growth plan project.** Instead:

- **Nathaniel's items** → no project; assigned to `me`. They land in Nathaniel's My Tasks (general upcoming).
- **Lindy's / Andrew's items** → no project; assigned to their GID. They land in *their* My Tasks. They'll see them; no growth plan attachment.

The growth plan projects are reserved for growth milestones, not weekly action items.

## Steps

### Step 1 — Identify who this is for
Resolve Andrew or Lindy from Nathaniel's prompt.

### Step 2 — Find the review task
Use `search_tasks` (or `get_tasks` on the growth plan project filtered by incomplete tasks) to find the most recent **incomplete** task whose name starts with `Review 1:1 action items — [Name] —`.

If there is no matching open task, stop and tell Nathaniel: `No open review task found for [Name] — did you run /1on1-debrief already? Or has it been approved already?`

If more than one open review task exists (rare), pick the most recently created one and mention this in the final confirmation.

### Step 3 — Read the review task's current description
Use `get_task` to fetch the task's `notes` (plain text) or `html_notes`. Use whichever has content — Asana may store the description in either.

This description is the source of truth. Nathaniel may have edited it after `/1on1-debrief` ran, so always re-read here. Never reuse the original from the debrief output.

### Step 4 — Parse the action items
The expected structure is:

```
NATHANIEL'S ITEMS:
- [ ] [Commitment] — due: [YYYY-MM-DD or blank]
- [ ] ...

[NAME]'S ITEMS:
- [ ] [Commitment] — due: [YYYY-MM-DD or blank]
- [ ] ...
```

Parsing rules:
- Find the "NATHANIEL'S ITEMS:" section and "[NAME]'S ITEMS:" section (case-insensitive, lenient on the em-dash and the word "items")
- Each `- [ ]` line is one action item
- The text between `- [ ]` and `— due:` (or the end of the line if no due) is the **commitment**
- The text after `— due:` (if present) is the **due date** in `YYYY-MM-DD`
- Skip any line that looks like a header, a separator (`---`), or a "Full summary:" pointer
- Ignore lines that have already been checked off (`- [x]`) — Nathaniel may have used the checkbox to mark items he doesn't want as separate tasks

If the structure is broken or no items are found, stop and tell Nathaniel: `Couldn't parse the action items in the review task. Open it in Asana and confirm it matches the expected format.`

### Step 5 — Surface the parsed list back to Nathaniel
Before creating tasks, output the parsed list in the conversation so Nathaniel sees exactly what's about to be created:

```
Parsed from the review task for [Name] ([review task date]):

For you ([N] tasks):
- [Commitment 1] — due [date]
- [Commitment 2] — due [date]
- ...

For [Name] ([N] tasks):
- [Commitment 1] — due [date]
- [Commitment 2] — due [date]
- ...

Creating now.
```

Do not pause for further confirmation — the review task IS the gate, and Nathaniel approved by running this skill.

### Step 6 — Create the individual tasks
Use `create_tasks` with one call containing all the parsed action items.

For **Nathaniel's items:**
- **project_id:** the person's growth plan project ID
- **name:** the commitment, phrased as an imperative if it isn't already
- **assignee:** `me`
- **due_on:** the parsed date if present, otherwise omit
- **notes:** `From 1:1 on [meeting date]. Action item approved via /1on1-approve.`

For **[Name]'s items:**
- **project_id:** the same growth plan project ID
- **name:** the commitment
- **assignee:** Lindy's GID (`1209634024000757`) or Andrew's GID (`1209716385781630`)
- **due_on:** the parsed date if present, otherwise omit
- **notes:** `From 1:1 on [meeting date]. Action item approved via /1on1-approve.`
- **followers:** `me` — so Nathaniel sees activity on their tasks

### Step 7 — Mark the reminder tasks complete
Use `update_tasks` (or the appropriate completion call) to mark:
- The **review task** (Task A) complete
- The **trigger reminder task** (Task B) complete — find it via `search_tasks` filtered by name starting with `Tell Claude: /1on1-approve [Name]` and incomplete; mark it complete too

If the trigger task isn't found (e.g., Nathaniel already completed it manually), don't error — just note it.

### Step 8 — Confirm
Output a short final line:

```
Approved. Created [N] tasks in [Name]'s growth plan project ([X] for you, [Y] for [Name]). Review + trigger tasks marked complete.
```

## Important
- **Always re-read the review task's description from Asana.** Nathaniel may have edited the action items, dropped items, or added new ones. Never use a cached version.
- **Don't ask for further confirmation** before creating tasks. Running this skill IS the approval. The review task was the gate.
- Tasks created for Lindy or Andrew are visible to them in their growth plan project. Be precise — assigning the wrong owner or due date is a real cost.
- If you can't parse cleanly, **stop and ask** — don't create partial sets of tasks.
- This skill does not write to any markdown files. All state changes happen in Asana.
