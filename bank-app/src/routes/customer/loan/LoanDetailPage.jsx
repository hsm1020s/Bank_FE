import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { loanContract, loanSchedule, rateHistory } from '../../../data/mockData';
import ScheduleTable from '../../../components/banking/ScheduleTable';
import Modal from '../../../components/common/Modal';

const FILTERS = ['전체', '예정', '완납', '연체'];

export default function LoanDetailPage() {
  const [filter, setFilter] = useState('전체');
  const [sortAsc, setSortAsc] = useState(true);
  const [snap, setSnap] = useState(null);

  const rows = useMemo(() => {
    let list = loanSchedule.slice();
    if (filter !== '전체') list = list.filter((r) => r.status === filter);
    list.sort((a, b) => sortAsc ? a.no - b.no : b.no - a.no);
    return list;
  }, [filter, sortAsc]);

  const principalProgress = ((loanContract.principal - loanContract.remaining) / loanContract.principal) * 100;
  const countProgress = (loanContract.paidCount / loanContract.totalCount) * 100;

  return (
    <div className="col" style={{ gap: 16 }}>
      <Link to="/dashboard" className="muted">← 대시보드</Link>
      <h1>대출 상세 — {loanContract.id}</h1>

      <section className="card">
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <div>
            <span className="badge l1">{loanContract.status}</span>
            <span className="muted" style={{ marginLeft: 8 }}>
              개시 {loanContract.startedAt} · 만기 {loanContract.maturity}
            </span>
          </div>
          <div className="muted">금리 {loanContract.rate}% ({loanContract.rateType})</div>
        </div>
        <div className="row" style={{ marginTop: 8 }}>
          <div style={{ flex: 1 }}>
            <div className="muted">원금</div>
            <h2>{loanContract.principal.toLocaleString()} KRW</h2>
          </div>
          <div style={{ flex: 1 }}>
            <div className="muted">잔액</div>
            <h2 style={{ color: 'var(--c-danger)' }}>{loanContract.remaining.toLocaleString()} KRW</h2>
          </div>
        </div>
        <div className="row" style={{ marginTop: 12 }}>
          <div style={{ flex: 1 }}>
            <div className="muted">원금 진행률</div>
            <div className="progress"><span style={{ width: `${principalProgress}%` }} /></div>
            <div style={{ marginTop: 4 }}>{principalProgress.toFixed(1)}%</div>
          </div>
          <div style={{ flex: 1 }}>
            <div className="muted">회차 진행률</div>
            <div className="progress"><span style={{ width: `${countProgress}%`, background: 'var(--c-accent)' }} /></div>
            <div style={{ marginTop: 4 }}>{loanContract.paidCount}/{loanContract.totalCount} 회</div>
          </div>
        </div>
        <div className="row" style={{ marginTop: 12, flexWrap: 'wrap' }}>
          <Link to={`/loan/${loanContract.id}/repay`}><button className="primary">일부/전액 상환</button></Link>
          <button>금리 인하 요구권 (6개월 후 가능)</button>
          <button>약정서 다운로드</button>
        </div>
      </section>

      <section className="card">
        <h2>회차별 스케줄</h2>
        <div className="row" style={{ flexWrap: 'wrap', gap: 8 }}>
          {FILTERS.map((f) => (
            <button key={f} className={filter === f ? 'primary' : ''} onClick={() => setFilter(f)}>{f}</button>
          ))}
          <button onClick={() => setSortAsc((v) => !v)}>회차 {sortAsc ? '↑' : '↓'}</button>
        </div>
        <div style={{ marginTop: 8 }}><ScheduleTable rows={rows} /></div>
      </section>

      <section className="card">
        <h2>변동 금리 이력</h2>
        <ul>
          {rateHistory.map((h, i) => (
            <li key={i} style={{ marginBottom: 4 }}>
              <strong>{h.at}</strong> — {h.rate}%
              <span className="muted" style={{ marginLeft: 8 }}>{h.reason}</span>
              <button style={{ marginLeft: 8 }} onClick={() => setSnap(h)}>스냅샷 PDF</button>
            </li>
          ))}
        </ul>
      </section>

      <Modal open={!!snap} onClose={() => setSnap(null)} title={`스냅샷 — ${snap?.at}`}>
        <p>변경 시점: {snap?.at}</p>
        <p>금리: <strong>{snap?.rate}%</strong> ({snap?.reason})</p>
        <p className="muted">전후 비교 PDF 다운로드는 감사로그에 기록됩니다.</p>
        <button>PDF 다운로드</button>
      </Modal>
    </div>
  );
}
