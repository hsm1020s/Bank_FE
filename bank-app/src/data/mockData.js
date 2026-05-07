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
      { to: '/admin/customer/new', label: '신규 고객 등록' },
      { to: '/admin/deposit', label: '수신 계좌 관리' },
      { to: '/admin/teller', label: '창구 거래 처리' },
      { to: '/admin/teller/adjust', label: '거래 정정/취소' },
      { to: '/admin/approvals', label: '전자 결재' },
    ],
  },
  {
    group: '여신',
    items: [
      { to: '/admin/credit', label: '여신 심사' },
      { to: '/admin/loan/contracts', label: '약정 관리' },
      { to: '/admin/loan/disburse', label: '실행 (지급)' },
      { to: '/admin/delinquent', label: '연체 관리' },
      { to: '/admin/loan/npl', label: '부실채권/상각' },
      { to: '/admin/loan/seizure', label: '압류/가압류' },
    ],
  },
  {
    group: '컴플라이언스',
    items: [
      { to: '/admin/aml', label: 'AML / STR / CTR' },
      { to: '/admin/agent/console', label: '에이전트 운영 콘솔' },
      { to: '/admin/regulatory', label: '규제 보고서' },
    ],
  },
  {
    group: '운영',
    items: [
      { to: '/admin/ops', label: '운영 콘솔' },
      { to: '/admin/ops/incident', label: '사고신고/보이스피싱' },
      { to: '/admin/ops/healthcheck', label: '시스템/배치' },
      { to: '/admin/product', label: '상품 마스터' },
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

export const adminKpis = [
  { key: 'tx_today', label: '오늘 거래 건수', value: 18234, unit: '건', delta: '+5.2%', tone: 'positive', forRoles: ['TELLER','CRED','AML','AUDITOR'] },
  { key: 'tx_amount', label: '오늘 거래 금액', value: 12_400_000_000, unit: 'KRW', delta: '+1.8%', tone: 'positive', forRoles: ['TELLER','AUDITOR'] },
  { key: 'cred_pending', label: '여신 심사 대기', value: 47, unit: '건', delta: '+12', tone: 'negative', forRoles: ['CRED','AUDITOR'] },
  { key: 'cred_approved', label: '오늘 승인', value: 23, unit: '건', delta: '+3', tone: 'positive', forRoles: ['CRED','AUDITOR'] },
  { key: 'aml_match', label: 'AML 매칭', value: 9, unit: '건', delta: '+2', tone: 'negative', forRoles: ['AML','AUDITOR'] },
  { key: 'fds_block', label: 'FDS 차단', value: 41, unit: '건', delta: '+8', tone: 'negative', forRoles: ['TELLER','AML','AUDITOR'] },
  { key: 'delinq_total', label: '연체 잔액', value: 1_240_000_000, unit: 'KRW', delta: '-0.4%', tone: 'positive', forRoles: ['CRED','AUDITOR'] },
  { key: 'approvals', label: '결재 미처리', value: 7, unit: '건', delta: '0', tone: 'neutral', forRoles: ['TELLER','CRED','AML'] },
  { key: 'sla_breach', label: 'SLA 초과', value: 2, unit: '건', delta: '+1', tone: 'negative', forRoles: ['AUDITOR'] },
];

export const adminTrend = [
  { m: '09:00', v: 1200 }, { m: '10:00', v: 2400 }, { m: '11:00', v: 3800 },
  { m: '12:00', v: 2900 }, { m: '13:00', v: 3500 }, { m: '14:00', v: 4100 },
];

export const adminAlerts = [
  { id: 1, time: '14:02', level: 'danger', text: 'FDS 차단 임계 초과 — 41건 (목표 35)', target: '/admin/credit' },
  { id: 2, time: '13:51', level: 'warn', text: '신규 심사 케이스 5건 — 자동심사 부적합', target: '/admin/credit' },
  { id: 3, time: '13:30', level: 'info', text: 'AML 매칭 9건 — AML 콘솔에서 검토', target: '/admin/credit' },
  { id: 4, time: '13:14', level: 'warn', text: '연체 4단계 진입 후보 2건 — 결재 라우팅 필요', target: '/admin/delinquent' },
  { id: 5, time: '12:55', level: 'info', text: '주간 SLA 보고서 자동 생성 완료', target: '/audit' },
];

const familyBlocked = ['홍길녀(자녀)','김영자(배우자)'];
export const creditCases = Array.from({ length: 12 }, (_, i) => {
  const auto = i % 4 === 0 ? '자동승인' : i % 4 === 1 ? '자동거절' : i % 4 === 2 ? '수동심사' : '보류';
  const fb = i === 3 || i === 7;
  return {
    id: `C-2026-${String(1000 + i).padStart(4, '0')}`,
    customer: fb ? familyBlocked[i % 2] : `고객${i + 1}`,
    product: ['신용대출','주담대','전세','마이너스'][i % 4],
    amount: (10_000_000 + i * 5_300_000),
    receivedAt: `2026-05-${String(7 - (i % 5)).padStart(2, '0')}`,
    urgency: ['긴급','일반','일반','일반'][i % 4],
    autoResult: auto,
    assignee: i % 5 === 0 ? null : `심사역${(i % 3) + 1}`,
    family: fb,
    css: 600 + (i * 17) % 200,
  };
});

export const creditCaseDetail = {
  id: 'C-2026-1003',
  customer: '홍길동',
  arc: false,
  product: '신용대출',
  amount: 50_000_000,
  receivedAt: '2026-05-05',
  income: 60_000_000,
  job: '회사원',
  career: '5년 3개월',
  family: 2,
  css: 720,
  riskFlags: ['최근 6개월 신용카드 한도 80% 사용', '단기 차입 2건 보유'],
  documents: [
    { name: '재직증명서.pdf', size: '128KB', ok: true },
    { name: '소득증명원.pdf', size: '92KB', ok: true },
    { name: '주민등록등본.pdf', size: '54KB', ok: true },
  ],
  pattern: '입출금 정기성 양호 / 잔액 변동 안정',
};

export const delinquentCases = [
  { id: 'D-001', stage: 1, customer: '고객A', principal: 15_000_000, interest: 250_000, days: 12,  recent: 'SMS', product: '신용대출' },
  { id: 'D-002', stage: 1, customer: '고객B', principal: 8_500_000,  interest: 110_000, days: 18,  recent: '안내문', product: '신용대출' },
  { id: 'D-003', stage: 2, customer: '고객C', principal: 32_000_000, interest: 720_000, days: 35,  recent: 'COLL_CALL', product: '주담대' },
  { id: 'D-004', stage: 2, customer: '고객D', principal: 12_400_000, interest: 380_000, days: 41,  recent: 'COLL_CALL', product: '전세' },
  { id: 'D-005', stage: 3, customer: '고객E', principal: 25_000_000, interest: 1_120_000, days: 67, recent: 'CIS', product: '신용대출' },
  { id: 'D-006', stage: 3, customer: '고객F', principal: 90_000_000, interest: 4_300_000, days: 75, recent: 'CIS', product: '주담대' },
  { id: 'D-007', stage: 4, customer: '고객G', principal: 120_000_000, interest: 6_400_000, days: 95, recent: '사전최고', product: '주담대' },
  { id: 'D-008', stage: 4, customer: '고객H', principal: 48_000_000, interest: 2_100_000, days: 102, recent: '결재대기', product: '신용대출' },
];

export const consentMatrix = [
  { key: 'mkt_sms', label: '마케팅 SMS', required: false, value: true },
  { key: 'mkt_email', label: '마케팅 이메일', required: false, value: false },
  { key: 'mkt_push', label: '마케팅 PUSH', required: false, value: true },
  { key: 'voice_record', label: '음성 녹취 보관', required: false, value: true },
  { key: 'credit_query', label: '신용정보 조회', required: true, value: true },
  { key: 'credit_share', label: '신용정보 제공', required: false, value: false },
  { key: 'auto_decision_refused', label: 'AI 자동결정 거부', required: false, value: true },
];

export const userDevices = [
  { id: 'd1', name: 'Mac / Safari 26', os: 'macOS 14.6', last: '2026-05-07 09:12', current: true },
  { id: 'd2', name: 'iPhone 15 / iOS 19', os: 'iOS 19.1', last: '2026-05-06 21:33', current: false },
  { id: 'd3', name: 'iPad Pro / iOS 19', os: 'iPadOS 19.0', last: '2026-05-04 14:11', current: false },
  { id: 'd4', name: 'Windows / Chrome 130', os: 'Win11', last: '2026-04-29 10:02', current: false },
  { id: 'd5', name: 'Galaxy Tab / Android 16', os: 'Android 16', last: '2026-04-27 19:45', current: false },
  { id: 'd6', name: 'Pixel 8 / Android 16', os: 'Android 16', last: '2026-04-21 22:08', current: false },
];

export const consentHistory = [
  { at: '2026-04-30 14:01', who: 'self', action: '마케팅 이메일 OFF' },
  { at: '2026-03-12 10:08', who: 'self', action: 'AI 자동결정 거부 ON' },
  { at: '2025-12-30 09:00', who: 'self', action: '약관 v3.2 동의' },
];

export const strCases = [
  { id: 'STR-2026-0044', txId: 'TX-2026-77881', customer: '고**', amount: 23_000_000, channel: '인터넷뱅킹', rule: 'SUDDEN_LARGE_FOREIGN', score: 0.78, sla: 'D-23', status: '메이커 대기' },
  { id: 'STR-2026-0043', txId: 'TX-2026-77502', customer: '김**', amount: 8_900_000, channel: '모바일', rule: 'STRUCTURING', score: 0.62, sla: 'D-21', status: '체커 대기' },
  { id: 'STR-2026-0042', txId: 'TX-2026-77001', customer: '박**', amount: 51_000_000, channel: '창구', rule: 'CASH_INTENSIVE', score: 0.91, sla: 'D-15', status: 'KoFIU 보고' },
];

export const ctrCases = [
  { id: 'CTR-2026-1101', txId: 'TX-2026-78001', customer: '이**', amount: 12_500_000, channel: '창구', auto: true, sla: 'D-30 / 운영 D-7' },
  { id: 'CTR-2026-1102', txId: 'TX-2026-78014', customer: '한**', amount: 30_000_000, channel: '인터넷', auto: true, sla: 'D-29 / 운영 D-6' },
];

export const sanctionMatches = [
  { id: 'SM-001', txId: 'TX-2026-78201', name: 'IVAN P***', score: 0.97, list: 'OFAC SDN', action: '즉시 차단' },
  { id: 'SM-002', txId: 'TX-2026-78230', name: 'AHMED K***', score: 0.82, list: 'EU/UN', action: '검토 큐 (5분 SLA)' },
  { id: 'SM-003', txId: 'TX-2026-78245', name: 'JOHN S***', score: 0.55, list: 'OFAC', action: '후보' },
];

export const amlRules = [
  { id: 'R-001', name: '단기 대량 외환', version: 'v3', active: true, threshold: '24h ≥ 100m KRW', updated: '2026-04-12' },
  { id: 'R-002', name: '구조적 분산이체', version: 'v5', active: true, threshold: '7d ≥ 5건 + 변동계수 0.2 이하', updated: '2026-04-30' },
  { id: 'R-003', name: '현금 집중', version: 'v2', active: false, threshold: '30d 현금비율 ≥ 80%', updated: '2026-02-01' },
];

export const agentKpis = [
  { key: 'calls', label: '오늘 호출수', value: 12_034, unit: '건' },
  { key: 'auto', label: '자동완결률', value: '78%', delta: '+2%p', tone: 'positive' },
  { key: 'fall', label: '폴백률', value: '12%', delta: '-1%p', tone: 'positive' },
  { key: 'csat', label: '만족도', value: 4.2, unit: '/5', delta: '+0.1', tone: 'positive' },
  { key: 'halluc', label: '환각 의심', value: 7, unit: '건', tone: 'negative' },
  { key: 'cost', label: '비용 (오늘)', value: 142_000, unit: 'KRW', tone: 'neutral' },
];

export const agentLiveStream = [
  { id: 1, time: '14:02:08', user: 'cust:hong**', screen: '/transfer', risk: 'L2', text: '엄마한테 50만원 이체해줘 — OTP 모달 트리거됨' },
  { id: 2, time: '14:01:51', user: 'cust:kim**',  screen: '/dashboard', risk: 'L0', text: '잔액 보여줘 — 마스킹 default로 응답' },
  { id: 3, time: '14:00:33', user: 'cust:park**', screen: '/loan/apply', risk: 'L4', text: '대출 자동 결정 — 사람 검토 큐 라우팅' },
  { id: 4, time: '13:59:12', user: 'cust:lee**',  screen: '/profile',  risk: 'L1', text: '주소 변경 — OTP+ARS 안내' },
];

export const agentL4Queue = [
  { id: 'L4-001', screen: '/loan/apply', user: 'cust:park**', summary: '대출 자동 결정 → 사람 검토', requestedAt: '14:00:33', maker: null },
  { id: 'L4-002', screen: '/transfer', user: 'cust:choi**', summary: '신규 수취인 + 고액 야간 이체', requestedAt: '13:54:12', maker: null },
];

export const auditLogList = Array.from({ length: 30 }, (_, i) => {
  const isStr = i % 7 === 0;
  return {
    ts: `2026-05-${String(7 - (i % 7)).padStart(2, '0')} ${String((i * 3) % 24).padStart(2, '0')}:${String((i * 11) % 60).padStart(2, '0')}:00`,
    actor: i % 3 === 0 ? 'cust:hong**' : i % 3 === 1 ? 'emp:kim_***' : 'agent:assistant',
    ip: `192.0.2.${(i * 7) % 250}`,
    screen: ['/dashboard','/transfer','/loan/apply','/admin/credit','/profile'][i % 5],
    action: ['LOGIN','TRANSFER_EXEC','UNMASK','APPROVE_CREDIT','UPDATE_CONSENT'][i % 5],
    result: i % 11 === 0 ? 'BLOCKED' : 'OK',
    risk: ['L0','L1','L2','L3','L4'][i % 5],
    targetId: isStr ? 'STR-***' : `T-${1000 + i}`,
    hash: `0x${(i * 0xa5b3).toString(16).padStart(8, '0')}…`,
  };
});

export const integrityCheck = {
  chainHashOk: true,
  merkleRootOk: true,
  tsaOk: true,
  lastVerifiedAt: '2026-05-07 09:00:00',
  totalEntries: 1_240_055,
};

export const autoTransfers = [
  { id: 'A-1', target: '엄마 (국민 1234-***-5678)', amount: 500_000, schedule: '매월 25일', mode: '고정', status: 'active' },
  { id: 'A-2', target: '월세 (신한 8888-***-2222)', amount: 800_000, schedule: '매월 1일', mode: '고정', status: 'active' },
  { id: 'A-3', target: 'CMA 잔액 이체', amount: 0, schedule: '매주 금', mode: '잔액기준 100만↑', status: 'active' },
  { id: 'A-4', target: '카드사 (하나 7777-***-1111)', amount: 0, schedule: '매월 15일', mode: '청구액', status: 'paused' },
];

export const accidentCategories = [
  { key: 'card_lost', label: '카드 분실/도난', mode: 'revoke', target: '재발급' },
  { key: 'pkii_lost', label: '인증서 분실', mode: 'revoke', target: '재발급' },
  { key: 'account_lost', label: '통장 분실', mode: 'revoke', target: '재발급' },
  { key: 'voice_phishing', label: '보이스피싱 피해', mode: 'freeze', target: 'KFTC 채권소멸 + D+5 환급' },
  { key: 'suspect', label: '의심 거래', mode: 'freeze', target: '복구 가능 (해제 가능)' },
  { key: 'compromise', label: '계정 탈취 의심', mode: 'revoke', target: '전수 재발급' },
];

export const documentTypes = [
  { code: 'BAL', name: '잔액증명서', desc: '특정일자 잔액 증명' },
  { code: 'TX',  name: '거래내역서', desc: '기간 내 거래 명세' },
  { code: 'DEBT', name: '부채증명서', desc: '대출 잔액·이자 증명' },
  { code: 'INT', name: '이자납부증명', desc: '연말정산용' },
  { code: 'FX',  name: '외화송금확인서', desc: '송금 사유·환율 포함' },
  { code: 'EN',  name: '영문증명서', desc: '영문명 등록 필수' },
];

export const customerLimits = [
  { kind: '이체', perTx: 10_000_000, perDay: 50_000_000, max: 100_000_000 },
  { kind: '출금', perTx: 5_000_000, perDay: 30_000_000, max: 50_000_000 },
  { kind: '카드', perTx: 3_000_000, perDay: 10_000_000, max: 30_000_000 },
  { kind: '외화', perTx: 50_000, perDay: 100_000, max: 1_000_000 },
];

export const loanCatalog = [
  { code: 'L-CR-CL', name: '직장인 신용대출', kind: '신용', min: 4.2, avg: 5.6, max: 7.9, max_amount: 100_000_000 },
  { code: 'L-MTG-A', name: '주택담보 대출 (주거용)', kind: '주담대', min: 3.5, avg: 4.4, max: 5.4, max_amount: 1_000_000_000 },
  { code: 'L-JEN', name: '전세자금 대출', kind: '전세', min: 3.0, avg: 4.0, max: 5.0, max_amount: 500_000_000 },
  { code: 'L-MN', name: '마이너스 통장', kind: '마이너스', min: 5.0, avg: 6.5, max: 8.5, max_amount: 50_000_000 },
];

export const customerSearchResults = [
  { id: 'C-100023', name: '홍**', resident: '88****-1******', phone: '010-****-1234', branch: '강남' },
  { id: 'C-100051', name: '김**', resident: '92****-2******', phone: '010-****-5678', branch: '강남' },
  { id: 'C-100078', name: '박**', resident: '85****-1******', phone: '010-****-7890', branch: '서초' },
];

export const cifSummary = {
  id: 'C-100023',
  name: '홍길동',
  status: 'active', // active / deceased / guardian
  birth: '1988-12-12',
  resident: '881212-1******',
  phone: '010-****-1234',
  email: 'hong@example.com',
  branch: '강남',
  amlRisk: 'LOW',
  pep: false,
  joinedAt: '2018-03-12',
  domains: {
    deposit: 4, loan: 1, card: 2, fx: 0, invest: 1, applied: 3, aml: 0,
  },
};

export const cifTimeline = [
  { ts: '2026-05-07 09:14', kind: 'TX', text: '이체 500,000 → 국민*** (OTP 검증)' },
  { ts: '2026-05-05 11:22', kind: 'AUTH', text: '디바이스 추가 등록' },
  { ts: '2026-04-30 14:01', kind: 'CONSENT', text: '마케팅 이메일 OFF' },
  { ts: '2026-04-12 10:08', kind: 'LOAN', text: '신용대출 5천만 실행' },
];

export const newCustomerSteps = ['신분증 OCR', '얼굴 비교', '진위확인 API', 'AML/PEP 스크리닝', '책임자 결재', '완료'];

export const accountManageList = [
  { id: 'ACC-001', cif: 'C-100023', alias: '주거래', balance: 12_340_500, status: 'active', limitMode: '일반', stop: false },
  { id: 'ACC-002', cif: 'C-100023', alias: 'CMA', balance: 5_430_000, status: 'active', limitMode: '한도제한', stop: false },
  { id: 'ACC-003', cif: 'C-100051', alias: '월급', balance: 3_120_000, status: 'frozen', limitMode: '일반', stop: true },
];

export const tellerTxKinds = [
  { code: 'CASH_IN', label: '현금 입금' },
  { code: 'CASH_OUT', label: '현금 출금' },
  { code: 'TX', label: '계좌 이체' },
  { code: 'FX', label: '외화 환전' },
  { code: 'BOND', label: '자기앞수표' },
  { code: 'DEP_OPEN', label: '예적금 가입' },
  { code: 'DEP_CLOSE', label: '예적금 해지' },
];

export const fxRate = { pair: 'USD/KRW', rate: 1378.20, lastAt: '2026-05-07 13:48', stale: false };

export const txAdjustReasons = [
  { code: 'WRONG_AMOUNT', label: '금액 오류' },
  { code: 'WRONG_TARGET', label: '대상 오류' },
  { code: 'DUP', label: '중복 거래' },
  { code: 'OTHER', label: '기타 (컴플라이언스 결재 추가)' },
];

export const loanContracts = [
  { id: 'L-2026-0042', customer: '홍길동', kind: '신용', principal: 50_000_000, remaining: 25_000_000, rate: 5.4, status: '정상' },
  { id: 'L-2026-0091', customer: '김영희', kind: '주담대', principal: 300_000_000, remaining: 287_500_000, rate: 4.4, status: '정상' },
  { id: 'L-2025-0188', customer: '박철수', kind: '신용', principal: 30_000_000, remaining: 28_500_000, rate: 6.5, status: '연체' },
];

export const nplCases = [
  { id: 'NPL-001', customer: '박철수', remaining: 28_500_000, classification: '회수의문', overdue: 95, action: '상각 후보' },
  { id: 'NPL-002', customer: '최미정', remaining: 12_000_000, classification: '추정손실', overdue: 180, action: '매각 검토' },
];

export const seizureCases = [
  { id: 'SZ-001', court: '서울중앙지법', kind: '본압류', target: 'ACC-001 200만', priority: 1, status: '차단됨' },
  { id: 'SZ-002', court: '국세청', kind: '국세 체납', target: 'ACC-002 50만', priority: 0, status: '우선 적용 (국세 절대 우선)' },
  { id: 'SZ-003', court: '서울중앙지법', kind: '가압류', target: 'ACC-003 30만', priority: 2, status: '본압류 대기' },
];

export const incidentQueue = [
  { id: 'INC-001', source: 'CUS-020', priority: 'P1', kind: '보이스피싱', customer: '고**', received: '14:02' },
  { id: 'INC-002', source: '콜센터', priority: 'P1', kind: '카드 분실', customer: '김**', received: '13:45' },
  { id: 'INC-003', source: '영업점', priority: 'P2', kind: '의심 거래', customer: '박**', received: '13:21' },
];

export const batchJobs = [
  { code: 'BAT-001', name: '일일 정산', schedule: '01:00', state: 'OK', last: '01:08' },
  { code: 'BAT-002', name: '이자 계산', schedule: '02:00', state: 'OK', last: '02:14' },
  { code: 'BAT-003', name: '연체 전이', schedule: '03:00', state: 'OK', last: '03:05' },
  { code: 'BAT-004', name: '감사로그 머클', schedule: '04:00', state: 'OK', last: '04:02' },
  { code: 'BAT-005', name: 'CTR 자동 등록', schedule: '05:00', state: 'OK', last: '05:11' },
  { code: 'BAT-006', name: 'KoFIU 보고 큐', schedule: '06:00', state: 'OK', last: '06:09' },
  { code: 'BAT-007', name: '신용평가 갱신', schedule: '06:30', state: 'OK', last: '06:42' },
  { code: 'BAT-008', name: 'AML 제재 명단', schedule: '07:00', state: 'FAIL', last: '07:01 (24h+)' },
  { code: 'BAT-009', name: 'FDS 룰 갱신', schedule: '08:00', state: 'OK', last: '08:03' },
  { code: 'BAT-010', name: '비밀번호 만료 알림', schedule: '09:00', state: 'OK', last: '09:00' },
  { code: 'BAT-011', name: '한도 상향 적용', schedule: '09:30', state: 'OK', last: '09:30' },
  { code: 'BAT-012', name: '환율 갱신', schedule: '매시', state: 'WARN', last: '14:00 (1회 실패)' },
];

export const systemHealth = [
  { name: '계정계', status: 'OK', latency: '12ms' },
  { name: '채널계', status: 'OK', latency: '8ms' },
  { name: '대외계', status: 'WARN', latency: '420ms' },
  { name: 'DB', status: 'OK', latency: '3ms' },
  { name: '캐시', status: 'OK', latency: '0.5ms' },
  { name: 'MQ', status: 'OK', latency: '4ms' },
];

export const regulatoryReports = [
  { cat: 'KoFIU', items: [{ code: 'STR-MONTHLY', name: 'STR 월보', status: '제출 완료', dueAt: '2026-05-10' }] },
  { cat: '신용정보원', items: [{ code: 'CIE-DAILY', name: '신용정보 일일 보고', status: '진행 중', dueAt: '2026-05-08' }] },
  { cat: '금감원', items: [{ code: 'BIS', name: 'BIS 비율 분기', status: '대기', dueAt: '2026-06-30' }] },
  { cat: '가계부채', items: [{ code: 'HFC', name: '가계 대출 잔액 보고', status: '제출 완료', dueAt: '2026-05-05' }] },
];

export const approvalsList = [
  { id: 'AP-001', kind: '한도 상향', requester: '김창구', amount: 1_000_000, status: '진행 중', sla: 'D-1' },
  { id: 'AP-002', kind: '마스킹 풀기 사후 승인', requester: 'kim_***', amount: 0, status: '진행 중', sla: 'D-3' },
  { id: 'AP-003', kind: '자동결정 거부 → 사람 심사', requester: 'agent', amount: 50_000_000, status: '대기', sla: 'D-7' },
];

export const productMasterTree = [
  { code: 'P-DEP', name: '수신', children: [
    { code: 'P-DEP-12M', name: '정기예금 12M' },
    { code: 'P-DEP-24M', name: '정기예금 24M' },
    { code: 'P-INST-3Y', name: '자유적금 36M' },
  ] },
  { code: 'P-LOAN', name: '여신', children: [
    { code: 'L-CR-CL', name: '직장인 신용대출' },
    { code: 'L-MTG-A', name: '주택담보 (주거)' },
  ] },
];
