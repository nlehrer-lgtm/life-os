Capture a quick note, idea, or reminder into the inbox. No organization required — just get it down.

## Steps

1. **Get the current date and time** (format: `YYYY-MM-DD HH:MM`).

2. **Read the user's note** from the prompt arguments. If no arguments were provided, ask: "What's on your mind?"

3. **Append to `notes/inbox.md`**:

   ```markdown
   ## YYYY-MM-DD HH:MM
   [the note, exactly as the user said it]
   ```

   Append after the last entry (or after the `---` header divider if the file is empty). Never rewrite existing entries.

4. **Confirm** with a single short line: "Saved." No summary, no elaboration.

## Important
- Capture the note verbatim. Don't rewrite, summarize, or clean up the user's words.
- Never delete or overwrite existing inbox entries.
- Keep it fast. This is a capture tool, not a conversation.
