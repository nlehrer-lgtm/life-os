# Natty Lght Podcast Ingest

Pull the most recent footage, audio, and screen recording into the Natty Lght project folder.

## What this skill does

1. Finds the most recent `.wav` file on the DJI mic volume (`/Volumes/DJI Mic 1`)
2. Finds the most recent `.mp4` file in the GoPro folder on the GoPro volume (`/Volumes/Gopro/DCIM/` — look for a subfolder with "GOPRO" in its name, e.g. `102GOPRO`)
3. Finds the most recent screen recording MP4 in `~/Downloads` matching either `Screen Recording*.mp4` or `ScreenRecording*.mp4` (macOS uses both naming conventions)
4. Creates a dated folder at `~/Desktop/2026_Natty-Lght/02 Assets/01 Footage/YYYY-MM-DD/` using today's date
5. Copies the available files into that folder with standardized names

## Naming convention

Use today's date in `YYYY-MM-DD` format.

- DJI audio: `Natty-Lght_Audio_YYYY-MM-DD.wav`
- GoPro footage: `Natty-Lght_GoPro-Footage_YYYY-MM-DD.mp4`
- Screen recording: `Natty-Lght_screen_recording_YYYY-MM-DD.mp4`

## Steps to execute

Run these bash commands:

```bash
# Get today's date
TODAY=$(date +%Y-%m-%d)

# Define paths
DJI_VOLUME="/Volumes/DJI Mic 1"
GOPRO_DCIM="/Volumes/Gopro/DCIM"
DOWNLOADS="$HOME/Downloads"
DEST="$HOME/Desktop/2026_Natty-Lght/02 Assets/01 Footage/$TODAY"

# Create destination folder
mkdir -p "$DEST"

# Find most recent WAV on DJI mic
DJI_FILE=$(find "$DJI_VOLUME" -iname "*.wav" -type f | xargs ls -t 2>/dev/null | head -1)

# Find the GOPRO subfolder (e.g. 102GOPRO)
GOPRO_FOLDER=$(find "$GOPRO_DCIM" -type d -iname "*GOPRO*" | head -1)

# Find most recent MP4 in GoPro folder (by modification date)
GOPRO_FILE=$(find "$GOPRO_FOLDER" -iname "*.mp4" -type f | xargs ls -t 2>/dev/null | head -1)

# Find most recent screen recording MP4 in Downloads (matches both "Screen Recording*.mp4" and "ScreenRecording*.mp4")
SCREEN_FILE=$(find "$DOWNLOADS" -maxdepth 1 -type f \( -iname "Screen Recording*.mp4" -o -iname "ScreenRecording*.mp4" \) | xargs ls -t 2>/dev/null | head -1)
```

Then copy with renamed filenames:

```bash
cp "$DJI_FILE" "$DEST/Natty-Lght_Audio_${TODAY}.wav"
cp "$GOPRO_FILE" "$DEST/Natty-Lght_GoPro-Footage_${TODAY}.mp4"

# Copy screen recording if one was found; otherwise warn and continue
if [ -n "$SCREEN_FILE" ]; then
  cp "$SCREEN_FILE" "$DEST/Natty-Lght_screen_recording_${TODAY}.mp4"
else
  echo "No screen recording (Screen Recording*.mp4 or ScreenRecording*.mp4) found in ~/Downloads — skipping screen recording copy."
fi
```

## Validation

After copying, confirm the available files exist in the destination and report their sizes. If a volume is not found, tell the user which one is missing and stop — don't proceed with a partial ingest. If no screen recording is found in `~/Downloads`, warn the user and continue with the rest of the ingest.

## Volume not found

- If `/Volumes/DJI Mic 1` is not mounted: tell the user to plug in the DJI mic and make sure it's named "DJI Mic 1"
- If `/Volumes/Gopro` is not mounted: tell the user to plug in the GoPro SD card
