# 설계: 2026-05-02-spec-standard-infra

**생성:** 2026-05-02 21:20
**워크트리:** /Users/moon/bank_React_wt/2026-05-02-spec-standard-infra
**브랜치:** task/2026-05-02-spec-standard-infra

## 목표
화면정의서 v2의 표준 13섹션 구조를 **검증 가능한 자산**으로 만들어,
이후 M2~M5 보강 작업이 자동으로 품질 게이트를 통과/차단하도록 한다.

검토 보고서에서 식별된 결함의 근본 원인 — "13섹션 표준이 메인 README에
표명만 되어 있고 강제력이 없음" — 을 인프라 레벨에서 해소한다.

## 변경 범위

산출물 3종:

1. **표준 화면 템플릿** — `bank-app/화면정의서/00_공통/_TEMPLATE_화면.md`
   - 13개 섹션 헤더 고정, 각 섹션에 작성 지침 주석 포함.

2. **화면 인덱스** — `bank-app/화면정의서/_index.json`
   - 45개 화면 ID ↔ 실제 파일경로 매핑 + 페이즈/제목 메타.

3. **검증 스크립트** — `bank-app/scripts/validate-spec.sh`
   - 13개 표준 섹션 헤더 매칭, 누락 섹션을 stderr로 보고.
   - `--all` 모드는 인덱스의 모든 화면을 일괄 검증.

추적성: `_index.json`/`validate-spec.sh` 는 .json/.sh라 git 추적됨.
템플릿 .md 는 git 무시 대상 → master 작업트리에 cp 반영.

## 구현 계획

1. `_index.json` 작성 (45개 화면 + 공통/페이즈 README 매핑).
2. `validate-spec.sh` 작성 (bash + grep 기반).
3. 표준 화면 템플릿 .md 작성.
4. 검증 스크립트로 현재 화면정의서 일괄 점검 → 결함 카운트가 검토 보고서와 일치하는지 확인.
5. 설계 문서 + 인덱스 + 스크립트 커밋.
6. master 머지 후 템플릿 .md 와 변경 .md 를 master 작업트리로 cp.

## 단위 테스트 계획

- `validate-spec.sh <단일 파일>`:
  - EMP-011(우수) → exit 0, "전부 통과".
  - EMP-008(결함) → 누락 섹션 보고 + exit 1.
- `validate-spec.sh --all`:
  - 결과 화면 수가 검토 보고서의 H/M 결함 카운트와 일치.
- 인덱스 path 무결성: 모든 entry 의 file 이 실제 존재.

## 회귀 테스트 계획

- dev 서버(:5173) 가동 유지 확인 (Vite 기본 스캐폴드 손상 없음).
- bank-app/src/** 변경 없음 확인.
- 메인 README 인덱스의 ID 표기와 `_index.json` 매핑 1:1 일치 spot-check.

