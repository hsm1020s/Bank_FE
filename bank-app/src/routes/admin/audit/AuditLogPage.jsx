import { useMemo, useState } from 'react';
import { auditLogList, integrityCheck } from '../../../data/mockData';
import WorklistTable from '../../../components/admin/WorklistTable';
import NetworkZoneBadge from '../../../components/common/NetworkZoneBadge';
import RiskBadge from '../../../components/common/RiskBadge';
import Modal from '../../../components/common/Modal';

const SELF_EMP_ID = 'kim_***';
const UNMASK_REASONS = ['COMPLAINT', 'INVESTIGATION', 'SANCTION_CHECK', 'LEGAL_ORDER', 'CUSTOMER_CONSENT'];

export default function AuditLogPage() {
  const [actor, setActor] = useState('');
  const [screen, setScreen] = useState('전체');
  const [risk, setRisk] = useState('전체');
  const [detail, setDetail] = useState(null);
  const [reason, setReason] = useState(UNMASK_REASONS[0]);
  const [blockedSelf, setBlockedSelf] = useState(false);

  const onActorChange = (v) => {
    if (v && v.toLowerCase().includes(SELF_EMP_ID)) {
      setBlockedSelf(true);
      setActor('');
      return;
    }
    setActor(v);
  };

  const rows = useMemo(() => auditLogList.filter((r) => {
    if (actor.trim().length >= 2 && !r.actor.toLowerCase().includes(actor.trim().toLowerCase())) return false;
    if (screen !== '전체' && r.screen !== screen) return false;
    if (risk !== '전체' && r.risk !== risk) return false;
    return true;
  }), [actor, screen, risk]);

  return (
    <div className="col" style={{ gap: 16 }}>
      <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0 }}>감사로그 조회</h1>
        <NetworkZoneBadge zone="audit" />
      </div>
      <div className="card" style={{ background: '#dde', borderColor: '#bbc' }}>
        🔒 감사망 READ-ONLY. 본인 사번(<code>{SELF_EMP_ID}</code>) 검색은 자동 차단되며 보안팀 알림이 발송됩니다.
        본인의 조회 행위도 메타 감사로그에 적재되며, 메타 감사로그(EMP-020b)는 ROLE_AUDIT_SUPERVISOR 이상만 조회 가능합니다.
      </div>

      <section className="card">
        <h2>무결성 검증</h2>
        <div className="row">
          <div style={{ flex: 1 }}>
            <div className="muted">체인 해시</div>
            <strong style={{ color: integrityCheck.chainHashOk ? 'var(--c-accent)' : 'var(--c-danger)' }}>
              {integrityCheck.chainHashOk ? '✅ OK' : '❌ FAIL'}
            </strong>
          </div>
          <div style={{ flex: 1 }}>
            <div className="muted">머클 루트</div>
            <strong style={{ color: integrityCheck.merkleRootOk ? 'var(--c-accent)' : 'var(--c-danger)' }}>
              {integrityCheck.merkleRootOk ? '✅ OK' : '❌ FAIL'}
            </strong>
          </div>
          <div style={{ flex: 1 }}>
            <div className="muted">TSA 시간 인증</div>
            <strong style={{ color: integrityCheck.tsaOk ? 'var(--c-accent)' : 'var(--c-danger)' }}>
              {integrityCheck.tsaOk ? '✅ OK' : '❌ FAIL'}
            </strong>
          </div>
          <div style={{ flex: 1 }}>
            <div className="muted">총 엔트리</div>
            <strong>{integrityCheck.totalEntries.toLocaleString()}</strong>
          </div>
        </div>
        <p className="muted">마지막 검증: {integrityCheck.lastVerifiedAt}</p>
      </section>

      <section className="card">
        <div className="row" style={{ flexWrap: 'wrap', gap: 8 }}>
          <input placeholder="사번/고객 (2자+)" value={actor} onChange={(e) => onActorChange(e.target.value)} />
          <label>화면 <select value={screen} onChange={(e) => setScreen(e.target.value)}>
            {['전체','/dashboard','/transfer','/loan/apply','/admin/credit','/profile'].map((s) => <option key={s}>{s}</option>)}
          </select></label>
          <label>위험도 <select value={risk} onChange={(e) => setRisk(e.target.value)}>
            {['전체','L0','L1','L2','L3','L4'].map((r) => <option key={r}>{r}</option>)}
          </select></label>
          <label className="muted">unmask 사유 <select value={reason} onChange={(e) => setReason(e.target.value)}>
            {UNMASK_REASONS.map((r) => <option key={r}>{r}</option>)}
          </select></label>
          <button>CSV 다운로드</button>
        </div>
      </section>

      <section className="card">
        <h2>감사로그 ({rows.length}건)</h2>
        <WorklistTable
          columns={[
            { key: 'ts', label: '시각' },
            { key: 'actor', label: '주체', render: (r) => <code>{r.actor}</code> },
            { key: 'ip', label: 'IP' },
            { key: 'screen', label: '화면' },
            { key: 'action', label: '액션' },
            { key: 'risk', label: '위험도', render: (r) => <RiskBadge level={r.risk} showLabel={false} /> },
            { key: 'targetId', label: '대상 ID', render: (r) => <code>{r.targetId}</code> },
            { key: 'result', label: '결과', render: (r) => <span className={`badge ${r.result === 'BLOCKED' ? 'l4' : 'l1'}`}>{r.result}</span> },
            { key: 'hash', label: '해시', render: (r) => <code style={{ fontSize: 11 }}>{r.hash}</code> },
          ]}
          rows={rows.slice(0, 30)}
          onRowClick={(r) => setDetail(r)}
        />
        <p className="muted">STR 케이스 ID는 ROLE_AUDITOR(일반)에게 <code>STR-***</code>로 마스킹. ROLE_AML/AML_HEAD/AUDIT_SUPERVISOR만 평문 노출 (사유: INVESTIGATION 또는 LEGAL_ORDER).</p>
      </section>

      <Modal
        open={!!detail}
        onClose={() => setDetail(null)}
        title={`감사로그 상세 — ${detail?.targetId}`}
      >
        <ul>
          <li>시각: {detail?.ts}</li>
          <li>주체: <code>{detail?.actor}</code> ({detail?.ip})</li>
          <li>화면: {detail?.screen} · 액션: {detail?.action}</li>
          <li>위험도: {detail?.risk} · 결과: {detail?.result}</li>
          <li>원본 해시: <code>{detail?.hash}</code></li>
          <li>머클 경로: <code>0x4d7e... → 0xa1b2... → root</code></li>
          <li>인증 단계: 3단계(비밀번호+OTP+안면)</li>
          <li>동의 상태: 자동결정 거부 ON</li>
          <li>Device UA: Mac/Safari 26</li>
        </ul>
      </Modal>

      <Modal
        open={blockedSelf}
        onClose={() => setBlockedSelf(false)}
        title="🛑 본인 사번 검색 차단"
      >
        <p>ROLE_AUDITOR 본인의 사번(<code>{SELF_EMP_ID}</code>)을 검색 키로 입력했습니다. 즉시 차단되며 보안팀에 알림이 발송됩니다.</p>
        <p className="muted">메타 감사로그에 본 차단 이벤트가 기록됩니다.</p>
      </Modal>
    </div>
  );
}
