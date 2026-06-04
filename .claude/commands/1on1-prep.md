Prepare a 1:1 briefing for Andrew McIntosh or Lindy Wood, two days before the meeting. Pulls together the team member's own agenda (filled out in Asana), Nathaniel's mid-week observations, open action items from the last 1:1, the previous meeting's summary, and a growth plan compass check.

## Trigger
Use this command whenever Nathaniel asks to "prep my 1:1", "prep for my 1:1", "get ready for the 1:1", or "two-day prep" with Andrew or Lindy.

## Philosophy

Per the *Developing Messengers — The Weekly 1:1* guide (see `work/messenger-intl/director-of-video-production/developing-messengers-weekly-1on1.pdf`):

> **The team member owns and drives the agenda.** They bring priorities, progress, challenges, and feedback.
>
> **The leader sets the context.** Team and department objectives, vision and direction, current priorities, and how the team member's role and giftings align.
>
> *"The goal is development, not direction. Ask more, tell less."*

This is the **two-days-before deep prep.** It is not the day-of glance sheet — that's `/1on1-final`. The job here is to walk into prep with everything the last two weeks have surfaced: what they brought, what you noticed, what's still open from last time, and where the growth plan points.

**One-on-ones are people-first.** Care → clarity → direction. The check-in on how they're actually doing is the most important section.

## Known People & Resources

### Andrew McIntosh
- **Granola folder ID:** `922bfeb5-829e-4842-b7a0-db436e289aaf`
- **Asana Growth Plan project ID:** `1211631456933613`
- **1:1 folder:** `/Users/nlehrer/Desktop/life-os/work/messenger-intl/video-team/1on1s/andrew-mcintosh/`
- **1:1 documents subfolder:** `one-on-one-documents/` inside the 1:1 folder — all prep, final, summary, and running-notes files live here
- **Running notes file:** `one-on-one-documents/running-notes.md`
- **Growth Milestones:**
  1. Create fully organized VFX and VP asset library
  2. Initiate ownership for VFX/VP projects
  3. Expand virtual production system
  4. Master VPD communications/cadence/feedback loop
  5. Embrace and grow spiritual/missional voice at the TN office

### Lindy Wood
- **Granola folder ID:** `5184fb61-141f-42e4-a52f-263f39c9ab6b`
- **Asana Growth Plan project ID:** `1212886997625190`
- **1:1 folder:** `/Users/nlehrer/Desktop/life-os/work/messenger-intl/video-team/1on1s/lindy-wood/`
- **1:1 documents subfolder:** `one-on-one-documents/` inside the 1:1 folder — all prep, final, summary, and running-notes files live here
- **Running notes file:** `one-on-one-documents/running-notes.md`
- **Growth Milestones:**
  1. Cultivate Clear & Compelling Communication
  2. Establish and Own a Ministry-Wide Video Quality Control System
  3. Lead, Develop, and Resource the Editing Team (Josh, Annie, future hires)

## Steps

### Step 1 — Identify who the 1:1 is with
Resolve Andrew or Lindy from Nathaniel's prompt.

### Step 2 — Pull the team member's own agenda from Asana
Use `get_tasks` (or `search_tasks`) on the person's growth plan project to find the upcoming **"1:1 Agenda — Fill out before our 1:1"** task (the most recent due / about-to-be-due instance). Read its description — that is the team member's prepared agenda.

The current Asana agenda template has these fields (updated 2026-05-15):
- **🔝 MY TOP PRIORITY THIS WEEK** — single priority, not a list
- **📅 PROGRESS SINCE LAST 1:1** — What moved forward? / What stalled? (open-ended, however many bullets)
- **🧗 CURRENT CHALLENGE / FRUSTRATIONS** — what's frustrating or heavy right now
- **❓ QUESTIONS / TOPICS I WANT TO DISCUSS** — open list
- **💬 FEEDBACK FOR NATHANIEL** — *How could the video team grow? How could Nathaniel grow as a leader?*
- **🎉 WINS / THINGS I'M PROUD OF**

If the agenda task is empty or hasn't been filled out:
- Surface that in the prep doc clearly ("Agenda not yet filled out — ping them.")
- Still build the rest of the prep with what's available

### Step 3 — Read mid-week running notes
Read the person's `running-notes.md`. These are Nathaniel's captured observations between meetings. Include them verbatim in the prep so he can scan them.

### Step 4 — Pull open action items from the last 1:1
Use `get_tasks` on the person's growth plan project, filtering for incomplete tasks. Separate them into:
- **Nathaniel's open items** (assigned to him)
- **Their open items** (assigned to the team member)

These are the commitments from the last 1:1 (and possibly earlier) that haven't closed out yet. Flag any that have been open across multiple meetings as ⚠️ recurring.

### Step 5 — Read the most recent 1:1 summary
Look in the person's `one-on-one-documents/` subfolder for the most recent `1on1-summary-YYYY-MM-DD.md`. Read it. This is the structured record of the last meeting — far better signal than re-reading the raw transcript.

If no summary exists yet (system is new), fall back to the most recent Granola transcript using `list_meetings` with the folder ID.

### Step 5b — Pull the most recent Pre Boxing Out the Week meeting (Lindy only)
**Only for Lindy.** Andrew does not have this meeting — skip this step for him.

Call `list_meetings` with Lindy's Granola folder ID, find the single most recent meeting whose title contains "Pre boxing out the week" (case-insensitive), and call `get_meeting_transcript` for it. Read the transcript and extract:
- Key topics discussed
- Decisions made or directions set for the week
- Anything carried over or still open
- Anything personal worth remembering

This meeting is recurring context, not a 1:1 debrief — don't try to convert it into action items. The goal is to walk into the 1:1 already aware of what got covered in the boxing-out session so the 1:1 doesn't rehash it.

### Step 6 — Pull growth plan milestones
Use `get_tasks` on the person's growth plan project. For each milestone, note: name, description, completion status.

### Step 7 — Write the prep doc and save
Save to the person's 1:1 folder as `1on1-prep-YYYY-MM-DD.md` (today's date — the prep date, not the meeting date).

**Format:**

```markdown
# 1:1 Prep — [Name] — [Today's Date]
_Two-day prep • Meeting on [meeting date if known]_
_Last summary: [date of last 1on1-summary file]_

---

## 1. How Are They Doing? (Connection Before Performance)

[1-2 warm, specific check-in questions based on what you know right now from the running notes, the last summary, and anything personal that's surfaced. Not generic. Make it feel like you've been paying attention.]

> *"Start with the person before the work. Ask about energy, bandwidth, or what's been heavy lately. Connection precedes performance."*

---

## 2. Their Agenda (What They Brought)

_Pulled from Asana — the team member owns this section._

[If filled: render their agenda verbatim — Top Priority, Progress (moved/stalled), Current Challenge/Frustrations, Questions to Discuss, Feedback for Nathaniel, Wins. Use bold field labels matching the new template structure.]

[If empty: "⚠️ Agenda not yet filled out. Consider pinging them before the meeting — they own this part."]

---

## 3. Your Mid-Week Observations

_From `running-notes.md` — what you noticed between meetings._

[Render the running notes verbatim with their timestamps. If empty, write: "No mid-week notes captured this cycle."]

---

## 3b. Most Recent Pre Boxing Out the Week _(Lindy only — omit this section entirely for Andrew)_

_From Granola: "[meeting title]" on [meeting date]. So you don't rehash what already got covered._

- **Topics covered:** [Short bullets]
- **Decisions / direction set:** [Bullets, or "None"]
- **Still open / carried into this week:** [Bullets, or "Nothing flagged"]
- **Personal / connection notes:** [Anything worth remembering — energy, life context, mood]

---

## 4. Open Action Items From Last Time

**Your open items:**
- [ ] [Asana task name] — _due: [date]_
- ⚠️ [Flag items open across multiple meetings]

**Their open items:**
- [ ] [Asana task name] — _due: [date]_
- ⚠️ [Flag items open across multiple meetings]

[If nothing's open from last time, write: "All clear — last meeting's items closed out."]

---

## 5. Context to Share (Leader's Role)

_What you (the leader) need to bring to the table. Fill this in during prep review._

- **Team / department priorities right now:** [What matters most? What's the org pulling toward?]
- **Vision / direction updates:** [Anything from the leadership team they need to hear?]
- **Role alignment moment:** [How does their current work connect to their giftings and the mission?]

> *"Regularly bring the 'why' back into the conversation. Name how their specific work contributes to the mission."*

---

## 6. Growth Plan — Compass Check

_The growth plan is a compass, not a checklist. One directional question per milestone — not an audit._

### [Milestone Name]
> [Brief description — 1 sentence]
**Where things stand:** [What the summary, running notes, and Asana state tell you. Honest if there's nothing.]
**Check-in angle:** [A warm, directional question — "how does this area feel right now?" not "did you do X?"]

[Repeat per milestone]

---

## 7. Name the Win

_The most important sentence to walk in with. Specific, concrete, and named out loud — not buried in the closing._

**Call out specifically:** "[A specific, observed win from this cycle — concrete behavior, not generic praise. Tie it to what you saw or what they reported.]"

[If there's no clear win to name this cycle, write: "No clear win to call out this cycle — but stay alert during the meeting; small wins often surface in real time."]

---

## Optional — Person-Specific Questions Worth Leaving Space For

_Only include this section if 1-2 concrete, person-specific questions surfaced from the cycle. Skip the generic check-in list — it doesn't earn its space. If nothing person-specific is on your mind, delete this whole section._

- [Person-specific question 1, if any]
- [Person-specific question 2, if any]

---

## Diagnostics — Anything Off?
_Quick self-check before you walk in. Pull from `developing-messengers-weekly-1on1.pdf` if multiple symptoms show up._

- [ ] Have we made forward movement since last meeting, or are we covering the same ground?
- [ ] Am I doing most of the talking lately?
- [ ] Is the trust here high enough that hard things are surfacing?
- [ ] When was the last time I named a win for them, specifically?
```

### Step 8 — Save, commit, push
- Write to `/Users/nlehrer/Desktop/life-os/` (not any worktree path)
- Commit: `git commit -m "1:1 prep for [Name] — YYYY-MM-DD"`
- Push to GitHub

Also output the prep doc directly in the conversation so Nathaniel sees it immediately.

---

## Important
- **Never fabricate.** If a section has no data — agenda not filled out, no mid-week notes, no open items — say so. Empty is honest.
- The "How Are They Doing?" section is the most important. Don't skip it or make it generic.
- The "Their Agenda" section is theirs — render it verbatim, do not rewrite their words.
- Growth plan check-ins are directional, not interrogative. Compass, not audit.
- The "Context to Share" section is meant to be filled in by Nathaniel during prep review — it's a prompt, not auto-generated content. Surface any inbox notes or recent leadership-team meetings that might be relevant as starter material.
- Include Granola citation links where summaries reference them so Nathaniel can click through.
- Keep bullets scannable. No long paragraphs.


## Wiki-Linking

When writing or updating any file, wrap named entities in Obsidian `[[wiki-links]]` so the second-brain graph builds automatically.

- **People** (anyone with a file in `people/`): `[[Andrew McIntosh]]`, `[[Lindy Wood]]`, `[[Arden Bevere]]`, `[[Eliana Lehrer]]`, etc. First names work via aliases (`[[Andrew]]`).
- **Projects & meetings**: `[[Messenger Cup]]`, `[[Get REC'D]]`, `[[Discipleship Team]]`, `[[Podcast Machine]]`, `[[Home Base]]`, `[[Video Team]]`, `[[Job Site Social]]`.
- **Organizations**: `[[Messenger International]]`.
- **Life pillars** (when relevant): `[[Faith]]`, `[[Marriage]]`, `[[Fatherhood]]`, `[[Relationships]]`, `[[Joy & Rest]]`.

Don't link: common nouns, times/dates, generic actions, yourself ("Nathaniel"/"I"), or text inside YAML frontmatter or code blocks.

If you mention an entity that doesn't have an anchor file yet, still wrap it in `[[brackets]]` — Obsidian will flag it as an unresolved link, which is a useful signal.

Full convention: see "Wiki-Linking Convention" in `CLAUDE.md`.
