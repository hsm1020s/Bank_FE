export const dashboardStats = {
  totalDeposits: 284_750_000_000,
  totalLoans: 167_320_000_000,
  totalCustomers: 48_562,
  monthlyRevenue: 3_840_000_000,
  depositGrowth: 12.5,
  loanGrowth: 8.3,
  customerGrowth: 5.7,
  revenueGrowth: -2.1,
};

export const monthlyData = [
  { month: '1월', deposits: 245, loans: 148, revenue: 32 },
  { month: '2월', deposits: 252, loans: 151, revenue: 34 },
  { month: '3월', deposits: 248, loans: 155, revenue: 31 },
  { month: '4월', deposits: 261, loans: 158, revenue: 35 },
  { month: '5월', deposits: 255, loans: 152, revenue: 33 },
  { month: '6월', deposits: 270, loans: 160, revenue: 37 },
  { month: '7월', deposits: 265, loans: 157, revenue: 36 },
  { month: '8월', deposits: 272, loans: 162, revenue: 35 },
  { month: '9월', deposits: 268, loans: 159, revenue: 34 },
  { month: '10월', deposits: 275, loans: 163, revenue: 36 },
  { month: '11월', deposits: 280, loans: 165, revenue: 37 },
  { month: '12월', deposits: 285, loans: 167, revenue: 38 },
];

export const accountTypeData = [
  { name: '보통예금', value: 35, color: '#6366f1' },
  { name: '정기예금', value: 28, color: '#8b5cf6' },
  { name: '적금', value: 18, color: '#a78bfa' },
  { name: '자유적금', value: 12, color: '#c4b5fd' },
  { name: '기타', value: 7, color: '#ddd6fe' },
];

export const recentTransactions = [
  { id: 'TXN-2026-00142', customer: '김민수', type: '이체', amount: 5_000_000, date: '2026-03-25 14:32', status: '완료', account: '110-342-567890' },
  { id: 'TXN-2026-00141', customer: '이서연', type: '입금', amount: 12_000_000, date: '2026-03-25 13:45', status: '완료', account: '110-456-789012' },
  { id: 'TXN-2026-00140', customer: '박지훈', type: '출금', amount: 3_200_000, date: '2026-03-25 12:18', status: '완료', account: '110-789-012345' },
  { id: 'TXN-2026-00139', customer: '최유진', type: '대출상환', amount: 8_500_000, date: '2026-03-25 11:55', status: '처리중', account: '110-234-567891' },
  { id: 'TXN-2026-00138', customer: '정하은', type: '이체', amount: 1_500_000, date: '2026-03-25 11:02', status: '완료', account: '110-567-890123' },
  { id: 'TXN-2026-00137', customer: '강도윤', type: '입금', amount: 25_000_000, date: '2026-03-25 10:30', status: '완료', account: '110-890-123456' },
  { id: 'TXN-2026-00136', customer: '윤서아', type: '출금', amount: 700_000, date: '2026-03-25 09:47', status: '실패', account: '110-123-456790' },
  { id: 'TXN-2026-00135', customer: '임현우', type: '이체', amount: 2_300_000, date: '2026-03-25 09:15', status: '완료', account: '110-345-678901' },
];

export const customers = [
  { id: 'CST-001', name: '김민수', phone: '010-1234-5678', email: 'minsu.kim@email.com', accounts: 3, totalBalance: 45_200_000, joinDate: '2019-03-15', grade: 'VIP', status: '활성' },
  { id: 'CST-002', name: '이서연', phone: '010-2345-6789', email: 'seoyeon.lee@email.com', accounts: 2, totalBalance: 128_500_000, joinDate: '2018-07-22', grade: 'VVIP', status: '활성' },
  { id: 'CST-003', name: '박지훈', phone: '010-3456-7890', email: 'jihun.park@email.com', accounts: 1, totalBalance: 8_300_000, joinDate: '2022-01-10', grade: '일반', status: '활성' },
  { id: 'CST-004', name: '최유진', phone: '010-4567-8901', email: 'yujin.choi@email.com', accounts: 4, totalBalance: 67_800_000, joinDate: '2020-11-03', grade: 'VIP', status: '활성' },
  { id: 'CST-005', name: '정하은', phone: '010-5678-9012', email: 'haeun.jung@email.com', accounts: 2, totalBalance: 23_100_000, joinDate: '2021-05-18', grade: '일반', status: '활성' },
  { id: 'CST-006', name: '강도윤', phone: '010-6789-0123', email: 'doyun.kang@email.com', accounts: 5, totalBalance: 312_000_000, joinDate: '2017-02-28', grade: 'VVIP', status: '활성' },
  { id: 'CST-007', name: '윤서아', phone: '010-7890-1234', email: 'seoa.yoon@email.com', accounts: 1, totalBalance: 2_100_000, joinDate: '2023-09-05', grade: '일반', status: '휴면' },
  { id: 'CST-008', name: '임현우', phone: '010-8901-2345', email: 'hyunwoo.lim@email.com', accounts: 3, totalBalance: 56_700_000, joinDate: '2020-04-12', grade: 'VIP', status: '활성' },
  { id: 'CST-009', name: '한소희', phone: '010-9012-3456', email: 'sohee.han@email.com', accounts: 2, totalBalance: 91_400_000, joinDate: '2019-08-25', grade: 'VIP', status: '활성' },
  { id: 'CST-010', name: '오준서', phone: '010-0123-4567', email: 'junseo.oh@email.com', accounts: 1, totalBalance: 5_600_000, joinDate: '2024-01-15', grade: '일반', status: '활성' },
  { id: 'CST-011', name: '서예은', phone: '010-1111-2222', email: 'yeeun.seo@email.com', accounts: 3, totalBalance: 78_900_000, joinDate: '2018-12-01', grade: 'VIP', status: '활성' },
  { id: 'CST-012', name: '조태현', phone: '010-3333-4444', email: 'taehyun.jo@email.com', accounts: 2, totalBalance: 15_200_000, joinDate: '2021-06-30', grade: '일반', status: '정지' },
];

export const accounts = [
  { id: 'ACC-001', number: '110-342-567890', customer: '김민수', type: '보통예금', balance: 25_200_000, openDate: '2019-03-15', status: '정상', interestRate: 0.1 },
  { id: 'ACC-002', number: '110-342-567891', customer: '김민수', type: '정기예금', balance: 15_000_000, openDate: '2023-06-01', status: '정상', interestRate: 3.5 },
  { id: 'ACC-003', number: '110-342-567892', customer: '김민수', type: '적금', balance: 5_000_000, openDate: '2024-01-15', status: '정상', interestRate: 4.2 },
  { id: 'ACC-004', number: '110-456-789012', customer: '이서연', type: '보통예금', balance: 78_500_000, openDate: '2018-07-22', status: '정상', interestRate: 0.1 },
  { id: 'ACC-005', number: '110-456-789013', customer: '이서연', type: '정기예금', balance: 50_000_000, openDate: '2024-03-01', status: '정상', interestRate: 3.8 },
  { id: 'ACC-006', number: '110-789-012345', customer: '박지훈', type: '보통예금', balance: 8_300_000, openDate: '2022-01-10', status: '정상', interestRate: 0.1 },
  { id: 'ACC-007', number: '110-234-567891', customer: '최유진', type: '보통예금', balance: 32_800_000, openDate: '2020-11-03', status: '정상', interestRate: 0.1 },
  { id: 'ACC-008', number: '110-234-567892', customer: '최유진', type: '정기예금', balance: 20_000_000, openDate: '2023-09-15', status: '정상', interestRate: 3.6 },
  { id: 'ACC-009', number: '110-234-567893', customer: '최유진', type: '적금', balance: 10_000_000, openDate: '2024-02-01', status: '정상', interestRate: 4.0 },
  { id: 'ACC-010', number: '110-234-567894', customer: '최유진', type: '자유적금', balance: 5_000_000, openDate: '2024-06-01', status: '정상', interestRate: 3.2 },
  { id: 'ACC-011', number: '110-890-123456', customer: '강도윤', type: '보통예금', balance: 152_000_000, openDate: '2017-02-28', status: '정상', interestRate: 0.1 },
  { id: 'ACC-012', number: '110-123-456790', customer: '윤서아', type: '보통예금', balance: 2_100_000, openDate: '2023-09-05', status: '휴면', interestRate: 0.1 },
];

export const loans = [
  { id: 'LN-001', customer: '김민수', type: '주택담보대출', amount: 250_000_000, remaining: 198_000_000, rate: 3.95, startDate: '2022-05-15', endDate: '2052-05-15', status: '정상', monthlyPayment: 1_180_000 },
  { id: 'LN-002', customer: '이서연', type: '신용대출', amount: 30_000_000, remaining: 12_500_000, rate: 4.50, startDate: '2023-03-01', endDate: '2026-03-01', status: '정상', monthlyPayment: 890_000 },
  { id: 'LN-003', customer: '박지훈', type: '전세자금대출', amount: 180_000_000, remaining: 165_000_000, rate: 3.20, startDate: '2024-01-10', endDate: '2026-01-10', status: '정상', monthlyPayment: 7_560_000 },
  { id: 'LN-004', customer: '최유진', type: '주택담보대출', amount: 350_000_000, remaining: 310_000_000, rate: 3.85, startDate: '2023-06-20', endDate: '2053-06-20', status: '정상', monthlyPayment: 1_640_000 },
  { id: 'LN-005', customer: '정하은', type: '신용대출', amount: 15_000_000, remaining: 8_200_000, rate: 5.20, startDate: '2024-06-01', endDate: '2027-06-01', status: '정상', monthlyPayment: 450_000 },
  { id: 'LN-006', customer: '강도윤', type: '기업대출', amount: 500_000_000, remaining: 420_000_000, rate: 3.10, startDate: '2023-01-15', endDate: '2028-01-15', status: '정상', monthlyPayment: 9_100_000 },
  { id: 'LN-007', customer: '임현우', type: '자동차대출', amount: 45_000_000, remaining: 28_600_000, rate: 4.80, startDate: '2024-03-10', endDate: '2029-03-10', status: '정상', monthlyPayment: 845_000 },
  { id: 'LN-008', customer: '한소희', type: '주택담보대출', amount: 280_000_000, remaining: 255_000_000, rate: 3.75, startDate: '2024-07-01', endDate: '2054-07-01', status: '정상', monthlyPayment: 1_296_000 },
  { id: 'LN-009', customer: '조태현', type: '신용대출', amount: 20_000_000, remaining: 18_500_000, rate: 6.50, startDate: '2025-01-20', endDate: '2028-01-20', status: '연체', monthlyPayment: 620_000 },
];

export const notifications = [
  { id: 1, type: 'alert', message: '조태현 고객 대출 연체 3일 경과', time: '10분 전' },
  { id: 2, type: 'info', message: '윤서아 고객 계좌 출금 실패 발생', time: '2시간 전' },
  { id: 3, type: 'success', message: '3월 정기 이자 지급 완료 (4,523건)', time: '5시간 전' },
  { id: 4, type: 'warning', message: '일일 이체 한도 초과 시도 감지 (2건)', time: '6시간 전' },
  { id: 5, type: 'info', message: '신규 고객 등록: 오준서', time: '1일 전' },
];
