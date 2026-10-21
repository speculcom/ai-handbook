// ============================================================================
// agent 站的 shell —— **转出口**，不再是一份副本
// ----------------------------------------------------------------------------
// 2026-10-10 之前，这个文件是共享 shell 的一份**完整副本**（216 行）。
// 每次改骨架都要在这里跟一次 —— 这是「双份实现」固有的代价，
// 而且已经真的分叉过：副本里的 <body> 还留着 `style="--accent:..."` 内联，
// 而共享层早就把它删了（内联样式会赢过任何选择器，
// 于是亮色主题下的 accent 覆盖在 agent 站永远失效）。
//
// 现在：真身在 brand/shell.mjs（vendored 副本，哈希由 _audit/brand-sync.mjs 守住），
// 本文件只做转出。**全站外壳的生成逻辑只剩 _sites/_template/shell.mjs 一处。**
// 保留本文件的原因：agent 的 sites/build.mjs 用 `from './shell.mjs'` 静态导入，
// 克隆 agent 仓单独构建时（铁律 R3）这条相对路径必须存在。
//
// ⚠ 若 brand/shell.mjs 不存在（未 vendor），这里直接抛错而不是静默退回副本 ——
//   静默退回正是分叉的起点（agent 的英文品牌名曾因此变成 "Speculation · Craft"）。
// ============================================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const vendored = path.join(here, '..', 'brand', 'shell.mjs');

if (!fs.existsSync(vendored)) {
  throw new Error(
    `agent 站缺少 vendored 外壳：${vendored}\n` +
    `请先在主仓执行 node _tmp/vendor-brand.mjs（它把 _sites/_template/shell.mjs 拷进各内容仓的 brand/）。\n` +
    `本仓单独构建（node build.mjs）时同样需要它 —— 所以它必须随仓库一起提交。`
  );
}

const mod = await import(`file://${vendored.replace(/\\/g, '/')}`);

/* 只转出对外有用的那些，HEAD/BODY_START 之类内部用的不暴露。 */
export const BRAND = mod.BRAND;
export const NAV = mod.NAV;
export const OPEN_SOURCE_LABEL = mod.OPEN_SOURCE_LABEL;
export const BRIDGE = mod.BRIDGE;
export const header = mod.header;
export const drawer = mod.drawer;
export const tabbar = mod.tabbar;
export const footer = mod.footer;
export const shell = mod.shell;
export const esc = mod.esc;