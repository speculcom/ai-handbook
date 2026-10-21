// 一次性脚本：把 config.js 里 5 处「规模待核」替换为实测反推值。
// 反推依据：同一模型各量化档的「文件字节数 ÷ 该档 bpw」取最密集簇的中位
//          （见 scripts/derive-params.mjs，已在密集模型上与官方声明交叉验证：
//           Qwen3.8-27B 反推 28.9B vs 声明 27B、gpt-oss-20b 19.2B vs 20B）。
//
// 措辞原则：**只写实测得到的事实**。MoE 模型不标「激活参数量」——
// HF 公开 API 不提供该字段，靠 config 结构参数推算是猜测，本站不呈现猜测值。
// 用户要判断显存，看 B 区按实测体积倒推的选档表即可，那才是可执行的依据。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const CFG = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'config.js');

// repo → 新的 params 文案
const REPL = {
  'Qwen/Qwen3.8-Flash-Next': '200B 总参（MoE，激活数未公开）',
  'zai-org/GLM-5.3': '754B 总参（MoE，激活数未公开）',
  'zai-org/GLM-5.3-Flash': '321B 总参（MoE，激活数未公开）',
  'deepseek-ai/DeepSeek-V4-Flash': '292B 总参（MoE，激活数未公开）',
  'moonshotai/Kimi-K3': '2669B 总参（MoE，激活数未公开）',
};

let src = fs.readFileSync(CFG, 'utf8');
let n = 0;
for (const [repo, val] of Object.entries(REPL)) {
  // 在 repo 之后的 400 字窗口内，把 params: '规模待核' 换掉
  const re = new RegExp("(repo:\\s*'" + repo.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + "'[\\s\\S]{0,400}?params:\\s*)'规模待核'");
  if (!re.test(src)) { console.log('  跳过（未匹配）', repo); continue; }
  src = src.replace(re, `$1'${val}'`);
  n++;
  console.log('  ✓', repo.padEnd(30), '→', val);
}
fs.writeFileSync(CFG, src);
console.log(`\n已替换 ${n} / ${Object.keys(REPL).length} 处`);
