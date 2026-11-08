/* 截图与沙箱嵌入的执行器：只有拿到许可依据才允许登记。
 * 用法：node _data/handbook/frontier/demos/scripts/capture.mjs --id <entryId> --basis "<许可依据原文+URL>" [--embed <官方 demo URL>]
 * 行为：打开原址截图存 shots/<id>.png，算 sha256 写 ledger.json；--embed 时登记 sandbox="allow-scripts"。
 * 拒绝条件：basis 为空、entry 不存在、原址打不开。截图只作展示，不镜像代码。
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { createRequire } from 'node:module';

const ROOT = path.resolve(import.meta.dirname, '..', '..', '..', '..', '..');
const require = createRequire(path.join(ROOT, '_toolchain/package.json'));
const { chromium } = require('playwright');

const args = process.argv.slice(2);
const get = (k) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : null; };
const id = get('--id');
const basis = get('--basis');
const embedUrl = get('--embed');
if (!id || !basis) { console.error('必须给 --id 与 --basis（许可依据原文+URL）；缺依据不截图不嵌入。'); process.exit(2); }

const SRC = path.join(ROOT, '_data/handbook/frontier/demos');
const entries = JSON.parse(fs.readFileSync(path.join(SRC, 'entries.json'), 'utf8'));
const e = entries.find((x) => x.id === id);
if (!e) { console.error(`entries.json 里没有 ${id}`); process.exit(2); }

const ledger = JSON.parse(fs.readFileSync(path.join(SRC, 'ledger.json'), 'utf8'));
ledger.shots ||= []; ledger.embeds ||= [];
const today = new Date().toISOString().slice(0, 10);
const sha = (b) => crypto.createHash('sha256').update(b).digest('hex');

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
try {
  const resp = await page.goto(e.url, { timeout: 30000, waitUntil: 'domcontentloaded' });
  if (!resp || resp.status() !== 200) { console.error(`原址 ${e.url} 返回 ${resp && resp.status()}，不截图`); process.exit(2); }
  await page.waitForTimeout(1500);
  // 空屏/加载中的截图会误导读者：必须等到真实内容渲染出来（Gradio 在 shadow root 里）。
  try {
    await page.waitForFunction(() => {
      const t = (document.body && document.body.innerText || '').trim();
      const g = document.querySelector('gradio-app');
      const s = g && g.shadowRoot ? (g.shadowRoot.textContent || '').trim() : '';
      return t.length > 120 || s.length > 120;
    }, { timeout: 25000 });
  } catch {
    console.error(`原址 ${e.url} 在 25s 内未渲染出可读内容（空屏/加载中），不截图不嵌入`);
    process.exit(2);
  }
  fs.mkdirSync(path.join(SRC, 'shots'), { recursive: true });
  const file = `${id}.png`;
  await page.screenshot({ path: path.join(SRC, 'shots', file) });
  const buf = fs.readFileSync(path.join(SRC, 'shots', file));
  ledger.shots = ledger.shots.filter((s) => s.entry !== id);
  ledger.shots.push({ entry: id, file, sha256: sha(buf), basis, checkedAt: today, sourceUrl: e.url });
  if (embedUrl) {
    ledger.embeds = ledger.embeds.filter((s) => s.entry !== id);
    ledger.embeds.push({ entry: id, url: embedUrl, sandbox: 'allow-scripts', basis, checkedAt: today });
  }
  fs.writeFileSync(path.join(SRC, 'ledger.json'), JSON.stringify(ledger, null, 2) + '\n');
  console.log(`已登记：${id} 截图 ${file}（${buf.length}B）${embedUrl ? ' + 沙箱嵌入' : ''} · 依据：${basis.slice(0, 60)}…`);
} finally {
  await browser.close();
}
