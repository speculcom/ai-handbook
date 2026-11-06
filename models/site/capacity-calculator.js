/* Browser-only assumption arithmetic. No hardware detection, model call or storage. */
(()=>{'use strict';
 const host=document.getElementById('capacity-workbench');if(!host)return;
 const ids=['budget','weights','overhead','layers','heads','dim','tokens','concurrent','bytes'];
 const integers=new Set(['layers','heads','dim','tokens','concurrent','bytes']);
 const get=id=>document.getElementById('capacity-'+id);
 const tr=(a,b)=>document.documentElement.lang.startsWith('en')?b:a;
 const fmt=n=>Number(n.toFixed(6)).toLocaleString('en-US',{maximumFractionDigits:6});
 function calculate(){
  if(get('architecture').value!=='standard')return{status:'scope'};
  const values={};for(const id of ids){const raw=get(id).value;if(raw.trim()==='')return{status:'missing'};const n=Number(raw);if(!Number.isFinite(n)||n<0||(integers.has(id)&&(!Number.isSafeInteger(n)||n<1))||((id==='budget')&&n===0))return{status:'invalid'};values[id]=n;}
  if(![1,2,4].includes(values.bytes))return{status:'invalid'};
  const kvBytes=2*values.layers*values.heads*values.dim*values.bytes*values.tokens*values.concurrent;
  if(!Number.isSafeInteger(kvBytes))return{status:'invalid'};
  const kvGiB=kvBytes/1073741824,totalGiB=values.weights+kvGiB+values.overhead,remainingGiB=values.budget-totalGiB;
  if(!Number.isFinite(totalGiB))return{status:'invalid'};
  return{status:'calculated',architecture:'standard full-attention MHA/GQA with identical layers',values,kvBytes,kvGiB,totalGiB,remainingGiB};
 }
 function render(){
  const r=calculate();const messages={scope:tr('适用架构未确认，不能据此计算；MLA、混合与滑动窗口等需另算。','Architecture unconfirmed or outside scope; MLA, hybrid and sliding-window caches require separate calculations.'),missing:tr('请填完各项；未填不按 0 处理。','Complete all fields; missing inputs are not zero.'),invalid:tr('请检查非负数、正整数、可用内存与数值范围。','Check nonnegative values, positive integers, available memory and numeric range.')};
  get('result').textContent=r.status==='calculated'?tr('假设下的估算：','Under these assumptions: ')+`KV ${fmt(r.kvGiB)} GiB; `+tr('合计 ','total ')+fmt(r.totalGiB)+' GiB; '+tr('剩余 ','remaining ')+fmt(r.remainingGiB)+' GiB. '+(r.remainingGiB<0?tr('超出预算；检查上下文、并发、驻留和预留。','Over budget; review context, concurrency, residency and reserve.'):tr('算式低于预算，不证明可加载、可运行或达到某个速度。','Below budget in this formula; loading, execution and speed are not established.')):messages[r.status];
  const raw=get('file-gb').value,n=Number(raw);get('unit-result').textContent=raw.trim()===''?'1 GB = 1,000,000,000 bytes; 1 GiB = 1,073,741,824 bytes.':Number.isFinite(n)&&n>=0?`${fmt(n)} GB = ${fmt(n*1e9/1073741824)} GiB. `+tr('仅换算文件单位，不代表驻留权重。','File-unit conversion only; not resident-weight memory.'):tr('请输入非负 GB。','Enter nonnegative GB.');
 }
 host.addEventListener('input',render);host.addEventListener('change',render);
 get('example').addEventListener('click',()=>{const example={budget:10,weights:6,overhead:1,layers:32,heads:8,dim:128,tokens:4096,concurrent:4,bytes:2};get('architecture').value='standard';for(const[id,v]of Object.entries(example))get(id).value=v;render();});
 get('reset').addEventListener('click',()=>{for(const id of [...ids,'file-gb'])get(id).value='';get('architecture').value='unknown';render();get('architecture').focus();});
 get('export').addEventListener('click',()=>{const payload={schema:1,scope:'Simplified standard MHA/GQA KV-memory assumption worksheet, not hardware detection, model execution or performance evidence.',formula:'2*layers*kvHeads*headDim*bytesPerElement*totalCachedTokens*independentRequests / 2^30',raw:Object.fromEntries([...ids,'architecture','file-gb'].map(id=>[id,get(id).value])),result:calculate(),limits:['No cache sharing','Identical standard full-attention layers','Resident weights and overhead supplied by user','Not MLA, hybrid, sliding-window or multimodal encoder estimate','Below budget is not execution validation']};const url=URL.createObjectURL(new Blob([JSON.stringify(payload,null,2)+'\n'],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='specul-capacity-assumptions.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
 new MutationObserver(render).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});render();
})();
