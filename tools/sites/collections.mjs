import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { shell } from './shell.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT_DEFAULT = path.resolve(HERE, '../../../../_sites/agent.specul');
const bi = (zh, en) => `<span data-zh>${zh}</span><span data-en>${en}</span>`;
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/* 由 build.mjs 传入实际产物目录：主仓是 _sites/agent.specul，单仓克隆是 dist/。 */
export function buildCollections(OUT = OUT_DEFAULT) {

const C = [
  {
    file: 'collection-browser',
    kicker: ['横向集合 · 浏览器与电脑操作', 'Collection · browser and computer use'],
    h1: ['让 Agent 操作浏览器：哪一层该谁负责', 'Let an agent drive a browser: which layer does what'],
    lead: [
      '浏览器 Agent 常被当成一个产品，其实是四层：浏览器运行时（会话、Cookie、代理）、页面理解（DOM / 视觉 / 可访问性树）、动作执行（点击、输入、等待）与审计（截图、日志、回放）。这页把四层分别对应到已有条目。',
      'A browser agent is often sold as one product, but it is four layers: browser runtime (sessions, cookies, proxies), page understanding (DOM / vision / accessibility tree), action execution (click, type, wait) and audit (screenshots, logs, replay). This page maps each layer to an existing entry.'
    ],
    rows: [
      ['浏览器运行时', 'Browser runtime', [['/mcp/browserbase-mcp.html', 'Browserbase MCP：云端浏览器与会话', 'Browserbase MCP: cloud browser and sessions'], ['https://oss.specul.com/repos/steel-browser.html', 'Steel Browser：可自托管的浏览器 API', 'Steel Browser: self-hostable browser API']]],
      ['页面理解与动作', 'Page understanding and action', [['https://oss.specul.com/repos/browser-use.html', 'Browser Use：把页面元素交给模型决策', 'Browser Use: let the model choose page elements'], ['/mcp/playwright.html', 'Playwright：确定性脚本与选择器', 'Playwright: deterministic scripts and selectors'], ['/mcp/chrome-devtools-mcp.html', 'Chrome DevTools MCP：性能、网络与调试', 'Chrome DevTools MCP: performance, network, debugging']]],
      ['抓取与搜索', 'Fetch and search', [['/mcp/firecrawl-mcp.html', 'Firecrawl MCP：抓取、搜索与浏览器交互', 'Firecrawl MCP: crawl, search, browser interaction']]],
      ['常驻与编排', 'Always-on orchestration', [['/framework/hermes-agent.html', 'Hermes Agent：常驻、审批与跨平台消息', 'Hermes Agent: always-on, approvals, cross-platform messaging']]]
    ],
    steps: [
      ['先用确定性脚本跑通一个站点，确认选择器、等待与错误页', 'Run one site with a deterministic script first; confirm selectors, waits and error pages'],
      ['再把「选哪个元素」交给模型，保留截图与动作日志', 'Then let the model choose the element, keeping screenshots and an action log'],
      ['最后加会话隔离、代理与人工审批；不要在登录态上共用浏览器', 'Finally add session isolation, proxies and human approval; never share a browser session across logins']
    ],
    boundary: [
      '站群没有做过「同一站点多套浏览器 Agent」的成功率对比；这类成功率高度依赖站点改版、反爬与登录态，必须按你的目标站点复跑。涉及账号、支付与个人数据时，先确认服务条款与授权，不要用 Agent 绕过验证码或访问控制。',
      'The sites have not run a success-rate comparison across browser agents on the same site; success depends heavily on site changes, anti-bot measures and login state, so re-run on your target site. For accounts, payments and personal data, confirm the terms and authorisation first; do not use an agent to bypass CAPTCHAs or access controls.'
    ]
  },
  {
    file: 'collection-memory',
    kicker: ['横向集合 · Agent 记忆', 'Collection · agent memory'],
    h1: ['Agent 记忆：写什么、怎么读、什么时候忘', 'Agent memory: what to write, how to read, when to forget'],
    lead: [
      '「有记忆」不是把聊天记录全存下来。最少要分三层：工作记忆（当前任务）、情节记忆（做过什么）、语义记忆（稳定事实与偏好）。每层都要有写入策略、检索策略、过期与删除策略，否则记忆会变成噪声。',
      '“Having memory” is not storing every chat turn. At minimum, separate working memory (current task), episodic memory (what happened) and semantic memory (stable facts and preferences). Each layer needs write, retrieval, expiry and deletion policies, or memory becomes noise.'
    ],
    rows: [
      ['有状态 Agent 与分层记忆', 'Stateful agents and layered memory', [['/framework/letta.html', 'Letta：MemGPT 路线的分层记忆与服务器形态', 'Letta: MemGPT-style layered memory and server form'], ['/framework/langgraph.html', 'LangGraph：检查点、状态与长期记忆', 'LangGraph: checkpoints, state and long-term memory']]],
      ['编排与多 Agent 共享', 'Orchestration and multi-agent sharing', [['/framework/ag2.html', 'AG2：多 Agent 角色、持久化与上下文压缩', 'AG2: multi-agent roles, persistence and context compression'], ['/framework/agno.html', 'Agno：控制平面与记忆组件', 'Agno: control plane and memory components'], ['/framework/hermes-agent.html', 'Hermes Agent：跨会话记忆与技能', 'Hermes Agent: cross-session memory and skills']]],
      ['最小记忆服务', 'Minimal memory service', [['/mcp/memory.html', 'Memory MCP：本地读写记忆', 'Memory MCP: local read/write memory']]]
    ],
    steps: [
      ['先写「什么算稳定事实」，不要把所有对话都入库', 'Define what counts as a stable fact before storing every conversation'],
      ['给每条记忆加来源、时间、置信度与过期日', 'Attach source, time, confidence and expiry to each memory'],
      ['做删除与纠错路径：用户说「忘掉」时必须能真删', 'Build deletion and correction paths: when a user says “forget”, it must really delete']
    ],
    boundary: [
      '站群没有做过「多套记忆方案」的召回率、污染率或成本对比；记忆质量取决于你的写入规则与检索评测集。涉及个人数据时，存储位置、保留期限、删除请求与跨境传输要按适用法规处理，不能只靠产品默认设置。',
      'The sites have not compared recall, pollution rate or cost across memory schemes; quality depends on your write rules and retrieval test set. For personal data, storage location, retention, deletion requests and cross-border transfer follow applicable law; product defaults are not enough.'
    ]
  },
  {
    file: 'collection-realtime',
    kicker: ['横向集合 · 实时语音', 'Collection · realtime voice'],
    h1: ['实时语音 Agent：一条链路上的五个延迟点', 'Realtime voice agents: five latency points on one chain'],
    lead: [
      '实时语音不是「TTS + LLM」：端到端延迟由传输、VAD/打断、STT、LLM 首 token、TTS 首包五段叠加。先把每段的预算写出来，再选供应商；否则只换一个模型，用户还是觉得「慢半拍」。',
      'Realtime voice is not “TTS + LLM”: end-to-end latency is the sum of transport, VAD/interruption, STT, LLM first token and TTS first packet. Write a budget for each segment before choosing vendors; otherwise swapping one model still leaves the user feeling half a beat behind.'
    ],
    rows: [
      ['实时管线与传输', 'Realtime pipeline and transport', [['https://oss.specul.com/repos/livekit-agents.html', 'LiveKit Agents：WebRTC、VAD、打断与工具调用', 'LiveKit Agents: WebRTC, VAD, interruption, tool calls'], ['https://oss.specul.com/repos/pipecat.html', 'Pipecat：可观测的帧流管线', 'Pipecat: observable frame-stream pipeline']]],
      ['转写与语音识别', 'Transcription and STT', [['/audio/deepgram.html', 'Deepgram：实时流式转写', 'Deepgram: realtime streaming transcription']]],
      ['语音合成', 'Speech synthesis', [['/audio/cartesia.html', 'Cartesia：低延迟 TTS 与语音 Agent', 'Cartesia: low-latency TTS and voice agents'], ['/audio/murf.html', 'Murf：TTS、声音克隆与 API', 'Murf: TTS, voice cloning and API']]],
      ['数字人口播', 'Talking-head avatar', [['/video/d-id.html', 'D-ID：照片驱动与实时交互', 'D-ID: photo-driven and realtime interaction']]]
    ],
    steps: [
      ['先测「用户说完 → 第一段声音返回」的端到端时间，而不是单看 STT/TTS 延迟', 'Measure “user stops speaking → first audio back” end to end, not STT or TTS alone'],
      ['把打断做成状态机：用户一开口就停 TTS，再决定是否保留上下文', 'Make interruption a state machine: stop TTS when the user speaks, then decide what context to keep'],
      ['记录每段的 p50/p95 与失败原因；不要把厂商的「低延迟」当你的延迟', 'Record p50/p95 and failure reasons per segment; do not treat a vendor’s “low latency” as yours']
    ],
    boundary: [
      '站群没有做过跨供应商的端到端语音延迟对比；延迟受网络、地区、并发与语音长度影响，必须在你的部署区域复测。电话与录音场景还要处理同意、留存与敏感信息，不能默认录音。',
      'The sites have not run an end-to-end voice-latency comparison across vendors; latency depends on network, region, concurrency and utterance length, so re-test in your deployment region. Telephony and recording also require consent, retention and sensitive-data handling; recording is not a default.'
    ]
  },
  {
    file: 'collection-3d',
    kicker: ['横向集合 · 3D 与数字人', 'Collection · 3D and digital humans'],
    h1: ['3D 与数字人：先定交付，再选管线', '3D and digital humans: fix the deliverable, then the pipeline'],
    lead: [
      '「生成一个 3D 模型」和「做一个能口播的数字人」是两条不同的链路。前者关心几何、拓扑、UV 与材质；后者关心人脸/半身驱动、口型、表情与实时性。先写清交付物，再决定用生成、重建还是拍摄。',
      '“Generate a 3D model” and “make a talking-head avatar” are different chains. The first cares about geometry, topology, UVs and materials; the second about face/half-body driving, lip-sync, expression and real time. Write the deliverable first, then choose generation, reconstruction or capture.'
    ],
    rows: [
      ['3D 生成与重建', '3D generation and reconstruction', [['https://oss.specul.com/repos/hunyuan3d-2.html', 'Hunyuan3D-2：图像到 3D 的开源管线', 'Hunyuan3D-2: open image-to-3D pipeline']]],
      ['数字人与口播', 'Avatars and talking heads', [['/video/heygen.html', 'HeyGen：数字人、视频翻译与对口型', 'HeyGen: avatars, video translation, lip-sync'], ['/video/synthesia.html', 'Synthesia：企业培训与多语言配音', 'Synthesia: enterprise training and multilingual voice'], ['/video/d-id.html', 'D-ID：照片驱动与实时交互', 'D-ID: photo-driven and realtime interaction']]],
      ['镜头与 3D 捕捉', 'Camera and 3D capture', [['/video/luma.html', 'Luma：镜头运动、首尾帧与 3D 捕捉', 'Luma: camera motion, keyframes, 3D capture'], ['/video/pixverse.html', 'Pixverse：特效模板与实时世界模型', 'Pixverse: effect templates and realtime world models']]],
      ['实时生成与 LoRA', 'Realtime generation and LoRA', [['/image/krea.html', 'Krea：实时生成与 LoRA 训练', 'Krea: realtime generation and LoRA training']]]
    ],
    steps: [
      ['先做静帧：确认几何没有破面、贴图没有拉伸、比例正确', 'Do a still first: no broken faces, no stretched textures, correct scale'],
      ['再做动作：绑定、权重、口型与镜头运动分别验收', 'Then motion: rigging, weights, lip-sync and camera movement checked separately'],
      ['最后做实时：帧率、延迟与降级策略一起测', 'Finally real time: frame rate, latency and degradation tested together']
    ],
    boundary: [
      '站群没有做过「多套 3D/数字人管线」的几何精度、绑定质量与实时帧率对比；作品页只证明能产出，不证明可生产。肖像、声音、商标与合成内容标注要单独处理；商用前读模型与素材许可。',
      'The sites have not compared geometry accuracy, rigging quality or real-time frame rate across 3D/avatar pipelines; a showcase proves an output exists, not that it is production-ready. Likeness, voice, trademark and synthetic-content labelling need separate handling; read model and asset licences before commercial use.'
    ]
  },
  {
    file: 'collection-annotation',
    kicker: ['横向集合 · 数据标注', 'Collection · data annotation'],
    h1: ['数据标注：先定评测，再定标注格式', 'Data annotation: fix the evaluation before the format'],
    lead: [
      '标注不是「把框画完」。先写清这条数据要喂给哪个评测或训练任务，再决定标什么、谁复核、争议怎么处理。图像、视频、3D 与文本的标注工具不同，但质量流程相同：指南、预标、抽检、仲裁与版本。',
      'Annotation is not “finish drawing the boxes”. First write which evaluation or training task the data feeds, then decide what to label, who reviews and how disagreements are resolved. Image, video, 3D and text use different tools, but the quality process is the same: guideline, pre-label, sampling, arbitration and versioning.'
    ],
    rows: [
      ['图像 / 视频 / 3D 标注', 'Image / video / 3D annotation', [['https://oss.specul.com/repos/cvat.html', 'CVAT：轨迹、多视图、审核与团队协作', 'CVAT: tracks, multi-view, review, team collaboration'], ['https://oss.specul.com/repos/label-studio.html', 'Label Studio：多类型标注与轻量部署', 'Label Studio: multi-type annotation and light deployment']]],
      ['商业 · 自托管', 'Commercial · self-hosted', [['https://prodi.gy/', 'Prodigy：脚本化标注、模型在回路；$390 个人买断 / $490 每席（5 席起）', 'Prodigy: scriptable annotation with a model in the loop; $390 personal lifetime / $490 per seat in five-seat packs']]],
      ['文本与偏好数据', 'Text and preference data', [['https://oss.specul.com/repos/argilla.html', 'Argilla：文本标注、审核与数据集版本', 'Argilla: text annotation, review and dataset versions']]],
      ['评测与数据卡', 'Evaluation and dataset cards', [['https://models.specul.com/data/', '数据集卡：来源、许可、商用与质量 caveat', 'Dataset cards: source, licence, commercial use and quality caveats'], ['https://models.specul.com/evals/', '评测卡：测什么、怎么算、污染与复现', 'Benchmark cards: what is measured, scoring, contamination, reproduction']]]
    ],
    steps: [
      ['先写 10 条标注指南与 10 个边界样例，再开始批量标', 'Write a 10-item guideline and 10 boundary examples before batch labelling'],
      ['用预标注 + 人工复核，抽检比例与仲裁规则先定好', 'Use pre-labelling plus human review; fix the sampling rate and arbitration rules first'],
      ['把数据集版本、标注指南版本与模型评测版本绑定', 'Bind dataset version, guideline version and model evaluation version together']
    ],
    boundary: [
      '站群没有做过标注工具间的吞吐或一致性对比；标注质量取决于指南、人员培训与仲裁，不取决于工具品牌。Prodigy 是闭源商业工具，价格为 2026-11 官方页：个人 $390 买断、公司 $490/席（5 席起），均不含税。涉及个人数据、生物特征或敏感内容时，授权、脱敏与存储期限要单独处理。',
      'The sites have not compared annotation tools on throughput or inter-annotator agreement; quality depends on the guideline, training and arbitration, not the brand. Prodigy is closed-source and commercial: as of November 2026 its official page lists $390 for a personal lifetime licence and $490 per seat in five-seat packs, excluding tax. For personal data, biometrics or sensitive content, authorisation, de-identification and retention need separate handling.'
    ]
  }
];

for (const c of C) {
  const body = `<section class="section"><div class="container">
    <p class="kicker">${bi(...c.kicker)}</p>
    <h1>${bi(...c.h1)}</h1>
    <p class="lede">${bi(...c.lead)}</p>
    <p class="t-sm">${bi('这是一张“谁负责哪一段”的集合页，不重复写产品档案；点进去看每个条目的八维记录、来源与边界。', 'This is a “who owns which layer” collection, not a duplicate of product dossiers; open an entry for its eight axes, sources and boundaries.')}</p>
  </div></section>
  <section class="section"><div class="container">
    <h2>${bi('谁负责哪一段', 'Which layer does what')}</h2>
    <div class="table-wrap"><table class="cmp"><thead><tr><th>${bi('层', 'Layer')}</th><th>${bi('已有条目', 'Existing entries')}</th></tr></thead><tbody>
      ${c.rows.map(([zh, en, links]) => `<tr><td>${bi(zh, en)}</td><td>${links.map(([href, lzh, len]) => `<a href="${esc(href)}">${bi(lzh, len)}</a>`).join('<br>')}</td></tr>`).join('')}
    </tbody></table></div>
  </div></section>
  <section class="section"><div class="container">
    <h2>${bi('最小跑通顺序', 'Minimum working order')}</h2>
    <ol>${c.steps.map(([zh, en]) => `<li>${bi(zh, en)}</li>`).join('')}</ol>
  </div></section>
  <section class="section"><div class="container">
    <h2>${bi('边界', 'Boundary')}</h2>
    <p class="lede">${bi(...c.boundary)}</p>
    <p><a href="/">${bi('← 回工具首页', '← Back to tools')}</a></p>
  </div></section>`;
  const html = shell({
    current: 'agent',
    title: `${c.h1[0]} · 工具集合`,
    desc: c.lead[0],
    canonical: `https://tools.specul.com/${c.file}.html`,
    body
  });
  fs.writeFileSync(path.join(OUT, `${c.file}.html`), html);
  console.log(c.file);
}
}
