PTE Practice Update 43 — transcript and scoring reliability fixes

Changes based on Update 42:
- Removed the post-recording “Review recognized words (optional)” panel, its textarea, and the manual “Apply transcript & rescore” workflow.
- Improved browser speech-recognition lifecycle handling: recognition errors are reported without stopping microphone recording, and browsers that end recognition after silence are retried while recording is active where supported.
- Updated the live transcript/audio status text so users can distinguish microphone recording from live transcription support.
- Prevented an audio-only pronunciation metric from being presented as a complete speaking score when no transcript exists. When speech transcription is unavailable, the result is explicitly an audio fluency estimate or unscored recording; content is marked unavailable rather than misleadingly scored as zero.
- Kept local microphone recording and existing pronunciation/acoustic assets intact.

Important browser limitation:
The Web Speech API is not supported consistently across browsers and mobile devices. This project does not include a hosted speech-to-text service, so live transcription cannot be guaranteed on every phone/tablet/browser. Use a current supported Chrome/Safari browser, serve over HTTPS, and allow microphone permission. If a browser does not implement speech recognition, audio still records but the response cannot receive a transcript-based content score.

Deploy:
Upload the contents of PTE-Practice-Update2-main to the existing GitHub Pages repository, preserving file paths. For an existing deployment, replace speaking.html. Keep browser-acoustics.js and pronunciation assets in their existing paths. Test on desktop, Android, and iOS before relying on results.
