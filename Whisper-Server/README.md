# Whisper setup (mobile/tablet)

Desktop continues to use browser Web Speech API. Mobile/tablet records audio and transcribes **after Stop**, not live. This needs an always-running server; static hosting and Google Apps Script alone cannot run Whisper.

## Server (Ubuntu VPS or PC with Python 3.10+)

```bash
cd Whisper-Server
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
export ALLOWED_ORIGINS=https://YOUR-WEBSITE-DOMAIN
export WHISPER_MODEL=base.en
uvicorn server:app --host 127.0.0.1 --port 8000
```

First start downloads model weights (internet required). `base.en` is a CPU-friendly default; `small.en` improves accuracy but uses more RAM/CPU. The server needs FFmpeg libraries supplied by faster-whisper/PyAV. Verify `http://127.0.0.1:8000/health`.

## HTTPS reverse proxy

Point `https://asr.yourdomain.com` to this server through an HTTPS reverse proxy (Caddy or Nginx + TLS). Example Caddyfile:

```
asr.yourdomain.com {
    reverse_proxy 127.0.0.1:8000
}
```

Set `window.PTE_WHISPER_URL = "https://asr.yourdomain.com";` in root `whisper-config.js`, and deploy updated HTML and JS files. Add the exact website origin to `ALLOWED_ORIGINS` (no trailing slash). Restart the backend after environment changes.

## Test

1. Open `https://asr.yourdomain.com/health`; expect `{"status":"ok"}`.
2. On Android Chrome or iOS Safari, open website directly over HTTPS, allow microphone, record speech, then press Stop.
3. Transcript appears after upload/inference; review status text for errors.
4. Test Speaking and Full Mock. Desktop behavior is unchanged.

## Production security

This starter is **not** production hardened: add authentication, rate limits, upload limits at proxy, monitoring, worker capacity and consent/privacy notice before public launch. Avoid wildcard CORS. Audio is temporarily saved then deleted; do not log user audio. Transcription is not instantaneous and depends on server speed and connectivity. No OpenAI API key or paid API is required; server hosting may cost money.
