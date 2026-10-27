# PTE Practice Update 8 — Latest Master Code.gs compatibility

1. Back up your existing Google Sheet and Apps Script.
2. Copy `Google-Apps-Script/Code.gs` into your existing Apps Script project (replace the previous master Code.gs, not the entire project). Keep any existing Bridge.html.
3. Run `setupStudentSync()` once as the spreadsheet owner. This creates `Students` and `QuestionProgress` tabs.
4. Deploy a NEW Apps Script Web App version. Use the deployment /exec URL.
5. Edit `PTE-Practice-Update2-main/sync-config.js` to set `window.PTE_SYNC_URL` to the /exec URL.
6. Publish the website folder to GitHub Pages. Add/select a student and mark a question. Confirm rows in both Sheets tabs and test on another device.

## Important security and functional limitations
- This is a compatibility update, not secure multi-user authentication. Anyone with the web-app URL can potentially read/write student progress using student IDs if deployed publicly. Do not use real student data on an Anyone deployment.
- Student selection is a browser-local list. Only the active student's remote records are pulled; there is no public all-student snapshot. The backend adminResults endpoint requires PTE_ADMIN_KEY and is NOT called by the public website.
- Existing question status identifiers depend on current frontend question context. Renaming sections/question IDs can make older statuses appear separate.
- The Results page still uses locally cached student records. Central administrator results need a separately authenticated admin UI.
- Apps Script cross-origin browser POST redirects can behave differently by hosting environment; test actual deployment in Chrome and Edge.
- Offline saves are cached locally and retried when the page is open; this is not guaranteed durable background synchronization.
- Backend question-loading, mock generation, and TTS logic remain from the supplied master Code.gs.
