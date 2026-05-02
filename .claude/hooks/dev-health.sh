#!/bin/bash
# @fileoverview FE(Vite) dev 서버 상태를 점검한다.
#
# bank_React 프로젝트는 현재 BE 가 없으므로 FE 만 검사한다.
# 단순히 포트가 LISTEN 상태인지 확인한다 (응답 본문까지 검증하면 느려짐).
# stderr 로 사람이 읽기 좋은 진단을 찍고, 종료 코드로 상태를 전달한다.
#
# 종료 코드:
#   0  — FE LISTEN
#   1  — FE 죽음
#
# 환경 변수(옵션):
#   FE_PORT (기본 5173 — Vite 기본값)

ROOT="${CLAUDE_PROJECT_DIR:-/Users/moon/bank_React}"
FE_PORT="${FE_PORT:-5173}"

FE_PID=$(lsof -ti:"$FE_PORT" 2>/dev/null | head -1 || true)

if [[ -n "$FE_PID" ]]; then
  echo "[dev-health] FE :$FE_PORT 살아있음 (pid=$FE_PID)" >&2
  exit 0
else
  echo "[dev-health] FE :$FE_PORT 죽음 — 메인 레포에서 재기동 필요:" >&2
  echo "  (cd $ROOT/bank-app && nohup npx vite > /tmp/bank-fe.log 2>&1 & disown)" >&2
  exit 1
fi
