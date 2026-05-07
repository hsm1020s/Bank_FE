import Modal from '../common/Modal';

export default function DeviceRegistrationModal({ open, onClose, onRegister }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="디바이스 등록"
      footer={
        <>
          <button onClick={onClose}>나중에</button>
          <button className="primary" onClick={onRegister}>이 디바이스 등록</button>
        </>
      }
    >
      <p>이 기기를 신뢰 디바이스로 등록하시겠습니까?</p>
      <ul>
        <li>UA: <code>Mac/Safari 26</code></li>
        <li>IP: <code>192.0.2.42</code> (한국)</li>
        <li>최초 접속: 2026-05-07 09:12</li>
      </ul>
      <p className="muted">등록된 디바이스에서는 일부 거래의 추가 인증이 생략됩니다.</p>
    </Modal>
  );
}
