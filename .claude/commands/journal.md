Append a journal entry to today's daily journal file.

The user's message after `/journal` is the journal entry. Write it exactly as they typed it.

## Steps

1. Get today's date.

2. Check if `journal/entries/YYYY-MM-DD.md` exists.

3. **If the file doesn't exist**, create it:

```markdown
# [Month Day, Year]

[time] — [entry]
```

4. **If the file exists**, append to it:

```markdown

[time] — [entry]
```

5. Confirm with a short one-liner like "Added to today's journal."

## Important

- Write the entry exactly as the user typed it. Don't edit, rephrase, summarize, or add commentary.
- Use 12-hour time format (e.g., 10:23 PM).
- Never delete or modify previous entries.
- Don't add tags, categories, or metadata. Just the timestamp and the entry.
- Keep the confirmation short. Don't read back the entry or ask follow-up questions.

$ARGUMENTS


## Wiki-Linking

When writing or updating any file, wrap named entities in Obsidian `[[wiki-links]]` so the second-brain graph builds automatically.

- **People** (anyone with a file in `people/`): `[[Andrew McIntosh]]`, `[[Lindy Wood]]`, `[[Arden Bevere]]`, `[[Eliana Lehrer]]`, etc. First names work via aliases (`[[Andrew]]`).
- **Projects & meetings**: `[[Messenger Cup]]`, `[[Get REC'D]]`, `[[Discipleship Team]]`, `[[Podcast Machine]]`, `[[Home Base]]`, `[[Video Team]]`, `[[Job Site Social]]`.
- **Organizations**: `[[Messenger International]]`.
- **Life pillars** (when relevant): `[[Faith]]`, `[[Marriage]]`, `[[Fatherhood]]`, `[[Relationships]]`, `[[Joy & Rest]]`.

Don't link: common nouns, times/dates, generic actions, yourself ("Nathaniel"/"I"), or text inside YAML frontmatter or code blocks.

If you mention an entity that doesn't have an anchor file yet, still wrap it in `[[brackets]]` — Obsidian will flag it as an unresolved link, which is a useful signal.

Full convention: see "Wiki-Linking Convention" in `CLAUDE.md`.
