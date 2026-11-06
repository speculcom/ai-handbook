/** Keep curated copy in collection snapshots aligned without touching observations. */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {SERIES} from '../config.js';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const summaries=JSON.parse(fs.readFileSync(path.join(root,'summaries.en.json'),'utf8'));
function observations(value) {
 const copy=structuredClone(value);
 delete copy.summary;delete copy.summaryEn;
 for(const member of copy.members||[])for(const key of ['label','role','note'])delete member[key];
 return JSON.stringify(copy);
}
export function syncEditorial() {
 let changed=0;
 for(const config of SERIES) {
  const file=path.join(root,'data/series',config.code+'.json');if(!fs.existsSync(file))continue;
  const original=JSON.parse(fs.readFileSync(file,'utf8')),before=observations(original);
  const copy=structuredClone(original);copy.summary=config.summary;
  copy.summaryEn=summaries[config.code]||copy.summaryEn||'';
  for(const member of copy.members||[]) {
   const definition=config.members.find(m=>m.repo===member.repo);if(!definition)continue;
   for(const key of ['label','role','note'])if(Object.hasOwn(definition,key))member[key]=structuredClone(definition[key]);
  }
  if(observations(copy)!==before)throw new Error(config.code+': editorial sync changed collected observations');
  if(JSON.stringify(copy)!==JSON.stringify(original)) {
   fs.writeFileSync(file,JSON.stringify(copy,null,1)+'\n','utf8');changed++;
  }
 }
 return changed;
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))console.log(`Editorial metadata synced in ${syncEditorial()} snapshots; observations unchanged.`);
