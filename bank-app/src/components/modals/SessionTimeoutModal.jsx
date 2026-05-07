import { useEffect, useState } from 'react';
import Modal from '../common/Modal';

function fmt(sec) {
  const m = String(Math.floor(sec / 60)).padStart(2, '0');
  const s = String(sec % 60).padStart(2, '0');
  return `${m}:${s}`;
}

function Body({ onClose, onContinue, initialSeconds }) {
  const [sec, setSec] = useState(initialSeconds);
  useEffect(() => {
    const id = setInterval(() => setSec((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <Modal
      open
      onClose={onClose}
      title="세션 만료 임박"
      footer={
        <>
          <button onClick={onClose}>로그아웃</button>
          <button className="primary" onClick={onContinue}>계속 사용</button>
        </>
      }
    >
      <p>
        <strong>{fmt(sec)}</strong> 후 자동으로 로그아웃됩니다. (서버 권위 세션)
      </p>
      <p className="muted">
        절대 4시간 / 비활성 10분 정책 — 거래 중 동시접속은 거부됩니다.
      </p>
    </Modal>
  );
}

export default function SessionTimeoutModal({ open, onClose, onContinue, initialSeconds = 60 }) {
  if (!open) return null;
  return <Body onClose={onClose} onContinue={onContinue} initialSeconds={initialSeconds} />;
}
