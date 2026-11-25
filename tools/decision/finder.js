(function () {
  const data = window.SPECUL_DECISION_DATA;
  const form = document.getElementById('finder-form');
  const results = document.getElementById('finder-results');
  const title = document.getElementById('finder-title');
  if (!data || !form || !results) return;

  const TASK_LABEL = {
    research: '找资料/做研究', coding: '写代码/改代码', meeting: '会议记录',
    writing: '写文档/改稿', tables: '表格/数据', image: '图像', video: '视频',
    local: '本地跑模型', transcription: '语音转写', automation: '搭工作流',
    chat: '通用问答', privacy: '隐私/离线', search: '搜索', evidence: '证据/引用',
    docs: '文档', slides: '演示', summary: '摘要', audio: '音频', voice: '语音',
    music: '音乐', design: '设计', presentation: '演示', workflow: '工作流',
    agent: '智能体', build: '构建', integration: '集成', tools: '工具调用',
    deploy: '部署', safety: '安全', compliance: '合规', read: '读文献',
    notes: '笔记', crm: 'CRM', terminal: '终端', refactor: '重构', review: '评审',
    test: '测试', github: 'GitHub', cloud: '云端续跑',
  };

  function checkedTasks() {
    return Array.from(form.querySelectorAll('input[name="task"]:checked')).map((x) => x.value);
  }

  function money(p) {
    if (!p) return '价格未核验';
    if (p.label) return p.label;
    if (p.entry === 0) return '免费（自备算力）';
    if (typeof p.entry === 'number') return (p.currency === 'CNY' ? '¥' : '$') + p.entry;
    return '价格未核验';
  }

  function budgetPass(item, budget) {
    if (budget === 'any') return true;
    const p = item.pricing || {};
    if (budget === 'free') return p.free === true;
    if (typeof p.entry !== 'number') return true; // 未知价格保留，标“需确认”
    if (budget === 'under50') return p.entry <= 50;
    if (budget === 'under150') return p.entry <= 150;
    return true;
  }

  function score(item, tasks, opts) {
    let s = 0;
    const reasons = [];
    const flags = [];
    const hit = (item.tasks || []).filter((t) => tasks.includes(t));
    s += hit.length * 5;
    if (hit.length) reasons.push('任务命中：' + hit.map((t) => TASK_LABEL[t] || t).join('、'));

    if (opts.cite && (item.outputs || []).includes('citations')) {
      s += 3;
      reasons.push('产物含引用/来源');
    }
    if (opts.cn) {
      if (item.cn.direct === 'yes') { s += 2; reasons.push('国内直连已核验'); }
      else if (item.cn.direct === 'unknown') { flags.push('国内直连未核验'); }
      else { flags.push('国内直连不可用'); }
    }
    if (opts.local) {
      if (item.hardware === 'local') { s += 3; reasons.push('可在本地运行'); }
      else { flags.push('不是本地形态'); }
    }
    if (opts.sensitive === 'confidential') {
      if (item.hardware === 'local') { s += 3; reasons.push('数据可不出机器'); }
      else { flags.push('云端处理，机密数据需额外评估'); }
    }
    if (item.pricing && typeof item.pricing.entry === 'number') {
      s += 1;
      reasons.push('起步价：' + money(item.pricing));
      if (item.pricing.checked) reasons.push('价格核验 ' + item.pricing.checked);
    } else {
      flags.push('价格未核验');
    }
    if (item.cn && item.cn.direct === 'no') flags.push('需网络环境');
    if (item.limits && /未核验|unknown/.test(item.limits.data_training || '')) flags.push('数据训练口径未核验');
    if (item.license && /unknown|other|专有/.test(item.license)) flags.push('许可需读原文');
    return { s, reasons, flags };
  }

  function render() {
    const tasks = checkedTasks();
    if (!tasks.length) {
      title.textContent = '先选任务';
      results.innerHTML = '<p class="finder-empty">先在上面的“要它干什么”里至少选一项。</p>';
      return;
    }
    const opts = {
      budget: form.querySelector('input[name="budget"]:checked').value,
      cn: form.querySelector('input[name="cn"]').checked,
      local: form.querySelector('input[name="local"]').checked,
      cite: form.querySelector('input[name="cite"]').checked,
      sensitive: form.querySelector('input[name="sensitive"]:checked').value,
    };

    const pool = data.tools.concat(data.models || []);
    const scored = pool
      .filter((item) => (item.tasks || []).some((t) => tasks.includes(t)))
      .filter((item) => budgetPass(item, opts.budget))
      .filter((item) => !opts.cn || item.cn.direct !== 'no')
      .filter((item) => !opts.local || item.hardware === 'local')
      .filter((item) => !opts.cite || (item.outputs || []).includes('citations'))
      .filter((item) => opts.sensitive !== 'confidential' || item.hardware === 'local')
      .map((item) => ({ item, ...score(item, tasks, opts) }))
      .sort((a, b) => b.s - a.s || a.item.name.localeCompare(b.item.name, 'zh'));

    title.textContent = '按你的硬条件，先看这 ' + Math.min(3, scored.length) + ' 个';
    if (!scored.length) {
      results.innerHTML = '<p class="finder-empty">没有候选同时满足这些硬条件。试着放宽“只接受免费”或“必须本地”，或者去 <a href="/mcp/guides/compare-research-tools.html">逐项对照</a> 里手动找。</p>';
      return;
    }

    results.innerHTML = scored.slice(0, 3).map((x, i) => {
      const item = x.item;
      const strong = x.flags.length === 0;
      const cls = strong ? 'is-strong' : 'is-warn';
      const flagHtml = x.flags.length
        ? x.flags.map((f) => '<span class="flag flag-warn">' + f + '</span>').join('')
        : '<span class="flag flag-ok">主要条件已对上</span>';
      const taskText = (item.tasks || []).filter((t) => tasks.includes(t)).map((t) => TASK_LABEL[t] || t).join('、');
      return '<article class="finder-result ' + cls + '">' +
        '<div class="finder-rank"><span>候选 ' + (i + 1) + '</span><span>' + (item.type === 'model' ? '模型' : '工具') + '</span></div>' +
        '<h3><a href="' + item.url + '">' + item.name + '</a></h3>' +
        '<p class="finder-vendor">' + item.vendor + ' · ' + (item.category || '') + '</p>' +
        '<ul class="finder-why">' +
          x.reasons.map((r) => '<li>' + r + '</li>').join('') +
          '<li>匹配任务：' + taskText + '</li>' +
          '<li>许可：' + (item.license || '未核验') + '</li>' +
        '</ul>' +
        '<div class="finder-flags">' + flagHtml + '</div>' +
        '<div class="finder-links"><a href="' + item.url + '">看档案 →</a><a href="/costs/">算成本</a><a href="/guides/">找任务手册</a></div>' +
      '</article>';
    }).join('');
  }

  form.addEventListener('submit', function (e) { e.preventDefault(); render(); });
  form.addEventListener('change', render);
})();
