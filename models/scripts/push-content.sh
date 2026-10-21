#!/usr/bin/env bash
# 推送内容仓 speculcom/ai-quantized-llm：数据 + 脚本 + 文档。
# 目的：方法论可复现、可审计 —— 访客能自己重跑一遍验证我们的数字。
# 不推 site/（部署仓的产物）、不推探针 JSON、p1-* 是一次性脚本。
set -euo pipefail

export PATH="C:/Users/chenhua/Desktop/1/PortableGit/versions/1.2.0/bin:$PATH"
# PAT 从环境变量读，不写进仓库（GitHub 密钥扫描会拦含 ghp_ 的文件）。
# 用法：GH_TOKEN=ghp_xxx bash push-content.sh
GH_TOKEN="${GH_TOKEN:?请先设置 GH_TOKEN 环境变量}"
export GH_TOKEN
GH="${GH_BIN:-/c/Users/chenhua/Desktop/1/gh_cli/bin/gh.exe}"
REPO="speculcom/ai-quantized-llm"
SRC="C:/Users/chenhua/Desktop/specul/_data/models"
TMP="$TEMP/gh-content-$$.json"
LIST="$TEMP/gh-content-$$.txt"

cd /c/Users/chenhua/Desktop/specul

echo "═══ 推送内容仓 $REPO ═══"

if ! "$GH" api "repos/$REPO" >/dev/null 2>&1; then
  echo "· 仓库不存在，创建中…"
  "$GH" repo create "$REPO" --public --disable-issues \
    --description "本地部署量化模型图谱的数据层：从 Hugging Face 公开 API 采集 GGUF 量化变体、许可、体积与上下文，按四级打分选系列。只索引不托管权重，每条数据标注来源。"
fi

# 收集文件：排除部署产物、探针、一次性脚本
(cd "$SRC" && find . -type f \
  | sed 's|^\./||' \
  | grep -v '^site/' \
  | grep -v '^scripts/probe' \
  | grep -v '^scripts/p1-' \
  | grep -v '^scripts/diagnose' \
  | grep -v '^docs/probe-' \
  | grep -v '^docs/collect-log' \
  | sort) > "$LIST"

NFILES=$(wc -l < "$LIST" | tr -d ' ')
echo "待推 $NFILES 个文件"

ok=0; fail=0; skip=0
while IFS= read -r rel; do
  [ -z "$rel" ] && continue
  sha="$("$GH" api "repos/$REPO/contents/$rel" --jq '.sha' 2>/dev/null || echo '')"

  # 内容未变就跳过：算本地 git blob sha1，与远程 blob sha 直接比。
  # 不加这段每次都重推全部文件 —— 40+ 次 PUT 各触发一次 Pages 构建，纯浪费。
  if [ -n "$sha" ]; then
    local_sha=$(node -e '
      const crypto=require("crypto"), fs=require("fs");
      const b=fs.readFileSync(process.argv[1]);
      console.log(crypto.createHash("sha1")
        .update(Buffer.concat([Buffer.from("blob "+b.length+"\0"), b]))
        .digest("hex"));
    ' "$SRC/$rel")
    if [ "$local_sha" = "$sha" ]; then
      skip=$((skip+1)); continue
    fi
  fi

  node -e '
    const fs=require("fs");
    const src=process.argv[1], rel=process.argv[2], sha=process.argv[3], out=process.argv[4];
    const buf=fs.readFileSync(src+"/"+rel);
    const body={message:"data: "+rel, content:buf.toString("base64"), branch:"main"};
    if(sha) body.sha=sha;
    fs.writeFileSync(out, JSON.stringify(body));
  ' "$SRC" "$rel" "$sha" "$TMP"
  if out=$("$GH" api -X PUT "repos/$REPO/contents/$rel" --input "$TMP" 2>&1); then
    ok=$((ok+1)); echo "  v $rel"
  else
    fail=$((fail+1)); echo "  x $rel"; echo "$out" | head -3
  fi
done < "$LIST"

echo ""
echo "更新 $ok | 未变跳过 $skip | 失败 $fail"
echo "内容仓：https://github.com/$REPO"
