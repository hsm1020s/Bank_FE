import { useEffect, useState } from 'react';

export default function UndoButton({ seconds = 30, onUndo, onExpire }) {
  const [remain, setRemain] = useState(seconds);
  useEffect(() => {
    if (remain <= 0) { onExpire?.(); return; }
    const id = setTimeout(() => setRemain((r) => r - 1), 1000);
    return () => clearTimeout(id);
  }, [remain, onExpire]);
  if (remain <= 0) return <span className="muted">Undo 만료</span>;
  return (
    <button type="button" onClick={onUndo} title="30초 내 되돌리기">
      ⤺ 되돌리기 ({remain}s)
    </button>
  );
}
