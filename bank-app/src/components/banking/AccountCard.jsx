import { Link } from 'react-router-dom';

export default function AccountCard({ account, onTransfer, onUnmask }) {
  const { id, alias, name, number, balance, currency, kind, status, rate, maturity } = account;
  const closed = status === 'closed';
  return (
    <div className="card" style={{ flex: 1, minWidth: 280, opacity: closed ? 0.6 : 1 }}>
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <div>
          <strong>{alias || name}</strong>
          <span className="badge" style={{ marginLeft: 8 }}>{kind}</span>
          {closed && <span className="badge l4" style={{ marginLeft: 4 }}>해지</span>}
        </div>
        <span className="muted">{rate}%</span>
      </div>
      <div style={{ fontSize: 13, marginTop: 4 }}><code>{number}</code></div>
      <div style={{ fontSize: 22, fontWeight: 700, marginTop: 8 }}>
        {balance.toLocaleString()} {currency}
      </div>
      {maturity && <div className="muted">만기 {maturity}</div>}
      {!closed && (
        <div className="row" style={{ marginTop: 12 }}>
          <Link to={`/deposit/${id}`}><button>상세</button></Link>
          <button onClick={onTransfer}>이체</button>
          <button onClick={onUnmask}>마스킹 풀기</button>
        </div>
      )}
    </div>
  );
}
