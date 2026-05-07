import { useState } from 'react';
import { approvalsList } from '../../../data/mockData';
import WorklistTable from '../../../components/admin/WorklistTable';

const FOLDERS = ['받은', '보낸', '진행 중', '완료', '위임 받은'];

export default function ApprovalsPage() {
  const [folder, setFolder] = useState('받은');

  return (
    <div className="col" style={{ gap: 16 }}>
      <h1>전자 결재 (EMP-022)</h1>

      <div className="row" style={{ alignItems: 'flex-start' }}>
        <div className="card" style={{ flex: 1, minWidth: 200 }}>
          <h2>폴더</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {FOLDERS.map((f) => (
              <li key={f}>
                <button
                  onClick={() => setFolder(f)}
                  className={folder === f ? 'primary' : ''}
                  style={{ width: '100%', textAlign: 'left' }}
                >
                  {f}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="col" style={{ flex: 3 }}>
          <div className="card" style={{ background: '#fff4d6', borderColor: '#f3e2a1' }}>
            ⚠️ SoD — 신청자 자동 제외. 위임 등록 시 유형 화이트리스트 + 피위임자 본인 OTP 필수 + 14일 초과 부서장 결재.
            SLA 만료 사다리: D+0 본부장 / D+24 컴플라이언스 / D+72 자동 만료.
          </div>

          <div className="card">
            <h2>{folder} ({approvalsList.length}건)</h2>
            <WorklistTable
              columns={[
                { key: 'id', label: 'ID' },
                { key: 'kind', label: '유형' },
                { key: 'requester', label: '신청자' },
                { key: 'amount', label: '금액', render: (r) => r.amount > 0 ? r.amount.toLocaleString() : '-' },
                { key: 'status', label: '상태' },
                { key: 'sla', label: 'SLA', render: (r) => <span className={`badge ${r.sla === 'D-1' ? 'l4' : r.sla === 'D-3' ? 'l3' : ''}`}>{r.sla}</span> },
                { key: 'act', label: '결정', render: () => (
                  <>
                    <button className="primary">승인</button>
                    <button className="danger" style={{ marginLeft: 4 }}>반려</button>
                    <button style={{ marginLeft: 4 }}>보류</button>
                    <button style={{ marginLeft: 4 }}>회수</button>
                  </>
                ) },
              ]}
              rows={approvalsList}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
