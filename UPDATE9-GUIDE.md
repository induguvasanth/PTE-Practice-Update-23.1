# PTE Practice Update 9 — Free scoring foundations

## What is implemented
- Preserved Update 8 question pages, progress, and Google Apps Script backend.
- Added `free-evaluator.js` with word-sequence alignment (LCS), missing/extra word identification, normalized exact-answer check, adjacent-pair reorder helper, and writing form/lexical indicators.
- Speaking & Writing page now uses this evaluator after a response. **It intentionally does not present guessed pronunciation, fluency or writing totals as official-looking PTE scores.** The existing trait bars are legacy approximations and should not be interpreted as measured traits.
- Optional local-only Python writing coach server with rule-based feedback and Ollama integration (`Optional-Local-AI/`). No paid API is required.

## Important limitations
- No actual acoustic pronunciation assessment is implemented. Browser speech recognition can mishear speech; transcript alignment is not pronunciation scoring.
- No real-time pause detection or calibrated Pearson score. Full Mock still uses its legacy practice estimate; its speaking/writing results are not reliable PTE scores.
- Objective question grading in existing pages has not been fully reworked. The shared exact/reorder helpers are available for a future comprehensive task-specific migration.
- The optional local Python service is not wired to the public GitHub Pages deployment. It must not be exposed without secure authentication, TLS and rate limiting.
- Existing Google Apps Script progress sync still has no student authentication. Do not use real personal student records on a public deployment.

## Deploy
1. Back up Update 8.
2. Upload `PTE-Practice-Update2-main/` to GitHub Pages, keeping `free-evaluator.js` alongside the HTML files.
3. Keep existing Apps Script `Code.gs` and the existing deployment instructions in `SETUP-GUIDE.md`.
4. Optionally follow `Optional-Local-AI/README.md` for local Ollama writing feedback.

## Future work for ApeUni-like assessment
Use a dedicated audio pronunciation model and forced alignment, human-calibrated scoring rubrics, secure backend authentication, and task-by-task frontend integration. None of those capabilities should be claimed until implemented and tested.
