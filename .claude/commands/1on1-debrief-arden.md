Debrief Nathaniel's 1:1 with Arden right after it happens (1–3 days post-meeting is fine). Pulls the transcript from Granola if available; otherwise prompts Nathaniel to recap the meeting verbally. Extracts direction Arden set, action items, decisions, and parking-lot items into a structured summary. Archives the running notes and surfaces action items inline so Nathaniel can decide which to schedule as Asana tasks.

## Trigger
Use this command whenever Nathaniel asks to "debrief the Arden 1:1", "Arden 1:1 debrief", "process the Arden 1:1", or "wrap up the Arden 1:1".

## Philosophy
Per the *Developing Messengers — The Weekly 1:1* guide:

> *"End each meeting by naming one specific action item per person. Open the next meeting by reviewing what was committed to. Progress requires accountability."*
>
> *"Take brief notes during every meeting. Track action items in Asana. Follow-through is a leadership skill — it signals that what was said actually mattered."*

In the upward 1:1, Nathaniel is the team member. The summary captures:
- **Direction Arden set** — vision, priority calls, content strategy, anything organizational
- **Action items Nathaniel committed to**
- **Action items Arden committed to**
- **Parking lot** — open questions raised but not resolved

## Known People & Resources

### Arden Bevere
- **Granola folder ID:** _Not yet configured — Nathaniel doesn't currently record these meetings. When he starts, add the folder ID here and Step 2 will auto-pull. Until then, Step 2 prompts Nathaniel for a verbal recap._
- **1:1 folder:** `/Users/nlehrer/Desktop/life-os/work/messenger-intl/leadership/arden/`
- **Running notes file:** `running-notes.md` in that folder

### Nathaniel
- Use `"me"` as the assignee identifier when creating Asana tasks
- **Asana workspace:** `1208467900542489`

## Steps

### Step 1 — Confirm meeting date
Ask Nathaniel for the meeting date if not stated in his prompt. The summary file uses **the meeting date**, not today's date.

### Step 2 — Pull or capture what was discussed

**If a Granola folder ID is configured for Arden** (check the "Known People & Resources" section above):
- Call `list_meetings` with Arden's folder ID
- Find the most recent meeting whose title matches Nathaniel's 1:1 with Arden (titles like "1:1 | Arden", "Arden 1:1", etc.)
- Call `get_meeting_transcript` for that meeting
- If `list_meetings` returns nothing relevant, fall back to `query_granola_meetings` searching for "Arden"

**If no Granola folder ID is configured (current state):**
Ask Nathaniel:
> "I don't have a Granola recording for this 1:1 yet. Give me a quick recap of what got discussed — bullet form is fine. Specifically:
> - Top topics that got real airtime
> - Direction or strategic calls Arden made
> - Action items (yours and his)
> - Anything raised but unresolved
> - Anything personal worth remembering"

Wait for his response. Use his recap as the input to Step 4.

### Step 3 — Read the running notes
Read `work/messenger-intl/leadership/arden/running-notes.md`. These were ad-hoc notes captured between meetings. They get archived into this summary.

### Step 4 — Extract a structured summary
From the transcript (or Nathaniel's recap), capture:

- **Direction Arden set** — vision, strategic calls, priority guidance, anything Arden brought as context for Nathaniel's role
- **Action items** — bullet each one with:
  - Owner: Nathaniel OR Arden
  - The commitment in clear, specific language
  - Due date if mentioned (otherwise leave blank)
- **Key topics discussed** — short bullets of what got real airtime
- **Decisions made** — anything that was settled
- **Wins / things named** — anything Arden celebrated about Nathaniel or the video team; anything Nathaniel raised that landed
- **Open questions / parking lot** — raised but unresolved
- **Connection moments** — anything personal worth remembering (life context, mentor moments, things Arden shared about himself)

Never fabricate. If something didn't come up, leave the section empty rather than padding.

### Step 5 — Save the meeting summary
Save to `work/messenger-intl/leadership/arden/1on1-summary-YYYY-MM-DD.md` using **the meeting date**.

**Format:**

```markdown
# 1:1 Summary — Arden — [Meeting Date]
_Transcript source: [Granola meeting ID or "Manual recap from Nathaniel"]_ • _Debriefed on [today's date]_

---

## Direction Arden Set
_The "leader brings context" half of the framework — what Arden said about vision, priorities, or strategic direction._
- [Bullet per direction call]

---

## Action Items

**Nathaniel's items:**
- [ ] [Commitment] — _due: [date or blank]_

**Arden's items:**
- [ ] [Commitment] — _due: [date or blank]_

---

## Key Topics Discussed
- [Bullet per topic]

## Decisions Made
- [Bullet per decision, or "None" if none]

## Wins / Things Named
- [Anything Arden celebrated or Nathaniel raised that landed well]

## Open Questions / Parking Lot
- [Raised but not resolved]

## Connection Moments
- [Anything worth remembering — personal context, mentor moments, things Arden shared]

---

## Ad-hoc Notes (archived from running notes)
[Verbatim contents of running-notes.md, preserved with timestamps. If empty, write "No ad-hoc notes captured."]
```

### Step 6 — Reset the running notes
After archiving the running notes into the summary, reset the file to its empty template:

```markdown
# Arden — Running 1:1 Notes

_Ad-hoc captures between 1:1s with Arden. Drop anything you want to bring to the next 1:1 — observations, questions, blockers, ideas, things he asked you about. Cleared after each meeting (archived into that meeting's summary)._

---
```

### Step 7 — Output the summary and action items inline
Show Nathaniel the full summary in chat. Lead with the action items front and center.

Use clear numbering so he can reference them by number:

```
ACTION ITEMS — review these

For you (Nathaniel):
  N1. [Commitment] — due [date]
  N2. ...

For Arden:
  Ar1. [Commitment] — due [date]
  Ar2. ...
```

(Use `Ar1, Ar2...` for Arden's items so the prefix is unambiguous from `N`/`L`/`A`.)

### Step 8 — Ask which items to schedule
After the summary, ask:

> "Which of these should I schedule as Asana tasks? Tell me by number (e.g. 'N1, Ar1') or just say 'all' / 'none'. You can edit, add, or rephrase any item in your reply — I'll use your version."

Wait for Nathaniel's response. Do not create any tasks until he names which ones.

### Step 9 — Create the selected tasks
When Nathaniel responds:
- If he says "none" — confirm and stop.
- Otherwise, take his selected items (and any edits / additions) and create them in Asana via `create_tasks`.

**Nathaniel's items** (his go to his My Tasks, no project):
- Top-level: `default_assignee: "me"`. Omit `default_project`.
- Each task: `name`, `due_on` (if specified), `notes: "From 1:1 with Arden on [meeting date]."`

**Arden's items:** Nathaniel doesn't have Arden's Asana user GID configured, and Arden doesn't operate in Nathaniel's Asana the way the video team does. By default, create Arden's items as tasks in **Nathaniel's** My Tasks with `name` prefixed by `[Follow up with Arden] `, so Nathaniel has a follow-up reminder. If Nathaniel later configures Arden's Asana access pattern, update this step.

If `create_tasks` errors because workspace is required when no project is set, retry adding `workspace: "1208467900542489"` to each task object.

Confirm: `Scheduled [N] tasks in your My Tasks.`

### Step 10 — Save, commit, push
- Write the summary file and updated running-notes.md to `/Users/nlehrer/Desktop/life-os/` (not any worktree path)
- Commit: `git commit -m "1:1 debrief for Arden — YYYY-MM-DD"`
- Push to GitHub

## Important
- **Never create Asana tasks before Nathaniel selects which ones.** The conversational selection IS the gate.
- Never fabricate. If the recap is thin, the summary is thin. That's fine.
- Use the **meeting date** for the summary filename, not today's date.
- Surface the full summary inline so Nathaniel can review without opening the file.
- When Granola gets configured, the manual-recap branch in Step 2 becomes the fallback rather than the default path.
