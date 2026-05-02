#!/bin/bash
# @fileoverview 하네스 5단계 워크플로우 상태 머신.
# 사용:
#   phase.sh start <slug>       # 0→1 태스크 시작 (워크트리 생성 + 설계 문서 템플릿)
#   phase.sh advance <next>     # 단계 전진 (게이트 검증 포함)
#   phase.sh status             # 현재 상태 출력
#   phase.sh end                # 태스크 종료 (active=false)
# 상태 파일: .claude/state/workflow.json
# 단계: worktree-ready → impl-ready → unit-tested → regression-tested → merged

set -e

ROOT="${CLAUDE_PROJECT_DIR:-/Users/moon/bank_React}"
STATE_FILE="$ROOT/.claude/state/workflow.json"
WORKTREE_BASE="/Users/moon/bank_React_wt"

mkdir -p "$(dirname "$STATE_FILE")"

CMD="${1:-}"
shift || true

case "$CMD" in
  start)
    SLUG="${1:-}"
    if [[ -z "$SLUG" ]]; then
      echo "[하네스] 사용법: phase.sh start <slug>" >&2
      exit 1
    fi
    if [[ -f "$STATE_FILE" ]] && [[ "$(jq -r '.active' "$STATE_FILE")" == "true" ]]; then
      CURR=$(jq -r '.taskId' "$STATE_FILE")
      echo "[하네스] 이미 활성 태스크가 있습니다: $CURR" >&2
      echo "[하네스] 먼저 'phase.sh end'로 종료하세요." >&2
      exit 2
    fi

    TASK_ID="$(date +%Y-%m-%d)-$SLUG"
    WORKTREE="$WORKTREE_BASE/$TASK_ID"
    # 설계 문서는 워크트리 안에 생성 → task 브랜치 커밋에 자연스럽게 포함되고
    # 머지 시 master에 동반 반영된다. 증거 노트는 .gitignore 대상이므로 $ROOT 유지.
    DESIGN_DOC="$WORKTREE/docs/designs/$TASK_ID.md"
    EVIDENCE_DIR="$ROOT/.claude/state/evidence/$TASK_ID"

    # 워크트리 생성
    git -C "$ROOT" worktree add "$WORKTREE" -b "task/$TASK_ID"

    # 설계 문서 템플릿 (워크트리 안)
    mkdir -p "$(dirname "$DESIGN_DOC")"
    cat > "$DESIGN_DOC" <<EOF
# 설계: $TASK_ID

**생성:** $(date +%Y-%m-%d\ %H:%M)
**워크트리:** $WORKTREE
**브랜치:** task/$TASK_ID

## 목표
<!-- 이 태스크가 달성해야 하는 것 -->

## 변경 범위
<!-- 수정할 파일 / 영향 범위 -->

## 구현 계획
<!-- 단계별 구현 순서 -->

## 단위 테스트 계획
<!-- Step 2에서 검증할 항목 (결과는 evidence/unit/notes.md 에 기록) -->

## 회귀 테스트 계획
<!-- Step 3에서 건드린 다른 기능 확인 (결과는 evidence/regression/notes.md 에 기록) -->

EOF

    mkdir -p "$EVIDENCE_DIR/unit" "$EVIDENCE_DIR/regression"

    cat > "$STATE_FILE" <<EOF
{
  "active": true,
  "taskId": "$TASK_ID",
  "phase": "worktree-ready",
  "worktreePath": "$WORKTREE",
  "designDoc": "$DESIGN_DOC",
  "evidenceDir": "$EVIDENCE_DIR",
  "branch": "task/$TASK_ID",
  "createdAt": "$(date -u +%Y-%m-%dT%H:%M:%SZ)"
}
EOF
    echo "[하네스] Step 0 완료 → Step 1 (설계)"
    echo "  태스크 ID : $TASK_ID"
    echo "  워크트리  : $WORKTREE"
    echo "  설계 문서 : $DESIGN_DOC"
    echo "  증거 경로 : $EVIDENCE_DIR"
    echo ""
    echo "다음: 설계 문서를 채운 뒤 'phase.sh advance design-done'"
    ;;

  advance)
    NEXT="${1:-}"
    if [[ ! -f "$STATE_FILE" ]]; then
      echo "[하네스] 활성 태스크 없음. 먼저 'phase.sh start <slug>'" >&2
      exit 1
    fi
    TASK_ID=$(jq -r '.taskId' "$STATE_FILE")
    CURRENT=$(jq -r '.phase' "$STATE_FILE")
    DESIGN_DOC=$(jq -r '.designDoc' "$STATE_FILE")
    EVIDENCE_DIR=$(jq -r '.evidenceDir' "$STATE_FILE")

    validate_phase() {
      local expected="$1" label="$2"
      if [[ "$CURRENT" != "$expected" ]]; then
        echo "[하네스 차단] 현재 단계 '$CURRENT'에서 '$label'(으)로 전진 불가." >&2
        echo "[하네스] 순서: worktree-ready → impl-ready → unit-tested → regression-tested → merged" >&2
        exit 2
      fi
    }

    case "$NEXT" in
      design-done)
        validate_phase "worktree-ready" "design-done"
        if [[ ! -s "$DESIGN_DOC" ]]; then
          echo "[하네스 차단] Step 1 게이트 실패: 설계 문서가 비어있음" >&2
          echo "  경로: $DESIGN_DOC" >&2
          exit 2
        fi
        # 템플릿만 남아있는지 최소 검증 (목표 섹션에 내용이 있어야 함)
        if ! grep -A1 "^## 목표" "$DESIGN_DOC" | tail -n1 | grep -qvE '^(<!--|$)'; then
          echo "[하네스 차단] Step 1 게이트 실패: 설계 문서 '목표' 섹션이 비어있음" >&2
          echo "  경로: $DESIGN_DOC" >&2
          exit 2
        fi
        NEW_PHASE="impl-ready"
        ;;
      unit-done)
        validate_phase "impl-ready" "unit-done"
        NOTES="$EVIDENCE_DIR/unit/notes.md"
        if [[ ! -s "$NOTES" ]]; then
          echo "[하네스 차단] Step 2 게이트 실패: 단위 테스트 노트가 비어있음" >&2
          echo "  경로: $NOTES" >&2
          echo "  → 검증한 시나리오/결과를 텍스트로 기록하세요 (형식 자유)." >&2
          exit 2
        fi
        NEW_PHASE="unit-tested"
        ;;
      regression-done)
        validate_phase "unit-tested" "regression-done"
        NOTES="$EVIDENCE_DIR/regression/notes.md"
        if [[ ! -s "$NOTES" ]]; then
          echo "[하네스 차단] Step 3 게이트 실패: 회귀 테스트 노트가 비어있음" >&2
          echo "  경로: $NOTES" >&2
          echo "  → 건드리지 않은 주요 기능을 1개 이상 직접 돌려보고 결과를 기록하세요." >&2
          exit 2
        fi
        NEW_PHASE="regression-tested"
        ;;
      merged)
        validate_phase "regression-tested" "merged"
        # 설계 문서가 master에 반영됐는지 확인 — task 브랜치에 커밋되었다면
        # 머지 후 master에서 tracked로 조회된다.
        REL="docs/designs/$TASK_ID.md"
        if ! git -C "$ROOT" ls-files --error-unmatch "$REL" >/dev/null 2>&1; then
          echo "[하네스 차단] 설계 문서가 master에 포함되지 않았습니다." >&2
          echo "  경로: $ROOT/$REL" >&2
          echo "  → 워크트리에서 'git add $REL && git commit' 후 다시 병합하거나," >&2
          echo "     master에서 파일을 추가 커밋한 뒤 재시도하세요." >&2
          exit 2
        fi
        NEW_PHASE="merged"
        ;;
      *)
        echo "[하네스] 알 수 없는 단계: $NEXT" >&2
        echo "[하네스] 사용 가능: design-done | unit-done | regression-done | merged" >&2
        exit 1 ;;
    esac

    TMP=$(mktemp)
    jq --arg p "$NEW_PHASE" --arg t "$(date -u +%Y-%m-%dT%H:%M:%SZ)" \
      '.phase=$p | .advancedAt=$t' "$STATE_FILE" > "$TMP"
    mv "$TMP" "$STATE_FILE"
    echo "[하네스] 단계 전진: $CURRENT → $NEW_PHASE"
    ;;

  end)
    if [[ ! -f "$STATE_FILE" ]]; then
      echo "[하네스] 활성 태스크 없음"
      exit 0
    fi
    TMP=$(mktemp)
    jq --arg t "$(date -u +%Y-%m-%dT%H:%M:%SZ)" \
      '.active=false | .endedAt=$t' "$STATE_FILE" > "$TMP"
    mv "$TMP" "$STATE_FILE"
    TASK_ID=$(jq -r '.taskId' "$STATE_FILE")
    echo "[하네스] 태스크 종료: $TASK_ID"
    ;;

  status)
    if [[ ! -f "$STATE_FILE" ]]; then
      echo "[하네스] 활성 태스크 없음 (자유 편집 모드)"
      exit 0
    fi
    jq '.' "$STATE_FILE"
    ;;

  *)
    echo "사용법: phase.sh {start|advance|end|status} [인자]" >&2
    exit 1 ;;
esac
