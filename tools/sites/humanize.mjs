/* 工具站「人话层」渲染（2026-11-21）
 * ----------------------------------------------------------------------------
 * 这一层只做三件事：
 *   1. 先用人话讲清这类东西适合谁、什么时候别用、掏钱前问什么；
 *   2. 把 280 份档案压成几张能一眼看懂的图（用途分布、任务 × 类目矩阵）；
 *   3. 在产品页顶部给一张「决策快照」，并把同类与同厂牌拉到一起。
 * 所有结论都来自档案已有字段；不新增评分，不替读者做最终决定。
 * -------------------------------------------------------------------------- */

import { JOB_LABEL, DEPLOY_LABEL, LICENSE_LABEL, COST_LABEL, TASK_KEYS, countJobs } from '../scripts/facets.mjs';

const CAT_HUMAN = {
  coding: {
    who: '想让 AI 直接改代码库、跑测试、提 PR 的人。',
    whoEn: 'People who want AI to edit a real codebase, run tests and open a PR.',
    not: '只想补全一行代码，或者不愿意把命令权限交给它。',
    notEn: 'You only need one-line completion, or you are not ready to give it command permissions.',
    asks: ['它能改几个文件，能不能跨文件重构？', '命令、网络、文件写入权限给到哪一步？', '代码会不会离开本机，训练用不用我的仓库？'],
    asksEn: ['How many files can it edit — can it refactor across files?', 'What command, network and write permissions does it get?', 'Does code leave my machine, and is my repo used for training?'],
  },
  chat: {
    who: '想用一个入口问问题、写草稿、做轻量任务的人。',
    whoEn: 'People who want one place to ask questions, draft text and handle light tasks.',
    not: '要垂直领域的定论、要完全离线，或者要它替你做最终判断。',
    notEn: 'You need a vertical-domain conclusion, full offline use, or it to make the final call for you.',
    asks: ['背后是哪个模型，会不会换？', '聊天记录和记忆存在哪，能不能删？', '输出能不能商用，要不要标注 AI 生成？'],
    asksEn: ['Which model powers it, and can it change?', 'Where are chats and memory stored, and can I delete them?', 'Can I use the output commercially, and must I label it as AI-generated?'],
  },
  image: {
    who: '要做配图、海报、概念图，或批量改图的人。',
    whoEn: 'People making illustrations, posters, concept art or batch edits.',
    not: '要精确 CAD / 3D 模型，或者需要法律级的版权清理。',
    notEn: 'You need precise CAD / 3D models, or legal-grade copyright clearance.',
    asks: ['生成图能不能商用，哪些档位可以？', '我的图会不会被拿去训练？', '同一个风格能不能稳定复现？'],
    asksEn: ['Can the output be used commercially, and on which plan?', 'Are my images used for training?', 'Can the same style be reproduced reliably?'],
  },
  video: {
    who: '要做短视频、广告片、数字人口播的人。',
    whoEn: 'People making short video, ads or avatar presenters.',
    not: '要院线级剪辑 / 特效，或者要完全可控的长时间连续镜头。',
    notEn: 'You need cinema-grade editing / VFX, or fully controllable long takes.',
    asks: ['一次能生成多长、多清晰？', '素材和成片归谁，能不能商用？', '配音和肖像授权齐不齐？'],
    asksEn: ['How long and how sharp can one generation be?', 'Who owns the footage and can it be used commercially?', 'Are voice and likeness rights covered?'],
  },
  audio: {
    who: '要做配音、音乐、转写或声音克隆的人。',
    whoEn: 'People working on voice-over, music, transcription or voice cloning.',
    not: '要做专业母带 / 交响编排，或者没拿到声音授权就想克隆。',
    notEn: 'You need professional mastering / orchestration, or you want to clone a voice without rights.',
    asks: ['声音克隆要什么授权，怎么验证？', '商用范围到哪，按字数还是按分钟？', '中文、方言、情绪支持到什么程度？'],
    asksEn: ['What consent does voice cloning require, and how is it verified?', 'What is the commercial scope — per character or per minute?', 'How well are Chinese, dialects and emotion supported?'],
  },
  research: {
    who: '要查资料、读论文、做带来源的简报的人。',
    whoEn: 'People researching, reading papers or writing sourced briefs.',
    not: '要替代同行评审，或者要求它保证结论正确。',
    notEn: 'You need it to replace peer review, or to guarantee a correct conclusion.',
    asks: ['引用能不能点开，覆盖哪些库？', '会不会把摘要编成原文？', '结论和反面证据是不是一起给？'],
    asksEn: ['Can citations be opened, and which databases are covered?', 'Does it turn an abstract into a fake quotation?', 'Does it give counter-evidence alongside the conclusion?'],
  },
  office: {
    who: '要把文档、表格、会议、邮件交给 AI 提速的人。',
    whoEn: 'People who want AI to speed up documents, sheets, meetings and email.',
    not: '要完全离线，或者要它直接出法律 / 财务定稿。',
    notEn: 'You need full offline use, or a final legal / financial document.',
    asks: ['交付物是什么格式，能不能接着改？', '公司数据传到哪，会不会进训练？', '多人协作时权限怎么管？'],
    asksEn: ['What format is the deliverable, and can I keep editing it?', 'Where does company data go, and is it used for training?', 'How are permissions managed for team collaboration?'],
  },
  automation: {
    who: '不想写代码，想把多个步骤串成自动流程的人。',
    whoEn: 'People who want to chain steps into an automated flow without writing code.',
    not: '要细粒度代码控制，或者必须本地离线运行。',
    notEn: 'You need fine-grained code control, or it must run fully offline.',
    asks: ['能接哪些系统，有没有官方连接器？', '失败怎么重试，日志留多久？', '按任务、按座位还是按调用计费？'],
    asksEn: ['Which systems can it connect to, with official connectors?', 'How does it retry failures, and how long are logs kept?', 'Is it billed per task, per seat or per call?'],
  },
  framework: {
    who: '要自己搭 agent、接工具、管状态的人。',
    whoEn: 'People building their own agents, tools and state management.',
    not: '只想打开就能用，或者不愿意读文档、写适配层。',
    notEn: 'You want something ready to use, or you do not want to read docs and write adapters.',
    asks: ['状态存在哪，能不能换存储？', '工具权限和人工确认怎么设计？', '换模型要不要重写一遍？'],
    asksEn: ['Where is state stored, and can I swap the backend?', 'How are tool permissions and human approval designed?', 'Do I have to rewrite everything to change models?'],
  },
  mcp: {
    who: '要给 agent 补一个具体能力（文件、搜索、数据库）的人。',
    whoEn: 'People adding one concrete capability to an agent — files, search, a database.',
    not: '要找完整产品，或者没有能力审第三方代码与权限。',
    notEn: 'You want a complete product, or you cannot review third-party code and permissions.',
    asks: ['它是只读还是能写，能碰到哪些目录？', '本地 stdio 还是远程服务？', '怎么认证，密钥存在哪？'],
    asksEn: ['Is it read-only or can it write, and which directories can it touch?', 'Local stdio or a remote service?', 'How does auth work, and where are keys stored?'],
  },
  runner: {
    who: '要把开源模型跑在自己机器上的人。',
    whoEn: 'People running open models on their own hardware.',
    not: '没有合适显卡，或者不想折腾环境、量化与显存。',
    notEn: 'You lack a suitable GPU, or you do not want to deal with environments, quantisation and VRAM.',
    asks: ['显存要多少，能不能跑量化？', '支持什么格式，能不能接现有 API？', '并发和首 token 延迟大概多少？'],
    asksEn: ['How much VRAM, and can it run quantised?', 'Which formats are supported, and can it expose an existing API?', 'What are concurrency and first-token latency like?'],
  },
  safety: {
    who: '要给 AI 加护栏、做评测、查合规的人。',
    whoEn: 'People adding guardrails, running evaluations or checking compliance.',
    not: '要一个通用聊天助手，或者指望一套规则拦掉所有风险。',
    notEn: 'You want a general chat assistant, or you expect one rule set to stop every risk.',
    asks: ['它拦什么、漏什么，有没有误伤率？', '评测集和判定口径公不公开？', '日志、告警、人工复核怎么接？'],
    asksEn: ['What does it block and miss, and what is the false-positive rate?', 'Are the eval set and judging rules public?', 'How do logs, alerts and human review connect?'],
  },
};

const FORM_SHORT = {
  ide: ['编辑器里', 'In editor'],
  cli: ['命令行', 'CLI'],
  cloud: ['厂商云', 'Vendor cloud'],
  mcp: ['MCP 服务', 'MCP server'],
  web: ['网页服务', 'Web service'],
  app: ['桌面 / 移动应用', 'Desktop / mobile app'],
  'local-app': ['本机应用', 'Local app'],
  harness: ['框架 / SDK', 'Framework / SDK'],
};

const LIFECYCLE_LABEL = {
  active: ['活跃', 'Active'],
  maintenance: ['更新放缓', 'Slowing'],
  archived: ['已归档', 'Archived'],
  unknown: ['状态未知', 'Unknown'],
};

const CONF_LABEL = {
  verified: ['8 项已核', '8 checked'],
  partial: ['有未核项', 'Some open'],
  stale: ['需要复核', 'Recheck'],
};

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const bi = (zh, en) => `<span data-zh>${esc(zh)}</span><span data-en>${esc(en)}</span>`;
const plain = (s, n = 80) => String(s || '').replace(/[*_`#>|]/g, '').replace(/\s+/g, ' ').trim().slice(0, n);
const firstSentence = (s, n = 80) => {
  const t = plain(s, n * 2);
  const m = t.match(/^.*?[。！？!?](?=\s|$)/);
  return (m ? m[0] : t).slice(0, n);
};
/* 快照卡里的英文摘要不能在单词中间截断（实测 adobe-acrobat-ai 显示成
 * 「PDF summarisin」）。按词边界收尾，并补省略号；中文没有空格就按字符截。 */
const clip = (s, n = 84) => {
  const t = plain(s, n * 2);
  if (t.length <= n) return t;
  let cut = t.slice(0, n - 1).trimEnd();
  /* 中文优先收在句号等句子边界；其次才是逗号、顿号；都没有才按空格。 */
  const strong = Math.max(...['。', '！', '？', '；'].map(ch => cut.lastIndexOf(ch)));
  const weak = Math.max(...['：', '，', '、'].map(ch => cut.lastIndexOf(ch)));
  let endedStrong = false;
  if (strong >= Math.floor(n * 0.45)) {
    cut = cut.slice(0, strong + 1);
    endedStrong = true;
  } else if (weak >= Math.floor(n * 0.45)) {
    cut = cut.slice(0, weak + 1);
  } else {
    const space = cut.lastIndexOf(' ');
    if (space >= Math.floor(n * 0.55)) cut = cut.slice(0, space);
  }
  if (endedStrong) return cut;
  return cut.replace(/[,;:，、；：\-—]$/, '') + '…';
};
const pct = (n, max) => max ? Math.max(4, Math.round((n / max) * 100)) : 4;

function statCard(n, zh, en, tone = '') {
  return `<div class="hstat ${tone}"><b>${n}</b><span>${bi(zh, en)}</span></div>`;
}

function shapeBar(labelZh, labelEn, items, total, cls) {
  const segs = items.map(([k, n, zh, en], i) => `<i class="seg ${cls}-${Math.min(i + 1, 5)}" style="width:${Math.max(2, Math.round((n / total) * 100))}%" title="${esc(zh)} ${n}" data-ui-title-zh="${esc(zh)} ${n}" data-ui-title-en="${esc(en)} ${n}"></i>`).join('');
  const legend = items.map(([k, n, zh, en], i) => `<span class="shape-lg"><b class="dot ${cls}-${Math.min(i + 1, 5)}"></b>${bi(zh, en)} <em>${n}</em></span>`).join('');
  return `<div class="shape-item">
      <div class="shape-item-head"><span>${bi(labelZh, labelEn)}</span><small>${total}</small></div>
      <div class="shape-track" role="img" aria-label="${esc(labelZh)}" data-ui-aria-label-zh="${esc(labelZh)}" data-ui-aria-label-en="${esc(labelEn)}">${segs}</div>
      <div class="shape-legend">${legend}</div>
    </div>`;
}

function shapePanel(entries) {
  const total = entries.length || 1;
  const byForm = {};
  const byDeploy = {};
  const byLife = {};
  const byConf = {};
  for (const e of entries) {
    const f = e.form || 'unknown';
    byForm[f] = (byForm[f] || 0) + 1;
    const d = e.facets?.deployment || 'unknown';
    byDeploy[d] = (byDeploy[d] || 0) + 1;
    const l = e.lifecycle || 'unknown';
    byLife[l] = (byLife[l] || 0) + 1;
    const c = e.confidence || 'unknown';
    byConf[c] = (byConf[c] || 0) + 1;
  }
  const formItems = Object.entries(byForm)
    .sort((a, b) => b[1] - a[1])
    .map(([k, n]) => {
      const l = FORM_SHORT[k] || [k, k];
      return [k, n, l[0], l[1]];
    });
  const depItems = ['local', 'hybrid', 'cloud', 'unknown'].filter((k) => byDeploy[k]).map((k) => [k, byDeploy[k], DEPLOY_LABEL[k][0], DEPLOY_LABEL[k][1]]);
  const lifeItems = ['active', 'maintenance', 'archived', 'unknown'].filter((k) => byLife[k]).map((k) => [k, byLife[k], LIFECYCLE_LABEL[k][0], LIFECYCLE_LABEL[k][1]]);
  const confItems = ['verified', 'partial', 'stale'].filter((k) => byConf[k]).map((k) => [k, byConf[k], CONF_LABEL[k][0], CONF_LABEL[k][1]]);
  return `<div class="shape-panel">
      <div class="shape-copy">
        <h3>${bi('这类东西，先看它长什么样', 'What this category actually looks like')}</h3>
        <p>${bi('四个切面都来自档案字段：怎么用、跑在哪、还更新吗、核到多少。先看哪一类占多数，再回上面的筛选收窄。', 'Four slices from existing fields: how you use it, where it runs, whether it is still updated and how much is checked. See what dominates, then narrow with the filters above.')}</p>
      </div>
      <div class="shape-grid">
        ${shapeBar('怎么用', 'How you use it', formItems, total, 'sf')}
        ${shapeBar('跑在哪', 'Where it runs', depItems, total, 'sd')}
        ${shapeBar('还更新吗', 'Still updated', lifeItems, total, 'sl')}
        ${shapeBar('核到多少', 'How much checked', confItems, total, 'sc')}
      </div>
    </div>`;
}

function allTable(entries) {
  const order = ['ide', 'cli', 'cloud', 'web', 'app', 'local-app', 'mcp', 'harness'];
  const groups = new Map();
  for (const e of entries) {
    const f = e.form || 'unknown';
    if (!groups.has(f)) groups.set(f, []);
    groups.get(f).push(e);
  }
  const total = entries.length || 1;
  const licKnown = entries.filter((e) => e.facets?.licenseKind && e.facets.licenseKind !== 'unknown').length;
  const costKnown = entries.filter((e) => e.facets?.cost && e.facets.cost !== 'unknown').length;
  const showLic = licKnown / total >= 0.7;
  const showCost = costKnown / total >= 0.7;
  const cols = [
    { zh: '对象', en: 'Object' },
    { zh: '怎么用', en: 'How' },
    ...(showLic ? [{ zh: '许可', en: 'Licence' }] : []),
    ...(showCost ? [{ zh: '花钱', en: 'Cost' }] : []),
    { zh: '中国大陆', en: 'Mainland' },
    { zh: '核到多少', en: 'Evidence' },
  ];
  const cmpZh = ['怎么用', showLic ? '许可' : '', showCost ? '花钱' : '', '能不能直连', '核到多少'].filter(Boolean).join('、');
  const cmpEn = ['how you use it', showLic ? 'licence' : '', showCost ? 'cost' : '', 'mainland access', 'how much is checked'].filter(Boolean).join(', ');
  const keys = [...order.filter((k) => groups.has(k)), ...[...groups.keys()].filter((k) => !order.includes(k))];
  const body = keys.map((k) => {
    const list = groups.get(k).slice().sort((a, b) => {
      const va = a.confidence === 'verified' ? 0 : 1;
      const vb = b.confidence === 'verified' ? 0 : 1;
      if (va !== vb) return va - vb;
      const la = a.lifecycle === 'active' ? 0 : a.lifecycle === 'maintenance' ? 1 : 2;
      const lb = b.lifecycle === 'active' ? 0 : b.lifecycle === 'maintenance' ? 1 : 2;
      if (la !== lb) return la - lb;
      return String(a.name).localeCompare(String(b.name), 'zh-Hans-CN');
    });
    const l = FORM_SHORT[k] || [k, k];
    const head = `<tr class="at-group"><td colspan="${cols.length}">${bi(l[0], l[1])} <span>${list.length}</span></td></tr>`;
    const rows = list.map((x) => {
      const dp = DEPLOY_LABEL[x.facets?.deployment] || ['未核', 'Not checked'];
      const lic = LICENSE_LABEL[x.facets?.licenseKind] || ['未核', 'Not checked'];
      const cost = COST_LABEL[x.facets?.cost] || ['未核', 'Not checked'];
      const cn = x.cn || {};
      const direct = { yes: ['可直连', 'Direct'], no: ['不可达', 'Blocked'], unknown: ['未核', 'Not checked'] }[cn.direct] || ['未核', 'Not checked'];
      const ev = x.confidence === 'verified' ? ['8 项已核', '8 checked'] : x.confidence === 'partial' ? ['有未核项', 'Some open'] : ['需要复核', 'Recheck'];
      const life = x.lifecycle === 'active' ? ['活跃', 'Active'] : x.lifecycle === 'archived' ? ['已归档', 'Archived'] : x.lifecycle === 'maintenance' ? ['更新放缓', 'Slowing'] : ['状态未知', 'Unknown'];
      const cells = [
        `<td><a href="./${esc(x.id)}.html">${bi(esc(x.name), esc(x.nameEn || x.name))}</a><small>${bi(esc(x.vendor || ''), esc(x.vendor || ''))}</small></td>`,
        `<td>${bi(dp[0], dp[1])}<br><span class="at-sub">${bi(FORM_SHORT[x.form]?.[0] || x.form || '未标', FORM_SHORT[x.form]?.[1] || x.form || 'Not set')}</span></td>`,
        ...(showLic ? [`<td>${bi(lic[0], lic[1])}</td>`] : []),
        ...(showCost ? [`<td>${bi(cost[0], cost[1])}</td>`] : []),
        `<td>${bi(direct[0], direct[1])}</td>`,
        `<td><span class="at-badge ${x.confidence}">${bi(ev[0], ev[1])}</span><br><span class="at-sub">${bi(life[0], life[1])}</span></td>`,
      ];
      return `<tr>${cells.join('')}</tr>`;
    }).join('');
    return head + rows;
  }).join('');
  return `<details class="all-table">
      <summary><span class="at-title">${bi(`把 ${entries.length} 个放进一张表`, `All ${entries.length} in one table`)}</span><span class="at-hint">${bi(`按用法分组；横向比${cmpZh}`, `Grouped by form; compare ${cmpEn} side by side`)}</span><span class="at-arrow" aria-hidden="true">↓</span></summary>
      <div class="table-wrap">
        <table class="cmp at">
          <thead><tr>${cols.map((c) => `<th>${bi(c.zh, c.en)}</th>`).join('')}</tr></thead>
          <tbody>${body}</tbody>
        </table>
      </div>
      <p class="at-note">${bi('表里只写档案已有字段；没核到的写「未核」，不猜。点名字进单页看 8 个问题和来源。', 'Only fields already in the entry are shown. Anything unchecked says “not checked”; nothing is guessed. Open an entry for the eight questions and sources.')}</p>
    </details>`;
}

export function categoryHuman(partKey, site, entries) {
  const h = CAT_HUMAN[partKey];
  if (!h) return '';
  const total = entries.length;
  const checked = entries.filter((e) => e.confidence === 'verified').length;
  const attention = entries.filter((e) => e.lifecycle === 'maintenance' || e.lifecycle === 'archived').length;
  const localish = entries.filter((e) => e.facets?.deployment === 'local' || e.facets?.deployment === 'hybrid').length;
  const direct = entries.filter((e) => (e.cn || {}).direct === 'yes').length;
  const jobs = countJobs(entries);
  const topJobs = Object.entries(jobs).sort((a, b) => b[1] - a[1]).slice(0, 6);
  const maxJob = topJobs.length ? topJobs[0][1] : 0;

  const bars = topJobs.map(([j, n]) => {
    const l = JOB_LABEL[j] || [j, j];
    return `<div class="jb-row"><span class="jb-l">${bi(l[0], l[1])}</span><span class="jb-track"><i style="width:${pct(n, maxJob)}%"></i></span><span class="jb-n">${n}</span></div>`;
  }).join('');

  return `<section class="section human-section" id="human">
      <div class="container">
        <div class="human-head">
          <p class="kicker">${bi('人话版', 'In plain words')}</p>
          <h2>${bi(`${site.name}：先弄明白它替谁干活`, `${site.nameEn || site.name}: who it works for`)}</h2>
        </div>
        <div class="human-grid">
          <article class="human-card">
            <span class="hc-no">01</span>
            <h3>${bi('适合谁', 'Who it is for')}</h3>
            <p>${bi(h.who, h.whoEn)}</p>
          </article>
          <article class="human-card">
            <span class="hc-no">02</span>
            <h3>${bi('什么时候别用', 'When not to use it')}</h3>
            <p>${bi(h.not, h.notEn)}</p>
          </article>
          <article class="human-card human-asks">
            <span class="hc-no">03</span>
            <h3>${bi('掏钱前先问三句', 'Three questions before paying')}</h3>
            <ol>${h.asks.map((x, i) => `<li>${bi(x, h.asksEn[i])}</li>`).join('')}</ol>
          </article>
        </div>
        <div class="human-stats">
          ${statCard(total, '份档案', 'entries')}
          ${statCard(checked, '证据已核', 'evidence checked', 'ok')}
          ${statCard(localish, '能本地 / 混合跑', 'local or hybrid', 'cool')}
          ${statCard(direct, '大陆可直连', 'direct in mainland', 'cool')}
          ${statCard(attention, '上游有变化', 'upstream changed', attention ? 'warn' : '')}
        </div>
        ${shapePanel(entries)}
        <div class="job-panel">
          <div class="job-panel-head">
            <h3>${bi('这类里，大家主要拿它干什么', 'What people mainly use these for')}</h3>
            <p>${bi('按标签计，一份档案可以同时出现在多个用途里，所以合计会大于档案数。', 'Tagged by job; one entry can appear under several jobs, so the total can exceed the entry count.')}</p>
          </div>
          <div class="job-bars">${bars}</div>
        </div>
        ${allTable(entries)}
      </div>
    </section>`;
}

export function taskMatrix(entries, catOrder, currentPart) {
  const matrix = {};
  for (const t of TASK_KEYS) {
    matrix[t.key] = {};
    for (const c of catOrder) matrix[t.key][c.key] = 0;
  }
  for (const e of entries) {
    const track = e.trackKey;
    for (const t of TASK_KEYS) {
      if ((e.facets?.jobs || []).some((j) => t.jobs.includes(j))) matrix[t.key][track] = (matrix[t.key][track] || 0) + 1;
    }
  }
  const max = Math.max(1, ...Object.values(matrix).flatMap((r) => Object.values(r)));
  const rows = TASK_KEYS.map((t) => {
    const cells = catOrder.map((c) => {
      const n = matrix[t.key][c.key] || 0;
      const href = `./${c.key}/?job=${encodeURIComponent(t.jobs[0])}`;
      return `<td class="tm-cell ${n ? 'has' : ''}" style="--heat:${n ? Math.min(100, 12 + Math.round((n / max) * 88)) : 0}%"><a href="${href}" title="${esc(c.zh)} · ${esc(t.zh)}：${n} 份" data-ui-title-zh="${esc(c.zh)} · ${esc(t.zh)}：${n} 份" data-ui-title-en="${esc(c.en)} · ${esc(t.en)}: ${n} ${n === 1 ? 'entry' : 'entries'}">${n || '·'}</a></td>`;
    }).join('');
    const total = Object.values(matrix[t.key]).reduce((a, b) => a + b, 0);
    const empty = total === 0 ? `<span class="tm-empty">${bi('本站暂无', 'No entries yet')}</span>` : '';
    return `<tr><th class="tm-task"><a href="https://specul.com/topic-${t.key}.html">${bi(t.zh, t.en)}</a>${empty}</th>${cells}<td class="tm-total">${total}</td></tr>`;
  }).join('');
  const heads = catOrder.map((c) => `<th><a href="./${c.key}/">${bi(c.zh, c.en)}</a></th>`).join('');
  const mobileRows = TASK_KEYS.map((t) => {
    const top = catOrder
      .map((c) => ({ c, n: matrix[t.key][c.key] || 0 }))
      .filter((x) => x.n > 0)
      .sort((a, b) => b.n - a.n)
      .slice(0, 3);
    const list = top.length
      ? top.map(({ c, n }) => `<a href="./${c.key}/?job=${encodeURIComponent(t.jobs[0])}"><b>${bi(c.zh, c.en)}</b><span>${n}</span></a>`).join('')
      : `<span class="tm-mnone">${bi('本站还没收，先去上面的任务页看背景', 'No entries yet; use the job page above for background')}</span>`;
    return `<div class="tm-mrow"><a class="tm-mjob" href="https://specul.com/topic-${t.key}.html">${bi(t.zh, t.en)}</a><div class="tm-mlist">${list}</div></div>`;
  }).join('');
  return `<section class="section matrix-section" id="task-map">
      <div class="container">
        <div class="matrix-head">
          <h2>${bi('你手里的活，落在哪几个类目', 'Where your job lands')}</h2>
          <p class="section-desc">${bi('数字是同时符合两者的档案数，点进去就是筛好的列表。', 'The number counts entries that match both; tap it to open a filtered list.')}</p>
        </div>
        <div class="table-wrap matrix-wrap">
          <table class="task-matrix">
            <thead><tr><th class="tm-corner">${bi('任务 → / 类目 ↓', 'Job → / category ↓')}</th>${heads}<th class="tm-total">${bi('合计', 'Total')}</th></tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
        <div class="tm-mobile">
          <p class="tm-mobile-head">${bi('手机每行 3 个类目，点一个就筛选。', 'On phones each job shows three categories; tap one to filter.')}</p>
          ${mobileRows}
        </div>
        <div class="matrix-note">${bi('读法：先找你的任务那一行，再看数字最大的两三个类目。不要从左上角一路读到底——那是把工具目录当成考试题。', 'How to read: find your job row, then look at the two or three categories with the largest numbers. Do not read it corner to corner like an exam.')}</div>
      </div>
    </section>`;
}

export function decisionStrip() {
  return `<section class="section decision-section" id="start">
      <div class="container">
        <div class="decision-grid">
          <article class="decision-card">
            <span class="ds-no">01</span>
            <h3>${bi('我知道要哪种东西', 'I know what kind of thing I need')}</h3>
            <p>${bi('工具、模型、开源库、硬件、论文……先按对象类型进对站，再看深度档案。', 'Tool, model, open-source repo, hardware, paper… start with the object type, then read the dossier.')}</p>
            <a href="./coding/">${bi('从 12 个工具类目开始 →', 'Start with 12 tool categories →')}</a>
          </article>
          <article class="decision-card">
            <span class="ds-no">02</span>
            <h3>${bi('我只有一件活', 'I only have a job to do')}</h3>
            <p>${bi('写代码、做视频、做研究、办公交付……用任务矩阵找到落点，不用先背类目名。', 'Code, video, research, office work… use the job matrix to find where it lands; you do not need to memorise category names.')}</p>
            <a href="#task-map">${bi('跳到任务矩阵 ↓', 'Jump to the job matrix ↓')}</a>
          </article>
          <article class="decision-card">
            <span class="ds-no">03</span>
            <h3>${bi('我有硬条件', 'I have hard constraints')}</h3>
            <p>${bi('大陆直连、本地跑、能不能商用、有没有免费档——先筛掉不符合的，再读细节。', 'Direct access in mainland China, local runtime, commercial use, a free tier — filter out what fails first, then read the details.')}</p>
            <a href="#categories">${bi('先进类目，再用条件筛 →', 'Pick a category, then filter →')}</a>
          </article>
        </div>
      </div>
    </section>`;
}

export function snapshot(e) {
  const tag = firstSentence(e.tagline || e.sec?.oneline || '', 200);
  const dp = DEPLOY_LABEL[e.facets?.deployment] || [e.facets?.deployment || '未核', 'Not checked'];
  const form = FORM_SHORT[e.form] || [e.form || '未标', e.form || 'Not set'];
  const lic = LICENSE_LABEL[e.facets?.licenseKind] || [e.facets?.licenseKind || '未核', 'Not checked'];
  const cn = e.cn || {};
  const direct = { yes: ['大陆可直连', 'Direct in mainland'], no: ['直连不可达', 'Blocked'], unknown: ['直连未核', 'Not checked'] }[cn.direct] || ['直连未核', 'Not checked'];
  const filing = { filed: ['已备案', 'Filed'], 'not-filed': ['未见于备案', 'Not in filing list'], unknown: ['备案未核', 'Not checked'] }[cn.filing] || ['备案未核', 'Not checked'];
  const life = e.lifecycle === 'active' ? '' : `<span class="snap-flag">${bi(e.lifecycle === 'archived' ? '上游已归档' : '上游更新放缓', e.lifecycle === 'archived' ? 'Upstream archived' : 'Upstream slowing')}</span>`;
  return `<section class="snapshot" aria-label="决策快照" data-ui-aria-label-zh="决策快照" data-ui-aria-label-en="Decision snapshot">
      <div class="snap-head">
        <h2>${bi('30 秒判断：它能不能进你的候选名单', '30-second check: should it make your shortlist?')}</h2>
        ${life}
      </div>
      <div class="snap-grid">
        <div class="snap-item"><span class="snap-k">${bi('一句话', 'In one line')}</span><p>${bi(clip(tag, 88), clip(e.sec?.onelineEn || tag, 88))}</p></div>
        <div class="snap-item"><span class="snap-k">${bi('怎么用它', 'How you use it')}</span><p>${bi(dp[0], dp[1])} · ${bi(form[0], form[1])}</p></div>
        <div class="snap-item"><span class="snap-k">${bi('许可 / 商用', 'Licence / commercial use')}</span><p>${bi(lic[0], lic[1])}</p><small>${bi('商用前读原文，别只看标签', 'Read the original licence before commercial use')}</small></div>
        <div class="snap-item"><span class="snap-k">${bi('中国大陆', 'Mainland China')}</span><p>${bi(direct[0], direct[1])} · ${bi(filing[0], filing[1])}</p></div>
      </div>
      <p class="snap-note">${bi('这四张卡只帮你快速排除，不替你做决定；真正的差别在下面 8 个问题和来源里。', 'These four cards help you rule things out, not decide for you. The real differences are in the eight questions and sources below.')}</p>
    </section>`;
}

export function peers(e, entries) {
  const pool = entries.filter((x) => x.id !== e.id).map((x) => {
    const shared = (x.facets?.jobs || []).filter((j) => (e.facets?.jobs || []).includes(j)).length;
    const score = shared * 3 + (x.form === e.form ? 1 : 0) + (x.lifecycle === 'active' ? 1 : 0) + (x.confidence === 'verified' ? 1 : 0) + (x.facets?.vendorKey !== e.facets?.vendorKey ? 1 : 0);
    return { x, score, shared };
  }).filter((o) => o.shared > 0).sort((a, b) => b.score - a.score);
  const picks = [];
  const vendors = new Set([e.facets?.vendorKey]);
  for (const o of pool) {
    if (picks.length >= 3) break;
    if (vendors.has(o.x.facets?.vendorKey)) continue;
    picks.push(o.x);
    vendors.add(o.x.facets?.vendorKey);
  }
  if (picks.length < 2) return '';
  const rows = picks.map((x) => {
    const dp = DEPLOY_LABEL[x.facets?.deployment] || ['未核', 'Not checked'];
    const lic = LICENSE_LABEL[x.facets?.licenseKind] || ['未核', 'Not checked'];
    const ev = x.confidence === 'verified' ? '8 项已核' : '有未核项';
    const st = x.lifecycle === 'active' ? '活跃' : x.lifecycle === 'archived' ? '已归档' : '更新放缓';
    return `<tr><td><a href="./${esc(x.id)}.html">${bi(esc(x.name), esc(x.nameEn || x.name))}</a></td><td>${bi(dp[0], dp[1])}</td><td>${bi(lic[0], lic[1])}</td><td>${bi(ev, x.confidence === 'verified' ? '8 questions checked' : 'Some questions open')}<br><span class="td-vendor">${bi(st, x.lifecycle === 'active' ? 'Active' : x.lifecycle === 'archived' ? 'Archived' : 'Slowing')}</span></td><td class="td-fit">${bi(firstSentence(x.tagline || x.sec?.oneline || '', 56), firstSentence(x.sec?.onelineEn || x.tagline || x.sec?.oneline || '', 72))}</td></tr>`;
  }).join('');
  return `<section class="section peer-section" id="peers">
      <div class="container">
        <div class="matrix-head">
          <p class="kicker">${bi('同类对照', 'Same-category peers')}</p>
          <h2>${bi('先看这三个，再决定要不要往下读', 'Look at these three before reading further')}</h2>
          <p class="section-desc">${bi('按用途重合度挑的，不是排名。先比「跑在哪 / 许可 / 状态」，三项里有一项不合格就可以跳过。', 'Selected by overlap in jobs, not ranked. Compare where it runs, licence and status first; if one of the three fails, skip it.')}</p>
        </div>
        <div class="table-wrap">
          <table class="cmp peer-table">
            <thead><tr><th>${bi('对象','Object')}</th><th>${bi('跑在哪','Where')}</th><th>${bi('许可','Licence')}</th><th>${bi('证据 / 状态','Evidence / status')}</th><th>${bi('适合做什么','What it is for')}</th></tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </div>
    </section>`;
}

export function vendorPanel(e, byId, labelFor) {
  const same = [];
  for (const { entry, partKey } of byId.values()) {
    if (entry.id === e.id) continue;
    if (entry.facets?.vendorKey && entry.facets.vendorKey === e.facets?.vendorKey) same.push({ entry, partKey });
  }
  if (!same.length) return '';
  same.sort((a, b) => a.partKey.localeCompare(b.partKey) || a.entry.name.localeCompare(b.entry.name, 'zh'));
  const chips = same.slice(0, 14).map(({ entry, partKey }) => {
    const label = labelFor(partKey);
    return `<li><a href="/${partKey}/${esc(entry.id)}.html"><span class="vp-cat">${bi(label[0], label[1])}</span>${bi(esc(entry.name), esc(entry.nameEn || entry.name))}</a></li>`;
  }).join('');
  const more = same.length > 14 ? `<p class="vp-more">${bi(`另有 ${same.length - 14} 条同厂牌档案，按厂牌筛选可看全。`, `${same.length - 14} more from this vendor; filter by vendor to see all.`)}</p>` : '';
  return `<section class="section vendor-section" id="vendor">
      <div class="container">
        <div class="vendor-head">
          <p class="kicker">${bi('同厂牌', 'Same vendor')}</p>
          <h2>${bi(`${esc(e.vendor)} 还有这些`, `More from ${esc(e.vendor)}`)}</h2>
          <p class="section-desc">${bi('同一个厂牌的产品常被切到不同类目；这里一次列全，省得你跨五个站自己拼。', 'One vendor’s products are often split across categories. This list puts them together so you do not have to assemble them across five sites.')}</p>
        </div>
        <ul class="vendor-list">${chips}</ul>
        ${more}
      </div>
    </section>`;
}
