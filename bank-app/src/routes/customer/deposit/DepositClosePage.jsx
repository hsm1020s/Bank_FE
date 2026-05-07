import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { accounts } from '../../../data/mockData';
import OtpModal from '../../../components/modals/OtpModal';

export default function DepositClosePage() {
  const { id } = useParams();
  const account = accounts.find((a) => a.id === id) || accounts[2];
  const [agree, setAgree] = useState(false);
  const [otp, setOtp] = useState(false);

  // 시뮬: 약정이자 vs 조기해지이자 차이
  const fullInterest = Math.round(account.balance * (account.rate / 100) * 0.7);
  const earlyInterest = Math.round(account.balance * 0.3 / 100 * 0.7);
  const loss = fullInterest - earlyInterest;
  const incomeTax = Math.round(earlyInterest * 0.14);
  const ruralTax = Math.round(earlyInterest * 0.014);
  const net = account.balance + earlyInterest - incomeTax - ruralTax;

  return (
    <div className="col" style={{ gap: 16, maxWidth: 640 }}>
      <Link to={`/deposit/${account.id}`} className="muted">← 계좌 상세</Link>
      <h1>수신 해지</h1>

      <section className="card">
        <h2>{account.alias || account.name}</h2>
        <p>잔액: {account.balance.toLocaleString()} KRW · 약정 금리 {account.rate}%</p>
      </section>

      <section className="card" style={{ background: '#fff4d6', borderColor: '#f3e2a1' }}>
        <h2>⚠️ 중도 해지 손실 안내</h2>
        <ul>
          <li>약정 만기 시 예상 이자: <strong>{fullInterest.toLocaleString()}</strong> KRW</li>
          <li>중도 해지 시 적용 이자: <strong>{earlyInterest.toLocaleString()}</strong> KRW</li>
          <li>이자 손실: <strong style={{ color: 'var(--c-danger)' }}>-{loss.toLocaleString()}</strong> KRW</li>
          <li>소득세(14%): -{incomeTax.toLocaleString()} KRW</li>
          <li>농어촌특별세(1.4%): -{ruralTax.toLocaleString()} KRW</li>
        </ul>
        <p>실수령액: <strong>{net.toLocaleString()}</strong> KRW</p>
      </section>

      <section className="card">
        <h2>영향 — 자동이체</h2>
        <p>이 계좌를 출금계좌로 등록한 자동이체 <strong>2건</strong>이 있습니다. 해지 시 자동이체가 중단됩니다.</p>
        <ul>
          <li>월세 (매월 1일) — 신한 8888-***-2222</li>
          <li>엄마 용돈 (매월 25일) — 국민 1234-***-5678</li>
        </ul>
      </section>

      <section className="card">
        <h2>해지 입금 계좌</h2>
        <select>
          {accounts.filter((a) => a.id !== account.id && a.status === 'active').map((a) => (
            <option key={a.id}>{a.alias || a.name} ({a.number})</option>
          ))}
        </select>
      </section>

      <label style={{ display: 'flex', gap: 8 }}>
        <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
        <span>위 손실 내용을 모두 확인했고 해지에 동의합니다.</span>
      </label>

      <button className="danger" disabled={!agree} onClick={() => setOtp(true)}>해지 요청 (OTP)</button>
      <OtpModal open={otp} onClose={() => setOtp(false)} onVerify={() => { setOtp(false); alert('해지 완료'); }} />
    </div>
  );
}
