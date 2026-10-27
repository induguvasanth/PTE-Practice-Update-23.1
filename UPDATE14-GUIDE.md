# Update 14 — Teacher & Student Password Login

## Deploy
1. Back up your current Google Apps Script and GitHub Pages project.
2. In your existing Google Sheet, go to Extensions > Apps Script.
3. Replace `Code.gs` with the new `Google-Apps-Script/Code.gs`.
4. Add or replace Apps Script HTML files named `Teacher` and **`Bridge`**, copying `Teacher.html` and `Bridge.html` respectively. The Bridge is required for student login and cloud sync.
5. In Apps Script Project Settings > Script Properties, set `PTE_ADMIN_KEY` to a strong teacher password. The code creates `PTE_STUDENT_SECRET` automatically on first student password operation. Do not publish either secret.
6. Run `setupStudentSync()` once; it adds Password Salt and Password Hash columns to the existing Students sheet, without removing previous rows.
7. Deploy > Manage deployments > Edit > New version > Deploy. The website uses your existing /exec URL; if the deployment URL changes, update `sync-config.js` and the homepage Teacher Login link.
8. Upload the complete `PTE-Practice-Update2-main` folder to the GitHub Pages repository, including `student-auth.js` and `student.html`.
9. Open Teacher Login from the homepage, enter your teacher password, and add a student with a new password (8+ characters). Existing students need passwords set using the Change student password form.
10. Student opens practice site, selects their name from Student Login, enters their password, and opens My Progress. Sign-in is remembered for 30 days on that browser (until logout or password reset). Teacher login is remembered for up to 6 hours (server cache).
11. Verify that a completed question appears in the `QuestionProgress` Google Sheet and in both student and teacher progress views.

## Shortcuts
- Google Sheet: https://docs.google.com/spreadsheets/d/1mAFV5s3i0szE8sPthN8ui8T19AV5G8yxmm8uAaOpLrw/edit
- GitHub repository: https://github.com/induguvasanth/PTE-Practice-Update-22
- Teacher page: your deployed Apps Script `/exec?teacher=1`

## Security & limitations
- Teacher password is stored in Apps Script Script Properties. Student passwords are salted and peppered SHA-256 hashes in the Students sheet; the secret pepper is in Script Properties. Passwords are never stored in GitHub files or browser localStorage. A stronger production-grade password hashing scheme with adaptive work factors and rate limits is recommended before handling sensitive student data.
- The browser stores an HMAC-signed student session token for 30 days; changing a student password invalidates previous tokens. Browser-local progress remains device-local until synchronized.
- The student name/ID directory is publicly retrievable so students can select their names. Do not use real names if this disclosure is not acceptable; use pseudonyms or private access controls.
- The student bridge is restricted to `https://induguvasanth.github.io`. If you use a different GitHub Pages owner or a custom domain, update `allowed` in `Bridge.html`.
- Teacher dashboard Google Sheet and GitHub shortcuts do not override the account's existing access permissions.
- Question count shows distinct saved question records, not every item in the complete question bank. The last finished question is based on the latest completion timestamp.
- Apps Script, browser third-party iframe behavior, and live spreadsheet access have **not** been end-to-end verified. Some browsers can block Apps Script iframe integration. Check Chrome and Edge before public deployment.
- The existing question bank and evaluation code are preserved. This update does not add advanced AI pronunciation scoring.
