import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../samples');
const files=[];
function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true}).sort((a,b)=>a.name.localeCompare(b.name))){const p=path.join(dir,e.name);if(e.isDirectory())walk(p);else if(e.name!=='manifest.json'){const b=fs.readFileSync(p);files.push({path:path.relative(root,p).split(path.sep).join('/'),bytes:b.length,sha256:crypto.createHash('sha256').update(b).digest('hex')});}}}
walk(root);
fs.writeFileSync(path.join(root,'manifest.json'),JSON.stringify({schema:1,created:'2026-11-04',scope:'Fictional teaching inputs and designed references; no OCR, ASR or product evaluation. CC BY 4.0.',files},null,2)+'\n');
console.log(`Packaged ${files.length} teaching assets.`);
