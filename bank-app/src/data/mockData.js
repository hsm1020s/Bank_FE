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
  { id: 'a1', number: '1002-***-1234', name: '주거래통장', balance: 12340500, currency: 'KRW', kind: '입출금', status: 'active', rate: 0.1, lastTx: '2026-05-07', alias: '월급통장' },
  { id: 'a2', number: '1004-***-9981', name: 'CMA', balance: 5430000, currency: 'KRW', kind: '입출금', status: 'active', rate: 2.5, lastTx: '2026-05-06', alias: 'CMA' },
  { id: 'a3', number: '1006-***-7711', name: '정기예금 12M', balance: 30000000, currency: 'KRW', kind: '정기예금', status: 'active', rate: 3.6, maturity: '2026-12-31', lastTx: '2026-05-01', alias: '비상금' },
  { id: 'a4', number: '1008-***-2233', name: '자유적금', balance: 1500000, currency: 'KRW', kind: '적금', status: 'active', rate: 4.1, maturity: '2027-06-15', lastTx: '2026-05-05', alias: '여행' },
  { id: 'a5', number: '1009-***-0044', name: '해지된 통장', balance: 0, currency: 'KRW', kind: '입출금', status: 'closed', rate: 0.1, lastTx: '2025-08-12', alias: null },
];

export const assetSummary = {
  asset: 49270500,
  debt: 25000000,
  net: 24270500,
};

export const trendSeries = [
  { m: '2025-12', v: 22100000 },
  { m: '2026-01', v: 22500000 },
  { m: '2026-02', v: 22950000 },
  { m: '2026-03', v: 23200000 },
  { m: '2026-04', v: 23800000 },
  { m: '2026-05', v: 24270500 },
];

const kinds = ['입금', '출금', '이자', '수수료'];
export const transactions = Array.from({ length: 30 }, (_, i) => {
  const day = String(7 - (i % 7)).padStart(2, '0');
  const isIncome = i % 3 === 0;
  const amount = (i + 1) * 12340 % 580000 + 1200;
  return {
    id: `t${1000 + i}`,
    ts: `2026-05-${day} ${String(9 + (i % 9)).padStart(2, '0')}:${String((i * 7) % 60).padStart(2, '0')}:00`,
    kind: kinds[i % kinds.length],
    amount: isIncome ? amount : -amount,
    balance: 12340500 - i * 4000,
    counterparty: i % 4 === 0 ? '국민*** 홍**' : i % 4 === 1 ? '신한*** 김**' : i % 4 === 2 ? '카카오뱅크 ***' : '하나*** 박**',
    memo: i % 5 === 0 ? '월세' : i % 5 === 1 ? '식비' : i % 5 === 2 ? '교통' : i % 5 === 3 ? '용돈' : '기타',
    fee: i % 6 === 0 ? 500 : 0,
    tax: i % 7 === 0 ? Math.round(amount * 0.154) : 0,
  };
});

export const loanContract = {
  id: 'L-2026-0042',
  status: '정상',
  principal: 50000000,
  remaining: 25000000,
  rate: 5.4,
  rateType: '변동',
  startedAt: '2024-06-01',
  maturity: '2029-06-01',
  totalCount: 60,
  paidCount: 23,
};

export const loanSchedule = Array.from({ length: 24 }, (_, i) => {
  const n = i + 24;
  const principal = 760000;
  const interest = Math.max(40000, 250000 - i * 8000);
  const total = principal + interest;
  const paid = i < 6;
  return {
    no: n,
    dueDate: `2026-${String(((n - 24) % 12) + 1).padStart(2, '0')}-15`,
    principal,
    interest,
    total,
    balance: 25000000 - i * principal,
    paidAt: paid ? `2026-${String(((n - 24) % 12) + 1).padStart(2, '0')}-15` : null,
    status: paid ? '완납' : (i === 6 ? '예정' : '예정'),
  };
});

export const rateHistory = [
  { at: '2024-06-01', rate: 4.2, reason: '약정 시점' },
  { at: '2025-01-01', rate: 5.0, reason: '변동금리 — 기준금리 상승' },
  { at: '2025-07-01', rate: 5.4, reason: '변동금리 — 가산금리 조정' },
];

export const banks = [
  { code: '004', name: '국민은행' },
  { code: '088', name: '신한은행' },
  { code: '081', name: '하나은행' },
  { code: '011', name: '농협은행' },
  { code: '090', name: '카카오뱅크' },
  { code: '089', name: '케이뱅크' },
  { code: '020', name: '우리은행' },
];

export const transferLimits = {
  perTx: 10_000_000,
  perDay: 50_000_000,
};

export const productCatalog = [
  { code: 'P-DEP-12M', name: '정기예금 12M', kind: '정기예금', rate: 3.6, period: '12개월' },
  { code: 'P-DEP-24M', name: '정기예금 24M', kind: '정기예금', rate: 3.9, period: '24개월' },
  { code: 'P-INST-3Y', name: '자유적금 36M', kind: '적금', rate: 4.1, period: '36개월' },
  { code: 'P-CMA',     name: 'CMA', kind: '입출금', rate: 2.5, period: '수시' },
];

export const auditLogSamples = [
  { ts: '2026-05-07 09:12:11', actor: 'cust:hongkd', action: 'LOGIN', risk: 'L0', result: 'OK' },
  { ts: '2026-05-07 09:14:02', actor: 'cust:hongkd', action: 'TRANSFER', risk: 'L2', result: 'OTP_VERIFIED' },
  { ts: '2026-05-07 09:21:55', actor: 'agent:assistant', action: 'AI_RECOMMEND_CLOSE_DEPOSIT', risk: 'L3', result: 'AWAITING_3STEP' },
  { ts: '2026-05-07 09:22:30', actor: 'agent:assistant', action: 'AUTO_DECISION_CREDIT', risk: 'L4', result: 'BLOCKED_NEED_HUMAN' },
];

export const fcpaRates = { min: 4.2, avg: 5.6, max: 7.9 };
