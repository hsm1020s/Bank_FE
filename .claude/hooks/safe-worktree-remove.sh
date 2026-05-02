#!/bin/bash
# @fileoverview 워크트리를 안전하게 제거한다 (FE dev 서버가 죽지 않도록).
#
# `git worktree remove <path>` 를 그대로 실행하면, 해당 워크트리에서
# `npx vite` 가 돌고 있을 때 파일이 통째로 사라지며 Vite 가 조용히 죽는다.
# 이 스크립트는 다음 순서로 동작해 해당 상황을 방지한다:
#   1) 워크트리 경로에 뿌리박은 프로세스를 찾아 종료
#   2) 메인 레포(MAIN_REPO/bank-app)에서 Vite 를 재기동 (이미 살아있으면 생략)
#   3) FE 포트가 응답할 때까지 최대 30초 대기
#   4) git worktree remove --force <path>
#   5) 옵션: --delete-branch 가 있으면 task/<slug> 브랜치도 삭제
#
# 사용법:
#   bash .claude/hooks/safe-worktree-remove.sh <worktree_path> [--delete-branch]
#
# 환경 변수:
#   MAIN_REPO (기본 /Users/moon/bank_React)
#   FE_PORT   (기본 5173)

set -u

WORKTREE_PATH="${1:-}"
OPT="${2:-}"
MAIN_REPO="${MAIN_REPO:-/Users/moon/bank_React}"
FE_PORT="${FE_PORT:-5173}"

if [[ -z "$WORKTREE_PATH" ]]; then
  cat >&2 <<EOF
사용법: $(basename "$0") <worktree_path> [--delete-branch]

예: $(basename "$0") /Users/moon/bank_React_wt/2026-05-02-account-list --delete-branch
EOF
  exit 1
fi

# 워크트리가 이미 사라진 경우에도 git worktree prune 은 시도하고, dev 서버 상태만
# 검사해서 종료한다 (부분 실패 회복 경로).
if [[ ! -d "$WORKTREE_PATH" ]]; then
  echo "[safe-remove] 경고: 워크트리 경로가 존재하지 않음 — prune + 서버 상태 확인만" >&2
  git -C "$MAIN_REPO" worktree prune 2>/dev/null || true
  bash "$MAIN_REPO/.claude/hooks/dev-health.sh" || true
  exit 0
fi

# 1) 워크트리 안에서 돌고 있는 프로세스 탐색
echo "[safe-remove] 워크트리 내 프로세스 탐색: $WORKTREE_PATH" >&2
ZOMBIE_PIDS=$(lsof -t +D "$WORKTREE_PATH" 2>/dev/null | sort -u || true)
if [[ -n "$ZOMBIE_PIDS" ]]; then
  echo "[safe-remove] 종료할 PID: $(echo "$ZOMBIE_PIDS" | tr '\n' ' ')" >&2
  echo "$ZOMBIE_PIDS" | xargs kill 2>/dev/null || true
  # SIGTERM 여유, 살아남으면 SIGKILL
  sleep 2
  STILL=$(lsof -t +D "$WORKTREE_PATH" 2>/dev/null | sort -u || true)
  if [[ -n "$STILL" ]]; then
    echo "[safe-remove] SIGTERM 무시 — SIGKILL: $(echo "$STILL" | tr '\n' ' ')" >&2
    echo "$STILL" | xargs kill -9 2>/dev/null || true
    sleep 1
  fi
else
  echo "[safe-remove] 뿌리박은 프로세스 없음" >&2
fi

# 2) FE 가 이미 살아있는지 확인 — 없으면 메인 레포의 bank-app 에서 재기동
if ! lsof -ti:"$FE_PORT" >/dev/null 2>&1; then
  echo "[safe-remove] FE:$FE_PORT 죽음 — 메인 레포에서 재기동: $MAIN_REPO/bank-app" >&2
  ( cd "$MAIN_REPO/bank-app" && nohup npx vite > /tmp/bank-fe.log 2>&1 & disown )
  # 3) 준비 대기 (최대 30초)
  for i in $(seq 1 30); do
    if lsof -ti:"$FE_PORT" >/dev/null 2>&1; then
      echo "[safe-remove] FE:$FE_PORT 준비됨 ($i초)" >&2
      break
    fi
    sleep 1
  done
else
  echo "[safe-remove] FE:$FE_PORT 이미 살아있음 (메인 레포인지 수동 확인 권장)" >&2
fi

# 4) 이제 안전하게 워크트리 제거
echo "[safe-remove] git worktree remove --force $WORKTREE_PATH" >&2
git -C "$MAIN_REPO" worktree remove --force "$WORKTREE_PATH" || {
  echo "[safe-remove] worktree remove 실패 — prune 시도" >&2
  git -C "$MAIN_REPO" worktree prune 2>/dev/null || true
}

# 5) 옵션: task 브랜치도 정리
if [[ "$OPT" == "--delete-branch" ]]; then
  SLUG=$(basename "$WORKTREE_PATH")
  BRANCH="task/$SLUG"
  if git -C "$MAIN_REPO" show-ref --verify --quiet "refs/heads/$BRANCH"; then
    echo "[safe-remove] 브랜치 정리: $BRANCH" >&2
    git -C "$MAIN_REPO" branch -d "$BRANCH" 2>/dev/null || \
      echo "[safe-remove] 경고: $BRANCH 삭제 실패 (병합되지 않았거나 이미 삭제됨)" >&2
  fi
fi

echo "[safe-remove] 완료" >&2
bash "$MAIN_REPO/.claude/hooks/dev-health.sh" || true
