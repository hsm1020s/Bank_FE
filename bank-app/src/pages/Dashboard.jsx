import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';
import { dashboardStats, monthlyData, accountTypeData, recentTransactions } from '../data/mockData';

function formatKRW(num) {
  if (num >= 1_000_000_000_000) return `${(num / 1_000_000_000_000).toFixed(1)}조`;
  if (num >= 100_000_000) return `${(num / 100_000_000).toFixed(0)}억`;
  if (num >= 10_000) return `${(num / 10_000).toFixed(0)}만`;
  return num.toLocaleString();
}

function formatAmount(num) {
  return num.toLocaleString('ko-KR') + '원';
}

const statCards = [
  { label: '총 수신액', value: dashboardStats.totalDeposits, growth: dashboardStats.depositGrowth, color: '#6366f1', icon: '↗' },
  { label: '총 여신액', value: dashboardStats.totalLoans, growth: dashboardStats.loanGrowth, color: '#8b5cf6', icon: '↗' },
  { label: '총 고객수', value: dashboardStats.totalCustomers, growth: dashboardStats.customerGrowth, color: '#06b6d4', icon: '↗', isCount: true },
  { label: '월간 수익', value: dashboardStats.monthlyRevenue, growth: dashboardStats.revenueGrowth, color: '#f59e0b', icon: '↗' },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip-label">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} style={{ color: entry.color }}>
          {entry.name}: {entry.value}억
        </p>
      ))}
    </div>
  );
};

export default function Dashboard() {
  return (
    <div className="dashboard">
      <div className="stat-cards">
        {statCards.map((card) => (
          <div key={card.label} className="stat-card">
            <div className="stat-card-header">
              <span className="stat-label">{card.label}</span>
              <span className={`stat-growth ${card.growth >= 0 ? 'positive' : 'negative'}`}>
                {card.growth >= 0 ? '+' : ''}{card.growth}%
              </span>
            </div>
            <div className="stat-value">
              {card.isCount ? card.value.toLocaleString() + '명' : formatKRW(card.value) + '원'}
            </div>
            <div className="stat-bar">
              <div
                className="stat-bar-fill"
                style={{ width: `${Math.min(Math.abs(card.growth) * 5, 100)}%`, background: card.color }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="card chart-card wide">
          <div className="card-header">
            <h3>수신/여신 추이</h3>
            <span className="card-subtitle">월별 (단위: 억원)</span>
          </div>
          <div className="card-body chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="depositGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="loanGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="deposits" name="수신" stroke="#6366f1" strokeWidth={2.5} fill="url(#depositGrad)" />
                <Area type="monotone" dataKey="loans" name="여신" stroke="#8b5cf6" strokeWidth={2.5} fill="url(#loanGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card chart-card">
          <div className="card-header">
            <h3>월별 수익</h3>
            <span className="card-subtitle">단위: 억원</span>
          </div>
          <div className="card-body chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="revenue" name="수익" fill="#6366f1" radius={[6, 6, 0, 0]} barSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card chart-card">
          <div className="card-header">
            <h3>계좌 유형 비율</h3>
            <span className="card-subtitle">전체 계좌 기준</span>
          </div>
          <div className="card-body pie-container">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={accountTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {accountTypeData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="pie-legend">
              {accountTypeData.map((item) => (
                <div key={item.name} className="pie-legend-item">
                  <span className="pie-legend-dot" style={{ background: item.color }} />
                  <span className="pie-legend-label">{item.name}</span>
                  <span className="pie-legend-value">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>최근 거래</h3>
          <a href="/transactions" className="card-link">전체 보기 →</a>
        </div>
        <div className="card-body">
          <table className="data-table">
            <thead>
              <tr>
                <th>거래번호</th>
                <th>고객명</th>
                <th>구분</th>
                <th>계좌번호</th>
                <th>금액</th>
                <th>일시</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.slice(0, 6).map((tx) => (
                <tr key={tx.id}>
                  <td className="mono">{tx.id}</td>
                  <td className="bold">{tx.customer}</td>
                  <td>
                    <span className={`type-badge ${tx.type === '입금' ? 'deposit' : tx.type === '출금' ? 'withdraw' : tx.type === '이체' ? 'transfer' : 'loan'}`}>
                      {tx.type}
                    </span>
                  </td>
                  <td className="mono">{tx.account}</td>
                  <td className="amount">{formatAmount(tx.amount)}</td>
                  <td className="muted">{tx.date}</td>
                  <td>
                    <span className={`status-badge ${tx.status === '완료' ? 'success' : tx.status === '처리중' ? 'warning' : 'danger'}`}>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
