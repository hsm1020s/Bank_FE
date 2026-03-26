import { useState, useEffect } from 'react';
import { fetchAccounts } from '../api/bankApi';
import { formatAmount } from '../utils/format';
import { StatCards } from '../components/StatCard';
import Card from '../components/Card';
import DataTable from '../components/DataTable';
import FilterBar from '../components/FilterBar';
import Button from '../components/Button';
import { StatusBadge, TypeBadge } from '../components/Badge';
import AccountDetail from '../components/modals/AccountDetail';

const columns = [
  { key: 'id', label: '계좌 ID', className: 'mono' },
  { key: 'number', label: '계좌번호', className: 'mono bold' },
  { key: 'customer', label: '고객명' },
  { key: 'type', label: '유형', render: (v) => <TypeBadge type={v} /> },
  { key: 'balance', label: '잔액', className: 'amount', render: (v) => formatAmount(v) },
  { key: 'interestRate', label: '금리', render: (v) => `${v}%` },
  { key: 'openDate', label: '개설일', className: 'muted' },
  { key: 'status', label: '상태', render: (v) => <StatusBadge status={v} /> },
];

export default function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('전체');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchAccounts().then(setAccounts);
  }, []);

  const filtered = accounts.filter((acc) => {
    const matchSearch = acc.customer.includes(search) || acc.number.includes(search) || acc.id.includes(search);
    const matchType = typeFilter === '전체' || acc.type === typeFilter;
    return matchSearch && matchType;
  });

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
  const activeCount = accounts.filter((acc) => acc.status === '정상').length;

  const statItems = [
    { label: '총 계좌수', value: `${accounts.length}개` },
    { label: '총 잔액', value: formatAmount(totalBalance) },
    { label: '정상 계좌', value: `${activeCount}개` },
    { label: '휴면 계좌', value: `${accounts.length - activeCount}개` },
  ];

  return (
    <div className="page-accounts">
      <StatCards items={statItems} small />

      <Card title="계좌 목록" action={<Button icon="plus">신규 계좌 개설</Button>}>
        <FilterBar
          search={{ value: search, onChange: setSearch, placeholder: '계좌번호, 고객명으로 검색...' }}
          filters={[
            { value: typeFilter, onChange: setTypeFilter, options: ['전체', '보통예금', '정기예금', '적금', '자유적금'] },
          ]}
        />
        <DataTable columns={columns} data={filtered} onRowClick={setSelected} />
      </Card>

      <AccountDetail account={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
