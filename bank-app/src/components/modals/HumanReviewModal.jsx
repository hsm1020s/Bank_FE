import { useState } from 'react';
import Modal from '../common/Modal';
import RiskBadge from '../common/RiskBadge';

export default function HumanReviewModal({ open, onClose, onSubmit }) {
  const [memo, setMemo] = useState('');
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={<>사람 검토 요청 <RiskBadge level="L4" /></>}
      footer={
        <>
          <button onClick={onClose}>취소</button>
          <button className="primary" onClick={() => { onSubmit?.(memo); onClose?.(); }}>요청</button>
        </>
      }
    >
      <p>L4 — 자동 실행이 금지된 작업입니다. 결재 라우팅으로 이관합니다.</p>
      <label className="col" style={{ gap: 4 }}>
        <span className="muted">사유 / 메모</span>
        <textarea rows={4} value={memo} onChange={(e) => setMemo(e.target.value)} placeholder="예: 신용평가 자동결정 거부, 사람 심사 필요" />
      </label>
      <p className="muted" style={{ marginTop: 8 }}>
        결재선: 창구 → 책임자 → 심사역 → 심사부 (자동 산출, 친족/이해관계자 자동 제외)
      </p>
    </Modal>
  );
}
