import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { fetchLoans } from '../api/bankApi';
import { formatAmount, formatShort } from '../utils/format';
import { StatCards } from '../components/StatCard';
import Card from '../components/Card';
import DataTable from '../components/DataTable';
import FilterBar from '../components/FilterBar';
import Button from '../components/Button';
import { StatusBadge } from '../components/Badge';
import LoanDetail from '../components/modals/LoanDetail';

const columns = [
  { key: 'id', label: '대출번호', className: 'mono' },
  { key: 'customer', label: '고객명', className: 'bold' },
  { key: 'type', label: '유형' },
  { key: 'amount', label: '대출액', className: 'amount', render: (v) => formatAmount(v) },
  { key: 'remaining', label: '잔액', className: 'amount', render: (v) => formatAmount(v) },
  { key: 'rate', label: '금리', render: (v) => `${v}%` },
  { key: 'monthlyPayment', label: '월상환액', className: 'amount', render: (v) => formatAmount(v) },
  { key: 'endDate', label: '만기일', className: 'muted' },
  { key: 'status', label: '상태', render: (v) => <StatusBadge status={v} /> },
];

export default function Loans() {
  const [loans, setLoans] = useState([]);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('전체');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchLoans().then(setLoans);
  }, []);

  const filtered = loans.filter((loan) => {
    const matchSearch = loan.customer.includes(search) || loan.id.includes(search);
    const matchType = typeFilter === '전체' || loan.type === typeFilter;
    return matchSearch && matchType;
  });

  const totalLoan = loans.reduce((sum, l) => sum + l.amount, 0);
  const totalRemaining = loans.reduce((sum, l) => sum + l.remaining, 0);
  const overdueCount = loans.filter((l) => l.status === '연체').length;
  const avgRate = loans.length > 0 ? (loans.reduce((sum, l) => sum + l.rate, 0) / loans.length).toFixed(2) : '0.00';

  const loanByType = loans.reduce((acc, l) => {
    const existing = acc.find((item) => item.type === l.type);
    if (existing) {
      existing.amount += l.amount / 100_000_000;
      existing.remaining += l.remaining / 100_000_000;
    } else {
      acc.push({ type: l.type, amount: l.amount / 100_000_000, remaining: l.remaining / 100_000_000 });
    }
    return acc;
  }, []);

  const statItems = [
    { label: '총 대출 실행액', value: `${formatShort(totalLoan)}원` },
    { label: '대출 잔액', value: `${formatShort(totalRemaining)}원` },
    { label: '평균 금리', value: `${avgRate}%` },
    { label: '연체 건수', value: `${overdueCount}건`, className: 'danger-text' },
  ];

  return (
    <div className="page-loans">
      <StatCards items={statItems} small />

      <Card title="대출 유형별 현황" subtitle="단위: 억원" className="chart-card" style={{ marginBottom: 24 }}>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={loanByType} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
              <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <YAxis type="category" dataKey="type" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 13 }} width={100} />
              <Tooltip formatter={(value) => `${value.toFixed(1)}억원`} />
              <Bar dataKey="amount" name="실행액" fill="#6366f1" radius={[0, 6, 6, 0]} barSize={20} />
              <Bar dataKey="remaining" name="잔액" fill="#a78bfa" radius={[0, 6, 6, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card title="대출 목록" action={<Button icon="plus">신규 대출</Button>}>
        <FilterBar
          search={{ value: search, onChange: setSearch, placeholder: '대출번호, 고객명으로 검색...' }}
          filters={[
            { value: typeFilter, onChange: setTypeFilter, options: ['전체', '주택담보대출', '전세자금대출', '신용대출', '자동차대출', '기업대출'] },
          ]}
        />
        <DataTable
          columns={columns}
          data={filtered}
          rowClassName={(row) => row.status === '연체' ? 'row-danger' : ''}
          onRowClick={setSelected}
        />
      </Card>

      <LoanDetail loan={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
