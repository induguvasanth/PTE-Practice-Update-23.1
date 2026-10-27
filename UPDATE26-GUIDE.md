# Update 26 — Free, on-device phoneme pronunciation evaluation

## New implementation
- Browser phoneme recognition via the open-source hama-js model (Apache 2.0); expected text to IPA via hama G2P.
- Microphone recording is captured locally, then decoded locally and scored against the expected phoneme sequence.
- Result shown as experimental **phoneme similarity /90**, not an official Pearson pronunciation rating.
- Existing content and fluency scores retained; if phoneme assets are missing, score is unavailable (never fabricated).

## One-time build (required!)
1. Install Node.js 20+ on your PC.
2. Open `Pronunciation-Model-Build` in a terminal.
3. Run `npm install` then `npm run build` (internet needed for open-source model packages).
4. Confirm `PTE-Practice-Update2-main/pronunciation-assets/` contains `hama-browser.js`, `.hama` model weights and `hama.wasm`.
5. Upload **all** website files including `pronunciation-evaluator.js`, modified `speaking.html`, `browser-acoustics.js`, and the generated `pronunciation-assets/` directory to GitHub Pages.
6. Hard refresh and allow microphone. Test Read Aloud. No credit card or API key.

**Note:** This ZIP contains build source, not predownloaded model binaries. The current sandbox cannot reach npm, so model build and live microphone testing were not possible here. The hama browser model API follows https://hamanlp.org/docs/quickstart/ .

**Caveats:** The current phoneme edit-distance score can be influenced by missed words, background noise, accent and model errors; it is not a calibrated pronunciation quality metric or Pearson PTE score. For Describe Image/Retell Lecture, reference text may differ from the student's legitimate wording; avoid interpreting phoneme similarity as pronunciation proficiency on those tasks. For those tasks a future free-speaking phoneme scorer should avoid fixed-reference penalties.
