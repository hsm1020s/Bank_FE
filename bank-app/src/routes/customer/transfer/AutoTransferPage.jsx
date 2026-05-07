import { useState } from 'react';
import { Link } from 'react-router-dom';
import { autoTransfers } from '../../../data/mockData';
import OtpModal from '../../../components/modals/OtpModal';
import Modal from '../../../components/common/Modal';

export default function AutoTransferPage() {
  const [editing, setEditing] = useState(null);
  const [otp, setOtp] = useState(false);
  const [holderFails, setHolderFails] = useState(0);
  const [voiceWarn, setVoiceWarn] = useState(false);

  const tryHolder = () => {
    const next = holderFails + 1;
    setHolderFails(next);
    if (next >= 3) setVoiceWarn(true);
  };

  return (
    <div className="col" style={{ gap: 16 }}>
      <Link to="/transfer" className="muted">← 이체</Link>
      <h1>자동이체 등록·관리</h1>

      <section className="card">
        <h2>등록된 자동이체</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--c-border)', textAlign: 'left' }}>
              <th>대상</th><th>금액</th><th>주기</th><th>방식</th><th>상태</th><th></th>
            </tr>
          </thead>
          <tbody>
            {autoTransfers.map((a) => (
              <tr key={a.id} style={{ borderBottom: '1px dashed var(--c-border)' }}>
                <td>{a.target}</td>
                <td>{a.amount > 0 ? a.amount.toLocaleString() : '잔액 기준'}</td>
                <td>{a.schedule}</td>
                <td>{a.mode}</td>
                <td><span className={`badge ${a.status === 'active' ? 'l1' : ''}`}>{a.status}</span></td>
                <td>
                  <button onClick={() => setEditing(a)}>수정</button>
                  <button className="danger" style={{ marginLeft: 4 }}>해지</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="card">
        <h2>새 자동이체 등록</h2>
        <div className="col">
          <label>대상 계좌
            <input placeholder="은행 + 계좌번호" />
          </label>
          <div className="row">
            <button onClick={tryHolder}>예금주 확인</button>
            {holderFails > 0 && holderFails < 3 && <span className="muted" style={{ color: 'var(--c-warn)' }}>실패 {holderFails}/3</span>}
          </div>
          <label>금액 / 방식
            <select><option>고정</option><option>잔액 기준 (CMA 잔여 → 자동 이체)</option><option>청구액 (카드/공과금)</option></select>
          </label>
          <label>주기
            <select><option>매월 N일</option><option>매주 N요일</option><option>매일</option></select>
          </label>
          <button className="primary" onClick={() => setOtp(true)}>등록 (OTP)</button>
        </div>
      </section>

      <section className="card">
        <h2>CMS 동의 / 한도</h2>
        <p>CMS 동의 철회 시 즉시 차단되며 위탁기관에 동기 통보됩니다.</p>
        <p>자동이체 한도 상향 신청 시 24시간 지연 적용 후 첫 정시 배치에서 반영.</p>
      </section>

      <Modal
        open={!!editing}
        onClose={() => setEditing(null)}
        title={`자동이체 수정 — ${editing?.id}`}
      >
        <p>대상: {editing?.target}</p>
        <input type="number" defaultValue={editing?.amount} />
      </Modal>

      <Modal
        open={voiceWarn}
        onClose={() => { setVoiceWarn(false); setHolderFails(0); }}
        title="🛑 보이스피싱 의심"
      >
        <p>예금주 불일치가 3회 발생했습니다. 보이스피싱 가능성이 있어 등록을 일시 차단합니다.</p>
        <p>추가 인증(영상통화 또는 영업점 내방)을 통해 진행 가능합니다.</p>
      </Modal>

      <OtpModal open={otp} onClose={() => setOtp(false)} onVerify={() => { setOtp(false); alert('자동이체 등록 완료'); }} />
    </div>
  );
}
