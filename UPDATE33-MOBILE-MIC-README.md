# Update 33 — Mobile / Tablet Microphone

- Speaking recording now starts with microphone audio capture independently of the Web Speech API. This allows audio capture on iPhone/iPad Safari and mobile browsers without SpeechRecognition.
- When live transcription is unsupported, the UI explicitly reports audio-only recording rather than blocking the Start button.
- The recorder waits for its final audio data before scoring; this fixes a race that could produce empty audio on mobile.
- AudioContext is resumed after the user taps Start; microphone permission errors are shown clearly.
- Existing pronunciation assets, question progress, student sync and Google Apps Script are unchanged.

## Deployment
Upload the `PTE-Practice-Update2-main` website files to GitHub Pages. No Apps Script deployment needed. Open the HTTPS site directly in Safari on iOS or Chrome on Android (not embedded WhatsApp/Facebook browser). Allow microphone access. Tap Start, speak, then Finish & Score.

## Limitations
Web Speech API speech-to-text is not available in all mobile browsers. When unsupported, content/transcript scoring cannot be equivalent to desktop. The locally computed audio timing and Hama pronunciation can work if the browser supports MediaRecorder, Web Audio, WASM and audio decoding. Some iOS audio formats may still be unsupported by the Hama audio decoder. Real-device testing is necessary.
