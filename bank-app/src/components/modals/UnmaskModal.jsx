import { useEffect, useState } from 'react';
import Modal from '../common/Modal';
import OtpField from '../auth/OtpField';

const REASONS = [
  '본인확인 — 동의 받음',
  '서류 검증 — 영업점 내방',
  '감사/조사 — 감사부 요청',
  '오류 정정 — 결재 라우팅',
];

function Body({ onClose }) {
  const [reason, setReason] = useState(REASONS[0]);
  const [openedAt, setOpenedAt] = useState(null);
  const [remain, setRemain] = useState(30);

  useEffect(() => {
    if (openedAt === null) return;
    if (remain <= 0) return;
    const id = setTimeout(() => setRemain((r) => r - 1), 1000);
    return () => clearTimeout(id);
  }, [openedAt, remain]);

  const unmasked = openedAt !== null && remain > 0;

  return (
    <Modal
      open
      onClose={onClose}
      title="마스킹 풀기"
      footer={
        unmasked ? (
          <button onClick={onClose}>닫기</button>
        ) : (
          <>
            <button onClick={onClose}>취소</button>
            <button
              className="primary"
              onClick={() => { setRemain(30); setOpenedAt(Date.now()); }}
            >
              풀기
            </button>
          </>
        )
      }
    >
      {!unmasked ? (
        <>
          <label className="col" style={{ gap: 4 }}>
            <span className="muted">사유</span>
            <select value={reason} onChange={(e) => setReason(e.target.value)}>
              {REASONS.map((r) => <option key={r}>{r}</option>)}
            </select>
          </label>
          <label className="col" style={{ gap: 4, marginTop: 12 }}>
            <span className="muted">OTP</span>
            <OtpField />
          </label>
          <p className="muted" style={{ marginTop: 12 }}>
            풀기 시 30초 후 자동 재마스킹됩니다. 모든 풀기 이벤트는 감사로그에 기록됩니다.
          </p>
        </>
      ) : (
        <>
          <p>주민등록번호: <code>881212-1******</code></p>
          <p className="muted">남은 노출 시간: <strong>{remain}s</strong></p>
        </>
      )}
    </Modal>
  );
}

export default function UnmaskModal({ open, onClose }) {
  if (!open) return null;
  return <Body onClose={onClose} />;
}
