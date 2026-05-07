import RiskBadge from '../common/RiskBadge';
import UndoButton from './UndoButton';

export default function ActionCard({
  level = 'L1',
  title,
  rationale,
  onApprove,
  onHumanReview,
  showUndo = false,
}) {
  const needsOtp = level === 'L2';
  const needs3Step = level === 'L3';
  const blocked = level === 'L4';
  return (
    <div className="card" style={{ borderLeft: `4px solid var(--c-${level.toLowerCase()})` }}>
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <strong>{title}</strong>
        <RiskBadge level={level} />
      </div>
      <p className="muted" style={{ marginTop: 4 }}>{rationale}</p>
      <div className="row" style={{ marginTop: 8 }}>
        {!blocked && (
          <button className="primary" onClick={onApprove}>
            {needsOtp ? 'OTP 후 진행' : needs3Step ? '3단계 인증 후 진행' : '실행'}
          </button>
        )}
        <button onClick={onHumanReview}>사람 검토 요청</button>
        {showUndo && !blocked && <UndoButton onUndo={() => alert('되돌리기 완료')} />}
      </div>
      {blocked && (
        <p className="muted" style={{ color: 'var(--c-danger)', marginTop: 8 }}>
          L4 — 자동 실행 금지. 사람 검토만 가능합니다.
        </p>
      )}
    </div>
  );
}
