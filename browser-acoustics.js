/* Update 24: entirely local microphone acoustic timing; no uploads, keys, or paid API. */
(function(){'use strict';
let ctx,stream,displayStream,source,analyser,handle,started,frames=[],last=null,recorder=null,chunks=[],audioBlob=null,stopPromise=Promise.resolve(),peak=0,wavNode=null,wavSamples=[],wavRate=0;
const clamp=(x,a,b)=>Math.min(b,Math.max(a,x));
async function start(mode='mic'){
  await stop();frames=[];last=null;audioBlob=null;chunks=[];peak=0;wavSamples=[];wavRate=0;
  if(!navigator.mediaDevices?.getUserMedia)throw new Error('Secure HTTPS microphone access required');
  const micConstraints={audio:{echoCancellation:{ideal:true},noiseSuppression:{ideal:true},autoGainControl:{ideal:true},channelCount:{ideal:1}}};
  if(mode==='system'||mode==='both'){
    if(!navigator.mediaDevices.getDisplayMedia)throw new Error('Tab/system audio capture is not supported in this browser. Select Microphone.');
    displayStream=await navigator.mediaDevices.getDisplayMedia({video:true,audio:true});
    if(!displayStream.getAudioTracks().length){displayStream.getTracks().forEach(t=>t.stop());displayStream=null;throw new Error('The selected screen has no shared audio. Enable Share tab audio, or select Microphone.');}
  }
  try{if(mode!=='system')stream=await navigator.mediaDevices.getUserMedia(micConstraints)}catch(e){if(displayStream)displayStream.getTracks().forEach(t=>t.stop());displayStream=null;throw e}
  ctx=new (window.AudioContext||window.webkitAudioContext)();
  if(ctx.state==='suspended')await ctx.resume();
  const mix=ctx.createMediaStreamDestination();
  if(stream)ctx.createMediaStreamSource(stream).connect(mix);
  if(displayStream)ctx.createMediaStreamSource(displayStream).connect(mix);
  // Do not route microphone or shared audio to speakers: that creates feedback/echo.
  stream= new MediaStream([...(stream?stream.getAudioTracks():[])]);
  const mixed=mix.stream;
  // Record the mixed stream, not the raw mic, so the selected audio source is respected.
  const captureStream=mixed;
  if(window.MediaRecorder){try{const supported=['audio/webm;codecs=opus','audio/mp4','audio/webm','audio/ogg;codecs=opus'].find(t=>MediaRecorder.isTypeSupported?.(t));
    recorder=new MediaRecorder(captureStream,supported?{mimeType:supported}:undefined);recorder.ondataavailable=e=>{if(e.data.size)chunks.push(e.data)};recorder.start(1000)}catch(e){console.warn("Audio recorder unavailable",e);recorder=null}}
  source=ctx.createMediaStreamSource(captureStream);
  if(!recorder && ctx.createScriptProcessor){
    wavRate=ctx.sampleRate;wavNode=ctx.createScriptProcessor(4096,1,1);
    wavNode.onaudioprocess=e=>wavSamples.push(new Float32Array(e.inputBuffer.getChannelData(0)));
    source.connect(wavNode);const silent=ctx.createGain();silent.gain.value=0;wavNode.connect(silent);silent.connect(ctx.destination);
  }
  analyser=ctx.createAnalyser();analyser.fftSize=2048;
  source.connect(analyser);const samples=new Float32Array(analyser.fftSize);started=performance.now();
  handle=setInterval(()=>{if(!analyser)return;analyser.getFloatTimeDomainData(samples);let power=0;
    for(let i=0;i<samples.length;i++)power+=samples[i]*samples[i];
    peak=Math.sqrt(power/samples.length);frames.push({time:(performance.now()-started)/1000,rms:peak});
  },50);
}
async function stop(){
  const activeRecorder=recorder;
  if(activeRecorder&&activeRecorder.state!=="inactive"){
    stopPromise=new Promise(resolve=>{
      const finish=()=>{audioBlob=chunks.length?new Blob(chunks,{type:activeRecorder.mimeType||chunks[0]?.type||'audio/mp4'}):null;resolve()};
      activeRecorder.addEventListener('stop',finish,{once:true});
      try{activeRecorder.stop()}catch(e){resolve()}
    });
  }
  recorder=null;
  if(handle){clearInterval(handle);handle=null}
  if(frames.length)last=frames.slice();
  if(source)try{source.disconnect()}catch(e){}source=null;analyser=null;
  if(wavNode){try{wavNode.disconnect()}catch(e){}wavNode=null}
  if(stream)stream.getTracks().forEach(t=>t.stop());stream=null;
  if(displayStream)displayStream.getTracks().forEach(t=>t.stop());displayStream=null;
  if(ctx)ctx.close().catch(()=>{});ctx=null;
  await stopPromise;
  if(!audioBlob && wavSamples.length && wavRate){
    const total=wavSamples.reduce((n,a)=>n+a.length,0),out=new ArrayBuffer(44+total*2),view=new DataView(out);
    const put=(offset,value)=>{for(let i=0;i<value.length;i++)view.setUint8(offset+i,value.charCodeAt(i))};
    put(0,'RIFF');view.setUint32(4,36+total*2,true);put(8,'WAVE');put(12,'fmt ');view.setUint32(16,16,true);view.setUint16(20,1,true);view.setUint16(22,1,true);view.setUint32(24,wavRate,true);view.setUint32(28,wavRate*2,true);view.setUint16(32,2,true);view.setUint16(34,16,true);put(36,'data');view.setUint32(40,total*2,true);
    let i=44;for(const chunk of wavSamples)for(const value of chunk){const x=Math.max(-1,Math.min(1,value));view.setInt16(i,x<0?x*32768:x*32767,true);i+=2}
    audioBlob=new Blob([out],{type:'audio/wav'});
  }
  wavSamples=[];
}
function result(words){const f=last||frames;if(f.length<12)return null;
  const levels=f.map(x=>x.rms).sort((a,b)=>a-b),noise=levels[Math.floor(levels.length*.15)]||0;
  const threshold=Math.max(.008,noise*2.8);const voiced=f.map(x=>x.rms>threshold);
  const speechFrames=voiced.filter(Boolean).length;
  if(speechFrames<8)return null;
  let first=voiced.indexOf(true),end=voiced.lastIndexOf(true),longPauses=0,pauseFrames=0,run=0;
  for(let i=first;i<=end;i++){if(!voiced[i])run++;else {if(run>=8){longPauses++;pauseFrames+=run}run=0}}
  if(run>=8){longPauses++;pauseFrames+=run}
  const speechSeconds=Math.round(speechFrames*.05*10)/10;
  const duration=Math.max(.1,(end-first+1)*.05);
  const wpm=Math.round((Number(words)||0)*60/duration);
  const articulation=Math.round((Number(words)||0)*60/Math.max(.1,speechSeconds));
  const pauseFraction=pauseFrames/Math.max(1,end-first+1);
  // Heuristic fluency score, not official PTE. Penalizes lengthy pauses and very fast/slow speech.
  const pacePenalty=Math.min(30,Math.abs(wpm-135)*.24);
  const pausePenalty=Math.min(28,pauseFraction*65+Math.max(0,longPauses-1)*2);
  const fluencyScore=Math.round(clamp(85-pacePenalty-pausePenalty,10,90));
  return {fluencyScore,speechSeconds,longPauses,wordsPerMinute:wpm,articulationRate:articulation,pauseFraction:Math.round(pauseFraction*100),method:'local-rms-voice-activity-heuristic',pronunciationScore:null};
}
window.PTEBrowserAcoustics={start,stop,result,getAudio:()=>audioBlob,getLevel:()=>peak};
})();
