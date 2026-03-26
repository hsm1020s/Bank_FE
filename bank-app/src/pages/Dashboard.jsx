import { useState, useEffect } from 'react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';
import { fetchStats, fetchMonthly, fetchAccountTypes, fetchTransactions } from '../api/bankApi';
import { formatKRW, formatAmount } from '../utils/format';
import { StatCards } from '../components/StatCard';
import Card from '../components/Card';
import DataTable from '../components/DataTable';
import { StatusBadge, TypeBadge } from '../components/Badge';
import TransactionDetail from '../components/modals/TransactionDetail';

const columns = [
  { key: 'id', label: '거래번호', className: 'mono' },
  { key: 'customer', label: '고객명', className: 'bold' },
  { key: 'type', label: '구분', render: (v) => <TypeBadge type={v} /> },
  { key: 'account', label: '계좌번호', className: 'mono' },
  { key: 'amount', label: '금액', className: 'amount', render: (v) => formatAmount(v) },
  { key: 'date', label: '일시', className: 'muted' },
  { key: 'status', label: '상태', render: (v) => <StatusBadge status={v} /> },
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
  const [stats, setStats] = useState({});
  const [monthlyData, setMonthlyData] = useState([]);
  const [accountTypeData, setAccountTypeData] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectedTx, setSelectedTx] = useState(null);

  useEffect(() => {
    fetchStats().then(setStats);
    fetchMonthly().then(setMonthlyData);
    fetchAccountTypes().then(setAccountTypeData);
    fetchTransactions().then(setTransactions);
  }, []);

  const statItems = [
    { label: '총 수신액', value: formatKRW(stats.totalDeposits ?? 0) + '원', growth: stats.depositGrowth, color: '#6366f1' },
    { label: '총 여신액', value: formatKRW(stats.totalLoans ?? 0) + '원', growth: stats.loanGrowth, color: '#8b5cf6' },
    { label: '총 고객수', value: (stats.totalCustomers ?? 0).toLocaleString() + '명', growth: stats.customerGrowth, color: '#06b6d4' },
    { label: '월간 수익', value: formatKRW(stats.monthlyRevenue ?? 0) + '원', growth: stats.revenueGrowth, color: '#f59e0b' },
  ];

  return (
    <div className="dashboard">
      <StatCards items={statItems} />

      <div className="dashboard-grid">
        <Card title="수신/여신 추이" subtitle="월별 (단위: 억원)" className="chart-card wide">
          <div className="chart-container">
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
        </Card>

        <Card title="월별 수익" subtitle="단위: 억원" className="chart-card">
          <div className="chart-container">
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
        </Card>

        <Card title="계좌 유형 비율" subtitle="전체 계좌 기준" className="chart-card">
          <div className="pie-container">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={accountTypeData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={3} dataKey="value">
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
        </Card>
      </div>

      <Card title="최근 거래" action={<a href="/transactions" className="card-link">전체 보기 →</a>}>
        <DataTable columns={columns} data={transactions.slice(0, 6)} onRowClick={setSelectedTx} />
      </Card>

      <TransactionDetail transaction={selectedTx} onClose={() => setSelectedTx(null)} />
    </div>
  );
}