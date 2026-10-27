# Update 15 — Student Dropdown / Apps Script Bridge Connection Fix

## Changes
- Fixed communication with nested Google Apps Script HTML Service frames.
- Bridge.html now sends READY and responses to the GitHub Pages top-level window rather than its Google iframe parent.
- student-auth.js now remembers the real bridge window that sends READY and sends requests to that window.
- Increased bridge handshake wait from 6 to 10 seconds; clearer connection errors.
- All existing modules, teacher dashboard, passwords, and progress logic retained.

## Install BOTH sides (required)
1. In Google Apps Script, replace the content of HTML file `Bridge` with `Google-Apps-Script/Bridge.html` in this ZIP. Keep the HTML filename exactly `Bridge`.
2. Confirm `Code.gs` is from this ZIP. In **Deploy > Manage deployments > Edit**, select **New version**, then Deploy. Execute as Me, access Anyone. Ensure you have authorized the script.
3. Upload **all files inside** `PTE-Practice-Update2-main/` to the root of the GitHub repository used by GitHub Pages. Especially replace `student-auth.js`.
4. Open the GitHub Pages site, hard refresh with Ctrl+Shift+R, and try Student Login.
5. Teacher must add students and passwords in the Teacher dashboard. An empty student list after a successful connection can mean no students were registered.

## If still failing
- Inspect Chrome DevTools > Console and Network for iframe blocking, CSP errors, or script authorization errors.
- Try opening the Apps Script Web App `.../exec?bridge=1` in a new tab; blank is expected.
- Verify `.../exec?action=studentDirectory` returns JSON with `ok:true` and a students array. This endpoint intentionally returns names and IDs, not passwords.
- Browser privacy or iframe blocking may still affect this architecture. For robust production use, move authentication to a dedicated authenticated backend instead of relying on a cross-origin Apps Script iframe.

## Security note
This is a transport fix, not a security audit. Apps Script iframe bridging and public student directory are not equivalent to production-grade authentication. Avoid sensitive personal information and add rate limiting and robust backend authorization before production deployment.
