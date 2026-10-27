# PTE Practice Update 18 — Topic progress and red answer feedback

## What changed
- Fixes the source of new Reading progress being classified as `Reading · Other / legacy`: the cloud sync now saves the actual question type (`reorderParagraph`, `readingRWBlanks`, etc.) rather than just `Reading`.
- Shows every configured Reading, Listening, Speaking and Writing topic on the Teacher Dashboard and student progress page, even if zero questions have been completed. Shows finished, attempted, average of saved numeric scores and last finished question/date.
- Older Google Sheets rows already saved with task `Reading` cannot reliably be assigned to a particular topic using only their question ID. They remain explicitly **Unclassified older records**, with no invented topic attribution. Future completions will be categorized correctly. For old rows, use original Results sheet with question type if available and migrate only after confirming the actual topic.
- Reading task feedback highlights wrong blanks, wrong selected multiple-choice answers and incorrectly ordered paragraph positions in red after Finish & Score. The correct answers are displayed where available.
- Writing tasks enable browser spellcheck (red underline depends on browser settings) and display detectable writing form issues in red (word count, punctuation, repeated spaces/words). This is NOT a comprehensive grammar or spelling engine and cannot reliably assess essay grammar or official PTE scoring.

## Deployment
1. In Google Apps Script replace `Teacher.html` from `Google-Apps-Script/Teacher.html`. Keep the included matching `Code.gs` and `Bridge.html` (only redeploy those if versions differ).
2. Save and Deploy → Manage deployments → Edit → New version → Deploy.
3. Upload the complete `PTE-Practice-Update2-main` website directory to your GitHub Pages repository. In particular update `cloud-sync.js`, `reading.html`, `speaking.html`, and `student.html`.
4. Hard refresh with Ctrl+Shift+R. Sign in as a test student, finish a NEW Re-order Paragraph question, wait for cloud sync, then refresh the teacher dashboard. It should appear under Reading → Re-order Paragraph.
5. No new Sheets columns and no new setup function are required.

## Important
- Historical `Reading` records will not be silently reassigned. Scores are only averaged when numeric values are present. Writing scores are intentionally blank in the existing practice evaluator, so a writing average may show —.
- The project was statically syntax checked and ZIP integrity tested, not live tested against your Google Sheets deployment.
