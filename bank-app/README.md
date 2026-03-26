# KB Bank Admin Console

KB Bank 관리자용 뱅킹 대시보드 웹 애플리케이션입니다. React + Vite 기반의 SPA로, 고객·계좌·거래·대출 데이터를 시각화하고 관리하는 내부 어드민 시스템입니다.

---

## 기술 스택

| 분류 | 기술 |
|------|------|
| 프레임워크 | React 19 |
| 빌드 도구 | Vite 8 |
| 라우팅 | React Router DOM v7 |
| 차트 | Recharts v3 |
| 린터 | ESLint 9 (react-hooks, react-refresh) |
| 백엔드 연동 | REST API (`http://localhost:8080/api`) |

---

## 시작하기

### 요구사항

- Node.js 18 이상
- 백엔드 API 서버가 `http://localhost:8080` 에서 실행 중이어야 합니다

### 설치 및 실행

```bash
# 패키지 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과물 미리보기
npm run preview
```

---

## 프로젝트 구조

```
bank-app/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── api/
│   │   └── bankApi.js          # 백엔드 API 호출 함수 모음
│   ├── assets/
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── Layout.jsx      # 사이드바 + 헤더 + 콘텐츠 래퍼
│   │   │   ├── Sidebar.jsx     # 좌측 네비게이션 사이드바
│   │   │   └── Header.jsx      # 상단 헤더
│   │   ├── modals/
│   │   │   ├── AccountDetail.jsx
│   │   │   ├── CustomerDetail.jsx
│   │   │   ├── LoanDetail.jsx
│   │   │   └── TransactionDetail.jsx
│   │   ├── Badge.jsx           # StatusBadge / TypeBadge / GradeBadge
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── DataTable.jsx       # 클릭 가능한 범용 데이터 테이블
│   │   ├── FilterBar.jsx       # 검색 + 드롭다운 필터 조합
│   │   ├── Modal.jsx           # 기본 모달 + ConfirmModal
│   │   ├── StatCard.jsx        # 통계 수치 카드
│   │   └── Toggle.jsx          # 토글 스위치
│   ├── pages/
│   │   ├── Dashboard.jsx       # 대시보드 (/)
│   │   ├── Customers.jsx       # 고객 관리 (/customers)
│   │   ├── Accounts.jsx        # 계좌 관리 (/accounts)
│   │   ├── Transactions.jsx    # 거래 내역 (/transactions)
│   │   ├── Loans.jsx           # 대출 관리 (/loans)
│   │   └── Settings.jsx        # 설정 (/settings)
│   ├── styles/
│   │   ├── global.css
│   │   ├── layout.css
│   │   ├── modal.css
│   │   └── pages.css
│   ├── utils/
│   │   └── format.js           # 한국 원화 숫자 포매팅 유틸
│   ├── App.jsx                 # 라우터 설정
│   └── main.jsx
├── package.json
└── vite.config.js
```

---

## 페이지별 기능

### 대시보드 (`/`)
- **통계 카드**: 총 수신액, 총 여신액, 총 고객수, 월간 수익 (전월 대비 증감률 포함)
- **수신/여신 추이 차트**: 월별 Area 차트 (억원 단위)
- **월별 수익 차트**: Bar 차트
- **계좌 유형 비율**: Pie 차트 (보통예금 / 정기예금 / 적금 등)
- **최근 거래 테이블**: 최근 6건, 행 클릭 시 상세 모달

### 고객 관리 (`/customers`)
- 고객 등급별 통계 (VVIP / VIP / 일반)
- 이름·ID·전화번호·이메일 통합 검색
- 등급·상태 필터링
- 행 클릭 시 고객 상세 모달
- 신규 고객 등록 버튼 (UI)

### 계좌 관리 (`/accounts`)
- 총 계좌수·총 잔액·정상/휴면 계좌 통계
- 계좌번호·고객명 검색
- 계좌 유형 필터 (보통예금 / 정기예금 / 적금 / 자유적금)
- 행 클릭 시 계좌 상세 모달

### 거래 내역 (`/transactions`)
- 총 거래건수·총 거래금액·완료/실패 건수 통계
- 거래번호·고객명·계좌번호 검색
- 거래 구분(입금·출금·이체·대출상환) / 상태(완료·처리중·실패) 필터
- 내보내기 버튼 (UI), 행 클릭 시 거래 상세 모달

### 대출 관리 (`/loans`)
- 총 대출 실행액·잔액·평균 금리·연체 건수 통계
- 대출 유형별 실행액/잔액 가로 Bar 차트
- 대출번호·고객명 검색, 상품 유형 필터
- 연체 건은 행 강조 표시 (row-danger)
- 행 클릭 시 대출 상세 모달

### 설정 (`/settings`)
- **기본 설정**: 은행명, 일일 이체·출금 한도, 자동 로그아웃 시간
- **보안 설정**: 2단계 인증, 유지보수 모드
- **알림 설정**: 이메일·SMS·연체 알림 토글
- **시스템 정보**: 버전, DB/서버 상태, SSL 인증서 만료일
- 저장 시 확인 모달 표시

---

## API 연동

`src/api/bankApi.js`에서 백엔드와 통신합니다. 기본 URL은 `http://localhost:8080/api`입니다.

| 함수 | 엔드포인트 | 용도 |
|------|-----------|------|
| `fetchStats` | `GET /dashboard/stats` | 대시보드 통계 |
| `fetchMonthly` | `GET /dashboard/monthly` | 월별 수신/여신/수익 |
| `fetchAccountTypes` | `GET /dashboard/account-types` | 계좌 유형 비율 |
| `fetchCustomers` | `GET /customers` | 고객 목록 |
| `fetchAccounts` | `GET /accounts` | 계좌 목록 |
| `fetchLoans` | `GET /loans` | 대출 목록 |
| `fetchTransactions` | `GET /transactions` | 거래 내역 |
| `fetchNotifications` | `GET /notifications` | 알림 목록 |

---

## 공통 컴포넌트

| 컴포넌트 | 설명 |
|---------|------|
| `StatCard` | 라벨·수치·증감률을 표시하는 통계 카드 |
| `DataTable` | `columns` 정의와 `data` 배열을 받아 렌더링하는 범용 테이블. `onRowClick` 핸들러 지원 |
| `FilterBar` | 텍스트 검색 + 다수의 드롭다운 필터를 조합하는 바 |
| `Badge` | `StatusBadge` (활성/휴면/정지/연체 등), `TypeBadge` (입금/출금 등), `GradeBadge` (VVIP/VIP/일반) |
| `Modal` | 범용 모달 기본 레이아웃, `ConfirmModal` 확인/취소 다이얼로그 |
| `Toggle` | 레이블과 설명을 포함한 토글 스위치 |

---

## 유틸리티

`src/utils/format.js` — 한국 원화 숫자 포매팅

| 함수 | 출력 예시 |
|------|---------|
| `formatAmount(n)` | `1,234,567원` |
| `formatKRW(n)` | `1.2조 / 345억 / 5만` |
| `formatShort(n)` | `1.2억 / 5만` |
