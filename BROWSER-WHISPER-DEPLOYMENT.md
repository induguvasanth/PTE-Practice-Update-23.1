# Browser Whisper — Free GitHub Pages deployment

## What is included
- `whisper-config.js`: detects mobile/tablet, decodes recorded audio, resamples to 16 kHz, and launches the worker.
- `browser-whisper-worker.js`: Transformers.js 3.8.1 + quantized `Xenova/whisper-tiny.en` model, CPU/WASM inference.
- `speaking.html` and `full-mock.html`: use local Whisper on mobile/tablet **after Stop**. Desktop Web Speech API remains unchanged.

## Deploy
1. Extract this ZIP. Open the `PTE-Practice-Update-26.1-main` directory.
2. Upload **the contents** of that directory to the root of your GitHub Pages publishing branch/folder, retaining file names and paths. If you publish from `docs/`, put the files there instead.
3. Commit/push. Wait for GitHub Pages deployment to finish.
4. Open your HTTPS Pages site on Android Chrome or iOS Safari (not an in-app browser).
5. Open Speaking or Full Mock, grant microphone permission, record a clear English sentence, press Stop.
6. Keep the tab active. The first run downloads model weights and may take several minutes; later visits can use browser cache.
7. Confirm the transcription appears and is saved. Try airplane mode only after a successful initial load if you want to test cached availability.

## Important limits
- No API key, paid server, or Python required. Audio stays on device; model files download from Hugging Face/CDN.
- Requires an internet connection on first load, enough RAM/storage, and a browser supporting module workers, Web Audio, WebAssembly, and recording.
- On older mobile devices, Whisper can be very slow or fail due to memory pressure. WASM was chosen for wider compatibility rather than GPU speed.
- The transcript appears **after Stop**, not live. Longer recordings take longer; try 5–15 seconds first.
- Browser caching is controlled by the browser; offline availability is not guaranteed.
- If a browser cannot decode its recorded format, an audio-decoding error is displayed.
- This implementation has been statically checked, not end-to-end verified on physical mobile devices.
- Previous Python `Whisper-Server` folder is optional and not used by browser Whisper.

## Troubleshooting
- `Failed to fetch` or model download error: check connection and whether your network blocks cdn.jsdelivr.net or huggingface.co.
- Empty transcript: test with a louder, clear 10-second English recording; confirm the audio preview plays.
- Microphone denied: enable microphone permissions for the Pages domain; use HTTPS.
- Model load slow: first download can be large; avoid mobile data restrictions.
- If Pages is under a repository subpath, relative script URLs automatically use that subpath.
