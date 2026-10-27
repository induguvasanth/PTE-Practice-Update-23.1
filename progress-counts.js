(()=>{'use strict';
const CACHE='pte_all_question_counts_v32';
let data=null, error='';
try{data=JSON.parse(localStorage.getItem(CACHE)||'null')}catch(e){}
const aliases={
 'Personal Introduction':'personalIntroduction','Read Aloud':'readAloud','Repeat Sentence':'repeatSentence','Describe Image':'describeImage','Retell Lecture':'retellLecture','Answer Short Question':'answerShortQuestion','Summarize Group Discussion':'summarizeGroupDiscussion','Respond to a Situation':'respondSituation','Summarize Written Text':'summarizeWrittenText','Write Essay':'essay',
 'R&W Fill in the Blanks':'readingRWBlanks','Reorder Paragraph':'reorderParagraph'
};
const normalize=x=>String(x||'').toLowerCase().replace(/[^a-z0-9]/g,'');
function topicKey(section,topic){
 if(!topic)return '';
 const map=data?.labels||{};
 const candidates=[topic,aliases[topic]];
 for(const [key,label] of Object.entries(map))if(normalize(label)===normalize(topic))candidates.push(key);
 const keys=Object.keys(data?.topics||{}).filter(k=>k.startsWith(section+'|'));
 return candidates.find(v=>keys.includes(section+'|'+v))||keys.map(k=>k.split('|')[1]).find(v=>normalize(v)===normalize(topic))||topic;
}
function localCount(section,topic){
 // A loaded bank is reliable for that topic only; never mistake it for a whole section.
 const cat=window.PTEProgress?.getCatalog?.()||[];
 if(!section||!topic)return null;
 const unique=new Set(cat.filter(x=>x.module===section&&normalize(String(x.item||'').split(' / ')[0])===normalize(topic)).map(x=>x.item));
 return unique.size||null;
}
function counts(section,topic){
 if(topic){const key=topicKey(section,topic);const remote=data?.topics?.[section+'|'+key];return Number.isFinite(Number(remote))&&remote!==undefined?Number(remote):localCount(section,topic)}
 if(section)return data?.sections?.[section]??null;
 return data?.total??null;
}
function summary(section,topic){
 const sid=window.PTEAuth?.session()?.studentId||localStorage.getItem('pte_active_student_v4')||'';
 let rows=[];try{rows=JSON.parse(localStorage.getItem('pte_progress_v4')||'[]')}catch(e){}
 const seen=new Map();
 rows.filter(r=>sid&&r.studentId===sid&&r.finished).forEach(r=>{
  const t=String(r.item||'').split(' / ')[0];
  if(section&&r.module!==section)return;
  if(topic&&normalize(t)!==normalize(topic)&&normalize(t)!==normalize(topicKey(section,topic)))return;
  const k=r.module+'|'+r.item;
  const old=seen.get(k);if(!old||String(r.updatedAt||'')>String(old.updatedAt||''))seen.set(k,r);
 });
 const records=[...seen.values()];
 const scores=records.map(r=>r.score).filter(v=>v!==null&&v!==undefined&&v!=='').map(Number).filter(v=>Number.isFinite(v)&&v>=0&&v<=100);
 const total=counts(section,topic);
 return {done:records.length,total,avg:scores.length?(scores.reduce((a,b)=>a+b,0)/scores.length).toFixed(1)+'%':'—',error};
}
function notify(){window.dispatchEvent(new Event('pte:counts-updated'));window.PTEProgress?.refresh?.()}
function fetchCounts(){
 const api=window.API_URL||document.querySelector('script:not([src])')?.textContent?.match(/const API_URL\s*=\s*['"]([^'"]+)/)?.[1];
 if(!api){error='API URL not configured';notify();return}
 const cb='pte_counts_'+Date.now(),sc=document.createElement('script');
 let done=false;
 const finish=(msg,result)=>{if(done)return;done=true;clearTimeout(timer);delete window[cb];sc.remove();error=msg||'';
  if(result?.ok&&result.topics&&result.sections&&Number.isFinite(Number(result.total))){data=result;try{localStorage.setItem(CACHE,JSON.stringify(data))}catch(e){}}
  notify();};
 const timer=setTimeout(()=>finish('Question-count API timed out. Redeploy Code.gs (new version).'),25000);
 window[cb]=result=>finish(result?.ok?'':String(result?.error||'Question-count API returned an error'),result);
 sc.onerror=()=>finish('Question-count API could not be loaded. Check Apps Script deployment.');
 sc.src=api+'?action=progresscounts&callback='+encodeURIComponent(cb)+'&t='+Date.now();document.head.append(sc);
}
window.PTECounts={counts,summary,refresh:fetchCounts,status:()=>({loaded:!!data,error})};
window.addEventListener('load',fetchCounts);
})();
