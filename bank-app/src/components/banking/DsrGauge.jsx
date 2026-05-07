export default function DsrGauge({ value = 0 }) {
  const pct = Math.max(0, Math.min(100, value));
  let tone = 'var(--c-accent)';
  let label = '안전';
  if (pct >= 50) { tone = 'var(--c-danger)'; label = 'L4 — 차단 (DSR ≥ 50%)'; }
  else if (pct >= 40) { tone = 'var(--c-warn)'; label = 'L3 — 경고 (DSR ≥ 40%)'; }
  return (
    <div>
      <div className="muted">DSR (총부채원리금상환비율)</div>
      <div style={{ height: 12, background: '#eef1f6', borderRadius: 999, overflow: 'hidden', marginTop: 4 }}>
        <span style={{ display: 'block', height: '100%', width: `${pct}%`, background: tone, transition: 'width 0.2s' }} />
      </div>
      <div style={{ marginTop: 4, fontWeight: 600, color: tone }}>{pct.toFixed(1)}% — {label}</div>
    </div>
  );
}
