import { Link } from 'react-router-dom';

function Frame({ code, title, message, actions }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--c-bg)' }}>
      <div className="card" style={{ maxWidth: 480, textAlign: 'center' }}>
        <div style={{ fontSize: 56, fontWeight: 700, color: 'var(--c-primary)' }}>{code}</div>
        <h1>{title}</h1>
        <p className="muted">{message}</p>
        <div className="row" style={{ justifyContent: 'center', marginTop: 16 }}>
          {actions}
        </div>
      </div>
    </div>
  );
}

export const NotFoundPage = () => (
  <Frame
    code="404"
    title="페이지를 찾을 수 없습니다"
    message="요청한 경로가 사이트맵에 정의되어 있지 않습니다."
    actions={<Link to="/"><button className="primary">홈으로</button></Link>}
  />
);

export const ForbiddenPage = () => (
  <Frame
    code="403"
    title="접근 권한이 없습니다"
    message="이 화면은 본인의 RBAC 역할 또는 망(zone)에서 접근할 수 없습니다."
    actions={<Link to="/"><button>홈으로</button></Link>}
  />
);

export const ServerErrorPage = () => (
  <Frame
    code="500"
    title="서비스 오류"
    message="일시적인 서비스 오류가 발생했습니다. 잠시 후 다시 시도해주세요. (사고 ID는 감사로그에 자동 기록됩니다)"
    actions={<button onClick={() => window.location.reload()}>다시 시도</button>}
  />
);

export const MaintenancePage = () => (
  <Frame
    code="🛠"
    title="점검 중"
    message="시스템 점검 중입니다. 점검 시간은 운영 콘솔의 공지사항을 확인해주세요."
    actions={<button disabled>점검 중</button>}
  />
);

export const PartialOutagePage = () => (
  <Frame
    code="⚠️"
    title="부분 장애"
    message="일부 외부 인터페이스(FDS/AML/OCR/진위확인) 가용성이 저하되었습니다. fail-close 정책에 따라 해당 거래는 일시 차단됩니다. 비상 fail-open이 필요하면 운영 책임자가 6시간 이내 한정 승인합니다."
    actions={<Link to="/"><button>홈으로</button></Link>}
  />
);
