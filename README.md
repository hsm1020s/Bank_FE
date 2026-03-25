# KB Bank Admin Console

은행 업무를 위한 관리자 대시보드 웹 애플리케이션입니다.

![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-3.8-22B5BF)

## 미리보기

### 주요 화면 구성

| 페이지 | 경로 | 설명 |
|--------|------|------|
| 대시보드 | `/` | 핵심 지표, 수신/여신 추이 차트, 월별 수익, 계좌 유형 비율, 최근 거래 |
| 고객 관리 | `/customers` | 고객 등급별 통계, 검색/필터, 고객 목록 |
| 거래 내역 | `/transactions` | 거래 통계, 유형/상태 필터, 거래 목록 |
| 계좌 관리 | `/accounts` | 계좌 통계, 유형별 필터, 계좌 목록 |
| 대출 관리 | `/loans` | 대출 현황 차트, 연체 관리, 대출 목록 |
| 설정 | `/settings` | 기본/보안/알림 설정, 시스템 정보 |

## 기술 스택

| 분류 | 기술 |
|------|------|
| **프레임워크** | React 19 |
| **빌드 도구** | Vite 8 |
| **라우팅** | React Router DOM 7 |
| **차트** | Recharts 3 (Area, Bar, Pie Chart) |
| **스타일링** | CSS3 + CSS Variables (커스텀 디자인 시스템) |
| **린팅** | ESLint 9 + Prettier |

## 프로젝트 구조

```
bank-app/
├── public/                  # 정적 파일 (favicon, icons)
├── src/
│   ├── components/
│   │   └── Layout/
│   │       ├── Layout.jsx   # 전체 레이아웃 (Sidebar + Header + Outlet)
│   │       ├── Sidebar.jsx  # 사이드바 네비게이션
│   │       └── Header.jsx   # 상단 헤더 (검색, 알림, 날짜)
│   ├── pages/
│   │   ├── Dashboard.jsx    # 대시보드
│   │   ├── Customers.jsx    # 고객 관리
│   │   ├── Transactions.jsx # 거래 내역
│   │   ├── Accounts.jsx     # 계좌 관리
│   │   ├── Loans.jsx        # 대출 관리
│   │   └── Settings.jsx     # 설정
│   ├── data/
│   │   └── mockData.js      # Mock 데이터 (고객, 거래, 계좌, 대출, 알림)
│   ├── styles/
│   │   ├── global.css       # 전역 스타일, CSS 변수, 리셋
│   │   ├── layout.css       # 사이드바, 헤더, 레이아웃
│   │   └── pages.css        # 카드, 테이블, 뱃지, 폼 스타일
│   ├── App.jsx              # 라우팅 설정
│   └── main.jsx             # 엔트리포인트
├── index.html
├── vite.config.js
└── package.json
```

## 주요 기능

### 대시보드
- **핵심 지표 카드** - 총 수신액, 여신액, 고객수, 월간 수익 + 증감률
- **수신/여신 추이** - 12개월 Area Chart (그라디언트 채움)
- **월별 수익** - Bar Chart
- **계좌 유형 비율** - Donut Pie Chart + 범례
- **최근 거래** - 실시간 거래 테이블

### 관리 페이지 공통
- 실시간 검색 (이름, ID, 전화번호, 계좌번호 등)
- 다중 필터 (유형, 상태, 등급)
- 컬러 뱃지 (상태별, 유형별, 등급별)
- 통계 카드 (페이지별 핵심 수치)

### UI/UX
- 다크 사이드바 + 밝은 메인 영역 레이아웃
- 알림 드롭다운 (긴급/경고/정보/성공)
- 토글 스위치, 인풋 폼, 커스텀 셀렉트
- 테이블 호버 효과, 금액 우측 정렬
- CSS 변수 기반 일관된 디자인 시스템

## 시작하기

### 요구 사항
- Node.js 18+
- npm 9+

### 설치 및 실행

```bash
# 프로젝트 디렉토리 이동
cd bank-app

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

### 빌드

```bash
npm run build    # 프로덕션 빌드
npm run preview  # 빌드 결과 미리보기
npm run lint     # ESLint 검사
```
