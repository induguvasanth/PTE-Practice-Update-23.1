# Update 11 — Selected Text Telugu Meaning and Speech

## Included
- Select up to 500 characters of ordinary page text to show a Telugu translation popup.
- Press **Listen** to hear the selected English text using the browser's speech-synthesis voices.
- Press **Stop** to stop audio.
- Click or tap anywhere outside the popup, scroll, or press Escape to close and stop speech.
- Supported on all 8 website HTML pages. Existing Update 10 scoring, Code.gs, spreadsheet and Apps Script URLs remain untouched.

## Deploy
Upload the updated website folder (including `selection-helper.js`) to GitHub Pages.
**No changes to Google Apps Script or Google Sheets are required for this feature.**

## Important limits
- Translations use the free public MyMemory API (`api.mymemory.translated.net`); selected text is transmitted to that third party. Do not select private or sensitive text. Service limits, downtime, CORS, and translation errors can affect availability.
- The audio uses Web Speech API voices installed in the browser/operating system; natural/human-like quality is device dependent. No paid neural voice or cloud TTS is included.
- Native selection in input boxes, textareas, and editable fields is intentionally excluded so typing and answer entry are not disturbed.
- Test on your GitHub Pages deployment in Chrome/Edge on desktop and mobile. Not a guarantee of browser-wide support.
