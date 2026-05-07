# 설계: 2026-05-07-phase2-employee

**생성:** 2026-05-07
**워크트리:** /Users/moon/bank_React_wt/2026-05-07-phase2-employee
**브랜치:** task/2026-05-07-phase2-employee

## 목표
P2(직원 핵심) 4개 화면을 정적 목업으로 구현. 직전 P1 통합 대시보드(공통 화면 1차에서 만든 placeholder)를 EMP-002 본격 화면으로 대체하고, 신규 3종(여신 심사 워크리스트·상세·연체 관리)을 추가.

대상 화면:
- EMP-002 통합 대시보드 — 권한별 KPI 9개, 실시간 추이, 워크리스트 요약, 에이전트 알림 피드
- EMP-009 여신 심사 워크리스트 — 통계 6, 다중 필터, 큐 테이블, 일괄 배정 + 친족 차단
- EMP-010 여신 심사 상세 — 좌(신청/증빙/거래패턴) + 우(CSS·한도·위험·결정) + 4종 결정 + ARC 차단
- EMP-013 연체 관리 — 단계별(1~4) 통계, 야간 차단, 부분상환 역전, 4단계 기한이익상실 4스텝

## 변경 범위
```
bank-app/src/
├── routes/admin/
│   ├── AdminDashboardPage.jsx          # EMP-002 본격화 (KPI 9 + 추이 + 알림)
│   ├── credit/
│   │   ├── CreditWorklistPage.jsx      # EMP-009
│   │   └── CreditReviewPage.jsx        # EMP-010
│   └── delinquent/
│       └── DelinquentPage.jsx          # EMP-013
├── components/admin/
│   ├── KpiCard.jsx
│   ├── AlertFeed.jsx
│   └── WorklistTable.jsx
├── data/mockData.js                    # KPI/심사케이스/연체 더미 추가
└── App.jsx                             # /admin/credit/* /admin/delinquent 라우트 추가
```

라우트:
- `/admin` → AdminDashboardPage 본격화 (기존 경로 유지)
- `/admin/credit` → CreditWorklistPage
- `/admin/credit/:caseId` → CreditReviewPage
- `/admin/delinquent` → DelinquentPage
- 기존 placeholder들은 사이드바 링크는 그대로, 페이지는 향후 P5에서 본격화

## 구현 계획
1. mockData에 KPI 9 + 심사케이스 12 + 연체 8 + 알림 피드 추가
2. admin 공통 3종(KpiCard/AlertFeed/WorklistTable)
3. EMP-002 본격화 — 권한 토글(TELLER/CRED/AML/AUDITOR) + KPI 그리드 + MiniLineChart 재사용 + AlertFeed
4. EMP-009 워크리스트 — 통계 카드 6 + 필터바 + 테이블 + 친족 차단 배지 + 일괄 배정 모달
5. EMP-010 심사 상세 — 좌우 2컬럼 + ARC 차단 안내 + 4종 결정 버튼 + ETag 412 모달
6. EMP-013 연체 — 단계별 4 카드 + 야간 차단 안내 + 부분상환 역전 시뮬 + 4단계 기한이익상실 Stepper 4스텝
7. 사이드바 메뉴 갱신 (창구 그룹에 신규 3개 추가)
8. App.jsx 라우터 갱신, build/lint, 5173/3005 라우트 200

## 단위 테스트 계획
- 신규/본격화 4개 라우트 200, build/lint 0
- EMP-002 권한 토글 → KPI 가시성 변경, 알림 클릭 → 라우팅
- EMP-009 친족 차단 배지·필터 적용·행 선택 → 상세 진입
- EMP-010 ARC 안내·4결정 버튼·ETag 412 모달
- EMP-013 야간 시간대 차단 메시지·부분상환 역전·4단계 4스텝 진행

## 회귀 테스트 계획
- 직전 태스크(P1) 라우트(/dashboard, /deposit, /transfer, /loan/* 등) 모두 200
- 공통 화면 모달 14종, 시스템 페이지 4종 정상
- validate-spec.sh --check-index 정상 53/누락 0
- master 빌드 정상
