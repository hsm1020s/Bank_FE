export default function DataTable({ columns, data, rowKey = 'id', rowClassName, onRowClick, emptyMessage = '검색 결과가 없습니다.' }) {
  return (
    <>
      <table className={`data-table${onRowClick ? ' clickable' : ''}`}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={typeof rowKey === 'function' ? rowKey(row) : row[rowKey]}
              className={rowClassName?.(row) || ''}
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((col) => (
                <td key={col.key} className={col.className || ''}>
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <div className="empty-state">{emptyMessage}</div>
      )}
    </>
  );
}
