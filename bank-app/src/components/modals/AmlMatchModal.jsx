import Modal from '../common/Modal';

export default function AmlMatchModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} title="⚠️ AML 매칭 안내">
      <p>본 거래의 수취인 정보가 제재 명단(SDN/EU/UN)에 부분 매칭되었습니다.</p>
      <ul>
        <li>매칭 점수: <strong>72%</strong> (임계 65% 이상)</li>
        <li>거래 보류 중 — 컴플라이언스 검토 진행</li>
        <li>예상 검토 시간: 영업일 기준 1~2일</li>
      </ul>
      <p className="muted">외부 IF 장애가 아닙니다. 검토 결과는 알림으로 통지됩니다.</p>
    </Modal>
  );
}
