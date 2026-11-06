/* 可填写工作表界面（计划 7.3）
 * 为什么要有这个文件：`toolkit-worksheets` 指南原先只给 JSON 模板下载，读者要自己找工具打开，
 * 站点里并没有「能填」的界面。这里把同一份四张表的字段做成真表单：
 * 勾选框与输入框都是原生 HTML，禁用脚本仍然可填、可打印；只有「复制成 markdown」需要脚本。
 * 与 cost-workbench 同一注入契约：由 sites/build.mjs 在对应指南页里调用。
 */
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
const version = createHash('sha256').update(readFileSync(new URL('worksheet-form.js', import.meta.url))).digest('hex').slice(0, 12);
const bi = (zh, en) => `<span data-zh>${zh}</span><span data-en>${en}</span>`;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** 四张表的字段真相与指南一致（指南改了这里就要改，构建期由 expansion-check 兜底） */
const CHECKLISTS = [
  {
    id: 'kickoff',
    zh: '1. 项目立项检查表',
    en: '1. Project kickoff checklist',
    items: [
      ['goal', '目标一句话：要解决谁的什么问题', 'One-sentence goal: whose problem, solved how'],
      ['nogoals', '不做清单：明确不做什么', 'Not-doing list: what this project excludes'],
      ['data', '数据来源与许可：能否使用、能否留存', 'Data source and licence: usable? retainable?'],
      ['models', '模型与工具：主选、备选、许可证', 'Models and tools: primary, fallback, licences'],
      ['budget', '成本上限：月调用/硬件/人力', 'Cost ceiling: monthly calls / hardware / people'],
      ['acceptance', '验收指标：三条可量化', 'Acceptance metrics: three countable ones'],
      ['rollback', '失败回滚：谁负责、怎么退', 'Rollback: who owns it, how to step back'],
      ['timebox', '时间盒：到哪天必须评审', 'Time box: the date a review must happen'],
    ],
  },
  {
    id: 'prepublish',
    zh: '2. 内容发布前检查表',
    en: '2. Pre-publication checklist',
    items: [
      ['facts', '事实：每条结论有来源与日期', 'Facts: every conclusion has a source and a date'],
      ['quotes', '引文：单条不超过 100 字符或一句', 'Quotes: one line, under 100 characters'],
      ['rights', '权利：图片/音乐/字体/数字人许可已登记', 'Rights: image, audio, font and avatar licences recorded'],
      ['privacy', '隐私：无客户姓名、订单号、密钥', 'Privacy: no customer names, order ids or secrets'],
      ['label', '标注：需要 AI 生成标注的平台已标注', 'Labelling: platforms that require AI labels are labelled'],
      ['version', '版本：模型版本与生成参数已存档', 'Version: model version and generation parameters archived'],
      ['a11y', '可访问性：字幕、对比度、替代文本', 'Accessibility: captions, contrast, alternative text'],
      ['withdraw', '回滚：发布后 24 小时内可撤', 'Withdrawal: can be pulled within 24 hours'],
    ],
  },
];

/** 两张表格式工作表：行 × 列固定，逐格填写 */
const TABLES = [
  {
    id: 'migration',
    zh: '3. 模型迁移评估表',
    en: '3. Model migration assessment',
    cols: [['old', '旧模型', 'Old model'], ['new', '新模型', 'New model'], ['verdict', '结论', 'Verdict']],
    rows: [
      ['context', '上下文窗口', 'Context window'],
      ['schema', '工具调用 schema', 'Tool-call schema'],
      ['stream', '流式与错误码', 'Streaming and error codes'],
      ['zh', '中文质量（20 条）', 'Chinese quality (20 samples)'],
      ['code', '代码/结构化输出（20 条）', 'Code and structured output (20 samples)'],
      ['halluc', '幻觉率（20 条）', 'Hallucination rate (20 samples)'],
      ['price', '单价与配额', 'Price and quota'],
      ['licence', '许可证与商用', 'Licence and commercial use'],
      ['rollback', '回滚方案', 'Rollback plan'],
    ],
    note: ['样本条数与判法由你定，表里不预设结论；填不出的一格写「未测」，不要留空当通过。', 'Set the sample size and rubric yourself. Write "not tested" instead of leaving a cell blank as if it passed.'],
  },
  {
    id: 'leakmap',
    zh: '4. 数据泄露路径排查表',
    en: '4. Data exposure path map',
    cols: [['out', '是否出网', 'Leaves the machine'], ['retained', '留存多久', 'How long retained'], ['training', '是否训练', 'Used for training'], ['control', '控制措施', 'Control in place']],
    rows: [
      ['chat', '聊天输入', 'Chat input'],
      ['upload', '上传文件', 'Uploaded files'],
      ['tools', '工具调用参数', 'Tool-call arguments'],
      ['logs', '日志与追踪', 'Logs and tracing'],
      ['cache', '缓存与索引', 'Cache and indexing'],
      ['backup', '备份', 'Backups'],
      ['vendors', '第三方子处理者', 'Third-party sub-processors'],
    ],
    note: ['每一格只写官方写过的；查不到写「未说明」，不要把「没找到禁止条款」写成「允许」。', 'Fill each cell with what the official terms actually say. Write "not stated" — never turn "we found no prohibition" into "it is allowed".'],
  },
];

function checklistBlock(list) {
  const rows = list.items.map(([key, zh, en], i) => `            <li class="ws-item">
              <input type="checkbox" id="ws-${list.id}-${key}" data-ws="${list.id}" data-key="${key}" />
              <label for="ws-${list.id}-${key}">${bi(esc(zh), esc(en))}</label>
              <input type="text" class="ws-note" id="ws-${list.id}-${key}-note" data-ws="${list.id}" data-key="${key}" data-note="1" data-ui-aria-label-zh="${esc(zh)}" data-ui-aria-label-en="${esc(en)}" maxlength="400" />
            </li>`).join('\n');
  return `        <section class="ws-block" data-ws-block="${list.id}">
          <h3>${bi(esc(list.zh), esc(list.en))}</h3>
          <ul class="ws-list">
${rows}
          </ul>
        </section>`;
}

function tableBlock(t) {
  const head = `            <tr><th scope="col">${bi('项目', 'Item')}</th>${t.cols.map(([c, zh, en]) => `<th scope="col">${bi(esc(zh), esc(en))}</th>`).join('')}</tr>`;
  const body = t.rows.map(([rk, rzh, ren]) => `            <tr>
              <th scope="row">${bi(esc(rzh), esc(ren))}</th>
${t.cols.map(([c, czh, cen]) => `              <td><input type="text" class="ws-cell" data-ws="${t.id}" data-row="${rk}" data-col="${c}" data-ui-aria-label-zh="${esc(`${rzh} — ${czh}`)}" data-ui-aria-label-en="${esc(`${ren} — ${cen}`)}" maxlength="200" />`).join('\n')}
            </tr>`).join('\n');
  return `        <section class="ws-block" data-ws-block="${t.id}">
          <h3>${bi(esc(t.zh), esc(t.en))}</h3>
          <div class="ws-table-wrap">
            <table class="ws-table">
${head}
${body}
            </table>
          </div>
          <p class="t-sm">${bi(esc(t.note[0]), esc(t.note[1]))}</p>
        </section>`;
}

export function worksheetWorkbench() {
  return `
        <section class="ws-workbench" id="worksheet-workbench" aria-labelledby="ws-title">
          <h2 id="ws-title">${bi('在这里直接填', 'Fill it in right here')}</h2>
          <p>${bi('下面四张表与本页指南里的模板同字段，填完可复制成 markdown 贴进你自己的文档，或直接打印。填写内容只留在这一页，不上传、不保存到浏览器之外。', 'These four worksheets carry the same fields as the templates described above. Fill them in, then copy the result as markdown into your own document, or print the page. What you type stays on this page: nothing is uploaded and nothing is stored beyond this tab.')}</p>
          <p class="ws-actions">
            <button type="button" id="ws-copy">${bi('复制成 markdown', 'Copy as markdown')}</button>
            <button type="button" id="ws-print">${bi('打印本表', 'Print these sheets')}</button>
            <button type="button" id="ws-clear">${bi('清空', 'Clear all')}</button>
          </p>
          <p class="t-sm" id="ws-status" role="status" aria-live="polite"></p>
${CHECKLISTS.map(checklistBlock).join('\n')}
${TABLES.map(tableBlock).join('\n')}
          <noscript><p class="t-sm">${bi('未开启脚本：勾选框、输入框与表格仍可直接填写，打印用浏览器的打印功能；只有「复制成 markdown」不可用。', 'Without JavaScript the checkboxes, inputs and tables are still fillable and printable from your browser; only "copy as markdown" is unavailable.')}</p></noscript>
          <script src="../../worksheet-form.js?v=${version}" defer></script>
        </section>`;
}
