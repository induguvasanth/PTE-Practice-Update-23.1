# PTE Update 40 — Optional mobile transcription and echo controls

Changed: `PTE-Practice-Update2-main/speaking.html`, `PTE-Practice-Update2-main/browser-acoustics.js`.

- Audio recording remains independent of browser speech recognition.
- Added an opt-in Live transcription checkbox. On supported browsers, enabling it before Start attempts live speech-to-text. It is off by default on mobile to avoid triggering OS dictation unexpectedly.
- If browser speech recognition fails, recording continues and the checkbox is reset. It does not provide a guaranteed transcript on Brave or iOS.
- Microphone requests echo cancellation, noise suppression, automatic gain control and mono where supported. Mic audio is not routed to the speakers.
- For less echo, select Microphone only, use headphones and avoid playing reference audio while recording. Selecting Mic + shared audio can intentionally capture a second person's audio and can introduce echo.
- No API key, remote transcription service, or server-side speech-to-text was added. Reliable cross-browser transcription requires a configured backend and a speech-to-text provider.

## Deploy
Back up your repo. Replace the two changed website files, keeping paths unchanged. No Google Apps Script change. Refresh browser cache after GitHub Pages deploys.

## Tests
Check microphone meter and playback first. Enable Live transcription before Start in Chrome Android; if it fails, try Chrome or a transcription backend. Do not treat no transcript as content score 0.

Validation: JavaScript syntax checks and ZIP integrity check. Not tested on physical devices.
