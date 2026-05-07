export const customerMenu = [
  { to: '/dashboard', label: '홈' },
  { to: '/deposit', label: '수신' },
  { to: '/loan', label: '여신' },
  { to: '/transfer', label: '이체' },
  { to: '/profile', label: '내정보' },
];

export const customerFooterLinks = [
  { label: '약관', href: '#' },
  { label: '개인정보처리방침', href: '#' },
  { label: '신용정보활용', href: '#' },
  { label: '보안센터', href: '#' },
  { label: '민원', href: '/complaints' },
];

export const adminMenu = [
  {
    group: '창구 업무',
    items: [
      { to: '/admin', label: '통합 대시보드' },
      { to: '/admin/customer/search', label: '고객 검색' },
      { to: '/admin/approvals', label: '결재함' },
    ],
  },
  {
    group: '운영',
    items: [
      { to: '/admin/ops', label: '운영 콘솔' },
      { to: '/admin/ops/release', label: '배포/회수' },
      { to: '/admin/ops/healthcheck', label: 'HealthCheck' },
    ],
  },
  {
    group: '감사',
    items: [
      { to: '/audit', label: '감사 대시보드' },
      { to: '/audit/logs', label: '감사 로그 조회' },
    ],
  },
];

export const notifications = [
  { id: 1, level: 'info', message: '입금 알림: 계좌 ***-***-1234 +500,000원' },
  { id: 2, level: 'warn', message: '본인확인 30일 경과 — 재인증 필요' },
  { id: 3, level: 'danger', message: 'FDS 차단된 시도가 있습니다. 보안센터 확인' },
];

export const accounts = [
  { number: '1002-***-1234', name: '주거래통장', balance: 12340500, currency: 'KRW' },
  { number: '1004-***-9981', name: 'CMA', balance: 5430000, currency: 'KRW' },
];

export const auditLogSamples = [
  { ts: '2026-05-07 09:12:11', actor: 'cust:hongkd', action: 'LOGIN', risk: 'L0', result: 'OK' },
  { ts: '2026-05-07 09:14:02', actor: 'cust:hongkd', action: 'TRANSFER', risk: 'L2', result: 'OTP_VERIFIED' },
  { ts: '2026-05-07 09:21:55', actor: 'agent:assistant', action: 'AI_RECOMMEND_CLOSE_DEPOSIT', risk: 'L3', result: 'AWAITING_3STEP' },
  { ts: '2026-05-07 09:22:30', actor: 'agent:assistant', action: 'AUTO_DECISION_CREDIT', risk: 'L4', result: 'BLOCKED_NEED_HUMAN' },
];

export const fcpaRates = { min: 4.2, avg: 5.6, max: 7.9 };
