import { useEffect, useState } from 'react';

function fmt(sec) {
  const m = String(Math.floor(sec / 60)).padStart(2, '0');
  const s = String(sec % 60).padStart(2, '0');
  return `${m}:${s}`;
}

export default function SessionIndicator({ initialSeconds = 60 * 9 + 32 }) {
  const [sec, setSec] = useState(initialSeconds);
  useEffect(() => {
    const id = setInterval(() => setSec((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, []);
  const cls = sec < 60 ? 'session-indicator danger' : sec < 180 ? 'session-indicator warn' : 'session-indicator';
  const label = sec < 60 ? '세션 곧 만료' : sec < 180 ? '세션 만료 임박' : '세션 정상';
  return (
    <span className={cls} aria-live="polite">
      <span aria-hidden>{sec < 60 ? '⛔' : sec < 180 ? '⚠️' : '✅'}</span>
      <span>{label} · {fmt(sec)}</span>
    </span>
  );
}
