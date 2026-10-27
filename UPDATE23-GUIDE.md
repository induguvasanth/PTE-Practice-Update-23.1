# Update 23 — Student filter fix and password flexibility

1. Replace `Google-Apps-Script/Teacher.html` and `Code.gs` in Apps Script.
2. Save, Deploy > Manage deployments > Edit > New version > Deploy.
3. Upload the updated `PTE-Practice-Update2-main/speaking.html` to GitHub Pages and hard refresh.
4. Open teacher dashboard: the topic-level student dropdown now populates on initial load and refresh.

Student passwords accept 1–200 characters, but use 8+ characters for security. Passwords remain hashed, not plaintext.

Speaking now displays 'Practice content score' rather than 'Transcript match / not pronunciation score'. This does NOT turn transcript recognition into an acoustic pronunciation score or a Pearson-equivalent result. Unmeasured pronunciation/fluency cannot be accurately combined into a full PTE score. The teacher averages only available scored records; they are not official PTE scores.
