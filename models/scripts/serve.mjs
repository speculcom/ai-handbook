// 本地预览服务：模拟 GitHub Pages 的行为（含 /foo/ → /foo.html 映射）
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// SITE 必须先 normalize：Windows 下 path.join 产出反斜杠，而字面量可能是正斜杠，
// 不统一就会让下面的 startsWith 越界校验永远失败（全部 403）。
const SITE = path.normalize(path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'site'));
const PORT = Number(process.argv[2] || 8811);
const MIME = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8', '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon',
};

http.createServer((req, res) => {
  const rel = decodeURIComponent(req.url.split('?')[0]);
  // path.normalize 后再校验，否则 Windows 反斜杠会让 startsWith 全部失败
  const clean = rel.replace(/\/+$/, '');          // 去掉尾斜杠：否则 p+'.html' 会变成 "gemma-4/.html"
  let p = path.normalize(path.join(SITE, clean));
  if (!p.startsWith(SITE)) { res.writeHead(403); return res.end('403'); }

  const tryPaths = [p];
  if (!path.extname(p)) tryPaths.push(p + '.html');   // GitHub Pages 的 /foo → /foo.html
  if (rel === '/' || rel.endsWith('/')) tryPaths.push(path.join(p, 'index.html'));

  for (const t of tryPaths) {
    if (fs.existsSync(t) && fs.statSync(t).isFile()) {
      res.writeHead(200, { 'Content-Type': MIME[path.extname(t)] || 'application/octet-stream' });
      return fs.createReadStream(t).pipe(res);
    }
  }
  res.writeHead(404); res.end('404 ' + rel);
}).listen(PORT, () => console.log(`models 站预览：http://127.0.0.1:${PORT}/`));
