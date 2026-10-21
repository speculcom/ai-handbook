#!/usr/bin/env bash
# 部署 models 站到 speculcom/models。
# 为什么用 bash 而不是 node 脚本：本沙箱里 node 的 execFileSync 调 gh.exe
# 一律返回 EBUSY（spawnSync 层面失败），而 Bash 工具直接调 gh 正常。
set -euo pipefail

export PATH="C:/Users/chenhua/Desktop/1/PortableGit/versions/1.2.0/bin:$PATH"
# PAT 从环境变量读，不写进仓库（GitHub 密钥扫描会拦含 ghp_ 的文件）。
# 用法：GH_TOKEN=ghp_xxx bash deploy.sh
GH_TOKEN="${GH_TOKEN:?请先设置 GH_TOKEN 环境变量}"
export GH_TOKEN
GH="${GH_BIN:-/c/Users/chenhua/Desktop/1/gh_cli/bin/gh.exe}"
REPO="speculcom/models"
SITE="C:/Users/chenhua/Desktop/specul/_data/models/site"
TMP="$TEMP/gh-models-$$.json"

cd /c/Users/chenhua/Desktop/specul

echo "═══ 部署 $REPO ═══"

# 1. 列出待推文件（排除部署仓不需要的）
# 注意：不要用 mapfile < <(...) 进程替换 —— 本沙箱的路径钩子会误判并中止脚本。
# 先落成临时文件，再用 while read 逐行读。
LIST="$TEMP/models-files-$$.txt"
(cd "$SITE" && find . -type f | sed 's|^\./||' | sort) > "$LIST"
NFILES=$(wc -l < "$LIST" | tr -d ' ')
echo "待推 $NFILES 个文件"

# 2. 逐个 PUT（每个文件单独查一次远程 sha —— PUT 时不带 sha 会 422）
#    注：不需要预先拉整棵树，16 个文件逐个查更快也更简单。
ok=0; fail=0; skip=0
while IFS= read -r rel; do
  [ -z "$rel" ] && continue
  local_sha="$("$GH" api "repos/$REPO/contents/$rel" --jq '.sha' 2>/dev/null || echo '')"

  # 内容未变就跳过（git blob sha1 比对）。Pages 每次 commit 都触发一次构建，
  # 无谓重推 16 个文件 = 16 次构建，其中大部分会因构建中途文件不全而 failed。
  if [ -n "$local_sha" ]; then
    mine=$(node -e '
      const crypto=require("crypto"), fs=require("fs");
      const b=fs.readFileSync(process.argv[1]);
      console.log(crypto.createHash("sha1")
        .update(Buffer.concat([Buffer.from("blob "+b.length+"\0"), b]))
        .digest("hex"));
    ' "$SITE/$rel")
    if [ "$mine" = "$local_sha" ]; then
      skip=$((skip+1)); continue
    fi
  fi

  # 内容读取与 body 组装都交给 node（纯文件 IO，不 spawn 外部进程）
  node -e '
    const fs=require("fs");
    const site=process.argv[1], rel=process.argv[2], sha=process.argv[3], out=process.argv[4];
    const buf=fs.readFileSync(site+"/"+rel);
    const body={message:"deploy: "+rel, content:buf.toString("base64"), branch:"main"};
    if(sha) body.sha=sha;
    fs.writeFileSync(out, JSON.stringify(body));
  ' "$SITE" "$rel" "$local_sha" "$TMP"
  if out=$("$GH" api -X PUT "repos/$REPO/contents/$rel" --input "$TMP" 2>&1); then
    ok=$((ok+1)); echo "  v $rel"
  else
    fail=$((fail+1)); echo "  x $rel"; echo "$out" | head -3
  fi
done < "$LIST"
# 不能用 rm：本沙箱的 safe-delete 钩子会拦「带盘符前缀的删除」并中止整个脚本
# （症状：文件全推完了，但末尾的统计没打出来，看起来像失败）。改名移到 TEMP。
if [ -f "$TMP" ]; then mv -f "$TMP" "$TMP.done" 2>/dev/null || true; fi
if [ -f "$LIST" ]; then mv -f "$LIST" "$LIST.done" 2>/dev/null || true; fi

echo ""
echo "更新 $ok | 未变跳过 $skip | 失败 $fail"

# 4. 启用 Pages
if ! "$GH" api "repos/$REPO/pages" >/dev/null 2>&1; then
  echo '{"source":{"branch":"main","path":"/"}}' > "$TMP"
  "$GH" api -X POST "repos/$REPO/pages" --input "$TMP" && echo "✓ Pages 已启用"
  rm -f "$TMP"
else
  echo "✓ Pages 已启用"
fi
