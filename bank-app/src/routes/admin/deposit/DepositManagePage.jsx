import { useState } from 'react';
import { accountManageList } from '../../../data/mockData';
import WorklistTable from '../../../components/admin/WorklistTable';
import HumanReviewModal from '../../../components/modals/HumanReviewModal';

export default function DepositManagePage() {
  const [approvalOpen, setApprovalOpen] = useState(false);

  const cols = [
    { key: 'id', label: '계좌 ID', render: (r) => <code>{r.id}</code> },
    { key: 'cif', label: 'CIF' },
    { key: 'alias', label: '별칭' },
    { key: 'balance', label: '잔액', render: (r) => r.balance.toLocaleString() },
    { key: 'limitMode', label: '한도' },
    { key: 'status', label: '상태', render: (r) => (
      <span className={`badge ${r.status === 'active' ? 'l1' : 'l4'}`}>{r.status}</span>
    ) },
    { key: 'stop', label: '지급정지', render: (r) => r.stop ? <span className="badge l4">차단</span> : '-' },
    { key: 'act', label: '액션', render: () => (
      <>
        <button onClick={() => setApprovalOpen(true)}>지급정지</button>
        <button style={{ marginLeft: 4 }} onClick={() => setApprovalOpen(true)}>한도 해제</button>
      </>
    ) },
  ];

  return (
    <div className="col" style={{ gap: 16 }}>
      <h1>수신 계좌 관리 (EMP-006)</h1>
      <p className="muted">
        지급정지·한도해제 모두 책임자 결재 필수. 한도해제 위험점수는 보조 정보 라벨(ARC 정합).
        미성년 동의서 보존: 계약 종료 + 5년 vs 성년 + 5년 중 긴 쪽.
      </p>

      <section className="card">
        <WorklistTable columns={cols} rows={accountManageList} />
      </section>

      <HumanReviewModal
        open={approvalOpen}
        onClose={() => setApprovalOpen(false)}
        onSubmit={() => alert('책임자 결재 라우팅됨')}
      />
    </div>
  );
}
