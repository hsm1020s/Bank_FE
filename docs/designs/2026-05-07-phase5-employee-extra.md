# 설계: 2026-05-07-phase5-employee-extra

**생성:** 2026-05-07
**워크트리:** /Users/moon/bank_React_wt/2026-05-07-phase5-employee-extra
**브랜치:** task/2026-05-07-phase5-employee-extra

## 목표
P5(직원 확장 운영) 16개 화면을 정적 목업으로 구현하여 화면정의서 P1~P5 + 공통 = 53개 풀 사이클 완성.

대상 16건:
- EMP-001 직원 로그인 (본격화)
- EMP-003 고객 검색 (본격화)
- EMP-004 고객 종합정보(CIF)
- EMP-005 신규 고객 등록(대면)
- EMP-006 수신 계좌 관리
- EMP-007 수신 거래 처리(창구)
- EMP-008 수신 거래 정정/취소
- EMP-011 여신 약정 관리
- EMP-012 여신 실행(지급)
- EMP-014 부실채권/상각
- EMP-015 압류/가압류
- EMP-017 사고신고/보이스피싱 대응
- EMP-018 시스템/배치 모니터링
- EMP-021 규제 보고서
- EMP-022 전자결재 (placeholder→본격화)
- EMP-023 상품 마스터 관리

## 변경 범위
```
bank-app/src/routes/admin/
├── AdminLoginPage.jsx                   # EMP-001 본격화
├── AdminPlaceholderPages.jsx            # AdminCustomerSearch / AdminApprovalsPage 제거
├── customer/
│   ├── CustomerSearchPage.jsx           # EMP-003
│   ├── CifPage.jsx                      # EMP-004 (/admin/customer/:id)
│   └── NewCustomerPage.jsx              # EMP-005 (/admin/customer/new)
├── deposit/
│   ├── DepositManagePage.jsx            # EMP-006 (/admin/deposit)
│   ├── TellerTxPage.jsx                 # EMP-007 (/admin/teller)
│   └── TxAdjustPage.jsx                 # EMP-008 (/admin/teller/adjust)
├── credit/  (기존)
│   ├── LoanContractMgmtPage.jsx         # EMP-011 (/admin/loan/contracts)
│   ├── LoanDisbursePage.jsx             # EMP-012 (/admin/loan/disburse)
│   ├── NplPage.jsx                      # EMP-014 (/admin/loan/npl)
│   └── SeizurePage.jsx                  # EMP-015 (/admin/loan/seizure)
├── ops/
│   ├── IncidentResponsePage.jsx         # EMP-017 (/admin/ops/incident)
│   └── SystemMonitorPage.jsx            # EMP-018 (/admin/ops/healthcheck 본격화)
├── compliance/
│   └── RegulatoryReportPage.jsx         # EMP-021 (/admin/regulatory)
├── approvals/
│   └── ApprovalsPage.jsx                # EMP-022 본격화 (/admin/approvals)
└── product/
    └── ProductMasterPage.jsx            # EMP-023 (/admin/product)
```

## 구현 계획
1. mockData에 BCP/CIF/배치/규제 보고서/결재 박스/상품 더미 추가
2. 16개 페이지 작성 (핵심 위젯 1~2개)
3. 사이드바 메뉴 갱신 (창구/운영/감사 그룹 정비)
4. App.jsx 라우터 갱신
5. build/lint 0, 16개 라우트 200, 5173/3005 검증

## 단위 테스트 계획
- 16 라우트 200, build/lint 0
- 핵심 시나리오: EMP-001 신규 IP 차단·BCP / EMP-005 OCR 5초 timeout 가등록 / EMP-007 환율 stale 차단 / EMP-012 24h KYC 재스크리닝 / EMP-018 배치 11종

## 회귀 테스트 계획
- P1~P4 + 공통 라우트 모두 200
- validate-spec.sh --check-index 정상 53/누락 0
- master 빌드 정상
