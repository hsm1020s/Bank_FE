import Modal from '../common/Modal';
import OtpField from '../auth/OtpField';

export default function AuthStepUpModal({ open, onClose, onComplete, from = 2, to = 3 }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`인증 승급 (${from}단계 → ${to}단계)`}
      footer={
        <>
          <button onClick={onClose}>취소</button>
          <button className="primary" onClick={onComplete}>인증 완료</button>
        </>
      }
    >
      <p>이 작업은 추가 인증이 필요합니다. 등록된 OTP를 입력하세요.</p>
      <OtpField />
      <p className="muted" style={{ marginTop: 12 }}>3단계 — 비밀번호 + OTP + 디바이스 등록 + 안면확인 중 1택</p>
    </Modal>
  );
}
