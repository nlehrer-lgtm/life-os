# Natty Light Ingest

Pull the most recent footage and audio from connected devices into the Natty Light project folder.

## What this skill does

1. Finds the most recent `.wav` file on the DJI mic volume (`/Volumes/DJI Mic 1`)
2. Finds the most recent `.mp4` file in the GoPro folder on the GoPro volume (`/Volumes/Gopro/DCIM/` — look for a subfolder with "GOPRO" in its name, e.g. `102GOPRO`)
3. Creates a dated folder at `~/Desktop/2026_Natty-Lite/02 Assets/01 Footage/YYYY-MM-DD/` using today's date
4. Copies both files into that folder with standardized names

## Naming convention

Use today's date in `YYYY-MM-DD` format.

- DJI audio: `Natty-Light_Audio_YYYY-MM-DD.wav`
- GoPro footage: `Natty-Light_GoPro-Footage_YYYY-MM-DD.mp4`

## Steps to execute

Run these bash commands:

```bash
# Get today's date
TODAY=$(date +%Y-%m-%d)

# Define paths
DJI_VOLUME="/Volumes/DJI Mic 1"
GOPRO_DCIM="/Volumes/Gopro/DCIM"
DEST="$HOME/Desktop/2026_Natty-Lite/02 Assets/01 Footage/$TODAY"

# Create destination folder
mkdir -p "$DEST"

# Find most recent WAV on DJI mic
DJI_FILE=$(find "$DJI_VOLUME" -iname "*.wav" -type f | xargs ls -t 2>/dev/null | head -1)

# Find the GOPRO subfolder (e.g. 102GOPRO)
GOPRO_FOLDER=$(find "$GOPRO_DCIM" -type d -iname "*GOPRO*" | head -1)

# Find most recent MP4 in GoPro folder (by modification date)
GOPRO_FILE=$(find "$GOPRO_FOLDER" -iname "*.mp4" -type f | xargs ls -t 2>/dev/null | head -1)
```

Then copy with renamed filenames:

```bash
cp "$DJI_FILE" "$DEST/Natty-Light_Audio_${TODAY}.wav"
cp "$GOPRO_FILE" "$DEST/Natty-Light_GoPro-Footage_${TODAY}.mp4"
```

## Validation

After copying, confirm both files exist in the destination and report their sizes. If either volume is not found, tell the user which one is missing and stop — don't proceed with a partial ingest.

## Volume not found

- If `/Volumes/DJI Mic 1` is not mounted: tell the user to plug in the DJI mic and make sure it's named "DJI Mic 1"
- If `/Volumes/Gopro` is not mounted: tell the user to plug in the GoPro SD card

---

## Step 5 — Enhance audio with Adobe Podcast

After both files are confirmed in the destination folder, enhance the DJI audio file using Adobe Podcast.

The source file is:
```
$DEST/Natty-Light_Audio_${TODAY}.wav
```

The enhanced output should be saved as:
```
$DEST/natty-light-audio-enhanced-${TODAY}.wav
```

### Browser automation steps

Use the Chrome MCP tools (`mcp__Claude_in_Chrome__*`) for all browser interaction.

1. **Get a tab** — call `tabs_context_mcp` with `createIfEmpty: true`, then use the tab ID for all subsequent calls.

2. **Navigate** to `https://podcast.adobe.com/en/enhance`

3. **Take a screenshot** to confirm the page loaded and the user is logged in. If there's a login wall, stop and tell the user they need to be logged into Adobe Podcast in Chrome.

4. **Upload the file** — use `find` to locate the file input:
   - Call `find` with query `"file upload input"` to get its ref
   - Call `file_upload` with `paths: ["/Users/nlehrer/Desktop/2026_Natty-Lite/02 Assets/01 Footage/YYYY-MM-DD/Natty-Light_Audio_YYYY-MM-DD.wav"]` (substitute real date) and the ref from above

5. **Wait for processing** — take a screenshot every 15 seconds and check whether the file card on the left shows a duration (meaning upload + processing is complete). The file is ready when the card shows a time like "07:51" and the **Download** button at the bottom is active (black, not grayed out). Wait up to 5 minutes before timing out.

6. **Confirm download** — tell the user: "Adobe Podcast has finished enhancing the audio. Ready to download the enhanced file to your project folder — confirm with 'yes' to proceed." Wait for explicit confirmation before continuing.

7. **Note pre-download timestamp** — run `date` in bash and store the current time so you can identify the newly downloaded file.

8. **Click Download** — use `find` with query `"Download button"` to get the ref, then click it.

9. **Locate the downloaded file** — after ~5 seconds, run:
   ```bash
   ls -t ~/Downloads/*.wav ~/Downloads/*.mp3 2>/dev/null | head -3
   ```
   Identify the most recently modified audio file that appeared after your pre-download timestamp.

10. **Move and rename** — run:
    ```bash
    mv "<downloaded_file_path>" "$DEST/natty-light-audio-enhanced-${TODAY}.wav"
    ```
    Preserve the `.wav` extension. If Adobe Podcast downloads an `.mp3` instead, keep `.mp3` in the output filename.

11. **Confirm** — report the final file path and size to the user.
