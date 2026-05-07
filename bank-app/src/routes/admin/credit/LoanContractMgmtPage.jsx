import { useState } from 'react';
import { loanContracts } from '../../../data/mockData';
import WorklistTable from '../../../components/admin/WorklistTable';

const CHANGE_TYPES = ['금리 인하', '약정 연장', '담보 변경'];

export default function LoanContractMgmtPage() {
  const [picked, setPicked] = useState(null);
  const [change, setChange] = useState(CHANGE_TYPES[0]);

  const cols = [
    { key: 'id', label: '약정 ID', render: (r) => <code>{r.id}</code> },
    { key: 'customer', label: '고객' },
    { key: 'kind', label: '구분' },
    { key: 'principal', label: '원금', render: (r) => r.principal.toLocaleString() },
    { key: 'remaining', label: '잔액', render: (r) => r.remaining.toLocaleString() },
    { key: 'rate', label: '금리', render: (r) => `${r.rate}%` },
    { key: 'status', label: '상태', render: (r) => <span className={`badge ${r.status === '연체' ? 'l4' : 'l1'}`}>{r.status}</span> },
  ];

  return (
    <div className="col" style={{ gap: 16 }}>
      <h1>여신 약정 관리 (EMP-011)</h1>
      <p className="muted">금리 인하만 허용 (법정 최고 금리 검증). 연체 약정은 연장만 가능. 4역 SoD(심사/검토/결재/실행) 단독 차단.</p>

      <section className="card">
        <WorklistTable columns={cols} rows={loanContracts} onRowClick={(r) => setPicked(r)} />
      </section>

      {picked && (
        <section className="card">
          <h2>변경 — {picked.id}</h2>
          <p>고객: {picked.customer} · 현재 금리: {picked.rate}%</p>
          <label>변경 유형
            <select value={change} onChange={(e) => setChange(e.target.value)}>
              {CHANGE_TYPES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </label>
          <h3 style={{ marginTop: 12 }}>영향 미리보기</h3>
          <ul>
            <li>월 상환액: -42,300 KRW</li>
            <li>총 이자: -1,200,000 KRW</li>
          </ul>
          <button className="primary">결재 라우팅 (SoD 4역 자동 산출)</button>
        </section>
      )}
    </div>
  );
}
