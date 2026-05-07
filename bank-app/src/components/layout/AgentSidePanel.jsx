import { useState } from 'react';
import ActionCard from '../agent/ActionCard';
import RecordingConsentModal from '../modals/RecordingConsentModal';
import HumanReviewModal from '../modals/HumanReviewModal';

export default function AgentSidePanel({ enabled = true }) {
  const [recOpen, setRecOpen] = useState(false);
  const [humanOpen, setHumanOpen] = useState(false);
  return (
    <aside>
      <div style={{ padding: 16, borderBottom: '1px solid var(--c-border)' }}>
        <strong>🤖 AI 어시스턴트입니다</strong>
        <p className="muted" style={{ marginTop: 4 }}>
          본 패널의 모든 응답은 AI가 생성합니다. 권리에 영향 주는 결정은 사람 검토를 요청할 수 있습니다.
        </p>
      </div>
      {!enabled ? (
        <div style={{ padding: 16 }}>
          <p className="muted">AI 거부 모드 — 액션 카드 비활성화</p>
        </div>
      ) : (
        <div className="col" style={{ padding: 16, gap: 12 }}>
          <ActionCard
            level="L0"
            title="잔액 조회 요약"
            rationale="조회 — 사용자 데이터 변경 없음"
            onApprove={() => alert('조회 결과 표시')}
            onHumanReview={() => setHumanOpen(true)}
          />
          <ActionCard
            level="L2"
            title="자동이체일 변경 제안"
            rationale="L2 — OTP 추가 인증 후 진행"
            onApprove={() => alert('OTP 모달 트리거')}
            onHumanReview={() => setHumanOpen(true)}
            showUndo
          />
          <ActionCard
            level="L4"
            title="신용 자동 결정"
            rationale="자동 의사결정 금지 — 사람 검토만 가능"
            onApprove={() => {}}
            onHumanReview={() => setHumanOpen(true)}
          />
          <button onClick={() => setRecOpen(true)}>🎤 음성 입력 (녹취 동의)</button>
        </div>
      )}
      <RecordingConsentModal open={recOpen} onClose={() => setRecOpen(false)} onConsent={() => alert('녹취 시작')} />
      <HumanReviewModal open={humanOpen} onClose={() => setHumanOpen(false)} onSubmit={(m) => alert('이관 완료: ' + m)} />
    </aside>
  );
}
