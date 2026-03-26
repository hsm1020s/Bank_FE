export default function StatCard({ label, value, growth, color, badge, className = '' }) {
  return (
    <div className="stat-card">
      <div className="stat-card-header">
        <span className="stat-label">{label}</span>
        {growth !== undefined && (
          <span className={`stat-growth ${growth >= 0 ? 'positive' : 'negative'}`}>
            {growth >= 0 ? '+' : ''}{growth}%
          </span>
        )}
        {badge && <span className={`stat-badge ${badge.variant || ''}`}>{badge.text}</span>}
      </div>
      <div className={`stat-value ${className}`}>{value}</div>
      {growth !== undefined && color && (
        <div className="stat-bar">
          <div
            className="stat-bar-fill"
            style={{ width: `${Math.min(Math.abs(growth) * 5, 100)}%`, background: color }}
          />
        </div>
      )}
    </div>
  );
}

export function StatCards({ items, small }) {
  return (
    <div className={`stat-cards${small ? ' small' : ''}`}>
      {items.map((item) => (
        <StatCard key={item.label} {...item} />
      ))}
    </div>
  );
}
