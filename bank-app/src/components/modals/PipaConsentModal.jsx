import { useState } from 'react';
import Modal from '../common/Modal';

const ITEMS = [
  { key: 'mkt', label: '마케팅 활용', required: false },
  { key: 'voice', label: '음성/녹취 보관', required: false },
  { key: 'auto', label: 'AI 자동결정 거부', required: false, defaultChecked: true },
  { key: 'credit', label: '신용정보 조회/제공', required: true },
];

export default function PipaConsentModal({ open, onClose, onSubmit }) {
  const [state, setState] = useState(() =>
    Object.fromEntries(ITEMS.map((i) => [i.key, i.required || !!i.defaultChecked]))
  );
  const allRequired = ITEMS.filter((i) => i.required).every((i) => state[i.key]);
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="개인정보 동의 (PIPA)"
      footer={
        <>
          <button onClick={onClose}>취소</button>
          <button className="primary" disabled={!allRequired} onClick={() => { onSubmit?.(state); onClose?.(); }}>제출</button>
        </>
      }
    >
      <p className="muted">필수 항목은 거부할 수 없습니다. 선택 항목은 거부 가능하며 거부 시 일부 서비스가 제한됩니다.</p>
      {ITEMS.map((it) => (
        <div key={it.key} className="consent-line">
          <input
            type="checkbox"
            id={`pipa-${it.key}`}
            checked={state[it.key]}
            disabled={it.required}
            onChange={(e) => setState({ ...state, [it.key]: e.target.checked })}
          />
          <label htmlFor={`pipa-${it.key}`} style={{ flex: 1 }}>
            <strong>{it.label}</strong>
            {it.required && <span className="badge l4" style={{ marginLeft: 8 }}>필수</span>}
            {!it.required && <span className="badge" style={{ marginLeft: 8 }}>선택</span>}
          </label>
        </div>
      ))}
    </Modal>
  );
}
