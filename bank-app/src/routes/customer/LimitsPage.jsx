import { useState } from 'react';
import { customerLimits } from '../../data/mockData';
import OtpModal from '../../components/modals/OtpModal';

export default function LimitsPage() {
  const [editing, setEditing] = useState(null);
  const [otp, setOtp] = useState(false);

  return (
    <div className="col" style={{ gap: 16 }}>
      <h1>거래 한도 변경</h1>

      <div className="card" style={{ background: '#fff4d6', borderColor: '#f3e2a1' }}>
        ⚠️ 한도 <strong>상향</strong>은 신청 후 24시간 지연되어 첫 정시 배치에서 적용됩니다.
        <strong>하향</strong>은 즉시 적용. 사고신고 시 미적용 상향은 폐기, 적용된 상향은 N일(기본 7일) 환원.
      </div>

      <section className="card">
        <h2>현재 한도</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--c-border)', textAlign: 'right' }}>
              <th style={{ textAlign: 'left' }}>구분</th>
              <th>1회 한도</th>
              <th>1일 한도</th>
              <th>최대(법정)</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {customerLimits.map((l) => (
              <tr key={l.kind} style={{ borderBottom: '1px dashed var(--c-border)', textAlign: 'right' }}>
                <td style={{ textAlign: 'left' }}>{l.kind}</td>
                <td>{l.perTx.toLocaleString()}</td>
                <td>{l.perDay.toLocaleString()}</td>
                <td>{l.max.toLocaleString()}</td>
                <td><button onClick={() => setEditing(l)}>변경</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="card">
        <h2>외화 거래 한도 (통화별)</h2>
        <ul>
          <li>USD: 50,000 / 일</li>
          <li>EUR: 40,000 / 일</li>
          <li>JPY: 5,000,000 / 일</li>
          <li>CNY: 300,000 / 일</li>
        </ul>
      </section>

      <section className="card">
        <h2>제한 안내</h2>
        <ul>
          <li>비대면 신규 가입자 — 12개월 제한</li>
          <li>한도제한계좌 → 영상통화 본인확인 필수</li>
          <li>14일 재상향 제한 — 상향 후 14일 내 추가 상향 불가</li>
        </ul>
      </section>

      {editing && (
        <div className="card">
          <h2>{editing.kind} 한도 변경</h2>
          <label>새 1회 한도
            <input type="number" defaultValue={editing.perTx} />
          </label>
          <label>새 1일 한도
            <input type="number" defaultValue={editing.perDay} />
          </label>
          <button className="primary" onClick={() => setOtp(true)} style={{ marginTop: 8 }}>변경 신청 (OTP)</button>
        </div>
      )}

      <OtpModal open={otp} onClose={() => setOtp(false)} onVerify={() => { setOtp(false); alert('상향이면 24h 지연 후 적용 / 하향이면 즉시 적용'); setEditing(null); }} />
    </div>
  );
}
