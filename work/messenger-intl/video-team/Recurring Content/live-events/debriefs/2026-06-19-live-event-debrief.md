# Live Event Debrief — 2026-06-19

Nathaniel's debrief from the [[Video Team]]'s most recent live event. Captures operational learnings to feed the eventual full Live Event SOP.

## What we learned

### 1. Internet & streaming quality
Messenger's internet is great, so streaming has been fantastic — we've been able to stream at a high bit rate in high quality.

### 2. ATEM bit rate readout ≠ connection health
Inside the ATEM software, the current bit rate shown is **directly the number of MB/s needed to be pushed online**. If it's really low or the bit rate seems to be dropping, it may **not** mean our internet is bad or the encoding is bad — it might just mean there's something small on screen that needs less data to encode. A dropping bit rate on the live stream screen does **not** necessarily mean we're losing connection (previous assumption was wrong).

### 3. ATEM HD8 video standard & frame rate
Make sure the ATEM HD8 switcher is set to the right **video switcher standard** and the **multi-view video standard**, with the correct frame rate:
- **Regular content:** 1080p **24fps**
- **Live streams:** we usually switch to 1080p **60** because our Nintendo Switch is connected as a source (we play it around the office)
- **Required step:** switch back to 1080p 24fps for regular content after live-stream sessions.

### 4. Downstream keyers — "pre-multiplied key"
Upstream/downstream keying depends on whether the graphics team gave us pre-multiplied graphics. The key word is **pre-multiplied**. Our graphics are **not** pre-multiplied, so leave the **"pre-multiplied key" box unchecked** in the downstream keyers for key 1 or key 2.

### 5. CQ18T ↔ HD8 audio routing
Our sound board is an **Allen & Heath CQ18T**. It has:
- an **input coming from the HD8 switcher** (all sources running through the switcher), and
- an **HD out** — the CQ mixer sends a feed/output signal back to the switcher, so anything going through the CQ gets sent back to the switch.

When doing a live event with mics going into the CQ mixer, make sure **HD8 out is UP**, but **HD8 in does not need to be up**.

## Next
- [ ] Build the full Live Event SOP (Nathaniel).
