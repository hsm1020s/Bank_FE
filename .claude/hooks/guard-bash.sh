#!/bin/bash
# @fileoverview PreToolUse 훅: Bash 호출 중 위험 명령을 차단한다.
#
# 상시 규칙 (활성 태스크 여부 무관):
#   - git worktree remove <path> : 해당 경로에 뿌리박은 프로세스가 있으면 차단.
#     (Vite 가 워크트리 안에서 돌고 있는데 그대로 지우면 조용히 죽는 사고 방지)
#
# 활성 태스크 규칙:
#   - git merge / git push : phase=regression-tested 이상이어야 허용
#   - git worktree remove  : phase=merged 이상이어야 허용

set -e

ROOT="${CLAUDE_PROJECT_DIR:-/Users/moon/bank_React}"
STATE_FILE="$ROOT/.claude/state/workflow.json"

INPUT=$(cat)
CMD=$(echo "$INPUT" | jq -r '.tool_input.command // empty')
if [[ -z "$CMD" ]]; then exit 0; fi

# ────────────────────────────────────────────────────────────────
# 상시 규칙: 워크트리 제거 전 프로세스 점유 검사 (활성 여부 무관)
#
# Python shlex 로 명령을 토큰화해 따옴표 안(예: git commit -m "... worktree remove ...")
# 의 문자열을 오탐하지 않는다. 실제 실행되는 토큰 시퀀스에서만 매칭.
# ────────────────────────────────────────────────────────────────
WT_PATH=$(printf '%s' "$CMD" | python3 -c '
import sys, shlex
try:
    toks = shlex.split(sys.stdin.read())
except Exception:
    sys.exit(0)
i = 0
while i < len(toks):
    if toks[i] == "git":
        j = i + 1
        # optional -C <dir>
        if j + 1 < len(toks) and toks[j] == "-C":
            j += 2
        if j + 1 < len(toks) and toks[j] == "worktree" and toks[j + 1] == "remove":
            # 첫 절대경로 인자를 워크트리 경로로 간주
            for k in range(j + 2, len(toks)):
                if toks[k].startswith("/"):
                    print(toks[k]); sys.exit(0)
            break
    i += 1
' 2>/dev/null || true)

if [[ -n "${WT_PATH:-}" && -d "$WT_PATH" ]]; then
  HOLDERS=$(lsof -t +D "$WT_PATH" 2>/dev/null | sort -u || true)
  if [[ -n "$HOLDERS" ]]; then
    cat >&2 <<EOF
[안전검사 차단] 워크트리에 아직 프로세스가 뿌리박고 있습니다.

  워크트리 : $WT_PATH
  점유 PID : $(echo "$HOLDERS" | tr '\n' ' ')

그대로 remove 하면 해당 프로세스(예: Vite)가 파일을 잃고 조용히 죽습니다.
→ 안전 제거 스크립트를 대신 사용하세요 (좀비 종료 → Vite 재기동 → remove):
   bash $ROOT/.claude/hooks/safe-worktree-remove.sh $WT_PATH [--delete-branch]
EOF
    exit 2
  fi
fi

# 이 아래는 활성 태스크가 있을 때만 적용되는 게이트
if [[ ! -f "$STATE_FILE" ]]; then exit 0; fi
ACTIVE=$(jq -r '.active // false' "$STATE_FILE" 2>/dev/null || echo "false")
if [[ "$ACTIVE" != "true" ]]; then exit 0; fi

TASK_ID=$(jq -r '.taskId' "$STATE_FILE")
PHASE=$(jq -r '.phase' "$STATE_FILE")
WORKTREE=$(jq -r '.worktreePath' "$STATE_FILE")

# hook 자체 호출 (phase.sh)은 항상 허용
if echo "$CMD" | grep -qE '\.claude/hooks/phase\.sh'; then exit 0; fi

# git merge / git push 게이트
if echo "$CMD" | grep -qE '(^|[ ;&|])git +(merge|push)( |$)'; then
  if [[ "$PHASE" != "regression-tested" && "$PHASE" != "merged" ]]; then
    cat >&2 <<EOF
[하네스 차단] Step 3 위반: 병합/푸시 전에 회귀(기능) 테스트가 필요합니다.

  태스크    : $TASK_ID
  현재 단계 : $PHASE
  시도 명령 : $CMD

→ 단위 테스트 완료 후 기능 회귀 테스트를 수행하고,
  증거를 .claude/state/evidence/$TASK_ID/regression/ 에 저장한 뒤
  실행: .claude/hooks/phase.sh advance regression-done
EOF
    exit 2
  fi
fi

# 워크트리 제거 게이트
if echo "$CMD" | grep -qE 'git +worktree +remove'; then
  if [[ "$PHASE" != "merged" ]]; then
    cat >&2 <<EOF
[하네스 차단] Step 4 위반: 병합 전에 워크트리를 제거할 수 없습니다.

  현재 단계 : $PHASE
→ 먼저 내 브랜치로 병합(merged)을 완료하세요.
EOF
    exit 2
  fi
fi

exit 0
