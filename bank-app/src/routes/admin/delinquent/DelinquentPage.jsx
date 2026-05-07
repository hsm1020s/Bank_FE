import { useMemo, useState } from 'react';
import { delinquentCases } from '../../../data/mockData';
import KpiCard from '../../../components/admin/KpiCard';
import WorklistTable from '../../../components/admin/WorklistTable';
import Stepper from '../../../components/banking/Stepper';
import Modal from '../../../components/common/Modal';

const STAGE_FILTERS = ['전체', 1, 2, 3, 4];
const PRODUCTS = ['전체', '신용대출', '주담대', '전세'];
const TERMINATION_STEPS = ['사전최고 발송', '송달 확인', '유예 1개월', '결재 → 만기 처리'];

function nightWindow() {
  const h = new Date().getHours();
  return h >= 21 || h < 8;
}

export default function DelinquentPage() {
  const [stage, setStage] = useState('전체');
  const [product, setProduct] = useState('전체');
  const [partialOpen, setPartialOpen] = useState(false);
  const [termOpen, setTermOpen] = useState(false);
  const [termStep, setTermStep] = useState(0);

  const stats = [1, 2, 3, 4].map((s) => ({
    stage: s,
    count: delinquentCases.filter((c) => c.stage === s).length,
    amount: delinquentCases.filter((c) => c.stage === s).reduce((sum, c) => sum + c.principal, 0),
  }));

  const rows = useMemo(() => delinquentCases.filter((c) => {
    if (stage !== '전체' && c.stage !== stage) return false;
    if (product !== '전체' && c.product !== product) return false;
    return true;
  }), [stage, product]);

  const columns = [
    { key: 'stage', label: '단계', render: (r) => <span className={`badge ${r.stage >= 3 ? 'l4' : r.stage === 2 ? 'l3' : 'l2'}`}>{r.stage}단계</span> },
    { key: 'id', label: 'ID', render: (r) => <code>{r.id}</code> },
    { key: 'customer', label: '고객' },
    { key: 'product', label: '상품' },
    { key: 'days', label: '연체 일수', render: (r) => `${r.days}일` },
    { key: 'principal', label: '연체 원금', render: (r) => r.principal.toLocaleString() },
    { key: 'interest', label: '연체 이자', render: (r) => r.interest.toLocaleString() },
    { key: 'recent', label: '최근 조치' },
    { key: 'action', label: '액션', render: (r) => (
      <>
        <button onClick={() => setPartialOpen(r.id)}>부분상환</button>
        {r.stage === 4 && <button className="danger" style={{ marginLeft: 4 }} onClick={() => setTermOpen(r.id)}>기한이익상실</button>}
      </>
    ) },
  ];

  const isNight = nightWindow();

  return (
    <div className="col" style={{ gap: 16 }}>
      <h1>연체 관리</h1>

      {isNight && (
        <div className="card" style={{ background: '#fff4d6', borderColor: '#f3e2a1' }}>
          ⚠️ 야간 시간대(21:00~08:00) — 추심 연락(SMS/CALL/CIS)이 자동 차단됩니다.
        </div>
      )}

      <section className="row">
        {stats.map((s) => (
          <KpiCard
            key={s.stage}
            label={`${s.stage}단계`}
            value={s.count}
            unit="건"
            delta={`${(s.amount / 100_000_000).toFixed(2)}억`}
            tone={s.stage >= 3 ? 'negative' : 'neutral'}
          />
        ))}
      </section>

      <section className="card">
        <div className="row" style={{ flexWrap: 'wrap', gap: 8 }}>
          <label>단계 <select value={stage} onChange={(e) => setStage(e.target.value === '전체' ? '전체' : +e.target.value)}>
            {STAGE_FILTERS.map((s) => <option key={s} value={s}>{s === '전체' ? '전체' : `${s}단계`}</option>)}
          </select></label>
          <label>상품 <select value={product} onChange={(e) => setProduct(e.target.value)}>{PRODUCTS.map((p) => <option key={p}>{p}</option>)}</select></label>
        </div>
      </section>

      <section className="card">
        <WorklistTable columns={columns} rows={rows} />
      </section>

      <Modal
        open={!!partialOpen}
        onClose={() => setPartialOpen(false)}
        title={`부분 상환 — ${partialOpen}`}
        footer={
          <>
            <button onClick={() => setPartialOpen(false)}>취소</button>
            <button className="primary" onClick={() => { alert('부분상환 적용 — 단계 역전 (3→2 / 2→1 가능, 3단계 역전 시 CIS 등록 자동 해제)'); setPartialOpen(false); }}>실행</button>
          </>
        }
      >
        <p>부분상환 적용 후 연체 단계가 역전될 수 있습니다.</p>
        <ul>
          <li>2단계 → 1단계 가능</li>
          <li>3단계 → 2단계 가능 (3단계 역전 시 CIS 등록 자동 해제 의무)</li>
        </ul>
      </Modal>

      <Modal
        open={!!termOpen}
        onClose={() => { setTermOpen(false); setTermStep(0); }}
        title={`4단계 기한이익상실 — ${termOpen}`}
        footer={
          termStep < TERMINATION_STEPS.length - 1 ? (
            <>
              <button onClick={() => { setTermOpen(false); setTermStep(0); }}>취소</button>
              <button className="primary" onClick={() => setTermStep((s) => s + 1)}>다음 단계</button>
            </>
          ) : (
            <>
              <button onClick={() => { setTermOpen(false); setTermStep(0); }}>닫기</button>
              <button className="danger" onClick={() => { alert('만기 처리 효력 발생 (4단계 모두 완료)'); setTermOpen(false); setTermStep(0); }}>만기 처리 확정</button>
            </>
          )
        }
      >
        <p>4단계 모두 거쳐야 만기 처리 효력 발생.</p>
        <Stepper steps={TERMINATION_STEPS} current={termStep} />
        <p className="muted" style={{ marginTop: 8 }}>현재 단계: {TERMINATION_STEPS[termStep]}</p>
      </Modal>
    </div>
  );
}
