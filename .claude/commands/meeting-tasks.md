Review meeting notes and propose task updates or new tasks based on what was discussed.

## Steps

### 1. Identify the meeting
- If Granola MCP is available, use `list_meetings` to find recent meetings. Pull full notes via `get_meetings`.
- If no meeting tool is available, ask the user to paste their meeting notes.
- If multiple meetings match, show them and ask which one.

### 2. Pull existing context
- Read recent digests for open loops and commitments.
- Read `work/` files for any task tracking in use.

### 3. Analyze meeting notes
For each discussion point:
- Does it create a new action item for someone?
- Does it update or resolve an existing commitment?
- Is there a decision that needs to be recorded?

### 4. Present proposed changes
Show a numbered list for approval:

```
Based on [Meeting Name] ([date]):

New tasks:
1. [Task title] — [brief context from the meeting]
2. [Task title] — [brief context]

Updates:
3. [Existing item] — [what changed based on the meeting]

Decisions made:
4. [Decision] — [who decided, any caveats]

Enter numbers to accept (e.g. "1,3,4"), "all", or "none":
```

**Do NOT execute any changes until the user responds with which numbers to accept.**

### 5. Execute accepted changes
- For new tasks: create entries in whatever task system is in use (markdown files, etc.)
- For updates: append meeting context to existing items
- For decisions: note them in the relevant digest or work file

**After executing**, confirm what was done:
```
Done:
- Created "Task title"
- Updated [item] with meeting context
- Recorded decision about [topic]
```

## Important
- **Never execute changes without explicit acceptance.** Always present the numbered list and wait.
- **Keep titles concise.** 5-8 words max. All context goes in notes.
- **Notes assume the reader wasn't in the meeting.** Include what was discussed, why it matters, who the key people are, and concrete next steps.
- **Only propose tasks for real action items.** Not every discussion point needs a task. Focus on commitments, deadlines, and promises made.
- **Attribute clearly.** Note who owns each action item. If unclear from the meeting, ask.


## Wiki-Linking

When writing or updating any file, wrap named entities in Obsidian `[[wiki-links]]` so the second-brain graph builds automatically.

- **People** (anyone with a file in `people/`): `[[Andrew McIntosh]]`, `[[Lindy Wood]]`, `[[Arden Bevere]]`, `[[Eliana Lehrer]]`, etc. First names work via aliases (`[[Andrew]]`).
- **Projects & meetings**: `[[Messenger Cup]]`, `[[Get REC'D]]`, `[[Discipleship Team]]`, `[[Podcast Machine]]`, `[[Home Base]]`, `[[Video Team]]`, `[[Job Site Social]]`.
- **Organizations**: `[[Messenger International]]`.
- **Life pillars** (when relevant): `[[Faith]]`, `[[Marriage]]`, `[[Fatherhood]]`, `[[Relationships]]`, `[[Joy & Rest]]`.

Don't link: common nouns, times/dates, generic actions, yourself ("Nathaniel"/"I"), or text inside YAML frontmatter or code blocks.

If you mention an entity that doesn't have an anchor file yet, still wrap it in `[[brackets]]` — Obsidian will flag it as an unresolved link, which is a useful signal.

Full convention: see "Wiki-Linking Convention" in `CLAUDE.md`.
