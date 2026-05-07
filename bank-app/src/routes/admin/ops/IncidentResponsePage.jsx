import { useState } from 'react';
import { incidentQueue } from '../../../data/mockData';
import WorklistTable from '../../../components/admin/WorklistTable';
import Modal from '../../../components/common/Modal';

export default function IncidentResponsePage() {
  const [picked, setPicked] = useState(null);

  return (
    <div className="col" style={{ gap: 16 }}>
      <h1>사고신고 / 보이스피싱 대응 (EMP-017)</h1>
      <p className="muted">
        인입 큐: CUS-020 + 콜센터 + 영업점 통합. 야간 당직 자동 인계 (09:00 배치, SoD 자동 보장, 2시간 SLA).
        종결 후 자동 워크리스트: 인증수단 재발급 + 한도 초기화 + FDS 강화 180일.
        EFTA 책임 분담 자동 산출 (참고용·내부만).
      </p>

      <section className="card">
        <WorklistTable
          columns={[
            { key: 'id', label: 'ID' },
            { key: 'source', label: '인입' },
            { key: 'priority', label: '우선', render: (r) => <span className={`badge ${r.priority === 'P1' ? 'l4' : 'l3'}`}>{r.priority}</span> },
            { key: 'kind', label: '유형' },
            { key: 'customer', label: '고객' },
            { key: 'received', label: '인입 시각' },
            { key: 'act', label: '액션', render: (r) => <button className="danger" onClick={() => setPicked(r)}>긴급 차단</button> },
          ]}
          rows={incidentQueue}
        />
      </section>

      <Modal
        open={!!picked}
        onClose={() => setPicked(null)}
        title={`긴급 차단 — ${picked?.id}`}
        footer={
          <>
            <button onClick={() => setPicked(null)}>취소</button>
            <button className="danger" onClick={() => { alert('1클릭 차단 — 카드/계좌/인증서/FDS 자동 적용'); setPicked(null); }}>전체 차단</button>
          </>
        }
      >
        <p>유형: {picked?.kind} · 고객: {picked?.customer}</p>
        <ul>
          <li>전체 차단 (카드/계좌/인증서) 또는</li>
          <li>부분 차단 (선택)</li>
        </ul>
      </Modal>
    </div>
  );
}
