#!/bin/bash
# @fileoverview PreToolUse 훅: Edit/Write 호출을 하네스 규칙에 따라 차단한다.
#
# 차단 규칙 (활성 태스크가 있을 때만):
#   - Step 0 위반: 편집 대상이 워크트리 밖이면 차단
#   - Step 1 위반: src/** 편집인데 phase < impl-ready 이면 차단
#     (bank-app/src/** 도 동일하게 매칭됨)
#
# 예외 허용:
#   - 설계 문서 자체
#   - 증거 디렉토리 하위
#   - ALLOWED_EXT_ROOTS 로 등록된 외부 저장소
#
# 비활성 상태(활성 태스크 없음)에서는 차단하지 않는다 → 자유 편집 허용.
# 종료 코드: 0=허용, 2=차단(stderr 메시지가 Claude에게 피드백됨).

set -e

ROOT="${CLAUDE_PROJECT_DIR:-/Users/moon/bank_React}"
STATE_FILE="$ROOT/.claude/state/workflow.json"

# 워크트리 밖이라도 편집이 허용되는 외부 저장소 목록
# (예: 풀스택 태스크에서 병행 편집이 필요한 백엔드 저장소 — 현재는 비어있음)
ALLOWED_EXT_ROOTS=()

# 활성 태스크 없음 → 자유 편집
if [[ ! -f "$STATE_FILE" ]]; then exit 0; fi
ACTIVE=$(jq -r '.active // false' "$STATE_FILE" 2>/dev/null || echo "false")
if [[ "$ACTIVE" != "true" ]]; then exit 0; fi

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')
if [[ -z "$FILE_PATH" ]]; then exit 0; fi

TASK_ID=$(jq -r '.taskId' "$STATE_FILE")
PHASE=$(jq -r '.phase' "$STATE_FILE")
WORKTREE=$(jq -r '.worktreePath' "$STATE_FILE")
DESIGN_DOC=$(jq -r '.designDoc' "$STATE_FILE")

# 설계 문서 자체는 언제든 편집 가능 (Step 1 진행을 위해)
if [[ "$FILE_PATH" == "$DESIGN_DOC" ]]; then exit 0; fi

# 증거 디렉토리 쓰기는 항상 허용
EVIDENCE_DIR=$(jq -r '.evidenceDir' "$STATE_FILE")
if [[ "$FILE_PATH" == "$EVIDENCE_DIR"/* ]]; then exit 0; fi

# 외부 저장소 화이트리스트 — 편집 허용 (src/** 게이트는 적용하지 않음)
for root in "${ALLOWED_EXT_ROOTS[@]}"; do
  if [[ "$FILE_PATH" == "$root"/* ]]; then exit 0; fi
done

# 게이트 1: 워크트리 외부 편집 차단
if [[ "$FILE_PATH" != "$WORKTREE"/* ]]; then
  cat >&2 <<EOF
[하네스 차단] Step 0 위반: 편집 대상이 워크트리 밖입니다.

  태스크      : $TASK_ID
  워크트리    : $WORKTREE
  시도한 파일 : $FILE_PATH

→ 활성 태스크는 반드시 워크트리 안에서 편집해야 합니다.
→ 설계 문서 수정은 '$DESIGN_DOC' 에서 허용됩니다.
→ 혹은 'phase.sh end'로 태스크를 먼저 종료하세요.
EOF
  exit 2
fi

# 게이트 2: src/** 편집은 phase ≥ impl-ready 필요
# (bank-app/src/... 도 매칭됨)
if [[ "$FILE_PATH" == *"/src/"* ]]; then
  case "$PHASE" in
    worktree-ready)
      cat >&2 <<EOF
[하네스 차단] Step 1 위반: src/** 편집 전에 설계가 필요합니다.

  태스크       : $TASK_ID
  현재 단계    : $PHASE (설계 미완료)
  설계 문서    : $DESIGN_DOC

→ 설계 문서의 '목표/변경 범위/구현 계획' 섹션을 채우세요.
→ 완료 후 실행: .claude/hooks/phase.sh advance design-done
EOF
      exit 2 ;;
  esac
fi

exit 0
