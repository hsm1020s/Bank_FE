export default function AssetCard({ label, amount, currency = 'KRW', tone = 'neutral', sub }) {
  const color = tone === 'positive' ? 'var(--c-accent)' : tone === 'negative' ? 'var(--c-danger)' : 'var(--c-text)';
  return (
    <div className="card" style={{ flex: 1, minWidth: 200 }}>
      <div className="muted">{label}</div>
      <div style={{ fontSize: 26, fontWeight: 700, color, marginTop: 4 }}>
        {amount.toLocaleString()} <span style={{ fontSize: 13, fontWeight: 400 }}>{currency}</span>
      </div>
      {sub && <div className="muted" style={{ marginTop: 4 }}>{sub}</div>}
    </div>
  );
}
