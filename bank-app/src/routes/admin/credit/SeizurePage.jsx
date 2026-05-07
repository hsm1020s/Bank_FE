import { seizureCases } from '../../../data/mockData';
import WorklistTable from '../../../components/admin/WorklistTable';

export default function SeizurePage() {
  return (
    <div className="col" style={{ gap: 16 }}>
      <h1>압류 / 가압류 처리 (EMP-015)</h1>

      <div className="card" style={{ background: '#fff4d6', borderColor: '#f3e2a1' }}>
        ⚠️ 우선순위 — 국세 절대 우선. 채무자 통지 기본 발송 (임의 보류는 컴플라이언스 결재). 생계 자동이체 우선 정산 제안.
      </div>

      <section className="card">
        <h2>법원 송달 큐</h2>
        <WorklistTable
          columns={[
            { key: 'id', label: 'ID' },
            { key: 'court', label: '법원/기관' },
            { key: 'kind', label: '유형' },
            { key: 'target', label: '대상 계좌/금액' },
            { key: 'priority', label: '우선', render: (r) => r.priority === 0 ? <span className="badge l4">국세 0순위</span> : `${r.priority}순위` },
            { key: 'status', label: '상태' },
          ]}
          rows={seizureCases}
        />
      </section>
    </div>
  );
}
