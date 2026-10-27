/* Browser-only Whisper for mobile/tablet; desktop speech recognition remains unchanged. */
window.PTE_IS_MOBILE = /Android|iPhone|iPad|iPod|Mobile|Tablet/i.test(navigator.userAgent) || (navigator.maxTouchPoints > 1 && /Macintosh/i.test(navigator.userAgent));
window.PTEWhisper = (() => {
  let worker, pending = new Map(), sequence = 0;
  function getWorker(){
    if(worker)return worker;
    worker = new Worker(new URL('./browser-whisper-worker.js', document.baseURI), {type:'module'});
    worker.onmessage = ({data}) => {
      const p=pending.get(data.id);if(!p)return;
      if(data.type==='progress'){p.progress?.(data.message);return;}
      pending.delete(data.id);data.type==='result'?p.resolve(data.text):p.reject(new Error(data.message||'Whisper failed'));
    };
    worker.onerror=e=>{for(const p of pending.values())p.reject(new Error('Whisper worker failed: '+(e.message||'model could not load')));pending.clear();worker.terminate();worker=null;};
    return worker;
  }
  async function decode(blob){
    if(!(blob instanceof Blob)||!blob.size)throw new Error('No audio was recorded. Check microphone permissions.');
    const Context=window.AudioContext||window.webkitAudioContext;
    if(!Context)throw new Error('Audio decoding is unsupported in this browser.');
    const context=new Context();
    try{
      const decoded=await context.decodeAudioData(await blob.arrayBuffer());
      const rate=decoded.sampleRate, length=decoded.length, channels=decoded.numberOfChannels;
      const mono=new Float32Array(length);
      for(let c=0;c<channels;c++){const data=decoded.getChannelData(c);for(let i=0;i<length;i++)mono[i]+=data[i]/channels;}
      const outputLength=Math.round(length*16000/rate), output=new Float32Array(outputLength);
      for(let i=0;i<outputLength;i++){
        const pos=i*rate/16000, lo=Math.floor(pos), hi=Math.min(lo+1,length-1), frac=pos-lo;
        output[i]=mono[Math.min(lo,length-1)]*(1-frac)+mono[hi]*frac;
      }
      return output;
    }finally{await context.close().catch(()=>{});}
  }
  async function transcribe(blob, onProgress){
    onProgress?.('Preparing recorded audio…');
    const samples=await decode(blob);
    if(samples.length<1600)throw new Error('Recording is too short.');
    const id=++sequence;
    return new Promise((resolve,reject)=>{
      pending.set(id,{resolve,reject,progress:onProgress});
      try{getWorker().postMessage({id,type:'transcribe',samples},[samples.buffer]);}
      catch(e){pending.delete(id);reject(e);}
    });
  }
  return {transcribe};
})();
