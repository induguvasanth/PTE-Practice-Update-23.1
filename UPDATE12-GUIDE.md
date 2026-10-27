# Update 12 — Student completion tracking

- Submitted evaluations in Reading, Listening, Grammar, Speaking/Writing automatically mark the selected student's current question Finished with completion time. Speaking/Writing may have no reliable numeric score.
- Submitted Full Mock marks only answered questions finished.
- Progress bar, practice header, Results table and navigator display finished checkmark and date/time. CSV export includes Completed At.
- Google Sheets QuestionProgress gains a Completed At column; existing question tabs are unchanged.
- Unique finished question counts per student avoid counting the same question repeatedly.

## Deploy
1. Back up your existing project and Google Sheet.
2. Replace Code.gs in Apps Script, run setupStudentSync() and authorize, and deploy a NEW VERSION of your existing Web App.
3. Upload all files in PTE-Practice-Update2-main to GitHub Pages.
4. Select/create a student, finish a question, open Results, and verify the QuestionProgress tab.

## Notes
- Student IDs are not secure authentication. Multi-device sync conflicts may occur.
- Completion means an evaluation was submitted, not that the answer was correct.
- Historical finished items without Completed At display their previous Updated At timestamp.
- Syntax and ZIP checks were performed; live browser and Google Sheets tests were not.
