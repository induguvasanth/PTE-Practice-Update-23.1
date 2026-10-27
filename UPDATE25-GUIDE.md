# Update 25 — Speaking/Writing UI and feedback

- Score heading wraps cleanly above numeric score.
- Timer card has Show timer / Hide timer control. Hiding it does not pause the timer.
- Read Aloud and Repeat Sentence transcript shows potential missing/extra words after recording (recognition can make mistakes).
- Summarize Written Text and Essay: review of the exact submitted text, highlighting repeated words, repeated spaces, and lowercase sentence starts where detected. Basic punctuation/form warnings are listed. Native browser spelling underlines remain available while editing.
- Writing result hides Speaking-only fluency and pronunciation traits and shows content-coverage indicator where reference material exists.
- Pronunciation remains unscored. Acoustic pause and pace analysis alone cannot produce a defensible pronunciation score. Do not label the combined practice score as official PTE.

## Install
Upload `PTE-Practice-Update2-main/speaking.html` to GitHub Pages and hard refresh. Other project files are preserved. No Apps Script deployment is needed.

## Limitations
No grammar API, phoneme model or full automated writing grammar correction is included. The writing checker detects basic form/mechanical issues only. Live browser microphone behavior was not tested in this environment.
