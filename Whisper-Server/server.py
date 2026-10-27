import os, tempfile
from pathlib import Path
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from faster_whisper import WhisperModel

origins = [x.strip() for x in os.getenv('ALLOWED_ORIGINS','').split(',') if x.strip()]
if not origins: raise RuntimeError('Set ALLOWED_ORIGINS to your website origin, e.g. https://example.com')
app=FastAPI(title='PTE Whisper Transcription')
app.add_middleware(CORSMiddleware,allow_origins=origins,allow_methods=['POST','GET'],allow_headers=['Content-Type'])
model=WhisperModel(os.getenv('WHISPER_MODEL','base.en'),device=os.getenv('WHISPER_DEVICE','cpu'),compute_type=os.getenv('WHISPER_COMPUTE_TYPE','int8'))
@app.get('/health')
def health():return {'status':'ok'}
@app.post('/transcribe')
async def transcribe(file:UploadFile=File(...)):
    suffix=Path(file.filename or 'audio.webm').suffix.lower()
    if suffix not in ('.webm','.mp4','.m4a','.wav','.ogg','.mp3'):raise HTTPException(400,'Unsupported audio format')
    with tempfile.NamedTemporaryFile(suffix=suffix,delete=False) as f:
        path=f.name; size=0
        try:
            while chunk:=await file.read(1024*1024):
                size+=len(chunk)
                if size>20*1024*1024:raise HTTPException(413,'Audio exceeds 20 MB')
                f.write(chunk)
        except:
            Path(path).unlink(missing_ok=True);raise
    try:
        segments,_=model.transcribe(path,language='en',vad_filter=True,beam_size=5)
        return {'text':' '.join(segment.text.strip() for segment in segments).strip()}
    except Exception as e:
        raise HTTPException(500,'Transcription failed; inspect server logs') from e
    finally:Path(path).unlink(missing_ok=True)
