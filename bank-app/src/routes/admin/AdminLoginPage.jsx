import PasswordField from '../../components/auth/PasswordField';
import OtpField from '../../components/auth/OtpField';
import NetworkZoneBadge from '../../components/common/NetworkZoneBadge';

export default function AdminLoginPage() {
  return (
    <div style={{ maxWidth: 400, margin: '40px auto' }}>
      <div className="card">
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <h1 style={{ margin: 0 }}>직원 로그인</h1>
          <NetworkZoneBadge zone="business" />
        </div>
        <p className="muted">업무망에서만 접속 가능. SSO 또는 사번+비밀번호+OTP 3요소.</p>
        <form className="col" onSubmit={(e) => { e.preventDefault(); alert('서버 권위 인증 (시연)'); }}>
          <label className="col" style={{ gap: 4 }}>
            <span className="muted">사번</span>
            <input autoComplete="username" />
          </label>
          <PasswordField />
          <label className="col" style={{ gap: 4 }}>
            <span className="muted">OTP</span>
            <OtpField />
          </label>
          <button className="primary" type="submit">로그인</button>
        </form>
        <p className="muted" style={{ marginTop: 8 }}>
          망 분리 — /admin/* 은 업무망 호스트 전용. 운영망(/admin/ops/*)·감사망(/audit/*)은 별도 호스트.
        </p>
      </div>
    </div>
  );
}
