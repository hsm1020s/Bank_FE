#!/bin/bash
# @fileoverview PostToolUse 훅: Bash 명령이 dev 서버를 죽일 가능성이 있으면
# 실행 후 자동으로 dev-health 검사를 돌려 조용한 서버 사망을 감지한다.
#
# 트리거 명령 패턴 (이 중 하나라도 포함되면 health 검사):
#   - kill / killall / pkill
#   - git worktree remove / git worktree prune
#   - rm -rf (특히 워크트리 경로를 인자로)
#   - lsof -ti:xxxx | xargs kill (우회 패턴)
#
# 감지되면 stderr 로 진단을 출력한다 (Claude 가 출력을 보고 재기동 조치 가능).
# 정상이면 침묵.
#
# 종료 코드는 항상 0 — PostToolUse 훅이 0 이 아니면 하네스가 이를 오류로 해석하므로,
# 감지 결과는 메시지로만 전달하고 종료는 성공 처리한다.

ROOT="${CLAUDE_PROJECT_DIR:-/Users/moon/bank_React}"

INPUT=$(cat)
CMD=$(echo "$INPUT" | jq -r '.tool_input.command // empty' 2>/dev/null)
if [[ -z "$CMD" ]]; then exit 0; fi

# 서버를 죽일 가능성이 있는 패턴
SUSPICIOUS='(^|[ ;&|])(kill|killall|pkill)( |$)|git +worktree +(remove|prune)|rm +-rf|lsof +-ti:[0-9]+ *\| *xargs +kill'

if ! echo "$CMD" | grep -qE "$SUSPICIOUS"; then
  exit 0
fi

# dev-health 검사 실행. stderr 로 결과가 나오면 parent(Claude) 에게 전달됨.
if bash "$ROOT/.claude/hooks/dev-health.sh" >/dev/null 2>&1; then
  # 살아있음 — 조용히 종료
  exit 0
fi

# 죽었음 — 상세 진단을 stderr 로
{
  echo ""
  echo "[post-bash-health] 경고: 직전 명령 직후 dev 서버 상태 이상 감지."
  echo "  실행한 명령: $CMD"
  bash "$ROOT/.claude/hooks/dev-health.sh" 2>&1
  echo "[post-bash-health] 위 안내대로 재기동하거나, 워크트리 제거였다면 다음 사용:"
  echo "  bash $ROOT/.claude/hooks/safe-worktree-remove.sh <worktree_path>"
} >&2

# 경고만 하고 종료 코드는 0 (도구 실패로 처리되지 않도록)
exit 0
