#!/usr/bin/env bash
# 上传站点产物到 GitHub（contents API）
# 不在 node 里 spawn gh（沙箱下 EBUSY），直接 bash 调 gh。
# base64 分块处理，避免 Windows 上超长参数报 Argument list too long。
#
# 用法：GH_TOKEN=<pat> bash upload.sh <repo> <本地目录>
set -uo pipefail

REPO="$1"; SRC="$2"
GH="C:/Users/chenhua/Desktop/1/gh_cli/bin/gh.exe"
# Windows 版 python 不认 /tmp，用 Windows 路径
WD="C:/Users/chenhua/AppData/Local/Temp"

if [ -z "${GH_TOKEN:-}" ]; then echo "需要 GH_TOKEN"; exit 1; fi
if [ ! -d "$SRC" ]; then echo "目录不存在: $SRC"; exit 1; fi

B64F="$WD/b64.txt"
JSONF="$WD/up-$RANDOM.json"
SIZEF="$WD/size.txt"

echo "=== $REPO ← $SRC ==="
OK=0; FAIL=0

for f in "$SRC"/*; do
  name=$(basename "$f")
  case "$name" in
    *.html|*.css|*.js|*.xml|*.txt|CNAME|README.md) ;;
    *) continue ;;
  esac

  base64 -w0 "$f" | tr -d '\n' > "$B64F"
  SHA=$($GH api "repos/speculcom/$REPO/contents/$name" --jq '.sha' 2>/dev/null || echo "")

  # 组 JSON：sha 有值则带上（有则=更新，无则=新建）
  python -c "
import json,sys
b64 = open(sys.argv[1], encoding='ascii').read().strip()
body = {'message': 'deploy: ' + sys.argv[3], 'content': b64, 'branch': 'main'}
if sys.argv[4]:
    body['sha'] = sys.argv[4]
json.dump(body, open(sys.argv[2], 'w', encoding='utf-8'))
" "$B64F" "$JSONF" "$name" "$SHA"

  LS=$(wc -c < "$f" | tr -d ' ')
  if RS=$($GH api -X PUT "repos/speculcom/$REPO/contents/$name" --input "$JSONF" --jq '.content.size' 2>/dev/null); then
    RS=$(echo "$RS" | tr -d '"\r\n ')
    if [ "$RS" = "$LS" ]; then
      echo "  ✓ $name ($LS B)"
    else
      echo "  ⚠ $name 本地$LS / 远端$RS"
    fi
    OK=$((OK+1))
  else
    echo "  ✗ $name"
    FAIL=$((FAIL+1))
  fi
done

rm -f "$B64F" "$JSONF" "$SIZEF"
echo "  → $OK 成功 / $FAIL 失败"
[ "$FAIL" -gt 0 ] && exit 1
