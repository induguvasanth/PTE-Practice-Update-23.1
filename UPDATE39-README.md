# PTE Practice Update 39 — Cross-device audio capture

Replace `speaking.html` and `browser-acoustics.js` in the GitHub Pages website. No Google Apps Script changes are needed.

Changes: selectable Microphone / Shared tab audio / Both; audio level meter; playback of recorded response; submission without a transcript; local WAV fallback when MediaRecorder is unavailable. Content accuracy is not calculated without a transcript; experimental Hama pronunciation and acoustic fluency can still be attempted.

Limitations: Browser capture of another app's audio (such as Google Meet) is generally unavailable on mobile/tablet. Tab audio sharing requires a supporting desktop browser, explicit screen-share permission and an audio track. Live transcription still depends on browser speech recognition; it is not supplied by the recorder. Testing on physical devices and GitHub Pages remains necessary.

Test: On mobile choose Microphone, tap Start, speak, watch the level meter, tap Finish & Score, play the recorded audio. If no sound, verify site microphone permission and try Chrome/Safari. On desktop choose Shared tab audio or Both and enable Share tab audio in the browser prompt.
