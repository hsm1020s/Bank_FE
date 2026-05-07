import { useState } from 'react';
import { agentKpis, agentLiveStream, agentL4Queue } from '../../../data/mockData';
import KpiCard from '../../../components/admin/KpiCard';
import NetworkZoneBadge from '../../../components/common/NetworkZoneBadge';
import RiskBadge from '../../../components/common/RiskBadge';
import Modal from '../../../components/common/Modal';

const UNMASK_REASONS = ['COMPLAINT', 'INVESTIGATION', 'SANCTION_CHECK', 'LEGAL_ORDER', 'CUSTOMER_CONSENT'];

export default function AgentOpsConsolePage() {
  const [unmaskOpen, setUnmaskOpen] = useState(null);
  const [reason, setReason] = useState(UNMASK_REASONS[0]);
  const [l4Decide, setL4Decide] = useState(null);
  const [ruleEdit, setRuleEdit] = useState(false);

  return (
    <div className="col" style={{ gap: 16 }}>
      <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0 }}>에이전트 운영 콘솔</h1>
        <NetworkZoneBadge zone="ops" />
      </div>
      <div className="card" style={{ background: '#efe2f7', borderColor: '#cfa6e0' }}>
        🔒 운영망 전용 (ZONE_OPERATION). 외부망 진입 시 403 + 보안팀 알림.
      </div>

      <section className="row">
        {agentKpis.map((k) => <KpiCard key={k.key} {...k} />)}
      </section>

      <section className="card">
        <h2>실시간 대화 스트림 (마스킹 default)</h2>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {agentLiveStream.map((s) => (
            <li key={s.id} style={{ padding: '6px 0', borderBottom: '1px dashed var(--c-border)' }}>
              <span className="muted" style={{ marginRight: 8 }}>{s.time}</span>
              <RiskBadge level={s.risk} showLabel={false} />
              <code style={{ marginLeft: 8 }}>{s.user}</code>
              <span className="muted" style={{ marginLeft: 8 }}>{s.screen}</span>
              <div style={{ marginTop: 2 }}>{s.text}</div>
              <button style={{ marginTop: 4 }} onClick={() => setUnmaskOpen(s)}>전체보기 (마스킹 해제)</button>
            </li>
          ))}
        </ul>
      </section>

      <section className="card">
        <h2>L4 승인 대기 큐 (메이커-체커)</h2>
        <ul>
          {agentL4Queue.map((q) => (
            <li key={q.id} style={{ marginBottom: 8 }}>
              <code>{q.id}</code> · {q.screen} · <code>{q.user}</code>
              <div className="muted" style={{ marginTop: 2 }}>{q.summary} ({q.requestedAt})</div>
              <div className="row" style={{ marginTop: 4 }}>
                <button className="primary" onClick={() => setL4Decide({ ...q, action: 'APPROVE' })}>승인</button>
                <button className="danger" onClick={() => setL4Decide({ ...q, action: 'REJECT' })}>거절</button>
                <button onClick={() => setL4Decide({ ...q, action: 'ESCALATE' })}>상위 결재 ESCALATE</button>
              </div>
            </li>
          ))}
        </ul>
        <p className="muted">메이커(ROLE_OPERATOR) → 체커(ROLE_OPERATOR_HEAD/AUDITOR/COMPLIANCE) 2인 결재 강제.</p>
      </section>

      <section className="card">
        <h2>프롬프트 / 룰셋 / 모델 관리</h2>
        <ul>
          <li>현재 프롬프트 버전: <code>p-2026-05-07-1</code> · 모델: <code>claude-opus-4-7</code></li>
          <li>활성 룰셋: 14개 (마지막 변경 2026-04-30)</li>
        </ul>
        <button onClick={() => setRuleEdit(true)}>새 룰 추가 (메이커)</button>
        <button>프롬프트 롤백</button>
        <p className="muted" style={{ marginTop: 8 }}>룰셋·모델 변경은 ROLE_OPERATOR_HEAD + ROLE_COMPLIANCE 2인 결재 필수.</p>
      </section>

      <Modal
        open={!!unmaskOpen}
        onClose={() => setUnmaskOpen(null)}
        title="마스킹 해제 사유 (enum)"
        footer={
          <>
            <button onClick={() => setUnmaskOpen(null)}>취소</button>
            <button className="primary" onClick={() => { alert(`마스킹 해제 (${reason}) — 30초 후 자동 재마스킹`); setUnmaskOpen(null); }}>해제</button>
          </>
        }
      >
        <p>대상: <code>{unmaskOpen?.user}</code></p>
        <select value={reason} onChange={(e) => setReason(e.target.value)}>
          {UNMASK_REASONS.map((r) => <option key={r}>{r}</option>)}
        </select>
        <p className="muted" style={{ marginTop: 8 }}>30초 후 자동 재마스킹. 모든 해제 이벤트 감사로그 기록.</p>
      </Modal>

      <Modal
        open={!!l4Decide}
        onClose={() => setL4Decide(null)}
        title={`L4 결정 — ${l4Decide?.id}`}
        footer={
          <>
            <button onClick={() => setL4Decide(null)}>취소</button>
            <button className="primary" onClick={() => { alert(`메이커 결정 ${l4Decide?.action} 제출 — 체커 결재 라우팅`); setL4Decide(null); }}>제출 (메이커)</button>
          </>
        }
      >
        <p>액션: <strong>{l4Decide?.action}</strong></p>
        <p>요약: {l4Decide?.summary}</p>
        <p className="muted">체커 승인 전까지 효력 없음.</p>
      </Modal>

      <Modal
        open={ruleEdit}
        onClose={() => setRuleEdit(false)}
        title="새 룰 추가"
      >
        <input placeholder="룰 이름" style={{ width: '100%' }} />
        <textarea placeholder="패턴 / 임계" rows={3} style={{ width: '100%', marginTop: 4 }} />
        <p className="muted" style={{ marginTop: 8 }}>제출 시 v1로 발행되며 OPERATOR_HEAD + COMPLIANCE 결재 후 활성화.</p>
      </Modal>
    </div>
  );
}
