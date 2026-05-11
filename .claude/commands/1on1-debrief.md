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

### Step 7 — Create the Asana review task for Nathaniel
Resolve Nathaniel's Asana GID via `get_me`. Then call `create_tasks` to create **one** task in the person's growth plan project:

- **Name:** `Review 1:1 action items — [Name] — [YYYY-MM-DD]`
- **Assignee:** Nathaniel
- **Due date:** Today (or tomorrow if it's late in the day)
- **Project:** the person's growth plan project ID
- **Notes (description):** A clean markdown block with the draft action items in the same structure as the summary:

  ```
  Draft action items from the 1:1 on [date]. Review, edit, or approve — once you say "approved" or "create the tasks", I'll create each item as its own Asana task with the right assignee.

  NATHANIEL'S ITEMS:
  - [ ] [Commitment] — due: [date]
  - [ ] ...

  [NAME]'S ITEMS:
  - [ ] [Commitment] — due: [date]
  - [ ] ...

  Full summary: work/messenger-intl/video-team/1on1s/[folder]/1on1-summary-[date].md
  ```

### Step 8 — Tell Nathaniel what happened
Output a short message in the conversation:

```
Debrief done for [Name] (2026-XX-XX).
• Summary saved: 1on1-summary-[date].md
• Running notes archived and reset
• Review task in Asana: "Review 1:1 action items — [Name] — [date]"

Open the review task, edit anything you want, then come back and say "approved" or "create the tasks" and I'll create the individual Asana tasks with the right assignees.
```

Also surface the action items inline in the conversation so Nathaniel can scan them without switching to Asana.

### Step 9 — Save, commit, push
- Write to `/Users/nlehrer/Desktop/life-os/` (not any worktree path)
- Commit: `git commit -m "1:1 debrief for [Name] — YYYY-MM-DD"`
- Push to GitHub

---

## When Nathaniel says "approved" / "create the tasks"
This is a follow-up turn, not a re-run of `/1on1-debrief`. When Nathaniel approves (verbally — "approved", "create them", "go ahead", "looks good — create the tasks"):

1. Read the review task's current description from Asana (in case Nathaniel edited it).
2. For each action item, call `create_tasks` to create an individual task in the **same growth plan project** (Lindy's or Andrew's):
   - **Name:** the commitment phrased as a clear imperative
   - **Assignee:** Nathaniel for his items; the team member for theirs
   - **Due date:** as listed, or leave blank if not specified
   - **Notes:** optionally include a short reference like "From 1:1 on [date]"
3. After creating, mark the review task complete (or comment "Tasks created" on it — confirm with Nathaniel which he prefers if unclear).
4. Tell Nathaniel: `Created [N] tasks. [Count] for you, [Count] for [Name].`

## Important
- **Never create the individual action-item tasks before Nathaniel approves.** The review task is the gate.
- Never fabricate action items or topics. If the transcript is thin, the summary is thin — that's fine.
- Assigning tasks to Lindy or Andrew is a shared-state action they'll see. Surface the list to Nathaniel in conversation before creating individual tasks so he has a final look.
- Write all markdown files to `/Users/nlehrer/Desktop/life-os/` (not any worktree path).
