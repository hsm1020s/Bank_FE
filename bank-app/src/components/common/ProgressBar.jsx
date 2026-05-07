export default function ProgressBar({ value = 0, label }) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div>
      {label && <div className="muted" style={{ marginBottom: 4 }}>{label} ({pct}%)</div>}
      <div className="progress" role="progressbar" aria-valuenow={pct} aria-valuemin="0" aria-valuemax="100">
        <span style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
