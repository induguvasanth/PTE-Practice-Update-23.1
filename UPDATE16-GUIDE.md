# Update 16 — Teacher Student Management

## Installation
1. Replace Apps Script Code.gs and Teacher.html with the files in Google-Apps-Script. Keep Bridge.html from this package.
2. Deploy > Manage deployments > Edit > New version > Deploy.
3. Replace the GitHub Pages website files with the included website folder if not already using Update 15.
4. Open /exec?teacher=1, sign in using PTE_ADMIN_KEY Script Property.
5. Add student ID, name and password (8+ characters). Password is stored as a salted, peppered hash in Students sheet, not plaintext.
6. Students choose their name on the GitHub website and sign in to view their individual progress.
7. Teacher can edit names, reset passwords, clear progress, remove students, and optionally purge their progress.

**Caution:** Clearing/deleting progress is irreversible. Removing a student without purging leaves historical progress records in the sheet. Student sessions expire after 30 days or when password changes. Google Apps Script cross-origin iframe communication is browser-dependent; Update 15 handshake is retained, not independently verified live.

Security: Public directory exposes student names and IDs; avoid sensitive names/data. Backend uses salted SHA-256 plus secret pepper, not a memory-hard password hash; login rate limiting is not implemented.
