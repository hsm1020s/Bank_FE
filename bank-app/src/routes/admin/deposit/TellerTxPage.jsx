import { useState } from 'react';
import { tellerTxKinds, fxRate } from '../../../data/mockData';

export default function TellerTxPage() {
  const [kind, setKind] = useState('CASH_IN');
  const [amount, setAmount] = useState(0);
  const stale = fxRate.stale;

  const isCtr = amount >= 10_000_000;
  const isFx = kind === 'FX';

  return (
    <div className="col" style={{ gap: 16, maxWidth: 720 }}>
      <h1>수신 거래 처리 (창구) (EMP-007)</h1>

      <section className="card">
        <h2>거래 유형</h2>
        <div className="row" style={{ flexWrap: 'wrap', gap: 4 }}>
          {tellerTxKinds.map((k) => (
            <button key={k.code} className={kind === k.code ? 'primary' : ''} onClick={() => setKind(k.code)}>{k.label}</button>
          ))}
        </div>
      </section>

      <section className="card">
        <h2>본인확인</h2>
        <ul>
          <li>📷 신분증 OCR — OK</li>
          <li>✍️ 서명 — 캡처 완료</li>
        </ul>
      </section>

      <section className="card">
        <h2>금액</h2>
        <input type="number" value={amount} onChange={(e) => setAmount(+e.target.value)} />
        {isCtr && <p style={{ color: 'var(--c-warn)' }}>⚠️ 1천만원 이상 — CTR 자동 등록 / STR 후보 알림 가능</p>}
      </section>

      {isFx && (
        <section className="card">
          <h2>환율</h2>
          <p>USD/KRW: <strong>{fxRate.rate.toLocaleString()}</strong> · 마지막 갱신 {fxRate.lastAt}</p>
          {stale ? <p style={{ color: 'var(--c-danger)' }}>⛔ 환율 stale (1시간 초과) — 거래 자동 차단</p> : <p className="muted">정상 (1시간 이내)</p>}
        </section>
      )}

      <section className="card">
        <h2>세금 / 수수료</h2>
        <ul>
          <li>인지세: {amount > 5_000_000 ? '350원' : '면제'}</li>
          <li>이자소득세: 14% (자동 원천징수)</li>
          <li>지방세: 1.4% (자동 원천징수)</li>
        </ul>
      </section>

      <button className="primary" disabled={isFx && stale}>거래 처리</button>
    </div>
  );
}
