#!/bin/bash
# @fileoverview 화면정의서 표준 13섹션 헤더 검증 스크립트.
#
# 사용:
#   validate-spec.sh <파일경로>            # 단일 파일 검증
#   validate-spec.sh --all                 # _index.json 의 모든 화면 일괄 검증
#   validate-spec.sh --phase P5            # 특정 페이즈만 일괄 검증
#
# 종료 코드:
#   0 = 통과
#   1 = 누락 섹션 발견
#   2 = 사용법 오류 / 파일 없음

set -e

SPEC_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../화면정의서" && pwd)"
INDEX="$SPEC_DIR/_index.json"

# 13개 표준 섹션과 매칭 키워드(정규식, 대소문자 무시 / | 로 분기).
# 실제 화면별로 헤더 표기가 약간 다르기 때문에 핵심 키워드만 매칭한다.
SECTIONS=(
  "1|메타|메타"
  "2|목적/시나리오|목적|시나리오"
  "3|화면 레이아웃|레이아웃|와이어프레임"
  "4|컴포넌트|컴포넌트"
  "5|입력 항목|입력"
  "6|출력 항목|출력"
  "7|상태 정의|상태"
  "8|API 연동|API|엔드포인트"
  "9|비즈니스 규칙|비즈니스|비즈|규칙"
  "10|보안·감사로그|보안|감사로그|감사 로그"
  "11|에이전트|에이전트"
  "12|UX·접근성·반응형|UX|접근성|반응형"
  "13|검증 시나리오|검증|시나리오"
)

# 단일 파일 검증. 누락 섹션 번호를 stderr 로 출력하고 결함 수를 stdout 으로 반환.
check_one() {
  local file="$1"
  if [[ ! -f "$file" ]]; then
    echo "[FAIL] 파일 없음: $file" >&2
    return 2
  fi

  local headers
  headers=$(grep -E "^#{1,3} " "$file" || true)

  local missing=()
  local idx
  for sec in "${SECTIONS[@]}"; do
    idx="${sec%%|*}"
    local rest="${sec#*|}"
    local label="${rest%%|*}"
    local keywords="${rest#*|}"
    # keywords 를 IFS=| 로 분리해 OR 매칭
    local matched=0
    local IFS='|'
    for kw in $keywords; do
      if echo "$headers" | grep -qiE "(^|[^A-Za-z])$kw([^A-Za-z]|$)"; then
        matched=1
        break
      fi
    done
    unset IFS
    if [[ "$matched" -eq 0 ]]; then
      missing+=("$idx. $label")
    fi
  done

  if [[ "${#missing[@]}" -eq 0 ]]; then
    return 0
  fi

  echo "  ✗ ${file#$SPEC_DIR/}" >&2
  for m in "${missing[@]}"; do
    echo "      - 누락: $m" >&2
  done
  return 1
}

# 사용법
case "${1:-}" in
  ""|"-h"|"--help")
    echo "사용법:"
    echo "  $(basename "$0") <파일경로>"
    echo "  $(basename "$0") --all"
    echo "  $(basename "$0") --phase {P1|P2|P3|P4|P5}"
    echo "  $(basename "$0") --check-index   # _index.json 의 모든 path 가 실재하는지 검증"
    exit 2
    ;;
  --check-index)
    if ! command -v jq >/dev/null; then
      echo "[FAIL] jq 가 필요합니다." >&2; exit 2
    fi
    if [[ ! -f "$INDEX" ]]; then
      echo "[FAIL] 인덱스 없음: $INDEX" >&2; exit 2
    fi
    miss=0; ok=0
    # screens
    while IFS= read -r entry; do
      id=$(echo "$entry" | jq -r '.key')
      path=$(echo "$entry" | jq -r '.value.path')
      full="$SPEC_DIR/$path"
      if [[ -f "$full" ]]; then
        ok=$((ok+1))
      else
        miss=$((miss+1))
        echo "  ✗ [화면] $id → $path (파일 없음)" >&2
      fi
    done <<< "$(jq -c '.screens | to_entries[]' "$INDEX")"
    # common
    while IFS= read -r entry; do
      id=$(echo "$entry" | jq -r '.key')
      path=$(echo "$entry" | jq -r '.value.path')
      full="$SPEC_DIR/$path"
      if [[ -f "$full" ]]; then
        ok=$((ok+1))
      else
        miss=$((miss+1))
        echo "  ✗ [공통] $id → $path (파일 없음)" >&2
      fi
    done <<< "$(jq -c '.common | to_entries[]' "$INDEX")"
    echo "" >&2
    echo "[인덱스 무결성] 정상 $ok / 누락 $miss" >&2
    [[ "$miss" -eq 0 ]] && exit 0 || exit 1
    ;;
  --all)
    if ! command -v jq >/dev/null; then
      echo "[FAIL] jq 가 필요합니다." >&2; exit 2
    fi
    if [[ ! -f "$INDEX" ]]; then
      echo "[FAIL] 인덱스 없음: $INDEX" >&2; exit 2
    fi
    paths=$(jq -r '.screens[] | .path' "$INDEX")
    fail=0; pass=0; total=0
    while IFS= read -r p; do
      total=$((total+1))
      full="$SPEC_DIR/$p"
      if check_one "$full"; then
        pass=$((pass+1))
      else
        fail=$((fail+1))
      fi
    done <<< "$paths"
    echo ""
    echo "==========================================" >&2
    echo "[검증 결과] 통과 $pass / 총 $total — 결함 $fail 건" >&2
    [[ "$fail" -eq 0 ]] && exit 0 || exit 1
    ;;
  --phase)
    PHASE="${2:-}"
    if [[ -z "$PHASE" ]]; then
      echo "[FAIL] --phase 뒤에 P1~P5 지정" >&2; exit 2
    fi
    paths=$(jq -r --arg p "$PHASE" '.screens | to_entries | map(select(.value.phase==$p)) | .[].value.path' "$INDEX")
    fail=0; pass=0; total=0
    while IFS= read -r p; do
      [[ -z "$p" ]] && continue
      total=$((total+1))
      full="$SPEC_DIR/$p"
      if check_one "$full"; then
        pass=$((pass+1))
      else
        fail=$((fail+1))
      fi
    done <<< "$paths"
    echo ""
    echo "[검증 $PHASE] 통과 $pass / 총 $total — 결함 $fail 건" >&2
    [[ "$fail" -eq 0 ]] && exit 0 || exit 1
    ;;
  *)
    if [[ -f "$1" ]]; then
      if check_one "$1"; then
        echo "[OK] 13섹션 모두 충족: $1"
        exit 0
      else
        exit 1
      fi
    else
      echo "[FAIL] 파일 없음 또는 잘못된 옵션: $1" >&2
      exit 2
    fi
    ;;
esac
