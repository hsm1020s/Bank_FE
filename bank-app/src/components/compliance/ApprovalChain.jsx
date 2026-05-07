export default function ApprovalChain({ steps = ['창구 접수', '책임자 1차', '심사역 2차', '심사부 최종'] }) {
  return (
    <ol style={{ display: 'flex', listStyle: 'none', padding: 0, gap: 8, flexWrap: 'wrap' }}>
      {steps.map((s, i) => (
        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="badge">{i + 1}. {s}</span>
          {i < steps.length - 1 && <span className="muted">→</span>}
        </li>
      ))}
    </ol>
  );
}
