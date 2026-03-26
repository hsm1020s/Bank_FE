import { useState, useEffect } from 'react';
import { fetchCustomers } from '../api/bankApi';
import { formatAmount } from '../utils/format';
import { StatCards } from '../components/StatCard';
import Card from '../components/Card';
import DataTable from '../components/DataTable';
import FilterBar from '../components/FilterBar';
import Button from '../components/Button';
import { StatusBadge, GradeBadge } from '../components/Badge';
import CustomerDetail from '../components/modals/CustomerDetail';

const columns = [
  { key: 'id', label: '고객 ID', className: 'mono' },
  { key: 'name', label: '이름', className: 'bold' },
  { key: 'phone', label: '연락처' },
  { key: 'email', label: '이메일', className: 'muted' },
  { key: 'accounts', label: '계좌수' },
  { key: 'totalBalance', label: '총 잔액', className: 'amount', render: (v) => formatAmount(v) },
  { key: 'grade', label: '등급', render: (v) => <GradeBadge grade={v} /> },
  { key: 'joinDate', label: '가입일', className: 'muted' },
  { key: 'status', label: '상태', render: (v) => <StatusBadge status={v} /> },
];

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState('');
  const [gradeFilter, setGradeFilter] = useState('전체');
  const [statusFilter, setStatusFilter] = useState('전체');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchCustomers().then(setCustomers);
  }, []);

  const filtered = customers.filter((c) => {
    const matchSearch = c.name.includes(search) || c.id.includes(search) || c.phone.includes(search) || c.email.includes(search);
    const matchGrade = gradeFilter === '전체' || c.grade === gradeFilter;
    const matchStatus = statusFilter === '전체' || c.status === statusFilter;
    return matchSearch && matchGrade && matchStatus;
  });

  const gradeStats = {
    VVIP: customers.filter((c) => c.grade === 'VVIP').length,
    VIP: customers.filter((c) => c.grade === 'VIP').length,
    일반: customers.filter((c) => c.grade === '일반').length,
  };

  const statItems = [
    { label: '전체 고객', value: `${customers.length}명` },
    { label: 'VVIP', value: `${gradeStats.VVIP}명`, badge: { text: 'Premium', variant: 'vvip' } },
    { label: 'VIP', value: `${gradeStats.VIP}명`, badge: { text: 'Gold', variant: 'vip' } },
    { label: '일반', value: `${gradeStats.일반}명` },
  ];

  return (
    <div className="page-customers">
      <StatCards items={statItems} small />

      <Card title="고객 목록" action={<Button icon="plus">신규 고객 등록</Button>}>
        <FilterBar
          search={{ value: search, onChange: setSearch, placeholder: '이름, ID, 전화번호, 이메일로 검색...' }}
          filters={[
            { value: gradeFilter, onChange: setGradeFilter, options: ['전체', 'VVIP', 'VIP', '일반'] },
            { value: statusFilter, onChange: setStatusFilter, options: ['전체', '활성', '휴면', '정지'] },
          ]}
        />
        <DataTable columns={columns} data={filtered} onRowClick={setSelected} />
      </Card>

      <CustomerDetail customer={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
