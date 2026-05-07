import Modal from '../common/Modal';

export default function EmergencyLogoutModal({ open, onClose, onConfirm }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="🚨 비상 로그아웃"
      footer={
        <>
          <button onClick={onClose}>취소</button>
          <button className="danger" onClick={onConfirm}>모든 세션 강제 종료</button>
        </>
      }
    >
      <p>이 디바이스의 모든 활성 세션을 즉시 종료하고, 등록 디바이스에서도 로그아웃합니다.</p>
      <ul>
        <li>진행 중인 거래는 서버에서 즉시 보류 처리</li>
        <li>다음 로그인 시 추가 본인확인 필요</li>
        <li>이 작업은 감사로그에 영구 기록됩니다 (감사망)</li>
      </ul>
    </Modal>
  );
}
