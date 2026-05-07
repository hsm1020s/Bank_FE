import NetworkZoneBadge from '../../components/common/NetworkZoneBadge';

function Stub({ title, zone = 'business', children }) {
  return (
    <div className="col" style={{ gap: 16 }}>
      <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0 }}>{title}</h1>
        <NetworkZoneBadge zone={zone} />
      </div>
      {children}
      <p className="muted">※ 본 화면은 페이즈2~5 직원 핵심에서 본격 구현됩니다.</p>
    </div>
  );
}

export const AdminCustomerSearch = () => (
  <Stub title="고객 검색">
    <div className="card">
      <input style={{ width: '100%' }} placeholder="고객명/주민번호/계좌/연락처…" />
      <p className="muted" style={{ marginTop: 8 }}>마스킹 default. 풀기 시 OTP + 사유 + 30초 자동 재마스킹.</p>
    </div>
  </Stub>
);

export const AdminApprovalsPage = () => (
  <Stub title="결재함 (미처리 7)">
    <div className="card">
      <ul>
        <li>2026-05-07 09:11 — 한도상향 1억 / 신청자 hongkd / <span className="badge l2">L2</span></li>
        <li>2026-05-07 08:45 — 마스킹 풀기 사후승인 / 상담사 kim / <span className="badge l3">L3</span></li>
        <li>2026-05-07 08:02 — AI 자동결정 거부 → 사람 심사 / <span className="badge l4">L4</span></li>
      </ul>
    </div>
  </Stub>
);

export const AdminOpsPage = () => (
  <Stub title="운영 콘솔" zone="ops">
    <div className="card">
      <p>배포·회수, 기능 플래그, 점검 모드 진입 등 운영망 전용 화면.</p>
      <p className="muted">감사망에서는 읽기 전용으로 미러링됩니다.</p>
    </div>
  </Stub>
);

export const AuditPage = () => (
  <Stub title="감사 대시보드" zone="audit">
    <div className="card">
      <p>모든 감사로그의 단일 권위 뷰. 검색·내보내기는 감사망 호스트 전용.</p>
      <p className="muted">FE 텔레메트리는 별도 저장소에 보관 (감사로그와 혼합 금지).</p>
    </div>
  </Stub>
);
