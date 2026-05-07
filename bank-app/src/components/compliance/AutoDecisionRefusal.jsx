import { useState } from 'react';

export default function AutoDecisionRefusal() {
  const [refused, setRefused] = useState(false);
  return (
    <div className="card" style={{ borderColor: '#cfdfff' }}>
      <strong>AI 자동결정 거부권</strong>
      <p className="muted" style={{ marginTop: 4 }}>
        PIPA — AI가 본인의 권리에 영향 주는 결정을 자동 처리하는 것을 거부할 수 있습니다.
        거부 시 모든 자동 의사결정은 사람이 검토합니다.
      </p>
      <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <input type="checkbox" checked={refused} onChange={(e) => setRefused(e.target.checked)} />
        <span>AI 자동결정을 거부하고 사람 검토를 요청합니다</span>
      </label>
      {refused && <p className="muted" style={{ marginTop: 8, color: 'var(--c-warn)' }}>거부 적용됨 — 모든 AI 액션은 [사람 검토 요청]으로 라우팅됩니다.</p>}
    </div>
  );
}
