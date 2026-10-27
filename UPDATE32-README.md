# Update 32 — Topic / Section / Overall progress repair

## Changes
- Topic totals resolve task keys consistently against the Apps Script question-bank catalog.
- Section totals include every configured topic within that section; overall total includes all configured sections (excluding Full Mock re-use).
- The topic and section progress cards now sit directly under the selected task header in the main practice panel, with compact bars and averages.
- Overall dashboard remains three small cards.
- Unknown totals are explicitly shown as Loading rather than being silently replaced with a guessed or zero count.
- Count API failures are diagnosed (timeout / load error); loaded question banks can be used as a topic-only fallback, not as section or overall totals.
- Working pronunciation/Hama files are unchanged.

## IMPORTANT: deploy BOTH parts
1. Back up your GitHub repository and Apps Script code.
2. Replace Google Apps Script Code.gs with the Code.gs in this ZIP.
3. Deploy > Manage deployments > Edit > New version > Deploy. Merely saving Code.gs does NOT update the live web app.
4. Upload the contents of PTE-Practice-Update2-main to GitHub Pages, preserving paths.
5. Hard refresh (Ctrl+Shift+R), sign in, and verify question totals.
6. If the dashboard still shows a dash, open your deployed Apps Script URL with `?action=progresscounts` and check for a JSON object with `ok:true`, `topics`, `sections`, `total`. This endpoint contains only counts.

## Notes
- Totals reflect nonempty, valid question records recognized by Code.gs in configured Sheets, not the estimated PTE exam question counts.
- Each student's finished questions come from their signed-in local/synchronized progress records; test sign-in and reload on separate devices to verify synchronization.
- Grammar and Vocabulary may use different completion granularity; this change does not rewrite their assessment behavior.
- No live Apps Script/GitHub deployment or browser microphone testing was possible here.
