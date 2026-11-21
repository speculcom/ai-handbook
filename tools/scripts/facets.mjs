/* 工具档案的分面视图（2026-11-21）
 * ----------------------------------------------------------------------------
 * 目的：不新增「事实字段」，只把档案里已经有的 track / form / tags / license / cn
 * 翻译成读者能筛的四个面：
 *   - jobs      这产品主要替人干什么（可多值；第一个是主任务）
 *   - deployment 跑在哪（本地 / 云端 / 混合 / 未核）
 *   - licenseKind 许可形态（开源 / 商业条款 / 有限制 / 未核）
 *   - cost      计费形态（开源 / 有免费档 / 付费 / 未核；不落价格）
 * 口径写在页面上：这些是「视图」，不是新的事实；判断仍以档案正文与官方源为准。
 * -------------------------------------------------------------------------- */

export const JOB_LABEL = {
  chat: ['对话问答', 'Chat & Q&A'],
  code: ['写代码', 'Code'],
  image: ['做图 / 设计', 'Image / design'],
  video: ['做视频', 'Video'],
  music: ['做音乐', 'Music'],
  speech: ['语音 / 配音', 'Speech / voice'],
  research: ['做研究', 'Research'],
  office: ['办公交付', 'Office work'],
  agent: ['搭智能体', 'Build agents'],
  local: ['本机跑模型', 'Run locally'],
  eval: ['评测 / 发布', 'Eval / release'],
  safety: ['安全 / 合规', 'Safety / compliance'],
  robot: ['机器人 / 硬件', 'Robots / hardware'],
  '3d': ['3D / 数字人', '3D / avatars'],
  data: ['数据 / 训练', 'Data / training'],
  game: ['做游戏', 'Games'],
  prompts: ['写提示词', 'Prompts'],
  mcp: ['接工具 / MCP', 'Tools / MCP'],
  automation: ['自动化工作流', 'Automation'],
};

export const JOB_KEYS = Object.keys(JOB_LABEL);

export const DEPLOY_LABEL = {
  local: ['本地 / 自托管', 'Local / self-hosted'],
  cloud: ['云端 / API', 'Cloud / API'],
  hybrid: ['本地 + 云端', 'Local + cloud'],
  unknown: ['未核', 'Not checked'],
};

export const LICENSE_LABEL = {
  open: ['开源许可', 'Open licence'],
  terms: ['商业条款', 'Commercial terms'],
  restricted: ['有限制', 'Restricted'],
  unknown: ['未核', 'Not checked'],
};

export const COST_LABEL = {
  'open-source': ['开源免费', 'Open source'],
  freemium: ['有免费档', 'Free tier'],
  paid: ['付费', 'Paid'],
  unknown: ['未核', 'Not checked'],
};

const TRACK_PRIMARY = {
  coding: 'code',
  chat: 'chat',
  image: 'image',
  video: 'video',
  audio: 'speech',
  research: 'research',
  office: 'office',
  automation: 'automation',
  framework: 'agent',
  mcp: 'mcp',
  runner: 'local',
  safety: 'safety',
};

/* 标签 → 任务。只加「标签已经明说」的第二任务，不靠猜。 */
const TAG_JOB = [
  [/(^|\s|[，,、])编程|编码agent|代码库|代码生成|ide|cli/i, 'code'],
  [/机器人|仿真|具身|ros|isaac|mujoco|gazebo|drake/i, 'robot'],
  [/音乐|作曲|编曲|bgm/i, 'music'],
  [/tts|语音合成|声音克隆|配音|语音生成/i, 'speech'],
  [/转写|语音识别|asr|会议记录|字幕/i, 'speech'],
  [/会议|文档|表格|演示|幻灯片|邮件|翻译|写作|知识库|协作/i, 'office'],
  [/rag|检索|研究|论文|学术|引用/i, 'research'],
  [/游戏|game/i, 'game'],
  [/3d|数字人|avatar|虚拟人|建模/i, '3d'],
  [/视频|video|数字人口播/i, 'video'],
  [/图像|图片|修图|生图|海报|设计/i, 'image'],
  [/数据|标注|训练|微调|数据集/i, 'data'],
  [/eval|评测|基准|observability|观测/i, 'eval'],
  [/guardrails|护栏|安全|合规|红队|审计|溯源|脱敏|内容过滤/i, 'safety'],
  [/工作流|自动化|workflow|rpa|低代码/i, 'automation'],
  [/mcp/i, 'mcp'],
  [/agent|智能体|多agent|编排/i, 'agent'],
  [/本地推理|本地运行|自托管|gguf|离线|本地模型|本机/i, 'local'],
  [/提示词|prompt/i, 'prompts'],
  [/对话|聊天|chat|助手/i, 'chat'],
];

const uniq = (xs) => [...new Set(xs.filter(Boolean))];

function deploymentOf({ form, tags }) {
  const s = tags.join(' ').toLowerCase();
  const local = /本地|自托管|本地推理|gguf|离线|本地stdio|本地模型|开源权重|本地部署|本机|self-host|local/.test(s);
  const cloud = /云端|云托管|api|api平台|远程托管|厂商云|saas|云服务|网页|cloud|hosted/.test(s);
  if (local && cloud) return 'hybrid';
  if (local) return 'local';
  if (cloud) return 'cloud';
  if (['local-app', 'cli', 'harness', 'ide'].includes(form)) return 'local';
  if (['web', 'cloud', 'app'].includes(form)) return 'cloud';
  return 'unknown';
}

function licenseOf({ license, licenseEn, tags }) {
  const s = `${license || ''} ${licenseEn || ''}`.toLowerCase();
  const tagList = tags.map((t) => String(t).trim().toLowerCase());
  const openTag = tagList.some((t) => /^(mit|apache(?:-?2(?:\.0)?)?|bsd(?:-[23])?|gpl(?:v?[23])?|agpl|mpl(?:-2\.0)?|isc|unlicense|开源|open source)$/i.test(t));
  const restrictive = /不得用于商业|非商业|non-?commercial|research only|仅限研究|仅限个人|禁止商用|不得商用/.test(s);
  if (restrictive) return 'restricted';
  const openText = /\bmit\b|\bapache(?:-?2(?:\.0)?)?\b|\bbsd(?:-[23])?(?:-clause)?\b|\bgpl(?:v?[23])?\b|\bagpl\b|\bmpl(?:-2\.0)?\b|\bisc\b|\bunlicense\b/.test(s);
  if (openText || openTag) return 'open';
  if (s.trim()) return 'terms';
  return 'unknown';
}

function costOf({ tags, licenseKind }) {
  const s = tags.join(' ').toLowerCase();
  if (licenseKind === 'open') return 'open-source';
  if (/免费\+订阅|免费\+登录|免费\+付费|免费档|freemium|free tier/.test(s)) return 'freemium';
  if (/付费|订阅|商业|企业向|api|按量|paid|subscription/.test(s)) return 'paid';
  return 'unknown';
}

function vendorKeyOf(vendor) {
  return String(vendor || '')
    .replace(/（[^）]*）/g, '')
    .replace(/\([^)]*\)/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

export function deriveFacets({ track, form, tags = [], license = '', licenseEn = '', vendor = '', family = '' }) {
  const tagList = Array.isArray(tags) ? tags : String(tags).split(/[,，]/).map((x) => x.trim()).filter(Boolean);
  const primary = track === 'framework' && family === 'robotics' ? 'robot' : (TRACK_PRIMARY[track] || 'unknown');
  const extra = [];
  for (const [re, job] of TAG_JOB) if (re.test(tagList.join(' '))) extra.push(job);
  const jobs = uniq([primary, ...extra]).slice(0, 4);
  const licenseKind = licenseOf({ license, licenseEn, tags: tagList });
  return {
    jobs,
    primaryJob: jobs[0],
    deployment: deploymentOf({ form, tags: tagList }),
    licenseKind,
    cost: costOf({ tags: tagList, licenseKind }),
    vendorKey: vendorKeyOf(vendor),
  };
}

/* 任务矩阵用的 16 个首页任务 → 分面任务。
 * 一行只对应一个主任务，避免「做游戏」把全部编程/图像档案都算进来；
 * 空白格是覆盖缺口，应该如实露出来，而不是用相邻任务凑数。 */
export const TASK_KEYS = [
  { key: 'code', zh: '写代码 / 做网页', en: 'Code / build a page', jobs: ['code'] },
  { key: 'video', zh: '做视频', en: 'Video', jobs: ['video'] },
  { key: 'game', zh: '做游戏', en: 'Games', jobs: ['game'] },
  { key: 'music', zh: '做音乐', en: 'Music', jobs: ['music'] },
  { key: 'research', zh: '做研究 / 写报告', en: 'Research / reports', jobs: ['research'] },
  { key: 'office', zh: '办公 / 表格 / 会议', en: 'Office / sheets / meetings', jobs: ['office'] },
  { key: 'prompts', zh: '写提示词', en: 'Prompts', jobs: ['prompts'] },
  { key: 'robot', zh: '机器人 / 硬件', en: 'Robots / hardware', jobs: ['robot'] },
  { key: 'agent', zh: '搭智能体', en: 'Build agents', jobs: ['agent'] },
  { key: 'local', zh: '本机跑模型', en: 'Run models locally', jobs: ['local'] },
  { key: 'speech', zh: '语音 / 配音', en: 'Speech / dubbing', jobs: ['speech'] },
  { key: 'eval', zh: '评测 / 发布', en: 'Eval / release', jobs: ['eval'] },
  { key: 'image', zh: '做图 / 设计', en: 'Images / design', jobs: ['image'] },
  { key: '3d', zh: '3D / 数字人', en: '3D / digital humans', jobs: ['3d'] },
  { key: 'data', zh: '数据 / 训练', en: 'Data / training', jobs: ['data'] },
  { key: 'safety', zh: '安全 / 合规', en: 'Safety / compliance', jobs: ['safety'] },
];

export function hasJob(entry, job) {
  return !!(entry.facets && entry.facets.jobs.includes(job));
}

export function countJobs(entries) {
  const out = {};
  for (const e of entries) for (const j of (e.facets?.jobs || [])) out[j] = (out[j] || 0) + 1;
  return out;
}
