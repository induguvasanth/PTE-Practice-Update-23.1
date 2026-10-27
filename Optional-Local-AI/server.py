"""Optional LOCAL-ONLY PTE writing feedback API. Python 3.10+. No paid API.
Start: python server.py. Ollama is optional: ollama pull gemma3:1b
Only accepts localhost requests; do not expose to the public internet.
"""
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.request import Request, urlopen
from urllib.error import URLError
import json, re

HOST, PORT = '127.0.0.1', 8765

def analyze(text, task):
    words = re.findall(r"[A-Za-z]+(?:'[A-Za-z]+)?", text)
    summary = task == 'summarizeWrittenText'
    minimum, maximum = (5, 75) if summary else (200, 300)
    problems = []
    if not minimum <= len(words) <= maximum:
        problems.append(f'Word count {len(words)}; practice target {minimum}–{maximum}.')
    if summary and len(re.findall(r'[.!?]+(?=\s|$)', text)) > 1:
        problems.append('Try writing a single sentence for Summarize Written Text.')
    if not re.search(r'[.!?]\s*$', text):
        problems.append('Check ending punctuation.')
    return {'ok': True, 'wordCount': len(words), 'issues': problems,
            'score': None, 'note': 'Practice feedback only, not an official PTE score.'}

def ollama_feedback(text, task):
    prompt = ('You are a cautious PTE practice writing coach. Identify concrete grammar, '
              'spelling, clarity and coherence issues with quoted examples. Give actionable '
              'feedback in concise English and simple Telugu. Do not invent an official PTE score. '
              'Return plain text. Task: ' + task + '\nStudent response:\n' + text[:6000])
    payload = json.dumps({'model':'gemma3:1b','prompt':prompt,'stream':False}).encode()
    req = Request('http://127.0.0.1:11434/api/generate', data=payload,
                  headers={'Content-Type':'application/json'})
    with urlopen(req, timeout=120) as res:
        return json.load(res).get('response','')

class Handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(204); self._headers(); self.end_headers()
    def _headers(self):
        self.send_header('Content-Type','application/json; charset=utf-8')
        self.send_header('Access-Control-Allow-Origin','http://localhost:8000')
        self.send_header('Access-Control-Allow-Methods','POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers','Content-Type')
    def do_POST(self):
        if self.path != '/evaluate': self.send_error(404); return
        try:
            length=int(self.headers.get('Content-Length','0'))
            if not 0 < length <= 15000: raise ValueError('Invalid request size')
            data=json.loads(self.rfile.read(length))
            text=str(data.get('text','')).strip(); task=str(data.get('task','essay'))[:80]
            if not text: raise ValueError('Empty response')
            result=analyze(text,task)
            try: result['aiFeedback']=ollama_feedback(text,task);result['aiAvailable']=True
            except (URLError, TimeoutError, ValueError, OSError) as e:
                result['aiAvailable']=False;result['aiMessage']='Ollama unavailable: '+str(e)[:180]
            self.send_response(200)
        except (ValueError, TypeError, json.JSONDecodeError) as e:
            result={'ok':False,'error':str(e)};self.send_response(400)
        self._headers();self.end_headers();self.wfile.write(json.dumps(result,ensure_ascii=False).encode())

if __name__=='__main__':
    print(f'Local PTE AI coach: http://{HOST}:{PORT}/evaluate')
    ThreadingHTTPServer((HOST,PORT),Handler).serve_forever()
