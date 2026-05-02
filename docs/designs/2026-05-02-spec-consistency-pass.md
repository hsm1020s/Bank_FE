# 설계: 2026-05-02-spec-consistency-pass

**생성:** 2026-05-02 21:54
**워크트리:** /Users/moon/bank_React_wt/2026-05-02-spec-consistency-pass
**브랜치:** task/2026-05-02-spec-consistency-pass

## 목표
잔여 6건 결함 해소(베이스라인 0건) + 인덱스 무결성 자동 검증.

## 변경 범위 (잔여 6건)
| 파일 | 누락 | 보강 |
|---|---|---|
| CUS-010 자동이체 | 6 출력 | 등록 결과·다음 출금일 |
| CUS-021 동의관리 | 6 출력 | 현재 동의 상태표·변경 로그 |
| CUS-022 민원분쟁 | 6 출력 | 접수번호·SLA·상태 |
| EMP-016 AML | 5,6 입출력 | 필터(=입력)·결과 컬럼(=출력) |
| EMP-019 에이전트 콘솔 | 5,6 입출력 | 룰·프롬프트 필터·실행 로그 |
| EMP-020 감사로그 | 5 입력 | 검색 필터 |

## 추가 작업
- `validate-spec.sh --check-index` 모드 추가: `_index.json`의 모든 path 가 실제 존재하는지 cross-check.

## 구현 계획
1~6. 6개 파일 보강.
7. validate-spec.sh `--check-index` 모드 추가.
8. `--all` 0건 + `--check-index` 통과.

## 단위 테스트 계획
- 6개 파일 [OK].
- `--all` 결함 0건.
- `--check-index` PASS.

## 회귀 테스트 계획
- dev :5173.
- M1~M4 산출물 무변동.

