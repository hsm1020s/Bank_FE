# 설계: 2026-05-07-common-screens-full

**생성:** 2026-05-07 20:00
**워크트리:** /Users/moon/bank_React_wt/2026-05-07-common-screens-full
**브랜치:** task/2026-05-07-common-screens-full

## 목표
`bank-app/화면정의서/00_공통/` 명세(00-04 ~ 00-08)에 정의된 공통 영역 UI를 React + Vite 앱(`bank-app/`)에 정적 목업 + 라우팅 형태로 1차 구현한다. 백엔드 연동·실제 인증·세션 서버 권위 처리는 범위 밖이며, 화면 골격·진입 경로·핵심 모달·규제 UI 가시성을 확보해 5173 기존 dev 서버와 별개로 **3005 포트**에 동시 기동해 시연 가능한 상태로 만든다.

명시적으로 포함:
- 공통 명세(00-04~00-08)에 등장하는 페이지·모달·배지·동의 UI를 빠짐없이 화면화 (사용자 결정: "공통 명세 전 범위")
- 정적 목업 + react-router 라우팅 (사용자 결정: "정적 목업 + 라우팅")
- 5173은 보존, 3005 별도 인스턴스 추가 기동 (사용자 결정)

명시적으로 제외:
- 실제 API/MSW 모킹, 토큰 발급, 세션 서버 카운트다운, RBAC 가드 실제 적용
- 페이즈1~5 화면(고객 대시보드 본체, 직원 결재/심사 등은 다음 태스크)

## 변경 범위

신규 파일은 모두 `bank-app/src/` 하위:

```
bank-app/
├── package.json                       # react-router-dom 의존성 추가
├── vite.config.js                     # (변경 없음 — 3005는 --port 플래그로 별도 기동)
├── index.html                         # 제목/lang 변경
└── src/
    ├── main.jsx                       # RouterProvider 적용
    ├── App.jsx                        # 라우터 정의로 대체
    ├── styles/
    │   └── global.css                 # 디자인 토큰 + 공통 스타일
    ├── routes/
    │   ├── customer/                  # 고객 라우트 그룹
    │   │   ├── CustomerLayout.jsx
    │   │   ├── HomePage.jsx           # / (랜딩)
    │   │   ├── LoginPage.jsx          # /login
    │   │   ├── SignupPage.jsx         # /signup
    │   │   ├── AuthMethodsPage.jsx    # /auth/methods
    │   │   ├── DashboardPage.jsx      # /dashboard (목업 카드)
    │   │   ├── DepositPage.jsx        # /deposit
    │   │   ├── TransferPage.jsx       # /transfer
    │   │   ├── LoanPage.jsx           # /loan
    │   │   ├── DocumentsPage.jsx      # /documents
    │   │   ├── LimitsPage.jsx         # /limits
    │   │   ├── ProfilePage.jsx        # /profile
    │   │   ├── ComplaintsPage.jsx     # /complaints
    │   │   └── SecurityReportPage.jsx # /security/report
    │   ├── admin/                     # 직원 라우트 그룹
    │   │   ├── AdminLayout.jsx
    │   │   ├── AdminLoginPage.jsx     # /admin/login
    │   │   ├── AdminDashboardPage.jsx # /admin
    │   │   ├── AdminCustomerSearch.jsx# /admin/customer/search
    │   │   ├── AdminApprovalsPage.jsx # /admin/approvals
    │   │   ├── AdminOpsPage.jsx       # /admin/ops
    │   │   └── AuditPage.jsx          # /audit
    │   └── system/                    # 시스템 페이지
    │       ├── NotFoundPage.jsx       # 404
    │       ├── ForbiddenPage.jsx      # 403
    │       ├── ServerErrorPage.jsx    # 500
    │       ├── MaintenancePage.jsx    # /maintenance
    │       └── PartialOutagePage.jsx  # /partial-outage
    ├── components/
    │   ├── layout/
    │   │   ├── CustomerHeader.jsx     # 로고/메뉴/알림/세션타이머/ARC거부/에이전트토글
    │   │   ├── CustomerFooter.jsx     # 약관/개인정보/신용정보/보안센터/민원
    │   │   ├── AdminHeader.jsx        # 검색바/결재함뱃지/망표시/비상로그아웃
    │   │   ├── AdminSidebar.jsx       # 그룹별 메뉴
    │   │   └── AgentSidePanel.jsx     # 380px AI 패널 (위험도 카드/Undo/녹취동의)
    │   ├── modals/
    │   │   ├── SessionTimeoutModal.jsx     # 세션 잔여 9분 카운트다운
    │   │   ├── AuthStepUpModal.jsx         # 2단계→3단계 승급
    │   │   ├── DeviceRegistrationModal.jsx # 디바이스 등록
    │   │   ├── UnmaskModal.jsx             # 마스킹 풀기 사유+OTP+30초 자동재마스킹
    │   │   ├── OtpModal.jsx                # L2 OTP
    │   │   ├── ThreeStepAuthModal.jsx      # L3 3단계 인증
    │   │   ├── HumanReviewModal.jsx        # L4 사람 검토 요청
    │   │   ├── RecordingConsentModal.jsx   # 음성 녹취 동의
    │   │   ├── PipaConsentModal.jsx        # 마케팅/음성/자동결정 거부
    │   │   ├── TermsScrollModal.jsx        # 약관 스크롤 강제
    │   │   ├── FdsBlockModal.jsx           # FDS 차단
    │   │   ├── AmlMatchModal.jsx           # AML 매칭 안내
    │   │   ├── OcrFallbackModal.jsx        # OCR 실패 → 영상통화/내방
    │   │   └── EmergencyLogoutModal.jsx    # 비상 로그아웃 확인
    │   ├── agent/
    │   │   ├── ActionCard.jsx              # L0~L4 위험도 배지+색+아이콘
    │   │   ├── UndoButton.jsx              # 30초 카운트다운 Undo
    │   │   └── AgentToggle.jsx             # AI 거부 토글 (헤더/패널 이중)
    │   ├── auth/
    │   │   ├── PasswordField.jsx
    │   │   ├── OtpField.jsx
    │   │   └── SessionIndicator.jsx        # 색+아이콘+텍스트 3중
    │   ├── compliance/
    │   │   ├── FcpaRateBanner.jsx          # 최저/평균/최고 금리
    │   │   ├── AutoDecisionRefusal.jsx     # AI 자동결정 거부권 표시
    │   │   ├── KinshipBlockedBadge.jsx     # 친족 차단
    │   │   ├── ApprovalChain.jsx           # 결재 라인
    │   │   └── MaskingWatermark.jsx        # 워터마크 오버레이
    │   └── common/
    │       ├── LoadingSkeleton.jsx
    │       ├── ProgressBar.jsx
    │       ├── RiskBadge.jsx               # L0~L4 컬러 배지
    │       └── NetworkZoneBadge.jsx        # 업무/운영/감사 망 표시
    ├── data/
    │   └── mockData.js                # 정적 더미(메뉴/알림/계좌/감사로그)
    └── hooks/
        └── useFakeSessionTimer.js     # FE-only 카운트다운 (시연용)
```

문서:
- `docs/designs/2026-05-07-common-screens-full.md` (본 문서, 커밋 필수)

설정:
- `bank-app/package.json`: `react-router-dom` 추가
- 3005 기동은 `npx vite --port 3005 --strictPort` 별도 nohup 인스턴스. `vite.config.js`는 변경하지 않아 5173 기존 흐름 보존.

## 구현 계획

1. **의존성/스캐폴딩** — `bank-app/`에서 `npm i react-router-dom`. `src/styles/global.css`에 디자인 토큰(색/타이포/간격) 정의.
2. **라우터 셋업** — `App.jsx`를 react-router `createBrowserRouter`로 교체. 고객/직원/시스템 라우트 트리 구성. 미정의 경로 → 404, 유지보수 → /maintenance.
3. **레이아웃** — `CustomerLayout`(Header+Footer+AgentSidePanel 고정), `AdminLayout`(Header+Sidebar). `<Outlet />`으로 페이지 주입.
4. **공통 컴포넌트** — modals/agent/auth/compliance/common 디렉토리 단위로 일괄 작성. 모달은 `open/onClose` props 단일 패턴, 정적 트리거 버튼을 데모 페이지에서 호출.
5. **페이지 본문** — 각 라우트는 명세 1줄 요약 + 핵심 위젯(폼·표·카드) 정적 목업. 데이터는 `data/mockData.js`에서 import.
6. **데모 진입점** — 랜딩 페이지(/)와 직원 대시보드(/admin)에 "공통 모달 시연" 섹션을 두어 14종 모달을 클릭 한 번으로 열어볼 수 있게 한다.
7. **3005 기동 스크립트 메모** — 설계 문서 말미에 운용 명령 기록. CLAUDE.md의 5173은 그대로 유지.

## 단위 테스트 계획

수동 시연 기반(브라우저). evidence/unit/notes.md 에 시나리오·결과를 기록.

대상 시나리오:
- (라우팅) /, /login, /dashboard, /admin, /audit, /maintenance, /forbidden-test 등 주요 경로 진입 → 200 렌더 확인
- (404) 미정의 경로 진입 → NotFoundPage 노출
- (레이아웃) 고객 페이지에서 Header/Footer/AI 사이드패널 동시 노출 확인
- (직원) /admin 진입 시 Sidebar + Header(검색바·결재함 뱃지·망표시) 노출
- (모달 14종) 데모 페이지에서 각각 열림/닫힘, 키보드 ESC, 포커스 트랩(가능한 범위) 확인
- (규제 UI) FCPA 배너 3값 표시, PIPA 동의 토글 변경, 약관 스크롤 강제 동작
- (에이전트) ActionCard L0~L4 색·아이콘·배지 가시성, Undo 30초 카운트다운 시각 동작
- (3005) `npx vite --port 3005 --strictPort` 기동 후 `curl -s http://localhost:3005/` 200 확인, 5173 동시 살아있음 확인
- (린트/빌드) `npm run lint && npm run build` 둘 다 0 종료

## 회귀 테스트 계획

이번 변경은 사실상 신규 기능(빈 Vite 템플릿 → 본격 라우팅 앱). 다른 기존 기능은 없음.

대신 다음을 회귀로 본다 (evidence/regression/notes.md 에 기록):
- 5173 기존 dev 서버는 변경 후에도 정상 기동해야 한다 (`bash .claude/hooks/dev-health.sh` 0 종료)
- `bank-app/scripts/validate-spec.sh` 실행이 깨지지 않아야 한다 (화면정의서 무결성 점검 스크립트)
- 프로젝트 전체 `npm run build` 성공
- `git status`가 의도된 파일만 보이고, .gitignore 규칙(빌드/캐시/로그/.md 추적 규칙) 위반 없음

## 부록 — 3005 기동/정지 메모

```
# 기동 (5173과 동시)
(cd /Users/moon/bank_React/bank-app && nohup npx vite --port 3005 --strictPort > /tmp/bank-fe-3005.log 2>&1 & disown)

# 상태
lsof -ti:3005 && curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3005/

# 정지
lsof -ti:3005 | xargs kill
```
