import Modal from '../common/Modal';

export default function OcrFallbackModal({ open, onClose, onVideo, onVisit }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="OCR 인식 실패"
      footer={
        <>
          <button onClick={onClose}>다시 촬영</button>
          <button onClick={onVideo}>영상통화로 계속</button>
          <button className="primary" onClick={onVisit}>영업점 내방 예약</button>
        </>
      }
    >
      <p>신분증 자동 인식(OCR)이 실패했습니다. 아래 중 하나를 선택하세요.</p>
      <ul>
        <li>다시 촬영 — 빛 반사/그림자 제거 후 재시도</li>
        <li>영상통화 — 직원이 직접 신분증을 확인합니다 (대기 약 3~5분)</li>
        <li>영업점 내방 — 가까운 영업점에서 본인확인</li>
      </ul>
      <p className="muted">진위확인 외부 IF 장애 시 자동 라우팅(fail-close).</p>
    </Modal>
  );
}
