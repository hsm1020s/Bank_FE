import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { creditCases } from '../../../data/mockData';
import KpiCard from '../../../components/admin/KpiCard';
import WorklistTable from '../../../components/admin/WorklistTable';
import KinshipBlockedBadge from '../../../components/compliance/KinshipBlockedBadge';
import Modal from '../../../components/common/Modal';

const PRODUCTS = ['전체','신용대출','주담대','전세','마이너스'];
const URGENCY = ['전체','긴급','일반'];
const AUTO = ['전체','자동승인','자동거절','수동심사','보류'];

export default function CreditWorklistPage() {
  const nav = useNavigate();
  const [product, setProduct] = useState('전체');
  const [urgency, setUrgency] = useState('전체');
  const [auto, setAuto] = useState('전체');
  const [q, setQ] = useState('');
  const [selected, setSelected] = useState([]);
  const [batchOpen, setBatchOpen] = useState(false);
  const [conflicts, setConflicts] = useState([]);

  const stats = {
    total: creditCases.length,
    auto_ok: creditCases.filter((c) => c.autoResult === '자동승인').length,
    auto_no: creditCases.filter((c) => c.autoResult === '자동거절').length,
    manual: creditCases.filter((c) => c.autoResult === '수동심사').length,
    pending: creditCases.filter((c) => !c.assignee).length,
    family: creditCases.filter((c) => c.family).length,
  };

  const rows = useMemo(() => creditCases.filter((c) => {
    if (product !== '전체' && c.product !== product) return false;
    if (urgency !== '전체' && c.urgency !== urgency) return false;
    if (auto !== '전체' && c.autoResult !== auto) return false;
    if (q.trim().length >= 2) {
      const Q = q.trim().toLowerCase();
      if (!c.id.toLowerCase().includes(Q) && !c.customer.toLowerCase().includes(Q)) return false;
    } else if (q.trim().length === 1) {
      // 키워드 1자 입력은 검색 트리거 안 함 (명세: 2자 이상 필수)
      return true;
    }
    return true;
  }), [product, urgency, auto, q]);

  const toggle = (id) => setSelected((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id]);

  const columns = [
    { key: 'urgency', label: '긴급', render: (r) => <span className={`badge ${r.urgency === '긴급' ? 'l4' : ''}`}>{r.urgency}</span> },
    { key: 'id', label: '케이스 ID', render: (r) => <code>{r.id}</code> },
    { key: 'customer', label: '고객', render: (r) => (
      <>
        {r.customer} {r.family && <KinshipBlockedBadge />}
      </>
    ) },
    { key: 'product', label: '상품' },
    { key: 'amount', label: '금액', render: (r) => r.amount.toLocaleString() },
    { key: 'receivedAt', label: '접수일' },
    { key: 'autoResult', label: '자동심사', render: (r) => (
      <span className={`badge ${r.autoResult === '자동승인' ? 'l1' : r.autoResult === '자동거절' ? 'l4' : ''}`}>{r.autoResult}</span>
    ) },
    { key: 'assignee', label: '담당자', render: (r) => r.assignee || <span className="muted">미배정</span> },
    { key: 'css', label: 'CSS', render: (r) => r.css },
  ];

  const onBatch = () => {
    const conflict = selected.filter((_, i) => i % 3 === 0);
    setConflicts(conflict);
    setBatchOpen(true);
  };

  return (
    <div className="col" style={{ gap: 16 }}>
      <h1>여신 심사 워크리스트</h1>

      <section className="row">
        <KpiCard label="총 케이스" value={stats.total} unit="건" />
        <KpiCard label="자동 승인" value={stats.auto_ok} unit="건" tone="positive" />
        <KpiCard label="자동 거절" value={stats.auto_no} unit="건" tone="negative" />
        <KpiCard label="수동 심사" value={stats.manual} unit="건" />
        <KpiCard label="미배정" value={stats.pending} unit="건" tone="negative" />
        <KpiCard label="친족 차단" value={stats.family} unit="건" tone="negative" />
      </section>

      <section className="card">
        <div className="row" style={{ flexWrap: 'wrap', gap: 8 }}>
          <label>상품 <select value={product} onChange={(e) => setProduct(e.target.value)}>{PRODUCTS.map((p) => <option key={p}>{p}</option>)}</select></label>
          <label>긴급도 <select value={urgency} onChange={(e) => setUrgency(e.target.value)}>{URGENCY.map((u) => <option key={u}>{u}</option>)}</select></label>
          <label>자동심사 <select value={auto} onChange={(e) => setAuto(e.target.value)}>{AUTO.map((a) => <option key={a}>{a}</option>)}</select></label>
          <input
            type="search"
            placeholder="키워드 (2자 이상 필수)"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            style={{ flex: 1, minWidth: 200 }}
          />
          {q.trim().length === 1 && <span className="muted" style={{ color: 'var(--c-warn)' }}>2자 이상 입력해주세요</span>}
          <button disabled={selected.length === 0} onClick={onBatch}>일괄 배정 ({selected.length})</button>
        </div>
      </section>

      <section className="card">
        <WorklistTable
          columns={columns}
          rows={rows}
          selectable
          selected={selected}
          onToggle={toggle}
          onRowClick={(r) => {
            if (r.family) return alert('친족 매칭 — 처리 불가 (자동 차단)');
            nav(`/admin/credit/${r.id}`);
          }}
        />
      </section>

      <Modal
        open={batchOpen}
        onClose={() => setBatchOpen(false)}
        title="일괄 배정 결과"
      >
        <p>요청: {selected.length}건</p>
        <p>성공: {selected.length - conflicts.length}건</p>
        {conflicts.length > 0 && (
          <p style={{ color: 'var(--c-danger)' }}>
            충돌 (다른 심사역 선점): {conflicts.length}건 — 해당 행만 실패 처리됨
            <br />
            <code style={{ fontSize: 11 }}>{conflicts.join(', ')}</code>
          </p>
        )}
        <p className="muted">ETag 기반 점유 검증 적용.</p>
      </Modal>
    </div>
  );
}
