import { useState } from 'react';
import { strCases, ctrCases, sanctionMatches, amlRules } from '../../../data/mockData';
import Tabs from '../../../components/admin/Tabs';
import WorklistTable from '../../../components/admin/WorklistTable';
import Modal from '../../../components/common/Modal';
import RiskBadge from '../../../components/common/RiskBadge';

const TABS = [
  { key: 'str', label: 'STR' },
  { key: 'ctr', label: 'CTR' },
  { key: 'sanction', label: '제재 매칭' },
  { key: 'rule', label: '룰 관리' },
];

export default function AmlConsolePage() {
  const [tab, setTab] = useState('str');
  const [strDecide, setStrDecide] = useState(null);
  const [decision, setDecision] = useState('REPORT');
  const [reason, setReason] = useState('');
  const [ruleNew, setRuleNew] = useState(null);

  return (
    <div className="col" style={{ gap: 16 }}>
      <h1>AML / STR / CTR / 제재 매칭</h1>
      <Tabs tabs={TABS} current={tab} onChange={setTab} />

      {tab === 'str' && (
        <section className="card">
          <h2>STR 후보 (메이커-체커 결재)</h2>
          <WorklistTable
            columns={[
              { key: 'id', label: 'STR ID', render: (r) => <code>{r.id}</code> },
              { key: 'txId', label: '거래 ID', render: (r) => <code>{r.txId}</code> },
              { key: 'customer', label: '고객(마스킹)' },
              { key: 'amount', label: '금액', render: (r) => r.amount.toLocaleString() },
              { key: 'channel', label: '채널' },
              { key: 'rule', label: '매칭 룰' },
              { key: 'score', label: 'AI 점수', render: (r) => r.score.toFixed(2) },
              { key: 'sla', label: 'SLA' },
              { key: 'status', label: '상태' },
              { key: 'act', label: '결정', render: (r) => <button onClick={() => setStrDecide(r)}>결정</button> },
            ]}
            rows={strCases}
          />
          <p className="muted" style={{ marginTop: 8 }}>
            메이커(ROLE_AML) → 체커(ROLE_AML_HEAD) 2인 결재 강제. <RiskBadge level="L4" />
          </p>
        </section>
      )}

      {tab === 'ctr' && (
        <section className="card">
          <h2>CTR — 1천만 이상 자동 등록</h2>
          <WorklistTable
            columns={[
              { key: 'id', label: 'CTR ID', render: (r) => <code>{r.id}</code> },
              { key: 'txId', label: '거래 ID' },
              { key: 'customer', label: '고객' },
              { key: 'amount', label: '금액', render: (r) => r.amount.toLocaleString() },
              { key: 'channel', label: '채널' },
              { key: 'sla', label: 'SLA (법정/운영)' },
            ]}
            rows={ctrCases}
          />
          <p className="muted">법정 D-30 + 운영 D-7 이중 SLA 자동 트래킹.</p>
        </section>
      )}

      {tab === 'sanction' && (
        <section className="card">
          <h2>제재 매칭</h2>
          <WorklistTable
            columns={[
              { key: 'id', label: 'ID' },
              { key: 'txId', label: '거래 ID' },
              { key: 'name', label: '대상' },
              { key: 'list', label: '명단' },
              { key: 'score', label: '점수', render: (r) => (
                <span className={`badge ${r.score >= 0.95 ? 'l4' : r.score >= 0.7 ? 'l3' : 'l1'}`}>{r.score.toFixed(2)}</span>
              ) },
              { key: 'action', label: '조치' },
            ]}
            rows={sanctionMatches}
          />
          <p className="muted">≥0.95 즉시 차단 / 0.7~0.95 검토 큐(5분 SLA) / &lt;0.7 후보만</p>
        </section>
      )}

      {tab === 'rule' && (
        <section className="card">
          <h2>룰 관리 (immutable 버전)</h2>
          <WorklistTable
            columns={[
              { key: 'id', label: 'Rule ID' },
              { key: 'name', label: '이름' },
              { key: 'version', label: '버전' },
              { key: 'active', label: '활성', render: (r) => r.active ? <span className="badge l1">활성</span> : <span className="badge">비활성</span> },
              { key: 'threshold', label: '임계' },
              { key: 'updated', label: '수정' },
              { key: 'act', label: '액션', render: (r) => <button onClick={() => setRuleNew(r)}>새 버전 발행</button> },
            ]}
            rows={amlRules}
          />
          <p className="muted">새 버전 발행 시 v{'{n}'} → v{'{n+1}'} immutable 저장 + 활성 포인터 이동. 거래 시점 적용 룰 버전 감사로그 기록.</p>
        </section>
      )}

      <Modal
        open={!!strDecide}
        onClose={() => setStrDecide(null)}
        title={`STR 결정 — ${strDecide?.id}`}
        footer={
          <>
            <button onClick={() => setStrDecide(null)}>취소</button>
            <button className="primary" onClick={() => { alert('메이커 제출 — 체커(ROLE_AML_HEAD) 결재 라우팅'); setStrDecide(null); }}>제출 (메이커)</button>
          </>
        }
      >
        <p>거래 ID: <code>{strDecide?.txId}</code> · 고객: {strDecide?.customer}</p>
        <label className="col" style={{ gap: 4, marginTop: 8 }}>
          <span className="muted">결정</span>
          <select value={decision} onChange={(e) => setDecision(e.target.value)}>
            <option value="REPORT">REPORT (보고)</option>
            <option value="NO_REPORT">NO_REPORT (미보고)</option>
            <option value="MORE_INVESTIGATE">MORE_INVESTIGATE (추가조사)</option>
          </select>
        </label>
        {decision === 'NO_REPORT' && (
          <label className="col" style={{ gap: 4, marginTop: 8 }}>
            <span className="muted">미보고 사유</span>
            <textarea rows={3} value={reason} onChange={(e) => setReason(e.target.value)} placeholder="50자 이상" />
          </label>
        )}
        <p className="muted" style={{ marginTop: 8 }}>제출 후 체커 승인 전까지 효력 없음.</p>
      </Modal>

      <Modal
        open={!!ruleNew}
        onClose={() => setRuleNew(null)}
        title={`룰 새 버전 — ${ruleNew?.id} ${ruleNew?.version} → v${parseInt(ruleNew?.version?.slice(1) || '0') + 1}`}
        footer={
          <>
            <button onClick={() => setRuleNew(null)}>취소</button>
            <button className="primary" onClick={() => { alert('새 버전 발행됨 (메이커-체커 결재 후 활성)'); setRuleNew(null); }}>발행</button>
          </>
        }
      >
        <p>현재 활성: {ruleNew?.version}</p>
        <p>임계 변경: <input defaultValue={ruleNew?.threshold} style={{ width: '100%' }} /></p>
        <p className="muted">발행 시 immutable 저장 — 기존 버전은 보관, 신버전이 활성 포인터를 가짐.</p>
      </Modal>
    </div>
  );
}
