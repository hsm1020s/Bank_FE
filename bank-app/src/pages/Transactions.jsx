import { useState, useEffect } from 'react';
import { fetchTransactions } from '../api/bankApi';
import { formatAmount } from '../utils/format';
import { StatCards } from '../components/StatCard';
import Card from '../components/Card';
import DataTable from '../components/DataTable';
import FilterBar from '../components/FilterBar';
import Button from '../components/Button';
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

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('전체');
  const [statusFilter, setStatusFilter] = useState('전체');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchTransactions().then(setTransactions);
  }, []);

  const filtered = transactions.filter((tx) => {
    const matchSearch = tx.customer.includes(search) || tx.id.includes(search) || tx.account.includes(search);
    const matchType = typeFilter === '전체' || tx.type === typeFilter;
    const matchStatus = statusFilter === '전체' || tx.status === statusFilter;
    return matchSearch && matchType && matchStatus;
  });

  const totalAmount = transactions.reduce((sum, tx) => sum + tx.amount, 0);
  const completedCount = transactions.filter((tx) => tx.status === '완료').length;
  const failedCount = transactions.filter((tx) => tx.status === '실패').length;

  const statItems = [
    { label: '총 거래건수', value: `${transactions.length}건` },
    { label: '총 거래금액', value: formatAmount(totalAmount) },
    { label: '완료', value: `${completedCount}건` },
    { label: '실패', value: `${failedCount}건`, className: 'danger-text' },
  ];

  return (
    <div className="page-transactions">
      <StatCards items={statItems} small />

      <Card title="거래 내역" action={<Button variant="outline" icon="download">내보내기</Button>}>
        <FilterBar
          search={{ value: search, onChange: setSearch, placeholder: '거래번호, 고객명, 계좌번호로 검색...' }}
          filters={[
            { value: typeFilter, onChange: setTypeFilter, options: ['전체', '입금', '출금', '이체', '대출상환'] },
            { value: statusFilter, onChange: setStatusFilter, options: ['전체', '완료', '처리중', '실패'] },
          ]}
        />
        <DataTable columns={columns} data={filtered} onRowClick={setSelected} />
      </Card>

      <TransactionDetail transaction={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
