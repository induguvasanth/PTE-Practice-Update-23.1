# Update 22 — Free scoring detail and writing diagnostics

## Improvements
- Reading/Listening objective scorer returns structured answer-by-answer diagnostics (blanks, multiple choice, reorder adjacent pairs, incorrect words, ordered dictation alignment).
- New `scoring-report.js` can render a red-marked answer breakdown; included in Full Mock and available for subsequent UI integrations. The Full Mock existing numeric score logic remains unchanged.
- Writing evaluation reports repeated words, spacing, and possible sentence-capitalization errors, and presents these as warnings on the Speaking/Writing practice page.
- No invented official score for writing or speech; raw objective marks are separate from Pearson skill scores.

## Install
Upload all files inside `PTE-Practice-Update2-main` to your GitHub Pages repository. No Apps Script setup needed for these scoring-only improvements. Refresh cache (Ctrl+Shift+R).

## Not yet included
A production HTTPS grammar API, pronunciation/acoustic model, speech-to-text service, Pearson-equivalent 10–90 skill score, or automated open-response content assessment. Self-hosting LanguageTool and Whisper requires a separate backend and cannot run on GitHub Pages alone. Do not use a public LanguageTool API as an automated bulk service. No claims of PTE/APEUni score equivalence are made.

## Validation
Run `node --check` on modified JS; verify all existing modules with real student records. No live backend integration tests were run.
