export default function WorklistTable({ columns, rows, onRowClick, selectable = false, selected = [], onToggle }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--c-border)', textAlign: 'left', background: '#fafbfd' }}>
            {selectable && <th style={{ width: 24 }} />}
            {columns.map((c) => <th key={c.key} style={{ padding: '6px 8px' }}>{c.label}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr
              key={r.id}
              style={{ borderBottom: '1px dashed var(--c-border)', cursor: onRowClick ? 'pointer' : 'default' }}
              onClick={() => onRowClick?.(r)}
            >
              {selectable && (
                <td onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={selected.includes(r.id)}
                    onChange={() => onToggle?.(r.id)}
                  />
                </td>
              )}
              {columns.map((c) => (
                <td key={c.key} style={{ padding: '6px 8px' }}>
                  {c.render ? c.render(r) : r[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
