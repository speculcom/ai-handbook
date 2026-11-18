/* 导入两套公开 HTML 合集：只保存标题、作者自述、链接与核验字段；
 * 不下载 HTML/截图/ prompt 全文。实际运行通过原始 GitHub Pages iframe。
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const ROOT = path.resolve(import.meta.dirname, '..', '..', '..', '..', '..');
const SRC = path.join(ROOT, '_data/handbook/frontier/demos');
const RAW = 'https://raw.githubusercontent.com';
const PAGES = 'https://miaai-lab.github.io';

const COLLECTIONS = [
  {
    id: 'gpt-6-2-sol',
    repo: 'MiaAI-Lab/GPT-6.2-Sol-100-HTML-Files',
    name: 'GPT-6.2 Sol',
    short: 'GPT 6.2 Sol',
    version: '100 HTML studies',
    page: 'GPT-6.2-Sol-100-HTML-Files',
  },
  {
    id: 'claude-fable-5-2',
    repo: 'MiaAI-Lab/Claude-Fable-5.2-HTML-Files',
    name: 'Claude Fable 5.2',
    short: 'Fable 5.2',
    version: '76 HTML studies',
    page: 'Claude-Fable-5.2-HTML-Files',
  },
];

const sha = (s) => crypto.createHash('sha1').update(s.replace(/\s+/g, ' ').trim()).digest('hex');
const clean = (s) => String(s || '').replace(/\r/g, '').replace(/\s+/g, ' ').trim();

function parsePrompt(text) {
  const out = {};
  const parts = String(text).replace(/\r/g, '').split(/\n(?=(?:TITLE|PROMPT|DESCRIPTION|VISUAL TECHNIQUES|INTERACTION MODEL)\s*\n)/);
  for (const part of parts) {
    const m = part.match(/^(TITLE|PROMPT|DESCRIPTION|VISUAL TECHNIQUES|INTERACTION MODEL)\s*\n([\s\S]*)$/);
    if (m) out[m[1]] = clean(m[2]);
  }
  return out;
}

function categoryFor(text, title) {
  const t = `${title} ${text}`.toLowerCase();
  if (/(game|play|toy|arcade|pinball|puzzle|board game|card game)/.test(t)) return '游戏';
  if (/(chart|map|atlas|data|diagram|timeline|dashboard|graph|visuali[sz]ation|infographic|weather station)/.test(t)) return '数据可视化';
  if (/(poster|zine|magazine|editorial|book|type|specimen|print|newspaper|cover|story|museum|archive|field guide|catalog)/.test(t)) return '内容与媒体';
  if (/(workflow|automation|generator|pipeline|editor|console|calculator|instrument|workbench|studio|keyboard|tool)/.test(t)) return '自动化';
  if (/(website|web app|landing|app|interface|portfolio|store|menu|shop|dashboard)/.test(t)) return 'Web 应用';
  return '模型演示';
}

async function fetchText(url) {
  const r = await fetch(url, { headers: { 'User-Agent': 'specul-demos-import' } });
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  return r.text();
}

async function runCollection(c) {
  const api = `https://api.github.com/repos/${c.repo}/contents`;
  const list = await (await fetch(api, { headers: { 'User-Agent': 'specul-demos-import' } })).json();
  if (!Array.isArray(list)) throw new Error(`${c.repo}: ${JSON.stringify(list).slice(0, 200)}`);
  const html = list.filter((x) => x.name.endsWith('.html') && /^\d{3}-[a-z0-9-]+\.html$/.test(x.name)).map((x) => x.name).sort();
  const works = html.map((h) => {
    const m = h.match(/^(\d{3})-([a-z0-9-]+)\.html$/);
    if (!m) throw new Error(`bad filename ${h}`);
    return { num: m[1], slug: m[2], html: h, txt: `${m[1]}-${m[2]}.txt`, thumb: `${m[1]}-${m[2]}.jpg` };
  });
  const out = [];
  for (let i = 0; i < works.length; i += 8) {
    const batch = works.slice(i, i + 8);
    const results = await Promise.all(batch.map(async (w) => {
      const promptText = await fetchText(`${RAW}/${c.repo}/main/${w.txt}`);
      const prompt = parsePrompt(promptText);
      const title = prompt.TITLE || w.slug;
      const desc = prompt.DESCRIPTION || '';
      const tech = prompt['VISUAL TECHNIQUES'] ? prompt['VISUAL TECHNIQUES'].split(/\s*·\s*|\n/).map(clean).filter(Boolean) : [];
      const interaction = prompt['INTERACTION MODEL'] || '';
      return {
        id: `${c.id}-${w.num}-${w.slug}`,
        collection: c.id,
        num: w.num,
        slug: w.slug,
        title: { zh: title, en: title },
        notes: {
          zh: `作者自述：${desc || '（原文无描述）'}`,
          en: desc || 'No description in the source.',
        },
        category: categoryFor(prompt.PROMPT || '', title),
        tags: tech.slice(0, 3),
        promptHash: sha(prompt.PROMPT || ''),
        promptUrl: `${RAW}/${c.repo}/main/${w.txt}`,
        sourceUrl: `${RAW}/${c.repo}/main/${w.html}`,
        demoUrl: `${PAGES}/${c.page}/${w.html}`,
        thumbUrl: `${RAW}/${c.repo}/main/thumbs/${w.thumb}`,
        repoUrl: `https://github.com/${c.repo}`,
        license: {
          spdx: null,
          kind: 'no-license-external-link',
          evidenceUrl: `https://github.com/${c.repo}`,
          checkedAt: '2026-11-18',
        },
        evidence: [{
          url: `https://github.com/${c.repo}`,
          quote: 'Public repository; root has no LICENSE/COPYING/NOTICE file and README does not grant reuse.',
          kind: 'repo-metadata',
        }],
        run: { status: 'external', env: 'GitHub Pages iframe', date: '2026-11-18' },
        maintenance: { lastCommit: null, lastSeen: '2026-11-18', checkedAt: '2026-11-18' },
        media: { shot: 'none', embed: 'none' },
        compare: {
          runtime: '静态 HTML，经原始 GitHub Pages 在站内 iframe 播放；未复制到本站。',
          hardware: '浏览器即可，无需后端。',
          commercial: '仓库未声明许可，不能复制或再分发；仅链回原发布页。',
          reproducibility: '可打开原始 HTML 与 prompt 文件；未做本地复现。',
          maintenance: '以原仓库为准。',
        },
        model: {
          name: c.name,
          version: c.version,
          releaseDate: '',
          releaseUrl: `https://github.com/${c.repo}`,
        },
        verifiedAt: '2026-11-18',
      };
    }));
    out.push(...results);
    process.stderr.write(`${c.id} ${out.length}/${works.length}\n`);
  }
  return { ...c, count: out.length, entries: out };
}

const all = [];
for (const c of COLLECTIONS) {
  const res = await runCollection(c);
  all.push({ id: res.id, repo: `https://github.com/${res.repo}`, name: res.name, short: res.short, version: res.version, page: res.page, count: res.count });
  fs.writeFileSync(path.join(SRC, `collection-${c.id}.json`), JSON.stringify(res.entries, null, 2) + '\n', 'utf8');
}
fs.writeFileSync(path.join(SRC, 'collections.json'), JSON.stringify(all, null, 2) + '\n', 'utf8');
fs.writeFileSync(path.join(SRC, 'entries.json'), JSON.stringify(all.flatMap((c) => JSON.parse(fs.readFileSync(path.join(SRC, `collection-${c.id}.json`), 'utf8'))), null, 2) + '\n', 'utf8');
console.log(`imported ${all.reduce((n, c) => n + c.count, 0)} entries from ${all.length} collections`);
