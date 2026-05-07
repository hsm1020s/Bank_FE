export default function KpiCard({ label, value, unit, delta, tone = 'neutral' }) {
  const color = tone === 'positive' ? 'var(--c-accent)' : tone === 'negative' ? 'var(--c-danger)' : 'var(--c-text)';
  return (
    <div className="card" style={{ flex: 1, minWidth: 160 }}>
      <div className="muted">{label}</div>
      <div style={{ fontSize: 22, fontWeight: 700, marginTop: 4 }}>
        {typeof value === 'number' ? value.toLocaleString() : value}
        {unit && <span style={{ fontSize: 11, fontWeight: 400, marginLeft: 4 }}>{unit}</span>}
      </div>
      {delta && <div style={{ color, fontSize: 12, marginTop: 4 }}>{delta}</div>}
    </div>
  );
}
