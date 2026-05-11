Debrief a 1:1 right after it happens. Pull the meeting transcript, extract action items and key moments, archive the running notes, and stage a single Asana review task for Nathaniel to approve before any individual action-item tasks get created.

## Trigger
Use this command whenever Nathaniel asks to "debrief the 1:1", "1:1 debrief", "process the 1:1", or "wrap up the 1:1" with Andrew or Lindy. Run within hours of the meeting ending — this is the post-meeting capture step.

## Philosophy
Per the *Developing Messengers — The Weekly 1:1* guide (see `work/messenger-intl/director-of-video-production/developing-messengers-weekly-1on1.pdf`):

> *"End each meeting by naming one specific action item per person. Open the next meeting by reviewing what was committed to. Progress requires accountability."*
>
> *"Take brief notes during every meeting. Track action items in Asana. Follow-through is a leadership skill — it signals that what was said actually mattered."*

This skill exists so 1:1s stop revisiting the same topics week after week. Action items go into Asana with clear ownership; what was discussed gets archived so the next prep can build on it.

## Known People & Resources

### Andrew McIntosh
- **Granola folder ID:** `922bfeb5-829e-4842-b7a0-db436e289aaf`
- **Asana Growth Plan project ID:** `1211631456933613`
- **1:1 folder:** `/Users/nlehrer/Desktop/life-os/work/messenger-intl/video-team/1on1s/andrew-mcintosh/`
- **Running notes file:** `running-notes.md` in that folder

### Lindy Wood
- **Granola folder ID:** `5184fb61-141f-42e4-a52f-263f39c9ab6b`
- **Asana Growth Plan project ID:** `1212886997625190`
- **1:1 folder:** `/Users/nlehrer/Desktop/life-os/work/messenger-intl/video-team/1on1s/lindy-wood/`
- **Running notes file:** `running-notes.md` in that folder

### Nathaniel's Asana user
- Use `get_me` to resolve Nathaniel's Asana GID when assigning the review task.

## Steps

### Step 1 — Identify who the 1:1 was with
Resolve Andrew or Lindy from Nathaniel's prompt. If ambiguous, ask once.

### Step 2 — Pull the most recent 1:1 transcript from Granola
- Call `list_meetings` with the person's Granola folder ID
- Find the single most recent meeting whose title contains "1:1 | [Name]" (for Lindy, also accept "Pre boxing out the week")
- Call `get_meeting_transcript` for that meeting

If `list_meetings` returns nothing relevant, fall back to `query_granola_meetings` with the person's name.

### Step 3 — Read the running notes
Read the person's `running-notes.md`. These were the mid-week observations that fed into the prep.

### Step 4 — Extract from the transcript
Build a structured pass over the transcript and capture:

- **Action items** — bullet each one with:
  - Owner: Nathaniel OR [Name]
  - The commitment in clear, specific language
  - Due date if mentioned (otherwise leave blank)
  - The moment in the meeting where it came up (one-line quote or context)
- **Key topics discussed** — short bullets of what got real airtime
- **Decisions made** — anything that was settled
- **Wins / things to celebrate** — moments of progress, growth, or strong work
- **Open questions / parking lot** — things raised but not resolved
- **Connection moments** — anything personal or growth-oriented worth remembering (energy, mood, life context, signs of development)

Never fabricate. If something didn't come up in the transcript, leave the section empty rather than padding it.

### Step 5 — Save the meeting summary
Save to the person's 1:1 folder as `1on1-summary-YYYY-MM-DD.md` using today's date.

**Format:**

```markdown
# 1:1 Summary — [Name] — [Today's Date]
_Transcript source: Granola • Debriefed by Nathaniel + Claude_

---

## Action Items (Draft — Pending Review)

**Nathaniel's items:**
- [ ] [Commitment] — _due: [date or blank]_

**[Name]'s items:**
- [ ] [Commitment] — _due: [date or blank]_

---

## Key Topics Discussed
- [Bullet per topic]

## Decisions Made
- [Bullet per decision, or "None" if none]

## Wins to Remember
- [Bullet per win]

## Open Questions / Parking Lot
- [Things raised but not resolved]

## Connection Moments
- [Anything worth remembering about how they're doing as a person]

---

## Mid-Week Observations (archived from running notes)
[Verbatim contents of the running-notes.md leading up to this meeting, preserved with their timestamps. If the file was empty, write "No mid-week notes captured."]
```

### Step 6 — Reset the running notes
After archiving the running notes into the summary, reset the file back to its empty template:

```markdown
# [Full Name] — Running 1:1 Notes

_Observations, moments, and items captured between 1:1s. These feed into the next 1:1 prep. Cleared after each meeting (archived into that meeting's summary)._

---
```

### Step 7 — Create the two Asana tasks for Nathaniel
Both reminder tasks live in Nathaniel's **Leadership OS – 2026** project (GID `1212708795030806`), assigned to Nathaniel. They are *not* in Lindy's or Andrew's growth plan projects — those projects are for them.

Call `create_tasks` to create **two** tasks:

**Task A — the review task** (Nathaniel reads + edits the draft action items here):

- **Name:** `Review 1:1 action items — [Name] — [YYYY-MM-DD]`
- **Assignee:** `me`
- **Due date:** Today (or tomorrow if it's late in the day)
- **Project:** `1212708795030806` (Leadership OS – 2026)
- **Notes (description):**

  ```
  Draft action items from the 1:1 on [date]. Review and edit this list in place — when you're satisfied, do not create individual tasks here. Instead, complete the companion task "Tell Claude to run /1on1-approve" and follow its instructions.

  NATHANIEL'S ITEMS:
  - [ ] [Commitment] — due: [date]
  - [ ] ...

  [NAME]'S ITEMS:
  - [ ] [Commitment] — due: [date]
  - [ ] ...

  Full summary: work/messenger-intl/video-team/1on1s/[folder]/1on1-summary-[date].md
  ```

**Task B — the trigger reminder** (Nathaniel's signal to come tell Claude):

- **Name:** `Tell Claude: /1on1-approve [Name] — to create action item tasks`
- **Assignee:** `me`
- **Due date:** Today (or tomorrow), same as Task A
- **Project:** `1212708795030806` (Leadership OS – 2026)
- **Notes (description):**

  ```
  Once you've reviewed and edited the action items in the companion task ("Review 1:1 action items — [Name] — [date]"), open Claude Code and run:

      /1on1-approve [Name]

  Claude will:
  • Re-read the edited action items from the review task
  • Create one Asana task per action item, with the right assignee and due date
  • Mark both this task and the review task complete

  Do not create the individual tasks manually — let /1on1-approve do it so the action items stay traceable and consistent.
  ```

### Step 8 — Tell Nathaniel what happened
Output a short message in the conversation:

```
Debrief done for [Name] (YYYY-MM-DD).
• Summary saved: 1on1-summary-[date].md
• Running notes archived and reset
• Asana — review task: "Review 1:1 action items — [Name] — [date]"
• Asana — trigger task: "Tell Claude: /1on1-approve [Name]"

Open the review task, edit the draft action items, then complete the trigger task by running /1on1-approve [Name] in Claude Code.
```

Also surface the draft action items inline in the conversation so Nathaniel can scan them without switching to Asana.

### Step 9 — Save, commit, push
- Write to `/Users/nlehrer/Desktop/life-os/` (not any worktree path)
- Commit: `git commit -m "1:1 debrief for [Name] — YYYY-MM-DD"`
- Push to GitHub

---

## After debrief
The actual creation of individual action-item tasks happens via the **separate `/1on1-approve [Name]` skill**, not in this conversation. That skill reads the (possibly edited) review task from Asana, creates the individual tasks with the right assignees, and marks the review + trigger tasks complete.

This separation exists so the approval step works cleanly across sessions and can pick up Nathaniel's edits made in Asana.

## Important
- **Never create the individual action-item tasks inside `/1on1-debrief`.** Only the two Asana reminder tasks (review + trigger). The gate is `/1on1-approve`.
- Never fabricate action items or topics. If the transcript is thin, the summary is thin — that's fine.
- Write all markdown files to `/Users/nlehrer/Desktop/life-os/` (not any worktree path).
