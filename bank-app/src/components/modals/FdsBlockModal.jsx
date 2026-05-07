import Modal from '../common/Modal';

export default function FdsBlockModal({ open, onClose, onContact }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="🛑 FDS 차단"
      footer={
        <>
          <button onClick={onClose}>닫기</button>
          <button className="primary" onClick={onContact}>고객센터 연결</button>
        </>
      }
    >
      <p>이상거래 탐지 시스템(FDS)이 본 거래를 차단했습니다.</p>
      <ul>
        <li>차단 ID: <code>FDS-2026-0507-882</code></li>
        <li>사유: 평소와 다른 시간대 + 신규 수취인 + 고액</li>
        <li>해제 방법: 고객센터 본인확인 또는 영업점 내방</li>
      </ul>
      <p className="muted">시스템 장애로 인한 차단이 아닙니다. 본인의 안전을 위한 보호 조치입니다.</p>
    </Modal>
  );
}
