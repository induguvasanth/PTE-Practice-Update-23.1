# PTE Practice Update 10 — workbook-aligned scoring

## Source and compatibility
Validated against uploaded `PTE UPDATE (3).xlsx` (read-only). Existing workbook is not modified. Workbook includes sheet tabs for speaking, reading, listening, grammar, vocabulary, and Results. The workbook uses differing layouts: some tasks have `Answer` as comma-delimited blanks, other tasks use `|`-delimited options, some listening MCQs use letter keys such as `A|B`, and `Write Essay` has no header in its first row.

## Implemented changes
- Kept the existing website, Google Apps Script question API, progress sync, and optional local AI helper.
- Corrected alias matching for truncated Google Sheet names (Subject Verb Agreement, Science & Technology, Synonyms & Antonyms).
- Added `solution` mapping from spreadsheet to backend questions.
- Versioned question cache and corrected the cache clear key.
- Corrected average score handling so blank numeric cells are not treated as zero.
- Added `task-scoring.js` and connected it to Full Mock. Objective tasks now use per-blank partial credit, multiple-answer correct-minus-incorrect (floor 0), single-choice checking, dictation word credit, and reorder adjacent-pair credit when original order can be resolved.
- Open-response Speaking/Writing items are recorded but no longer receive fabricated Full Mock marks. They are shown as needing review; totals are **not** a complete PTE exam score.

## Deployment
1. Back up your current Google Apps Script and GitHub Pages deployment.
2. Copy `Google-Apps-Script/Code.gs` to the EXISTING Apps Script project, save and run `setupStudentSync()` if not already done, then deploy a NEW web app version.
3. Copy ALL files from `PTE-Practice-Update2-main/` to your GitHub Pages root. Set the deployed `/exec` URL in `sync-config.js`.
4. Verify `?action=diagnose` on your Apps Script URL and check all tab mappings. Then test several questions per section and one Full Mock.
5. Do NOT upload the supplied workbook to a new sheet unless intentionally replacing your existing data source. The existing Code.gs uses the spreadsheet ID in CONFIG.

## Known limits — please read
- Cannot guarantee error-free deployment without live access to your Google Apps Script permissions, hosted site, or Sheets runtime. Syntax and offline sample scoring tests were run only.
- **No real acoustic pronunciation assessment** is implemented. Browser transcription is not a pronunciation grade. The optional Ollama server is not connected to public GitHub Pages.
- Some Reading and Listening standalone page scoring remains its existing implementation; the new rubric is integrated with Full Mock only.
- Some spreadsheet rows have no `Options` (e.g., Reorder Paragraph); these are marked needs-review if original paragraph identifiers cannot be resolved, rather than guessed.
- The backend's public student-ID based access is NOT authentication. Never expose real student data via a publicly accessible endpoint without server-side identity and authorization controls.
- Some existing UI labels may still say 'practice score'; this means practice-only marks and excludes open-response evaluation.
