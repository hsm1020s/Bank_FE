import { useState } from 'react';
import { documentTypes } from '../../data/mockData';
import Modal from '../../components/common/Modal';

export default function DocumentsPage() {
  const [issueOpen, setIssueOpen] = useState(null);

  return (
    <div className="col" style={{ gap: 16 }}>
      <h1>거래명세서 / 증명서</h1>

      <section className="row">
        {documentTypes.map((d) => (
          <div key={d.code} className="card" style={{ flex: 1, minWidth: 220 }}>
            <h2 style={{ marginBottom: 4 }}>{d.name}</h2>
            <p className="muted">{d.desc}</p>
            <button onClick={() => setIssueOpen(d)}>발급</button>
          </div>
        ))}
      </section>

      <section className="card">
        <h2>발급 이력 (5년 보관)</h2>
        <ul>
          <li>2026-04-30 — 잔액증명서 (BAL-2026-04-30-008)</li>
          <li>2026-03-15 — 거래내역서 (TX-2026-03-15-022)</li>
          <li>2026-01-31 — 이자납부증명 (INT-2025-12-31-001)</li>
        </ul>
      </section>

      <Modal
        open={!!issueOpen}
        onClose={() => setIssueOpen(null)}
        title={`발급 — ${issueOpen?.name}`}
        footer={
          <>
            <button onClick={() => setIssueOpen(null)}>취소</button>
            <button className="primary" onClick={() => { alert('발급 완료 — PDF 다운로드'); setIssueOpen(null); }}>발급</button>
          </>
        }
      >
        <div className="card" style={{ background: '#fafbfd' }}>
          <div className="watermark" style={{ minHeight: 160 }}>
            <p className="muted">[증명서 미리보기 — 워터마크 + QR]</p>
            <p>유형: {issueOpen?.code}</p>
            <p>고객: 홍길동</p>
            <p>발급일: 2026-05-07</p>
            <p style={{ fontSize: 11 }}>QR 검증 — hash 256bit · 분당 10회 rate-limit · 본문 미노출</p>
          </div>
        </div>
        {issueOpen?.code === 'EN' && (
          <p className="muted" style={{ marginTop: 8 }}>영문증명서는 영문명 등록이 선행되어야 합니다.</p>
        )}
        {issueOpen?.code === 'FX' && (
          <p className="muted" style={{ marginTop: 8 }}>외화송금확인서 — 송금 사유·환율(매도/매입) 분리 표시.</p>
        )}
      </Modal>
    </div>
  );
}
