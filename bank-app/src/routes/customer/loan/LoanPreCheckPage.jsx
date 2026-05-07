import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function LoanPreCheckPage() {
  const [income, setIncome] = useState(60_000_000);
  const [count, setCount] = useState(1);
  const [result, setResult] = useState(null);

  const run = () => {
    setCount((c) => c + 1);
    setResult({
      maxLimit: Math.round(income * 2.0),
      rateRange: { min: 4.5, max: 6.8 },
      stale: false,
      validUntil: '2026-06-06',
    });
  };

  return (
    <div className="col" style={{ gap: 16, maxWidth: 640 }}>
      <Link to="/loan/catalog" className="muted">← 카탈로그</Link>
      <h1>대출 한도 사전조회</h1>

      <div className="card" style={{ background: '#e1efff', borderColor: '#a8c8eb' }}>
        ℹ️ 본 조회는 <strong>소프트풀(Soft pull)</strong>입니다 — 신용등급에 영향이 없습니다.
        결과는 30일간 유효합니다. (3회 초과 조회 시 본조회 권고 모달)
      </div>

      <section className="card">
        <div className="col">
          <label>연소득 (KRW)
            <input type="number" value={income} onChange={(e) => setIncome(+e.target.value)} />
          </label>
          <label>고용 형태
            <select><option>회사원</option><option>자영업</option><option>전문직</option></select>
          </label>
          <label>현재 부채
            <input type="number" defaultValue={5_000_000} />
          </label>
          <button className="primary" onClick={run}>조회 ({count}회)</button>
        </div>
      </section>

      {result && (
        <section className="card">
          <h2>예상 결과</h2>
          {result.stale && (
            <div className="card" style={{ background: '#ffd9d9' }}>
              ⛔ 금리 변동으로 결과가 만료(stale_rate_changed) — 재조회 필요
            </div>
          )}
          <p>예상 최대 한도: <strong>{result.maxLimit.toLocaleString()}</strong> KRW</p>
          <p>예상 금리: <strong>{result.rateRange.min}% ~ {result.rateRange.max}%</strong></p>
          <p className="muted">유효 기간: ~{result.validUntil}</p>
          <Link to="/loan/apply"><button className="primary">본 조회 / 신청 진행</button></Link>
        </section>
      )}

      {count > 3 && (
        <div className="card" style={{ background: '#fff4d6', borderColor: '#f3e2a1' }}>
          ⚠️ 3회 초과 조회 — 본조회로 진행하시는 것을 권장합니다.
        </div>
      )}
    </div>
  );
}
