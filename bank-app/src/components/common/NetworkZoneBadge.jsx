const LABELS = { business: '업무망', ops: '운영망', audit: '감사망' };

export default function NetworkZoneBadge({ zone = 'business' }) {
  return (
    <span className={`badge zone-${zone}`} title={`현재 망: ${LABELS[zone]}`}>
      {LABELS[zone]}
    </span>
  );
}
