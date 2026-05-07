import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { accounts, transactions } from '../../../data/mockData';
import TransactionRow from '../../../components/banking/TransactionRow';
import UndoButton from '../../../components/agent/UndoButton';
import UnmaskModal from '../../../components/modals/UnmaskModal';
import Modal from '../../../components/common/Modal';

const KINDS = ['전체', '입금', '출금', '이자', '수수료'];

export default function DepositDetailPage() {
  const { id } = useParams();
  const account = accounts.find((a) => a.id === id) || accounts[0];

  const [period, setPeriod] = useState('1M');
  const [kind, setKind] = useState('전체');
  const [unmask, setUnmask] = useState(false);
  const [editing, setEditing] = useState(null);
  const [savedTxId, setSavedTxId] = useState(null);

  const filtered = useMemo(() => {
    let list = transactions;
    if (kind !== '전체') list = list.filter((t) => t.kind === kind);
    return list;
  }, [kind]);

  const withdrawable = Math.max(0, account.balance - 10000);

  return (
    <div className="col" style={{ gap: 16 }}>
      <div className="row" style={{ alignItems: 'baseline' }}>
        <Link to="/deposit" className="muted">← 목록</Link>
        <h1 style={{ margin: 0 }}>{account.alias || account.name}</h1>
      </div>

      <section className="card">
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <div>
            <code>{account.number}</code>
            <span className="badge" style={{ marginLeft: 8 }}>{account.kind}</span>
          </div>
          <div className="muted">금리 {account.rate}% {account.maturity ? `· 만기 ${account.maturity}` : ''}</div>
        </div>
        <div className="row" style={{ marginTop: 8 }}>
          <div style={{ flex: 1 }}>
            <div className="muted">잔액</div>
            <div style={{ fontSize: 28, fontWeight: 700 }}>{account.balance.toLocaleString()} {account.currency}</div>
          </div>
          <div style={{ flex: 1 }}>
            <div className="muted">출금가능액</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--c-accent)' }}>
              {withdrawable.toLocaleString()} {account.currency}
            </div>
          </div>
        </div>
        <div className="row" style={{ marginTop: 12, flexWrap: 'wrap' }}>
          <Link to="/transfer"><button className="primary">이체</button></Link>
          <button>자동이체 등록</button>
          <button>명세서 발급</button>
          <button>해지</button>
          <button onClick={() => setUnmask(true)}>마스킹 풀기</button>
        </div>
      </section>

      <section className="card">
        <h2>거래 내역</h2>
        <div className="row" style={{ flexWrap: 'wrap', gap: 8 }}>
          <label>기간 <select value={period} onChange={(e) => setPeriod(e.target.value)}>
            <option>1M</option><option>3M</option><option>6M</option><option>1Y</option>
          </select></label>
          <label>구분 <select value={kind} onChange={(e) => setKind(e.target.value)}>{KINDS.map((k) => <option key={k}>{k}</option>)}</select></label>
          <input type="number" placeholder="금액 ≥" style={{ width: 120 }} />
          <select><option>전체 채널</option><option>모바일</option><option>인터넷</option><option>창구</option></select>
          <button>적용</button>
        </div>
        <div style={{ overflowX: 'auto', marginTop: 12 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--c-border)', textAlign: 'left' }}>
                <th>일시</th><th>구분</th><th style={{ textAlign: 'right' }}>금액</th>
                <th style={{ textAlign: 'right' }}>잔액</th><th>상대</th><th>적요</th><th>비고</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <TransactionRow key={t.id} tx={t} onMemoEdit={(tx) => setEditing(tx)} />
              ))}
            </tbody>
          </table>
        </div>
        {savedTxId && (
          <p className="muted" style={{ marginTop: 8 }}>
            적요 수정됨 — <UndoButton onUndo={() => setSavedTxId(null)} onExpire={() => setSavedTxId(null)} />
          </p>
        )}
      </section>

      <Modal
        open={!!editing}
        onClose={() => setEditing(null)}
        title="적요 수정"
        footer={
          <>
            <button onClick={() => setEditing(null)}>취소</button>
            <button className="primary" onClick={() => { setSavedTxId(editing.id); setEditing(null); }}>저장 (Undo 30초)</button>
          </>
        }
      >
        <p className="muted">기존: {editing?.memo}</p>
        <input defaultValue={editing?.memo} style={{ width: '100%' }} />
        <p className="muted" style={{ marginTop: 8 }}>저장 후 30초 동안 되돌릴 수 있습니다.</p>
      </Modal>

      <UnmaskModal open={unmask} onClose={() => setUnmask(false)} />
    </div>
  );
}
