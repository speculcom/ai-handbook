// 决策数据底座：从工具档案与模型配置生成统一记录，再叠加人工核验的价格/限制/许可。
// 原则：能从现有档案带出的字段不手抄；价格与限制只写已核验的官方页，查不到就留 unknown。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseFrontmatter } from '../scripts/yaml.mjs';
import { SERIES } from '../../models/config.js';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '../../../..');           // 仓库根
const TRACKS = path.join(HERE, '..', 'tracks');
const MODELS_SITE = path.join(HERE, '..', '..', 'models', 'site');
const OUT = path.join(HERE, 'decision-data.json');

const CATEGORY_TASKS = {
  coding: ['coding', 'review', 'refactor', 'test'],
  chat: ['chat', 'writing', 'summarize', 'translate'],
  research: ['research', 'search', 'read', 'evidence'],
  office: ['writing', 'meeting', 'docs', 'tables', 'slides', 'email'],
  audio: ['audio', 'transcription', 'voice', 'music'],
  image: ['image', 'design'],
  video: ['video', 'presentation'],
  automation: ['automation', 'workflow', 'agent'],
  framework: ['agent', 'build', 'integration'],
  mcp: ['integration', 'tools', 'agent'],
  runner: ['local', 'deploy', 'privacy'],
  safety: ['safety', 'compliance'],
  skills: ['agent', 'automation'],
};

const CATEGORY_OUTPUTS = {
  coding: ['code', 'diff', 'text'],
  chat: ['text', 'code'],
  research: ['text', 'citations', 'notes'],
  office: ['docs', 'tables', 'slides', 'summary'],
  audio: ['transcript', 'audio', 'summary'],
  image: ['image'],
  video: ['video'],
  automation: ['workflow', 'app'],
  framework: ['app', 'workflow'],
  mcp: ['tool', 'data'],
  runner: ['text', 'local'],
  safety: ['report'],
  skills: ['skill'],
};

// 人工核验覆盖。价格只写官方页能直接对上的档位；第三方价格标 third_party。
// checked 是回源日期，不是产品发布日期。
const OVERRIDES = {
  cursor: {
    summary: 'AI 原生编辑器：本地索引 + Agent 模式，也能把任务丢到云端继续跑。',
    tasks: ['coding', 'review', 'refactor', 'cloud'],
    outputs: ['code', 'diff', 'text'],
    pricing: { free: true, entry: 8, currency: 'USD', unit: 'seat/month', label: '$8/月起', source: 'https://cursor.com/pricing', checked: '2026-11-25', note: 'Plus $8、Premium $30、Super $100、Ultra $200（月付）；年付 Plus $80、Premium $300、Super $1,000、Ultra $2,000。第三方模型按 API list price 另计。' },
    limits: { free: '免费档有有限请求与功能限制，具体额度以官方 pricing 页为准', overage: '套餐外第三方模型按 API 价另计；团队共享用量池按周重置', data_training: '隐私模式可开启；默认训练口径要按团队设置与官方隐私页核对', export: '代码在本地仓库；云端 Agent 产物需自己拉回', contract: '月付/年付，团队按席位' },
    must: ['api', 'local'],
  },
  'claude-code': {
    summary: '终端里的编程 Agent：按目录授权、能改文件、能跑命令，适合大范围重构。',
    tasks: ['coding', 'refactor', 'review', 'terminal'],
    outputs: ['code', 'diff', 'text'],
    pricing: { free: false, entry: 20, currency: 'USD', unit: 'seat/month', label: '$20/月起', source: 'https://claude.com/pricing', checked: '2026-11-25', note: 'Claude Pro $20/月（$200/年）含 Claude Code；Max $100、Ultra $200。API 另按 token 计。' },
    limits: { free: '无免费档；Pro 起', overage: '超出套餐按 API 用量或升级档位', data_training: '按 Anthropic 消费者/商业条款区分，团队版需读合同', export: '改动直接落在工作目录；无云端托管仓库', contract: '个人订阅或团队合同' },
    must: ['api', 'local'],
  },
  copilot: {
    summary: '挂在 IDE 与 GitHub 里的编程助手：补全、Chat、Agent 三件事都在同一个账单下。',
    tasks: ['coding', 'review', 'test', 'github'],
    outputs: ['code', 'diff', 'review'],
    pricing: { free: true, entry: 10, currency: 'USD', unit: 'seat/month', label: '$10/月起', source: 'https://docs.github.com/en/copilot/get-started/plans', checked: '2026-11-25', note: 'Free 每月 2,000 次补全；Pro $10（1,000 AI credits）；Pro+ $39（3,900）；Max $100（10,000）；Business $19/席；Enterprise $39/席。超额 $0.01/credit。' },
    limits: { free: '2,000 completions/月；Chat/Agent 额度另限', overage: 'AI credits 超额 $0.01/credit；付费计划代码补全不限量', data_training: '个人版与企业版数据保护不同，需按 GitHub 隐私声明核对', export: '代码在本地/仓库；Copilot 不托管代码', contract: '个人月付或组织按席位' },
    must: ['api', 'github'],
  },
  'qoder-cn': {
    summary: '国内团队向的 AI 编程工作台：IDE/CLI/云端 Agent，中文与国产模型接入更直接。',
    tasks: ['coding', 'review', 'refactor', 'cloud'],
    outputs: ['code', 'diff', 'text'],
    pricing: { free: true, entry: null, currency: 'CNY', unit: 'unknown', label: '免费档 + 付费档（价格未核验）', source: 'https://qoder.com.cn', checked: '2026-11-25', note: '官方页有免费与付费档，具体人民币价格与额度未在本次抓到可引用的价目表，不填数字。' },
    limits: { free: '有免费额度，具体以产品内计费页为准', overage: '按 credits/席位，未核验', data_training: '国内产品，需读隐私政策与团队协议', export: '代码在本地；云端任务需核对产物归属', contract: '个人/团队订阅，未核验' },
    must: ['api', 'local'],
  },
  perplexity: {
    summary: '答案带来源角标的 AI 搜索：多模型路由，适合英文/全球资料的快速核证。',
    tasks: ['research', 'search', 'evidence', 'chat'],
    outputs: ['text', 'citations'],
    pricing: { free: true, entry: 20, currency: 'USD', unit: 'seat/month', label: '$20/月起', source: 'https://www.perplexity.ai/help-center/en/articles/11680686-perplexity-max', checked: '2026-11-25', note: 'Pro $20/月或 $200/年；Max $200/月或 $2,000/年；Enterprise Pro $40/席、Enterprise Max $325/席；API 另计。' },
    limits: { free: '免费档有每日 Pro 搜索次数限制（第三方价格页称 3 次/天，官方页未逐条核验）', overage: 'Max/Enterprise 或 API 另计', data_training: '账户设置提供训练开关；默认态未在官方页逐条核验', export: '答案可复制/分享；引用要回原文', contract: '个人订阅/企业席位/API' },
    must: ['api'],
  },
  kagi: {
    summary: '付费订阅制搜索引擎：无广告、无追踪，自建索引；前端产品默认非商业使用。',
    tasks: ['research', 'search', 'privacy'],
    outputs: ['text', 'citations'],
    pricing: { free: false, entry: 5, currency: 'USD', unit: 'seat/month', label: '$5/月起', source: 'https://kagi.com/pricing', checked: '2026-11-25', note: 'Trial 100 次搜索；Starter $5/月 300 次；Professional $10/月不限；Ultimate $25/月。API Search $12/1,000 requests，Extract $4/1,000 pages。' },
    limits: { free: '仅 100 次试用搜索，无长期免费档', overage: 'Starter 超 300 次需升级；API 按请求计费', data_training: '官方主打无追踪；第三方 AI 摘要按请求转发，细节读隐私页', export: '搜索结果可导出/分享；API 可编程', contract: '个人订阅；商业使用看 API 产品条款' },
    must: ['api'],
  },
  metaso: {
    summary: '国内直连的 AI 搜索：中文网页、学术、文库等检索域，适合中文资料起步。',
    tasks: ['research', 'search', 'evidence'],
    outputs: ['text', 'citations', 'notes'],
    pricing: { free: true, entry: null, currency: 'CNY', unit: 'unknown', label: '免费 + 会员（价格未核验）', source: 'https://metaso.cn', checked: '2026-11-25', note: '有免费额度与会员/积分档；本次未抓到可引用的官方价目表，不填数字。' },
    limits: { free: '免费额度/次数以产品内为准', overage: '会员或积分包，未核验', data_training: '国内产品，需读隐私政策；企业版条款另看', export: '支持笔记/思维导图/导出（以产品为准）', contract: '个人会员/企业，未核验' },
    must: ['api'],
  },
  tiangong: {
    summary: '国内直连的 AI 搜索与生成工作台：搜索、文档、PPT、表格、网页模式放在一处。',
    tasks: ['research', 'search', 'docs', 'slides', 'tables'],
    outputs: ['text', 'citations', 'docs', 'slides'],
    pricing: { free: true, entry: null, currency: 'CNY', unit: 'unknown', label: '免费 + 会员（价格未核验）', source: 'https://www.tiangong.cn', checked: '2026-11-25', note: '有免费与会员档；本次未抓到可引用的官方价目表，不填数字。' },
    limits: { free: '免费额度以产品内为准', overage: '会员/积分，未核验', data_training: '国内产品，需读隐私政策', export: '文档/PPT/表格可导出（以产品为准）', contract: '个人会员/企业，未核验' },
    must: ['api'],
  },
  otter: {
    summary: '会议转写与纪要：自动入会、逐字稿、摘要与行动项，免费档按月限时长。',
    tasks: ['meeting', 'transcription', 'summary'],
    outputs: ['transcript', 'summary', 'actions'],
    pricing: { free: true, entry: 8.33, currency: 'USD', unit: 'seat/month', label: '$8.33/月起（年付）', source: 'https://otter.ai/pricing', checked: '2026-11-25', note: 'Basic 免费 300 分钟/月、单场 30 分钟；Pro $8.33/席/月（年付）或 $16.99（月付），1,200 分钟；Business $19.99（年付）或 $30（月付），6,000 分钟；Enterprise 定制。' },
    limits: { free: '300 分钟/月，单场 30 分钟，3 次文件导入', overage: '升级档位或企业合同', data_training: '默认训练口径有争议；以官方隐私政策与账户设置为准，不替它下结论', export: '逐字稿/摘要可导出（档位不同）', contract: '个人/团队订阅' },
    must: ['api'],
  },
  'fireflies-ai': {
    summary: '会议记录助手：自动入会、100+ 语言转写、摘要、CRM 同步与团队分析。',
    tasks: ['meeting', 'transcription', 'summary', 'crm'],
    outputs: ['transcript', 'summary', 'actions'],
    pricing: { free: true, entry: 10, currency: 'USD', unit: 'seat/month', label: '$10/席/月起（年付）', source: 'https://fireflies.ai/pricing', checked: '2026-11-25', note: 'Free $0：无限转写、有限 AI 摘要、400 分钟/团队存储、20 AI credits；Pro $10（年付）/$18（月付）；Business $19/$29；Enterprise $39（年付）。' },
    limits: { free: '400 分钟/团队存储；AI 摘要/credits 有限', overage: '升级档位；企业版含私有存储/合规', data_training: '厂商称不使用客户数据训练；需以官方隐私页与合同为准', export: '逐字稿/摘要/录音导出按档位', contract: '按席位订阅' },
    must: ['api'],
  },
  tldv: {
    summary: '会议录制与纪要：免费档可无限录制/转写，AI 纪要有每月场次上限。',
    tasks: ['meeting', 'transcription', 'summary', 'crm'],
    outputs: ['transcript', 'summary', 'actions'],
    pricing: { free: true, entry: 18, currency: 'USD', unit: 'seat/month', label: '$18/席/月起（年付）', source: 'https://tldv.io/', checked: '2026-11-25', note: '官方博客写明 Free $0：无限录制/转写、10 场 AI 纪要/月、10 次 Ask AI、3 个月数据保留；Pro $18/席/月（年付）或 $29（月付）；Business $29（年付）或 $39（月付）；Enterprise 定制。' },
    limits: { free: '10 场 AI 纪要/月、10 次 Ask AI、3 个月保留', overage: '升级 Pro/Business；CRM/MCP 在付费档', data_training: '官方隐私页需逐条核对；欧盟托管选项以官方为准', export: '录制/逐字稿/片段可分享导出', contract: '按席位订阅' },
    must: ['api'],
  },
  'feishu-ai': {
    summary: '飞书内的 AI 会议纪要：会中录制、会后纪要/待办/分角色逐字稿，按 AI 额度计费。',
    tasks: ['meeting', 'transcription', 'summary', 'docs'],
    outputs: ['transcript', 'summary', 'actions', 'docs'],
    pricing: { free: true, entry: 69, currency: 'CNY', unit: 'seat/month', label: '¥69/月起', source: 'https://www.feishu.cn/service/ai?tab=personal', checked: '2026-11-25', note: 'AI 会员 ¥69/月（ASR 3,000 分钟/月）；AI 会员 Plus ¥138/月（6,000 分钟）；企业版 ¥9,900/年（18 万点）等。会议纪要按单场时长消耗额度。' },
    limits: { free: '体验版 AI 智能纪要 2 篇/人；妙记转写 300 分钟/月', overage: '按 AI 额度/会员档位；企业按点数套餐', data_training: '飞书企业数据条款与 AI 服务条款为准；国内产品', export: '纪要/逐字稿在飞书文档内，可导出', contract: '个人会员/企业年付' },
    must: ['api', 'docs'],
  },
  whisper: {
    summary: 'OpenAI 开源的语音转写模型：本地跑、MIT 许可，但没有官方说话人分离。',
    tasks: ['transcription', 'audio', 'privacy', 'local'],
    outputs: ['transcript'],
    pricing: { free: true, entry: 0, currency: 'USD', unit: 'local', label: '免费（自备算力）', source: 'https://github.com/openai/whisper', checked: '2026-11-25', note: '代码与模型 MIT；实际成本是 GPU/CPU 时间与电费，不是订阅费。' },
    limits: { free: '无云端额度；受本机算力/显存限制', overage: '无订阅超额；长音频要自己切段/批处理', data_training: '完全本地，音频不出机器（除非你另接云服务）', export: '输出 SRT/VTT/JSON/TXT', contract: 'MIT 许可' },
    must: ['local'],
  },
  'llama-cpp': {
    summary: 'C++ 本地推理引擎：GGUF 量化模型跑在 CPU/GPU/Apple Silicon 上。',
    tasks: ['local', 'deploy', 'privacy'],
    outputs: ['text', 'local'],
    pricing: { free: true, entry: 0, currency: 'USD', unit: 'local', label: '免费（自备算力）', source: 'https://github.com/ggml-org/llama.cpp', checked: '2026-11-25', note: 'MIT；成本是硬件与电费。' },
    limits: { free: '无订阅；受硬件限制', overage: '无', data_training: '本地运行，数据不出机器', export: 'OpenAI 兼容 server / CLI', contract: 'MIT' },
    must: ['local'],
  },
  ollama: {
    summary: '一条命令拉模型、起本地服务的运行器：适合先把本地模型跑起来。',
    tasks: ['local', 'deploy', 'privacy'],
    outputs: ['text', 'local'],
    pricing: { free: true, entry: 0, currency: 'USD', unit: 'local', label: '免费（自备算力）', source: 'https://github.com/ollama/ollama', checked: '2026-11-25', note: 'MIT；成本是硬件与电费。' },
    limits: { free: '无订阅；受硬件限制', overage: '无', data_training: '本地运行，数据不出机器', export: '本地 API/CLI；模型可迁走', contract: 'MIT（模型权重各自许可）' },
    must: ['local'],
  },
  chatgpt: {
    summary: '通用对话助手：写作、总结、代码、文件问答都在一个订阅里。',
    tasks: ['chat', 'writing', 'summarize', 'code'],
    outputs: ['text', 'code'],
    pricing: { free: true, entry: 20, currency: 'USD', unit: 'seat/month', label: '$20/月起', source: 'https://openai.com/chatgpt/pricing/', checked: '2026-11-25', note: 'Free $0；Plus $20/月；Pro $200/月（官方定价页；企业/团队另计）。' },
    limits: { free: '有每日消息/功能限制', overage: '升级 Plus/Pro 或 API', data_training: '消费者与企业条款不同；训练开关以账户设置为准', export: '文本/文件可导出；代码复制', contract: '个人订阅/团队' },
    must: ['api'],
  },
  'notebooklm': {
    summary: '把资料集变成可问答的笔记本：引用回原文，适合读文献/做研究底稿。',
    tasks: ['research', 'read', 'notes', 'summarize'],
    outputs: ['notes', 'citations', 'audio'],
    pricing: { free: true, entry: null, currency: 'USD', unit: 'unknown', label: '免费（Google 账户）', source: 'https://notebooklm.google.com/', checked: '2026-11-25', note: '个人 Google 账户可用；Workspace/企业档与额度以 Google 官方为准，本次不填价格。' },
    limits: { free: '来源数量/每日问答有额度，按官方帮助页', overage: 'Workspace/企业升级', data_training: 'Google 账户条款；企业版另看', export: '笔记/音频概览可导出（以产品为准）', contract: 'Google 账户/Workspace' },
    must: ['api'],
  },
  elicit: {
    summary: '学术文献检索与结构化抽取：把论文变成可筛选字段，适合做文献表。',
    tasks: ['research', 'read', 'evidence', 'tables'],
    outputs: ['table', 'citations', 'notes'],
    pricing: { free: true, entry: null, currency: 'USD', unit: 'unknown', label: '免费档 + 付费档（价格未核验）', source: 'https://elicit.com/', checked: '2026-11-25', note: '有免费与付费档；本次未抓到可引用的官方价目表，不填数字。' },
    limits: { free: '免费额度以产品内为准', overage: '付费档，未核验', data_training: '按官方隐私/条款', export: 'CSV/表格导出（以档位为准）', contract: '个人/团队' },
    must: ['api'],
  },
};

function readTracks() {
  const records = [];
  for (const cat of fs.readdirSync(TRACKS, { withFileTypes: true })) {
    if (!cat.isDirectory()) continue;
    const pdir = path.join(TRACKS, cat.name, 'products');
    if (!fs.existsSync(pdir)) continue;
    for (const file of fs.readdirSync(pdir).filter((f) => f.endsWith('.md'))) {
      const text = fs.readFileSync(path.join(pdir, file), 'utf8');
      const meta = parseFrontmatter(text);
      if (!meta.id) continue;
      const cn = meta.cn || {};
      const ov = OVERRIDES[meta.id] || {};
      const tasks = ov.tasks || CATEGORY_TASKS[cat.name] || ['chat'];
      const outputs = ov.outputs || CATEGORY_OUTPUTS[cat.name] || ['text'];
      records.push({
        id: meta.id,
        type: 'tool',
        name: meta.name || meta.id,
        nameEn: meta.nameEn || meta.name || meta.id,
        vendor: meta.vendor || '未标注',
        category: cat.name,
        form: meta.form || 'unknown',
        url: `https://tools.specul.com/${cat.name}/${meta.id}.html`,
        homepage: meta.homepage || '',
        summary: ov.summary || (meta.axes?.fit ? String(meta.axes.fit).replace(/\*\*依据：\*\*/g, '').trim().slice(0, 120) : '档案已收录；一句话定位待补。'),
        tasks,
        outputs,
        pricing: ov.pricing || {
          free: null, entry: null, currency: 'unknown', unit: 'unknown',
          label: '价格未核验', source: meta.homepage || '', checked: null,
          note: '工具档案不采价；需要价格时回官网或合同。',
        },
        limits: ov.limits || {
          free: 'unknown', overage: 'unknown', data_training: 'unknown',
          export: 'unknown', contract: 'unknown',
        },
        cn: {
          origin: cn.origin || 'unknown',
          direct: cn.direct || 'unknown',
          filing: cn.filing || 'unknown',
          verified: cn.verified || null,
          note: cn.direct_note || cn.filing_note || '',
        },
        hardware: cat.name === 'runner' ? 'local' : (meta.form === 'local-app' || meta.form === 'cli' ? 'mixed' : 'none'),
        must: ov.must || (cat.name === 'runner' ? ['local'] : []),
        license: meta.license || 'unknown',
        licenseEn: meta.licenseEn || '',
        last_verified: meta.last_verified || null,
        confidence: meta.confidence || 'unknown',
      });
    }
  }
  return records;
}

const LICENSE_RULES = {
  'apache-2.0': { commercial: 'yes', attribution: 'yes', mau: 'none', distillation: 'allowed', region: 'global', name: 'Apache-2.0', url: 'https://www.apache.org/licenses/LICENSE-2.0', quote: 'Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.' },
  mit: { commercial: 'yes', attribution: 'yes', mau: 'none', distillation: 'allowed', region: 'global', name: 'MIT', url: 'https://opensource.org/license/mit', quote: 'Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files...' },
  'agpl-3.0': { commercial: 'yes', attribution: 'yes', mau: 'none', distillation: 'unknown', region: 'global', name: 'AGPL-3.0', url: 'https://www.gnu.org/licenses/agpl-3.0.html', quote: 'AGPL 允许商用，但通过网络提供服务时通常要公开对应源码；改代码前让法务读原文。' },
  other: { commercial: 'unknown', attribution: 'unknown', mau: 'unknown', distillation: 'unknown', region: 'unknown', name: '厂商自定义许可（other）', url: '', quote: '模型卡标注 other；本次没有逐条读完原文，不能替你判断商用/蒸馏。' },
  'openmdw-1.1': { commercial: 'unknown', attribution: 'unknown', mau: 'unknown', distillation: 'unknown', region: 'unknown', name: 'OpenMDW-1.1', url: '', quote: 'OpenMDW 不是 OSI 标准许可；商用前读原文与厂商 FAQ。' },
  proprietary: { commercial: 'unknown', attribution: 'unknown', mau: 'unknown', distillation: 'unknown', region: 'unknown', name: '厂商专有条款', url: '', quote: '产品条款不是开源许可；商用/转售/自动化访问要按条款逐条确认。' },
};

function modelLicense(member, meta) {
  const raw = (meta?.license || '').toLowerCase();
  let id = 'other';
  if (raw.includes('apache')) id = 'apache-2.0';
  else if (raw === 'mit' || raw.includes('mit')) id = 'mit';
  else if (raw.includes('openmdw')) id = 'openmdw-1.1';
  else if (!raw) {
    const note = (member.note || '').toLowerCase();
    if (note.includes('apache')) id = 'apache-2.0';
    else if (note.includes('mit')) id = 'mit';
    else if (note.includes('openmdw')) id = 'openmdw-1.1';
  }
  return { id, ...LICENSE_RULES[id], source: `https://huggingface.co/${member.repo}`, checked: '2026-11-25', raw: meta?.license || member.note || 'unknown' };
}

function readModels() {
  const cache = JSON.parse(fs.readFileSync(path.join(HERE, '..', '..', 'models', 'data', 'meta-cache.json'), 'utf8'));
  const out = [];
  for (const s of SERIES) {
    for (const m of s.members || []) {
      const meta = cache[m.repo];
      const lic = modelLicense(m, meta);
      const seriesUrl = `https://models.specul.com/series/${s.code}/`;
      out.push({
        id: `model-${m.repo.replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase()}`,
        type: 'model',
        name: `${s.name.zh} · ${m.label.zh}`,
        nameEn: `${s.name.en} · ${m.label.en}`,
        vendor: s.vendor.zh,
        category: 'models',
        form: 'local-weights',
        url: seriesUrl,
        homepage: `https://huggingface.co/${m.repo}`,
        summary: `${m.role?.zh || ''}${m.role ? '；' : ''}${s.positions?.slice(0, 2).join('、') || ''}。量化页在模型站。`,
        tasks: ['local', 'deploy', 'chat', 'code'],
        outputs: ['text'],
        pricing: { free: true, entry: 0, currency: 'USD', unit: 'local', label: '免费（自备算力）', source: `https://huggingface.co/${m.repo}`, checked: '2026-11-25', note: '权重免费下载；成本是硬件、电费与部署时间。许可见许可证页。' },
        limits: { free: '无订阅；受显存/上下文限制', overage: '无', data_training: '本地权重，推理数据不出机器（除非你接云）', export: '权重可下载；量化格式以模型页为准', contract: lic.name },
        cn: { origin: s.vendor.zh.includes('阿里') || s.vendor.zh.includes('智谱') || s.vendor.zh.includes('月之暗面') || s.vendor.zh.includes('面壁') ? 'domestic' : 'foreign', direct: 'yes', filing: 'unknown', verified: null, note: '权重可下载不等于可在境内直接提供生成服务；对外服务需按备案/安全评估要求核对。' },
        hardware: 'local',
        must: ['local'],
        license: lic,
        last_verified: null,
        confidence: 'model-card',
      });
    }
  }
  return out;
}

function readLicenses(tools, models) {
  const out = [];
  for (const m of models) {
    out.push({
      id: `lic-${m.id}`,
      type: 'model',
      name: m.name,
      vendor: m.vendor,
      license: m.license,
      url: m.url,
      source: m.license.source,
      checked: m.license.checked,
      summary: m.summary,
    });
  }
  const wanted = ['whisper', 'ollama', 'llama-cpp', 'vllm', 'sglang', 'jan', 'koboldcpp', 'localai', 'mlx', 'kagi', 'cursor', 'copilot', 'claude-code', 'perplexity', 'otter', 'fireflies-ai', 'feishu-ai'];
  for (const id of wanted) {
    const t = tools.find((x) => x.id === id);
    if (!t) continue;
    let lic;
    const text = `${t.license} ${t.licenseEn}`.toLowerCase();
    if (id === 'kagi') {
      lic = { id: 'kagi-frontend', ...LICENSE_RULES.proprietary, name: 'Kagi 服务条款（前端非商业）', commercial: 'no', attribution: 'unknown', mau: 'unknown', distillation: 'unknown', source: 'https://kagi.com/pricing', checked: '2026-11-25', quote: '工具档案写明：前端产品默认非商业使用，商业使用仅限 API 产品；以官方条款原文为准。' };
    } else if (id === 'whisper' || text.includes('mit')) {
      lic = { id: 'mit', ...LICENSE_RULES.mit, source: t.homepage, checked: '2026-11-25' };
    } else if (text.includes('apache')) {
      lic = { id: 'apache-2.0', ...LICENSE_RULES['apache-2.0'], source: t.homepage, checked: '2026-11-25' };
    } else if (text.includes('agpl')) {
      lic = { id: 'agpl-3.0', ...LICENSE_RULES['agpl-3.0'], source: t.homepage, checked: '2026-11-25' };
    } else {
      lic = { id: 'proprietary', ...LICENSE_RULES.proprietary, source: t.homepage, checked: '2026-11-25' };
    }
    out.push({ id: `lic-${t.id}`, type: 'tool', name: t.name, vendor: t.vendor, license: lic, url: t.url, source: lic.source, checked: lic.checked, summary: t.summary });
  }
  return out;
}

const tools = readTracks();
const models = readModels();
const licenses = readLicenses(tools, models);

const data = {
  generated_at: new Date().toISOString(),
  source_note: '价格与许可以官方页为准；unknown 是合法值，不补猜。',
  counts: {
    tools: tools.length,
    models: models.length,
    licenses: licenses.length,
    priced_tools: tools.filter((t) => typeof t.pricing.entry === 'number').length,
  },
  tools,
  models,
  licenses,
};

fs.writeFileSync(OUT, JSON.stringify(data, null, 2) + '\n', 'utf8');
console.log(`decision-data: ${tools.length} tools / ${models.length} models / ${licenses.length} licenses`);
console.log(`priced tools: ${data.counts.priced_tools}`);
