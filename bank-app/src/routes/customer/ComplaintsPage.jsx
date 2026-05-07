import { useState } from 'react';
import RecordingConsentModal from '../../components/modals/RecordingConsentModal';

const COMPLAINTS = [
  { id: 'C-2026-08801', kind: '이체 오류', status: '접수', received: '2026-05-04', dday: 'D-10' },
  { id: 'C-2026-08712', kind: '이자 계산 분쟁', status: '검토 중', received: '2026-04-20', dday: 'D-1', warn: true },
  { id: 'C-2026-08544', kind: '카드 결제 거부', status: '답변 완료', received: '2026-03-10', dday: '완료' },
];

export default function ComplaintsPage() {
  const [recOpen, setRecOpen] = useState(false);

  return (
    <div className="col" style={{ gap: 16 }}>
      <h1>민원 / 분쟁 접수</h1>

      <div className="card" style={{ background: '#e1efff', borderColor: '#a8c8eb' }}>
        ℹ️ 자체 답변 SLA: <strong>14영업일</strong>. D-12 무답변 시 사유 자동 통지.
        30일 캘린더 분쟁조정 안내 의무 (금융소비자보호법). 사람 대화 즉시 라우팅 가능.
      </div>

      <section className="card">
        <h2>접수 이력</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--c-border)', textAlign: 'left' }}>
              <th>접수번호</th><th>유형</th><th>접수일</th><th>상태</th><th>SLA</th>
            </tr>
          </thead>
          <tbody>
            {COMPLAINTS.map((c) => (
              <tr key={c.id} style={{ borderBottom: '1px dashed var(--c-border)' }}>
                <td><code>{c.id}</code></td>
                <td>{c.kind}</td>
                <td>{c.received}</td>
                <td>{c.status}</td>
                <td>
                  {c.warn ? <span className="badge l4">{c.dday}</span> : <span className="badge">{c.dday}</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="card">
        <h2>새 민원 접수</h2>
        <div className="col">
          <label>유형
            <select>
              <option>이체 오류</option><option>이자 계산</option><option>카드</option><option>대출</option><option>기타</option>
            </select>
          </label>
          <label>내용
            <textarea rows={5} placeholder="상세 내용을 입력하세요" />
          </label>
          <input type="file" multiple />
          <div className="row">
            <button className="primary" onClick={() => alert('접수 완료 — 채번된 접수번호: C-2026-08920')}>접수</button>
            <button onClick={() => setRecOpen(true)}>음성으로 진술 (녹취 동의)</button>
            <button>👤 사람 상담사 즉시 연결</button>
          </div>
        </div>
      </section>

      <RecordingConsentModal open={recOpen} onClose={() => setRecOpen(false)} onConsent={() => setRecOpen(false)} />
    </div>
  );
}
