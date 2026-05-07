export default function TransactionRow({ tx, onMemoEdit }) {
  const sign = tx.amount >= 0 ? '+' : '';
  const color = tx.amount >= 0 ? 'var(--c-accent)' : 'var(--c-danger)';
  return (
    <tr style={{ borderBottom: '1px dashed var(--c-border)' }}>
      <td style={{ padding: '6px 4px', fontSize: 12, color: 'var(--c-text-dim)' }}>{tx.ts}</td>
      <td>{tx.kind}</td>
      <td style={{ textAlign: 'right', color, fontWeight: 600 }}>{sign}{tx.amount.toLocaleString()}</td>
      <td style={{ textAlign: 'right' }}>{tx.balance.toLocaleString()}</td>
      <td><code>{tx.counterparty}</code></td>
      <td>
        {tx.memo}
        {onMemoEdit && (
          <button style={{ marginLeft: 6 }} onClick={() => onMemoEdit(tx)}>수정</button>
        )}
      </td>
      <td className="muted">{tx.fee ? `수수료 ${tx.fee}` : ''}{tx.tax ? ` 세금 ${tx.tax}` : ''}</td>
    </tr>
  );
}
