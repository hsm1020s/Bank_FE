import Modal from '../common/Modal';
import OtpField from '../auth/OtpField';
import RiskBadge from '../common/RiskBadge';

export default function OtpModal({ open, onClose, onVerify }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={<>OTP 인증 <RiskBadge level="L2" /></>}
      footer={
        <>
          <button onClick={onClose}>취소</button>
          <button className="primary" onClick={onVerify}>확인</button>
        </>
      }
    >
      <p>L2 위험도 작업 — OTP 6자리를 입력하세요.</p>
      <OtpField />
    </Modal>
  );
}
