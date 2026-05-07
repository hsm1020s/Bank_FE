export default function Tabs({ tabs, current, onChange }) {
  return (
    <div className="row" style={{ flexWrap: 'wrap', gap: 4, borderBottom: '1px solid var(--c-border)' }}>
      {tabs.map((t) => (
        <button
          key={t.key}
          onClick={() => onChange(t.key)}
          style={{
            border: 0,
            background: 'transparent',
            padding: '8px 16px',
            borderBottom: current === t.key ? '2px solid var(--c-primary)' : '2px solid transparent',
            color: current === t.key ? 'var(--c-primary)' : 'var(--c-text-dim)',
            fontWeight: current === t.key ? 600 : 400,
          }}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
