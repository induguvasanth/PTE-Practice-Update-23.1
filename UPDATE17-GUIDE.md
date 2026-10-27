# Update 17 — Topic Analytics & Exam-style Practice Clock

## Installation
1. Replace Apps Script `Teacher.html` with `Google-Apps-Script/Teacher.html`. Keep the matching `Code.gs` and `Bridge.html` from this ZIP.
2. Save and deploy a NEW version of the Apps Script Web App.
3. Upload ALL website files in `PTE-Practice-Update2-main/` to your GitHub Pages repository, including the new `exam-practice-clock.js`.
4. Hard refresh your browser and verify student login and progress synchronization.

## Teacher analytics
Teacher dashboard now groups existing saved QuestionProgress records into Reading, Listening, Speaking, Writing and their named task types. For each topic it displays saved finished/attempted counts, last finished question/date, and mean numeric score. Four skill summary cards show averages across available scored questions. Student page has matching topic cards. Unknown/older task labels are grouped under Other/legacy.

## Practice clock
Reading, Listening and Speaking/Writing task pages include an optional countdown with start/pause/reset, audible start and last-ten-seconds warning and a time-up beep. This is a practice-only clock: its per-task defaults are illustrative, not certified official PTE timings. It does NOT automatically submit answers or interrupt microphone recordings, to avoid accidental loss of work. Browser audio requires user interaction. Existing built-in page timers remain available.

## Limitations
Scores are saved practice estimates, not Pearson scores. Some task types use 0–100 while others use 0–90; their averages are raw and not directly comparable. Unscored or missing records are excluded. Only saved QuestionProgress records can be summarized; untracked tasks cannot be reconstructed. Existing questions with no stable task labels may show as Other/legacy. Test with two sample students before production. No Sheet migration is needed if Update 16 setup was already run.
