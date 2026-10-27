# Update 19 — Teacher Dashboard Topic Filters and Student Drill-down

Only `Google-Apps-Script/Teacher.html` changed from Update 18. Other files are retained.

## New features
- Skill dropdown (Speaking, Writing, Reading, Listening)
- Topic dropdown filtered by skill
- Completed / not-yet-finished topic filter
- Topic or student search
- Summary of displayed topics, active topics, completed questions, students who completed
- Expand each topic to see students, finished counts, attempted counts, average practice scores, and last completed question
- Topics ordered to match the PTE module navigation (Speaking, Writing, Reading, Listening)
- Existing teacher account management, Google Sheets/GitHub links, and results remain.

## Installation
Replace Apps Script HTML file `Teacher` with `Google-Apps-Script/Teacher.html`, save, then Deploy > Manage deployments > Edit > New version > Deploy. No sheet setup or GitHub upload is needed for this teacher-only change.

## Notes
- Averages are from saved numeric practice scores, not official PTE scores.
- Progress bars show finished / (finished + attempted) recorded questions; this is not the percent of all available question bank items.
- Legacy records without a topic cannot be automatically assigned.
- Live Apps Script execution was not tested.
