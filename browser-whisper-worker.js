/* Runs only on the student's device. The model is downloaded from Hugging Face on first use. */
import { pipeline, env } from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.8.1';
env.allowLocalModels = false;
let transcriberPromise;
function load(id){
  if(!transcriberPromise){
    postMessage({id,type:'progress',message:'Downloading/loading free Whisper model (first use may take several minutes)…'});
    transcriberPromise=pipeline('automatic-speech-recognition','Xenova/whisper-tiny.en',{
      device:'wasm',dtype:'q8',progress_callback:p=>{
        if(p.status==='progress'&&Number.isFinite(p.progress))postMessage({id,type:'progress',message:'Loading Whisper model: '+Math.round(p.progress)+'%'});
      }
    }).catch(e=>{transcriberPromise=null;throw e;});
  }
  return transcriberPromise;
}
self.onmessage=async ({data})=>{
  if(data.type!=='transcribe')return;
  const {id,samples}=data;
  try{
    const model=await load(id);
    postMessage({id,type:'progress',message:'Whisper is transcribing on this device…'});
    const result=await model(samples,{chunk_length_s:30,stride_length_s:5});
    postMessage({id,type:'result',text:String(result.text||'').trim()});
  }catch(e){postMessage({id,type:'error',message:e?.message||String(e)});}
};
