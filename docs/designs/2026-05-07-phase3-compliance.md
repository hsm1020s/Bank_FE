# 설계: 2026-05-07-phase3-compliance

**생성:** 2026-05-07
**워크트리:** /Users/moon/bank_React_wt/2026-05-07-phase3-compliance
**브랜치:** task/2026-05-07-phase3-compliance

## 목표
P3(컴플라이언스) 4개 화면 정적 목업.

대상:
- CUS-021 개인정보·약관·동의 관리 (`/profile`) — 7탭, 동의 철회/자동결정/디바이스 6+ 시나리오
- EMP-016 AML/STR/CTR (`/admin/aml`) — 4탭(STR/CTR/제재/룰), 메이커-체커, 제재 점수 분기, 룰 immutable 버전
- EMP-019 에이전트 운영 콘솔 (`/admin/agent/console`) — KPI + 실시간 스트림 + L4 큐 + 룰/모델 관리, ZONE_OPERATION 배지
- EMP-020 감사로그 조회 (`/audit/logs`) — 다중 필터 + 체인 해시·머클·TSA 무결성 + STR 마스킹 + 셀프 검색 차단

## 변경 범위
```
bank-app/src/
├── routes/customer/
│   └── ProfilePage.jsx                # CUS-021 본격화 (placeholder 대체)
├── routes/admin/
│   ├── aml/AmlConsolePage.jsx         # EMP-016
│   ├── agent/AgentOpsConsolePage.jsx  # EMP-019
│   └── audit/AuditLogPage.jsx         # EMP-020 (기존 /audit/logs 본격화)
├── components/admin/
│   └── Tabs.jsx                       # 공통 탭
├── data/mockData.js                   # AML/에이전트/감사로그 더미 추가
└── App.jsx                            # /admin/aml /admin/agent/console 라우트 추가, /audit/logs 본격화
```

## 구현 계획
1. mockData에 STR/CTR/제재/룰버전, 에이전트 KPI/대화/L4큐, 감사로그 50건 추가
2. Tabs 공통 컴포넌트
3. CUS-021 ProfilePage — 7탭 (기본/연락처/마케팅/정보활용/약관/자동결정/기기) + 변경 OTP 모달 + 동의 철회 영향 안내 + 디바이스 6+ 모달
4. EMP-016 AmlConsolePage — 4탭 + STR 메이커-체커 + 제재 점수 0.95/0.7 분기 + 룰 v1→v2 immutable
5. EMP-019 AgentOpsConsolePage — KPI 6 + 실시간 대화 스트림(정적) + L4 큐 + ZONE_OPERATION 배지 + 마스킹 해제 사유 enum
6. EMP-020 AuditLogPage — 다중 필터 + 체인 해시/머클 루트/TSA 검증 결과 카드 + STR 마스킹 시연 + 셀프 검색 즉시 차단
7. 사이드바 메뉴 갱신 (운영 그룹/감사 그룹)
8. App.jsx 라우터 갱신, build/lint, 5173/3005 200

## 단위 테스트 계획
- 4 라우트 200, build/lint 0
- CUS-021 7탭 전환·동의 철회 모달·자동결정 OFF→ON 영향 안내·디바이스 6+ 해제 시뮬
- EMP-016 STR 결정 메이커-체커 흐름·제재 점수 분기·룰 v2 발행
- EMP-019 ZONE_OPERATION 배지·L4 큐 메이커-체커·실시간 마스킹 해제 enum
- EMP-020 무결성 검증 카드·STR 마스킹·셀프 검색 즉시 차단

## 회귀 테스트 계획
- P1·P2 라우트 200 유지
- 공통 화면 모달 14종, 시스템 페이지 4종 정상
- validate-spec.sh --check-index 정상 53/누락 0
- master 빌드 정상
