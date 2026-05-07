import { useState } from 'react';
import { Link } from 'react-router-dom';
import PasswordField from '../../components/auth/PasswordField';

export default function LoginPage() {
  const [id, setId] = useState('');
  return (
    <div style={{ maxWidth: 360, margin: '40px auto' }}>
      <div className="card">
        <h1>로그인</h1>
        <form className="col" onSubmit={(e) => { e.preventDefault(); alert('인증 모달 트리거 (시연용)'); }}>
          <label className="col" style={{ gap: 4 }}>
            <span className="muted">아이디</span>
            <input value={id} onChange={(e) => setId(e.target.value)} autoComplete="username" />
          </label>
          <PasswordField />
          <button className="primary" type="submit">로그인</button>
        </form>
        <p className="muted" style={{ marginTop: 12 }}>
          <Link to="/signup">회원가입</Link> · <Link to="/auth/methods">인증수단 관리</Link>
        </p>
        <p className="muted" style={{ marginTop: 8 }}>
          서버 권위 세션 — 절대 4시간 / 비활성 10분 / 거래 중 동시접속 거부.
        </p>
      </div>
    </div>
  );
}
