export default function Stepper({ steps = [], current = 0 }) {
  return (
    <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
      {steps.map((s, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li
            key={i}
            style={{
              padding: '6px 12px',
              borderRadius: 999,
              fontSize: 12,
              border: '1px solid var(--c-border)',
              background: active ? 'var(--c-primary)' : done ? '#e6f3ea' : '#fff',
              color: active ? '#fff' : done ? 'var(--c-accent)' : 'var(--c-text-dim)',
              fontWeight: active ? 600 : 400,
            }}
          >
            {done ? '✓' : i + 1}. {s}
          </li>
        );
      })}
    </ol>
  );
}
