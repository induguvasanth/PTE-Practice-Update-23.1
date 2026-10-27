# Optional free local AI writing coach

Requires Python 3.10+. Run `python server.py`. Optionally install Ollama and download `gemma3:1b` (`ollama pull gemma3:1b`). The API is localhost-only and accepts POST `/evaluate` JSON `{ "task": "essay", "text": "..." }`.

This optional service is a *developer integration starting point*, not connected automatically to GitHub Pages. To test in browser, host the website locally on `http://localhost:8000` (e.g. `python -m http.server 8000`). The service allows that origin only. A publicly hosted student website cannot reach the computer-center localhost server; a production integration requires a secure authenticated HTTPS backend and consent/privacy controls. No microphone upload, pronunciation engine, or Whisper service is included in this local service.

Small local language models may provide inaccurate feedback. Do not interpret their output as official PTE scoring.
