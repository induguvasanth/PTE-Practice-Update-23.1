# Update 27: pronunciation diagnostics, timer visibility, clear score text

1. Replace the website files from `PTE-Practice-Update2-main` in your GitHub Pages website root. Keep the existing Apps Script deployment and Google Sheets.
2. Keep your locally built `pronunciation-assets/` in the same directory as `speaking.html` and `pronunciation-evaluator.js`. Update 27 ZIP does not contain downloaded model assets; use the folder generated on your computer in Update 26.
3. Hard refresh (Ctrl+Shift+R). The timer defaults hidden, can be shown or hidden with the button, and remembers your preference.
4. Try Read Aloud > Start > Finish & Score. The score card now displays the actual model error (such as HTTP 404, missing module, initialization error) rather than incorrectly assuming assets are absent.
5. For diagnosis open browser DevTools (F12), Console and Network. Confirm that pronunciation-assets/hama-browser.js and the model files load with HTTP 200.

**Important:** This patch cannot guarantee phoneme scoring succeeds: model package APIs and browser/WASM runtime have not been verified end-to-end. Do not interpret practice scores as official Pearson PTE scores.
