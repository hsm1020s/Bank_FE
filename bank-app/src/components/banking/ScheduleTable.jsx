export default function ScheduleTable({ rows = [], compact = false }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--c-border)', textAlign: 'right', background: '#fafbfd' }}>
            <th style={{ textAlign: 'center' }}>회차</th>
            <th style={{ textAlign: 'center' }}>예정일</th>
            <th>원금</th>
            <th>이자</th>
            <th>월상환</th>
            <th>잔액</th>
            <th style={{ textAlign: 'center' }}>상태</th>
            {!compact && <th style={{ textAlign: 'center' }}>납부일</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.no} style={{ borderBottom: '1px dashed var(--c-border)', textAlign: 'right' }}>
              <td style={{ textAlign: 'center' }}>{r.no}</td>
              <td style={{ textAlign: 'center' }}>{r.dueDate}</td>
              <td>{r.principal.toLocaleString()}</td>
              <td>{r.interest.toLocaleString()}</td>
              <td><strong>{r.total.toLocaleString()}</strong></td>
              <td>{r.balance.toLocaleString()}</td>
              <td style={{ textAlign: 'center' }}>
                <span className={`badge ${r.status === '완납' ? 'l1' : r.status === '연체' ? 'l4' : ''}`}>{r.status}</span>
              </td>
              {!compact && <td style={{ textAlign: 'center', color: 'var(--c-text-dim)' }}>{r.paidAt || '-'}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
