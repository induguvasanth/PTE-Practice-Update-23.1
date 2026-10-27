# Update 24 — Free browser acoustic fluency analysis

## Installation
Upload `PTE-Practice-Update2-main/speaking.html` and `PTE-Practice-Update2-main/browser-acoustics.js` to the GitHub Pages repository root (alongside `free-evaluator.js`). Hard-refresh the Speaking page.

No card, API key, backend, Apps Script redeployment, or new Google Sheet columns are required.

## What is new
- Uses the Web Audio API locally on each student's device to measure speaking time, pauses, speech rate and a heuristic fluency estimate.
- Combines available content and acoustic fluency indicators into a **practice estimate**, not an official PTE score.
- Saves available score and fluency in existing result fields for teacher progress.
- No microphone recordings are uploaded or stored by this component.

## Important limitations
- Browser SpeechRecognition may use the browser vendor's online service. It is not guaranteed offline or private. Browser support differs.
- This update **does not** add Whisper or a trained pronunciation model; it cannot provide a credible phoneme-level pronunciation score. The pronunciation field is blank instead of fabricated.
- Noise, microphone quality, accents and speaking conditions affect estimates. This is not calibrated against Pearson results.
- The 65% content / 35% fluency weighting is an explicit practice heuristic, not a Pearson formula.
- Fluency audio metrics are only available after permission to access the microphone and successful capture.
