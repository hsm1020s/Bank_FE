# 설계: 2026-05-02-spec-p4-high-risk-tech-spec

**생성:** 2026-05-02 21:38
**워크트리:** /Users/moon/bank_React_wt/2026-05-02-spec-p4-high-risk-tech-spec
**브랜치:** task/2026-05-02-spec-p4-high-risk-tech-spec

## 목표
P4 고객부가 12화면 중 검토 보고서가 H로 지목한 3개 화면의 **기술 명세 부족**을 보강한다 —
CUS-014(전자서명), CUS-019(한도변경), CUS-020(사고신고).

## 변경 범위
- CUS-014: 페이지당 최소 체류 5초 / 약정서 SHA-256 / 30분 캐시 / 인증서 만료·비번오류 상태.
- CUS-019: 24h 지연을 KST 매시간 배치로 명문화 / `limit_change_pending` 상태·API.
- CUS-020: security/report 응답 확장(`block_timestamp` 등) + 동기 처리 명문화 + 보이스피싱 환급 SLA(D+5).

## 구현 계획
1. CUS-014 본문에 체류 임계·해시·캐시·인증서 상태 추가.
2. CUS-019 24h 지연 배치 + 상태 + 출력.
3. CUS-020 API 응답 확장 + 환급 절차 + 출력.
4. M1 검증으로 3건 [OK] + 베이스라인 감소.

## 단위 테스트 계획
- 3개 파일 [OK].
- `--all` 14 → 12 이하.

## 회귀 테스트 계획
- dev :5173 가동 유지.
- M1/M2 산출물·다른 페이즈 spot-check.

