# Natty Light Ingest

Pull the most recent footage and audio from connected devices into the Natty Light project folder.

## What this skill does

1. Finds the most recent `.wav` file on the DJI mic volume (`/Volumes/DJI Mic 1`)
2. Finds the most recent `.mp4` file in the GoPro folder on the GoPro volume (`/Volumes/Gopro/DCIM/` — look for a subfolder with "GOPRO" in its name, e.g. `102GOPRO`)
3. Creates a dated folder at `~/Desktop/Natty Light/assets/footage/YYYY-MM-DD/` using today's date
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
DJI_VOLUME="/Volumes/DJI Mike 1"
GOPRO_DCIM="/Volumes/Gopro/DCIM"
DEST="$HOME/Desktop/Natty Light/assets/footage/$TODAY"

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

- If `/Volumes/DJI Mike 1` is not mounted: tell the user to plug in the DJI mic and make sure it's named "DJI Mike 1"
- If `/Volumes/Gopro` is not mounted: tell the user to plug in the GoPro SD card
