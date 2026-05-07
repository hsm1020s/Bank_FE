export default function MiniLineChart({ series = [], width = 320, height = 80 }) {
  if (series.length === 0) return null;
  const max = Math.max(...series.map((d) => d.v));
  const min = Math.min(...series.map((d) => d.v));
  const span = max - min || 1;
  const stepX = width / (series.length - 1 || 1);
  const points = series.map((d, i) => `${(i * stepX).toFixed(1)},${(height - ((d.v - min) / span) * (height - 12) - 6).toFixed(1)}`).join(' ');
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} role="img" aria-label="추이 차트">
      <polyline fill="none" stroke="var(--c-primary)" strokeWidth="2" points={points} />
      {series.map((d, i) => (
        <circle key={i} cx={i * stepX} cy={height - ((d.v - min) / span) * (height - 12) - 6} r="3" fill="var(--c-primary)" />
      ))}
    </svg>
  );
}
