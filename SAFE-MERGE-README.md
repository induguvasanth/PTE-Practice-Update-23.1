# Safe preservation package — Update 27

Update 27 is the base. All 50 original ZIP entries are retained unchanged.

Added 6 pronunciation model assets from Update 24 because Update 27 pronunciation-evaluator.js references them, but they were absent.

The Update 24 question palette JavaScript is included in Optional-Update24-Reference/ for future integration. It is NOT loaded by the live application: this avoids overwriting Update 27 page logic or changing behavior without regression testing.

No existing HTML, JS, Apps Script, or Python file was overwritten or edited.

Deployment: upload the complete PTE-Practice-Update2-main folder, including pronunciation-assets, rather than copying individual files. Deploy Google-Apps-Script separately according to its guide.

Still requires live browser testing, multi-student QuestionProgress testing, and backend verification. No claim of full functional testing is made.
