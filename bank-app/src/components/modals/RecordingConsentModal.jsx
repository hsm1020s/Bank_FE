import { useState } from 'react';
import Modal from '../common/Modal';

export default function RecordingConsentModal({ open, onClose, onConsent }) {
  const [agree, setAgree] = useState(false);
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="음성 녹취 동의"
      footer={
        <>
          <button onClick={onClose}>거부</button>
          <button className="primary" disabled={!agree} onClick={() => { onConsent?.(); onClose?.(); }}>동의</button>
        </>
      }
    >
      <p>본 통화/상담은 품질 향상 및 분쟁 대응을 위해 녹취됩니다 (PIPA — 음성정보).</p>
      <ul>
        <li>보관 기간: 5년 (분쟁 시까지 연장)</li>
        <li>접근 권한: 감사부, 분쟁 처리 담당</li>
        <li>거부 시 — 일부 비대면 절차가 제한될 수 있습니다.</li>
      </ul>
      <label style={{ display: 'flex', gap: 8 }}>
        <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
        <span>위 내용에 동의하며 녹취 시작에 동의합니다.</span>
      </label>
    </Modal>
  );
}
