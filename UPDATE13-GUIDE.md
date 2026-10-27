# Update 13 — Teacher Dashboard & Clean Student UI

## Setup (required)
1. Open your Google Sheet > Extensions > Apps Script.
2. Replace `Code.gs` with `Google-Apps-Script/Code.gs`.
3. Create a NEW HTML file named exactly `Teacher` (Apps Script will create `Teacher.html`). Paste `Google-Apps-Script/Teacher.html` into it.
4. In Project Settings > Script Properties add `PTE_ADMIN_KEY` with a long, unique teacher password. **Do not paste the password into GitHub, website JavaScript, or a URL.**
5. Run `setupStudentSync()` and authorize.
6. Deploy > Manage deployments > Edit > New version > Deploy. Teacher URL: YOUR_DEPLOYED_EXEC_URL?teacher=1.
7. Upload the `PTE-Practice-Update2-main` website folder to GitHub Pages.
8. In Teacher Dashboard, sign in and add students (name and unique ID).
9. Each student enters their teacher-assigned Student ID in the small selector at the bottom-left of the practice site. No add-student/mark-attempted/mark-finished/undo/results toolbar is shown.
10. Complete a question and verify `QuestionProgress` and the teacher dashboard. Use Refresh in the dashboard for the latest data.

## Features
- Password-protected teacher dashboard served directly by Apps Script; password checked on the server against `PTE_ADMIN_KEY`.
- 30-minute server-side session token kept only in memory in the teacher browser page, with logout.
- Add student, view all students, finished/attempted totals, last completed question per section, detailed question records, CSV export.
- `results.html` on GitHub Pages now only links to the teacher dashboard instructions (no public results listing).
- Practice student toolbar replaced with small Student ID field; manual mark buttons removed. Student ID must exist in `Students` sheet to save cloud progress.
- Sync notifications hidden; cloud sync triggered on initial load and changes, not 30-second polling.
- Existing practice, scoring, Telugu translation and text-to-speech files preserved.

## Security limitations
This is **teacher dashboard access control**, not complete student authentication. The existing public `studentProgress` GET API still allows reading records by a known student ID; the public web app must not be used for sensitive student personal data until the student API is separately secured. The browser's Student ID entry is not a login. The backend currently uses the existing Apps Script public write APIs, which can be called by other clients. Use only non-sensitive roll numbers and display names, and avoid public deployment for sensitive records.
The teacher password is checked server-side, but no account lockout/rate limiting is included. Rotate the password if exposed.
Counts represent saved unique question records, not total question bank coverage. The last finished question is based on saved timestamps.
No live deployment or end-to-end Google Sheets test has been performed.
