import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { creditCaseDetail } from '../../../data/mockData';
import DsrGauge from '../../../components/banking/DsrGauge';
import RiskBadge from '../../../components/common/RiskBadge';
import Modal from '../../../components/common/Modal';
import HumanReviewModal from '../../../components/modals/HumanReviewModal';

const REJECT_REASONS = [
  '신용도 미달',
  '소득 증빙 부족',
  '담보 평가 부적합',
  'DSR 한도 초과',
  '신청자 본인확인 실패',
  '제재 명단 부분 매칭',
  '내부 정책 위반',
];

export default function CreditReviewPage() {
  const { caseId } = useParams();
  const c = { ...creditCaseDetail, id: caseId || creditCaseDetail.id };

  const [decision, setDecision] = useState(null); // approve|reject|conditional|docs
  const [reason, setReason] = useState(REJECT_REASONS[0]);
  const [opinion, setOpinion] = useState('');
  const [conflictOpen, setConflictOpen] = useState(false);
  const [humanOpen, setHumanOpen] = useState(false);

  const opinionLen = opinion.length;
  const opinionOk = opinionLen >= 50 && opinionLen <= 1000;

  const submit = () => {
    if (caseId === 'CONFLICT') return setConflictOpen(true);
    alert(`결정 제출 — ${decision}`);
  };

  return (
    <div className="col" style={{ gap: 16 }}>
      <Link to="/admin/credit" className="muted">← 워크리스트</Link>
      <div className="row" style={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
        <h1>심사 상세 — {c.id}</h1>
        {c.arc && <span className="badge l4">⛔ ARC — AI 자동결정 거부 고객</span>}
      </div>

      <div className="row" style={{ alignItems: 'flex-start' }}>
        {/* 좌측 — 신청/증빙/패턴 */}
        <div className="col" style={{ flex: 2, minWidth: 320 }}>
          <section className="card">
            <h2>신청 정보</h2>
            <ul>
              <li>고객: <strong>{c.customer}</strong></li>
              <li>상품: {c.product}</li>
              <li>신청 금액: {c.amount.toLocaleString()} KRW</li>
              <li>접수일: {c.receivedAt}</li>
              <li>직업: {c.job} · 재직 {c.career}</li>
              <li>연소득: {c.income.toLocaleString()} KRW · 부양 {c.family}명</li>
            </ul>
          </section>

          <section className="card">
            <h2>증빙 서류 (PDF/A-2 변환·악성코드 검사 완료)</h2>
            <ul>
              {c.documents.map((d) => (
                <li key={d.name}>
                  📄 {d.name} ({d.size}) {d.ok ? <span className="badge l1">검증완료</span> : <span className="badge l4">검사실패</span>}
                  <button style={{ marginLeft: 8 }} disabled>다운로드 차단</button>
                </li>
              ))}
            </ul>
            <p className="muted">직접 다운로드 차단 — 뷰어 내에서만 확인 가능.</p>
          </section>

          <section className="card">
            <h2>거래 패턴</h2>
            <p>{c.pattern}</p>
          </section>
        </div>

        {/* 우측 — CSS/한도/위험/결정 */}
        <div className="col" style={{ flex: 1, minWidth: 280 }}>
          <section className="card">
            <h2>CSS / 한도</h2>
            <p style={{ fontSize: 28, fontWeight: 700 }}>{c.css}</p>
            <p>예상 한도: 1.2억 KRW · 제시 금리 5.4%</p>
            <DsrGauge value={42} />
          </section>

          <section className="card">
            <h2>위험 신호</h2>
            <ul>
              {c.riskFlags.map((f, i) => <li key={i}>⚠️ {f}</li>)}
            </ul>
          </section>

          <section className="card">
            <h2>결정 <RiskBadge level="L3" /></h2>
            <div className="row" style={{ flexWrap: 'wrap', gap: 4 }}>
              <button className={decision === 'approve' ? 'primary' : ''} onClick={() => setDecision('approve')}>승인</button>
              <button className={decision === 'reject' ? 'primary' : ''} onClick={() => setDecision('reject')}>거절</button>
              <button className={decision === 'conditional' ? 'primary' : ''} onClick={() => setDecision('conditional')}>조건부</button>
              <button className={decision === 'docs' ? 'primary' : ''} onClick={() => setDecision('docs')}>추가 서류 요청</button>
            </div>

            {decision === 'reject' && (
              <label className="col" style={{ gap: 4, marginTop: 8 }}>
                <span className="muted">거절 사유 (enum, OTHER 제거됨)</span>
                <select value={reason} onChange={(e) => setReason(e.target.value)}>
                  {REJECT_REASONS.map((r) => <option key={r}>{r}</option>)}
                </select>
              </label>
            )}

            <label className="col" style={{ gap: 4, marginTop: 8 }}>
              <span className="muted">심사 의견 ({opinionLen}/50~1000자)</span>
              <textarea
                rows={5}
                value={opinion}
                onChange={(e) => setOpinion(e.target.value)}
                placeholder="심사 결과 근거를 50자 이상 작성하세요"
              />
            </label>
            {!opinionOk && <p className="muted" style={{ color: 'var(--c-warn)' }}>의견은 50자 이상 1000자 이하만 허용</p>}

            <div className="row" style={{ marginTop: 12 }}>
              <button className="primary" disabled={!decision || !opinionOk} onClick={submit}>결정 제출</button>
              <button onClick={() => setHumanOpen(true)}>결재 라우팅 (권한 초과)</button>
              <button onClick={() => setConflictOpen(true)}>다른 심사역 점유 시뮬</button>
            </div>
          </section>
        </div>
      </div>

      <Modal
        open={conflictOpen}
        onClose={() => setConflictOpen(false)}
        title="🛑 412 — ETag 검증 실패"
      >
        <p>다른 심사역(<code>심사역2</code>)이 동일 케이스에 진입했습니다. 본 결정은 적용되지 않습니다.</p>
        <p className="muted">새로고침 후 점유 상태를 다시 확인하세요.</p>
      </Modal>

      <HumanReviewModal
        open={humanOpen}
        onClose={() => setHumanOpen(false)}
        onSubmit={() => alert('EMP-022 결재함으로 라우팅됨')}
      />
    </div>
  );
}
