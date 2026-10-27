# Update 31 — Correct global, section, topic progress totals

Counts are now fetched from ALL configured Google Sheets topic banks, not just previously visited topics. The dashboard shows all questions, finished questions and average score. Section shows sum of its topics; topic shows its own total. Unique finished records are scoped by student ID.

IMPORTANT: This release changes Google-Apps-Script/Code.gs. Update that file in your Apps Script project and deploy a NEW web-app version (same URL deployment), then upload website folder contents to GitHub Pages. Do not overwrite Sheets. Existing Hama pronunciation files are unchanged.

Full Mock is excluded from all-bank totals to avoid counting sampled questions twice. Local reading fallback questions can differ from server sheet totals until the sheet is updated. Vocabulary currently tracks progress by page in the existing UI; the topic count reflects vocabulary entries, so the completion count may undercount until page-level tracking is redesigned. Cross-device progress still depends on successful student cloud synchronization.
