import { useRef, useState } from 'react';
import Modal from '../common/Modal';

const SAMPLE = Array.from({ length: 30 }, (_, i) =>
  `제${i + 1}조. 본 약관은 코어뱅킹 서비스 이용에 관한 일반 사항을 정함을 목적으로 합니다. 이용자는 약관의 모든 내용을 충분히 확인한 뒤 동의해야 하며, 미동의 시 거래가 제한될 수 있습니다.`
);

export default function TermsScrollModal({ open, onClose, onAgree }) {
  const ref = useRef(null);
  const [reachedEnd, setReachedEnd] = useState(false);
  const onScroll = (e) => {
    const el = e.currentTarget;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 4) setReachedEnd(true);
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="약관 동의 (스크롤 강제)"
      footer={
        <>
          <button onClick={onClose}>취소</button>
          <button className="primary" disabled={!reachedEnd} onClick={() => { onAgree?.(); onClose?.(); }}>
            {reachedEnd ? '동의' : '끝까지 읽어주세요'}
          </button>
        </>
      }
    >
      <div className="terms-box" ref={ref} onScroll={onScroll}>
        {SAMPLE.map((p, i) => <p key={i}>{p}</p>)}
      </div>
      <p className="muted" style={{ marginTop: 8 }}>약관 끝까지 스크롤한 후에만 동의 버튼이 활성화됩니다.</p>
    </Modal>
  );
}
