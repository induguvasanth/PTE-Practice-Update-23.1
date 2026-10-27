(()=>{'use strict';
const KEY='pte_students_v4',ACTIVE='pte_active_student_v4',RECORDS='pte_progress_v4',CATALOG='pte_question_catalog_v6';
const read=(k,f)=>{try{return JSON.parse(localStorage.getItem(k))??f}catch{return f}};
const getStudents=()=>read(KEY,[]),getRecords=()=>read(RECORDS,[]),active=()=>localStorage.getItem(ACTIVE)||'';
const safe=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const dateTime=v=>v?new Date(v).toLocaleString('en-IN',{dateStyle:'medium',timeStyle:'short'}):'—';
const modules={'index.html':'Home','reading.html':'Reading','listening.html':'Listening','speaking.html':'Speaking & Writing','grammar.html':'Grammar','vocabulary.html':'Vocabulary','full-mock.html':'Full Mock'};
const page=location.pathname.split('/').pop()||'index.html';
const style=document.createElement('style');
style.textContent=`#pteStudentBar{position:fixed;bottom:12px;left:12px;z-index:9000;display:flex;align-items:center;gap:7px;padding:6px 9px;background:rgba(255,255,255,.96);border:1px solid #dce3ef;border-radius:12px;box-shadow:0 8px 28px #10182818;font:12px system-ui;color:#334155}#pteStudentBar select{font:12px system-ui;border:0;background:transparent;color:#334155;max-width:160px;outline:none}#pteStudentBar .pte-learner-icon{font-size:14px}#pteStudentBar[hidden]{display:none!important}.pteCompletionStamp{font:600 12px system-ui;color:#078147;margin:6px 0}`;
document.head.appendChild(style);
const bar=document.createElement('div');bar.id='pteStudentBar';bar.setAttribute('aria-label','Current student');document.body.append(bar);
let context=null;
const catalog=()=>read(CATALOG,[]);
function register(c){if(!c||c.item==='Module')return;const all=catalog();if(!all.some(x=>x.module===c.module&&x.item===c.item)){all.push(c);localStorage.setItem(CATALOG,JSON.stringify(all))}}
function recordAttempt(){const s=window.PTEAuth?.session()?.studentId||'',c=currentItem();if(!s||c.item==='Module'||recordFor(s,c.module,c.item))return;const all=getRecords();all.push({studentId:s,...c,finished:false,score:null,completedAt:null,updatedAt:new Date().toISOString()});localStorage.setItem(RECORDS,JSON.stringify(all));window.dispatchEvent(new CustomEvent('pte:progress-changed'));refresh()}

function currentItem(){return context||{module:modules[page]||page,item:'Module',questionId:''}}
function registerBank(module,section,questions){
 if(!Array.isArray(questions)||!questions.length)return;
 const all=catalog();let changed=false;
 questions.forEach((q,index)=>{const item=String(section||'Practice')+' / Question '+(index+1);if(!all.some(x=>x.module===module&&x.item===item)){all.push({module,item,questionId:String(q?.id??q?.ID??index+1)});changed=true}});
 if(changed)localStorage.setItem(CATALOG,JSON.stringify(all));
}
function setContext(module,section,index,q,bank){if(bank)registerBank(module,section,bank);const id=String(q?.id??q?.ID??'').trim();const item=String(section||'Practice')+' / Question '+(Number(index)+1);const next={module,item,questionId:id||String(Number(index)+1)};if(!context||context.module!==next.module||context.item!==next.item||context.questionId!==next.questionId){context=next;register(next);window.PTEExamClock?.context(next);refresh()}}
function statusOf(s,c){const r=recordFor(s,c.module,c.item);return r?.finished?'Finished':r?'Attempted':'Not attempted'}
function recordFor(s,m,i){return getRecords().find(r=>r.studentId===s&&r.module===m&&r.item===i)}
function mark(done,score,meta){
 const studentId=window.PTEAuth?.session()?.studentId||'';if(!studentId){window.PTEAuth?.open();return false;}
 const c=meta?.context||currentItem();if(c.item==='Module')return false;
 const all=getRecords(),old=all.find(x=>x.studentId===studentId&&x.module===c.module&&x.item===c.item);
 const now=new Date().toISOString();
 const entry={...(old||{}),studentId,...c,finished:!!done,
   score:score??old?.score??null,completedAt:done?(old?.completedAt||now):null,updatedAt:now};
 const records=all.filter(x=>!(x.studentId===studentId&&x.module===c.module&&x.item===c.item));
 records.push(entry);localStorage.setItem(RECORDS,JSON.stringify(records));
 window.dispatchEvent(new CustomEvent('pte:progress-changed'));refresh();return true;
}

function summary(){
 const sid=window.PTEAuth?.session()?.studentId||active();if(!sid)return;
 const here=modules[page];if(!here||here==='Home'||here==='Full Mock')return;
 const current=currentItem();const topic=current.item==='Module'?null:current.item.split(' / ')[0];
 let panel=document.getElementById('pteProgressSummary');
 if(!panel){panel=document.createElement('section');panel.id='pteProgressSummary';
  const head=document.querySelector('.exam-head');
  if(head&&head.parentElement){head.insertAdjacentElement('afterend',panel)}
  else {const card=document.querySelector('.exam-card')||document.querySelector('main');if(!card)return;card.prepend(panel)}
 }
 panel.style.cssText='display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin:12px 0 15px;font:12px system-ui;color:#334155';
 const groups=[['Topic',here,topic],['Section',here,null]];
 panel.innerHTML=groups.map(([label,module,topicName])=>{
  const x=window.PTECounts?.summary(module,topicName);
  const total=x?.total;
  const count=total===null||total===undefined?'Loading…':x.done+' / '+total;
  const ratio=Number(total)>0?Math.min(100,100*x.done/total):0;
  const detail=label==='Topic'?(topicName||'Select a topic'):module;
  return '<div style="border:1px solid #e4e2f5;background:#fafaff;border-radius:13px;padding:10px 13px;min-width:0">'+
   '<div style="display:flex;justify-content:space-between;gap:6px;align-items:center"><b>'+safe(label)+' progress</b><span style="font-size:10px;color:#64748b">Avg '+safe(x?.avg||'—')+'</span></div>'+
   '<div style="font-size:10px;color:#64748b;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin:3px 0">'+safe(detail)+'</div>'+
   '<div style="font-size:18px;font-weight:800;color:#5633df">'+safe(count)+'</div>'+
   '<div style="height:5px;border-radius:8px;background:#e7e4f7;margin-top:6px;overflow:hidden"><div style="width:'+ratio+'%;height:100%;background:#6338ef"></div></div></div>';
 }).join('');
}
function refresh(){
 summary();
 const s=active(),c=currentItem(),r=recordFor(s,c.module,c.item);
 const headerStatus=document.querySelector('.exam-head .status');
 if(headerStatus){let badge=document.getElementById('pteCompletionStamp');if(!badge){badge=document.createElement('div');badge.id='pteCompletionStamp';badge.className='pteCompletionStamp';headerStatus.insertAdjacentElement('afterend',badge)}badge.textContent=r?.finished?'✓ Finished · '+dateTime(r.completedAt||r.updatedAt):''}
}
window.PTEProgress={refresh,mark,markAttempted:recordAttempt,
 markScore:(score,meta)=>mark(true,score,meta),setContext,registerBank,currentItem,getStudents,getRecords,getCatalog:catalog,active};refresh();
window.addEventListener('pte:progress-changed',()=>{if(page==='results.html'&&typeof draw==='function')draw()});

// Teacher-only results are served from Apps Script (?teacher=1), not public GitHub Pages.
})();
