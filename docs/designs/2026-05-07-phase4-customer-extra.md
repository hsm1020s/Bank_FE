# 설계: 2026-05-07-phase4-customer-extra

**생성:** 2026-05-07
**워크트리:** /Users/moon/bank_React_wt/2026-05-07-phase4-customer-extra
**브랜치:** task/2026-05-07-phase4-customer-extra

## 목표
P4(고객 부가기능) 12개 화면 정적 목업. SignupPage·AuthMethodsPage 본격화 + 신규 10종.

대상:
- CUS-001 회원가입·실명확인 (8단계 진행, 한도제한계좌)
- CUS-003 인증수단 등록·관리 (OTP/PKI/생체/PIN, 만료 알림)
- CUS-008 수신 해지 (중도해지 손실 명시, 자동이체 영향)
- CUS-010 자동이체 등록·관리 (CMS, 예금주 불일치 3회)
- CUS-011 대출 상품 카탈로그 (FCPA min/max/avg)
- CUS-012 대출 한도 사전조회 (소프트풀, 30일 유효)
- CUS-014 약정 체결·전자서명 (8페이지 스크롤 강제, 진행 토큰)
- CUS-017 금리 인하 요구권 (6개월 후, 14일 결과 통지)
- CUS-018 거래명세서·증명서 (6종, 워터마크+QR)
- CUS-019 거래 한도 변경 (상향 24h 지연)
- CUS-020 사고 신고·지급정지 (즉시 차단, BCP)
- CUS-022 민원·분쟁 접수 (14영업일 SLA)

## 변경 범위
```
bank-app/src/
├── routes/customer/
│   ├── SignupPage.jsx                 # CUS-001 본격화
│   ├── AuthMethodsPage.jsx            # CUS-003 본격화
│   ├── PlaceholderPages.jsx           # Documents/Limits/Complaints/SecurityReport 제거
│   ├── deposit/DepositClosePage.jsx   # CUS-008 (/deposit/:id/close)
│   ├── transfer/AutoTransferPage.jsx  # CUS-010 (/transfer/auto)
│   ├── loan/LoanCatalogPage.jsx       # CUS-011 (/loan/catalog)
│   ├── loan/LoanPreCheckPage.jsx      # CUS-012 (/loan/precheck)
│   ├── loan/LoanContractPage.jsx      # CUS-014 (/loan/contract)
│   ├── loan/LoanRateReductionPage.jsx # CUS-017 (/loan/:id/rate-reduction)
│   ├── DocumentsPage.jsx              # CUS-018 (placeholder→본격화)
│   ├── LimitsPage.jsx                 # CUS-019
│   ├── ComplaintsPage.jsx             # CUS-022
│   └── SecurityReportPage.jsx         # CUS-020
└── App.jsx                            # 신규 라우트 6개 추가
```

## 구현 계획
1. mockData에 자동이체 4건, 사고신고 카테고리, 명세서 6종, 한도 4구분 추가
2. 12개 페이지 작성 (각 핵심 위젯 1~2개 + 명세 제약 가시화)
3. App.jsx 라우터 갱신
4. build/lint 0, 12개 라우트 200, 5173/3005 검증

## 단위 테스트 계획
- 12개 라우트 200, build/lint 0
- 핵심 시나리오: 회원가입 8단계, 카탈로그 FCPA 표시, 약정 8페이지 스크롤+5초 게이트, 사고신고 즉시 차단, 명세서 QR/워터마크

## 회귀 테스트 계획
- P1·P2·P3 라우트 모두 200
- validate-spec.sh --check-index 정상 53/누락 0
- 공통 화면 모달 정상
