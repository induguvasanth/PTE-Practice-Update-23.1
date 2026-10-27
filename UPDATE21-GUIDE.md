# Update 21 — Free scoring improvements (safe first stage)

## Implemented
- Fixed Write from Dictation to compare words in their correct order using sequence alignment rather than a word bag.
- Returns matched, missing and extra word details in the scoring object, usable by the practice UI.
- Preserves other existing deterministic task scores, student progress, and teacher dashboards.

## Free services for the next stage
- LanguageTool is open source and can be self-hosted for grammar/spelling suggestions. Its public endpoint explicitly disallows automated requests; do not connect classroom traffic to that endpoint.
- whisper.cpp is an offline speech-to-text engine. Transcript accuracy is not a pronunciation or fluency score.
- No free tool can guarantee official Pearson PTE scoring. Writing content and pronunciation still require validated assessment.

## Installation
Replace `task-scoring.js` on GitHub Pages, then hard refresh. No Apps Script redeployment or setup is needed for this scoring-only fix.

## Limitations
The old free-evaluator.js still produces writing and speaking diagnostics, not official scores. Existing saved scores are not recalculated. The task UI may not yet display every alignment diagnostic, but it is available from `PTETaskScoring.grade(...).feedback`.
