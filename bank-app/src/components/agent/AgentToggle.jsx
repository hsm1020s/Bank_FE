export default function AgentToggle({ enabled, onToggle, compact = false }) {
  return (
    <button
      type="button"
      onClick={() => onToggle?.(!enabled)}
      className={enabled ? '' : 'danger'}
      title="AI 어시스턴트 사용/거부 (PIPA — 자동결정 거부권)"
    >
      {compact ? (enabled ? '🤖 AI ON' : '⛔ AI OFF') : (enabled ? '🤖 AI 어시스턴트 사용' : '⛔ AI 어시스턴트 거부')}
    </button>
  );
}
