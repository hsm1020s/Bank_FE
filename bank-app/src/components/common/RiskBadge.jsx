const ICONS = { L0: '👁', L1: '✓', L2: '🔑', L3: '🛡', L4: '⛔' };
const LABELS = {
  L0: 'L0 조회',
  L1: 'L1 단순',
  L2: 'L2 OTP',
  L3: 'L3 3단계',
  L4: 'L4 금지',
};

export default function RiskBadge({ level = 'L0', showLabel = true }) {
  const cls = `badge ${level.toLowerCase()}`;
  return (
    <span className={cls} title={`위험도 ${LABELS[level]}`}>
      <span aria-hidden>{ICONS[level]}</span>
      {showLabel && <span>{LABELS[level]}</span>}
    </span>
  );
}
