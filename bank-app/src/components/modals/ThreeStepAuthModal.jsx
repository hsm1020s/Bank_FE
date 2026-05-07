import { useState } from 'react';
import Modal from '../common/Modal';
import OtpField from '../auth/OtpField';
import PasswordField from '../auth/PasswordField';
import RiskBadge from '../common/RiskBadge';

export default function ThreeStepAuthModal({ open, onClose, onVerify }) {
  const [step, setStep] = useState(0);
  const next = () => setStep((s) => s + 1);
  const reset = () => { setStep(0); onClose?.(); };
  return (
    <Modal
      open={open}
      onClose={reset}
      title={<>3단계 인증 <RiskBadge level="L3" /></>}
      footer={
        step < 2 ? (
          <>
            <button onClick={reset}>취소</button>
            <button className="primary" onClick={next}>다음</button>
          </>
        ) : (
          <>
            <button onClick={reset}>취소</button>
            <button className="primary" onClick={() => { onVerify?.(); reset(); }}>완료</button>
          </>
        )
      }
    >
      <p className="muted">단계 {step + 1} / 3</p>
      {step === 0 && <PasswordField label="① 로그인 비밀번호" />}
      {step === 1 && (
        <div>
          <p className="muted">② OTP</p>
          <OtpField />
        </div>
      )}
      {step === 2 && (
        <div>
          <p className="muted">③ 안면확인</p>
          <div className="card" style={{ background: '#1c2330', color: '#aaa', textAlign: 'center', height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            카메라 시뮬레이션 — 정면 응시
          </div>
        </div>
      )}
    </Modal>
  );
}
