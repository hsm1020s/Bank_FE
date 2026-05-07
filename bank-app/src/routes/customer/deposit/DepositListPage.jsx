import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { accounts } from '../../../data/mockData';
import AccountCard from '../../../components/banking/AccountCard';
import UnmaskModal from '../../../components/modals/UnmaskModal';

const KINDS = ['전체', '입출금', '정기예금', '적금'];
const STATUS = ['전체', 'active', 'closed'];

export default function DepositListPage() {
  const [kind, setKind] = useState('전체');
  const [status, setStatus] = useState('active');
  const [sort, setSort] = useState('balance-desc');
  const [q, setQ] = useState('');
  const [unmask, setUnmask] = useState(false);

  const visible = useMemo(() => {
    let list = accounts.slice();
    if (kind !== '전체') list = list.filter((a) => a.kind === kind);
    if (status !== '전체') list = list.filter((a) => a.status === status);
    if (q.trim()) {
      const Q = q.trim().toLowerCase();
      list = list.filter((a) =>
        (a.alias || '').toLowerCase().includes(Q)
        || a.number.endsWith(Q)
        || a.name.toLowerCase().includes(Q)
      );
    }
    if (sort === 'balance-desc') list.sort((a, b) => b.balance - a.balance);
    else if (sort === 'balance-asc') list.sort((a, b) => a.balance - b.balance);
    else if (sort === 'rate-desc') list.sort((a, b) => b.rate - a.rate);
    return list;
  }, [kind, status, sort, q]);

  const closed = accounts.filter((a) => a.status === 'closed');

  return (
    <div className="col" style={{ gap: 16 }}>
      <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0 }}>수신 계좌 목록</h1>
        <Link to="/deposit/new"><button className="primary">+ 신규 계좌 개설</button></Link>
      </div>

      <div className="card">
        <div className="row" style={{ flexWrap: 'wrap', gap: 8 }}>
          <label>종류 <select value={kind} onChange={(e) => setKind(e.target.value)}>{KINDS.map((k) => <option key={k}>{k}</option>)}</select></label>
          <label>상태 <select value={status} onChange={(e) => setStatus(e.target.value)}>{STATUS.map((s) => <option key={s}>{s}</option>)}</select></label>
          <label>정렬
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="balance-desc">잔액 ↓</option>
              <option value="balance-asc">잔액 ↑</option>
              <option value="rate-desc">금리 ↓</option>
            </select>
          </label>
          <input
            type="search"
            placeholder="별칭 / 끝4자리 / 상품명 (마스킹 유지)"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            style={{ flex: 1, minWidth: 200 }}
          />
        </div>
        <p className="muted" style={{ marginTop: 8 }}>
          총 {visible.length}건 — 마스킹 default. 풀기는 사유 + OTP + 30초 자동 재마스킹.
        </p>
      </div>

      <div className="row" style={{ alignItems: 'stretch' }}>
        {visible.map((a) => (
          <AccountCard key={a.id} account={a} onUnmask={() => setUnmask(true)} />
        ))}
        {visible.length === 0 && <p className="muted">조건에 맞는 계좌가 없습니다.</p>}
      </div>

      {closed.length > 0 && (
        <details className="card">
          <summary><strong>해지/폐지 계좌 {closed.length}건</strong></summary>
          <div className="row" style={{ marginTop: 8 }}>
            {closed.map((a) => <AccountCard key={a.id} account={a} />)}
          </div>
        </details>
      )}

      <UnmaskModal open={unmask} onClose={() => setUnmask(false)} />
    </div>
  );
}
