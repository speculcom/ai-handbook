/* Local arithmetic only. No requests, analytics or persistence. */
(() => {
  const form = document.querySelector('#cost-workbench-form');
  if (!form) return;
  const state = new Map();
  const english = () => document.documentElement.lang.startsWith('en');
  const format = n => new Intl.NumberFormat(english() ? 'en' : 'zh', {maximumFractionDigits: 6}).format(n);
  function evaluate(group) {
    const values = {};
    for (const input of group.querySelectorAll('input')) {
      if (input.value.trim() === '') return {error: 'missing'};
      const n = Number(input.value);
      if (!Number.isFinite(n) || n < 0 || !input.validity.valid) return {error: 'invalid'};
      values[input.name] = n;
    }
    const v = values;
    const id = group.dataset.costGroup;
    let total, formula;
    if (id === 'api') {
      if (![v.tasks,v.calls,v.retries,v.tools].every(Number.isInteger)) return {error:'invalid'};
      const count = v.tasks * (v.calls + v.retries);
      const model = count * (v.input*v.inputRate + v.cached*v.cachedRate + v.output*v.outputRate)/1e6;
      const tool = v.tasks*v.tools*v.toolRate;
      total = model + tool;
      formula = `${v.tasks} × (${v.calls} + ${v.retries}) × (${v.input} × ${v.inputRate} + ${v.cached} × ${v.cachedRate} + ${v.output} × ${v.outputRate}) / 1000000 + ${v.tasks} × ${v.tools} × ${v.toolRate}`;
    } else if (id === 'team') {
      if (!Number.isInteger(v.seats)) return {error:'invalid'};
      total = v.seats*v.seatRate + v.hours*v.hourRate + v.fixed;
      formula = `${v.seats} × ${v.seatRate} + ${v.hours} × ${v.hourRate} + ${v.fixed}`;
    } else if (id === 'local') {
      if (v.months <= 0 || v.dailyHours > 24 || v.days > 31) return {error:'invalid'};
      total = v.hardware/v.months + v.power*v.dailyHours*v.days*v.electricRate + v.maintenance;
      formula = `${v.hardware} / ${v.months} + ${v.power} × ${v.dailyHours} × ${v.days} × ${v.electricRate} + ${v.maintenance}`;
    } else {
      if (v.attempts < 1 || ![v.shots,v.attempts].every(Number.isInteger)) return {error:'invalid'};
      total = v.shots*v.seconds*v.attempts*v.secondRate + v.editing;
      formula = `${v.shots} × ${v.seconds} × ${v.attempts} × ${v.secondRate} + ${v.editing}`;
    }
    return Number.isFinite(total) ? {values,total,formula} : {error:'invalid'};
  }
  function render() {
    for (const group of form.querySelectorAll('[data-cost-group]')) {
      const id = group.dataset.costGroup;
      const result = evaluate(group);
      state.set(id,result);
      const output = document.querySelector(`#cost-result-${id}`);
      output.textContent = result.error === 'missing'
        ? (english() ? 'Fill every field in this group; enter 0 for costs that do not apply.' : '请填完本组数值；没有的费用请明确填 0。')
        : result.error ? (english() ? 'Check nonnegative values, whole-number counts, months > 0, hours ≤ 24 and days ≤ 31.' : '请检查非负数、整数次数、分摊月数大于 0、每日不超过 24 小时及每月不超过 31 天。')
        : `${english() ? 'Estimate (your currency, before tax)' : '估算金额（你填写的币种，未含税）'}: ${format(result.total)} = ${result.formula}`;
    }
  }
  form.addEventListener('input',render);
  form.addEventListener('submit',event => event.preventDefault());
  form.addEventListener('reset',() => setTimeout(render,0));
  document.addEventListener('specul:preferences',render);
  document.querySelector('#cost-export').addEventListener('click',() => {
    render();
    const snapshot = {source:location.href,created:new Date().toISOString(),currency:'user-supplied; one currency throughout',tax:'excluded',groups:Object.fromEntries(state)};
    const url = URL.createObjectURL(new Blob([JSON.stringify(snapshot,null,2)],{type:'application/json'}));
    const link = document.createElement('a');link.href=url;link.download='specul-cost-assumptions.json';link.click();setTimeout(() => URL.revokeObjectURL(url),1000);
  });
  render();
})();
