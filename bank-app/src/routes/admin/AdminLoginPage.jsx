import { useState } from 'react';
import PasswordField from '../../components/auth/PasswordField';
import OtpField from '../../components/auth/OtpField';
import NetworkZoneBadge from '../../components/common/NetworkZoneBadge';
import Modal from '../../components/common/Modal';

export default function AdminLoginPage() {
  const [blocked, setBlocked] = useState(false);
  const [bcp, setBcp] = useState(false);
  const [dup, setDup] = useState(false);

  return (
    <div style={{ maxWidth: 460, margin: '40px auto' }}>
      <div className="card">
        <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ margin: 0 }}>직원 로그인 (EMP-001)</h1>
          <NetworkZoneBadge zone="business" />
        </div>
        <p className="muted">접속 망 자동 판별. 신규 IP/MAC은 차단 페이지로 이동 (등록 폼 미노출).</p>

        <form className="col" onSubmit={(e) => { e.preventDefault(); alert('서버 권위 인증 (시연)'); }}>
          <label className="col" style={{ gap: 4 }}>
            <span className="muted">사번</span>
            <input autoComplete="username" defaultValue="kim_emp_03" />
          </label>
          <PasswordField />
          <label className="muted">PKI 인증서
            <select><option>kim_emp_03 (만료 D-32)</option></select>
          </label>
          <label className="col" style={{ gap: 4 }}>
            <span className="muted">OTP</span>
            <OtpField />
          </label>
          <button className="primary" type="submit">로그인</button>
        </form>

        <hr style={{ margin: '16px 0', borderColor: 'var(--c-border)' }} />
        <h3>보안 모달 시연</h3>
        <div className="row" style={{ flexWrap: 'wrap', gap: 4 }}>
          <button onClick={() => setBlocked(true)}>신규 IP/MAC 차단</button>
          <button onClick={() => setDup(true)}>동시 접속 인플라이트</button>
          <button onClick={() => setBcp(true)}>BCP 대안 인증</button>
        </div>
      </div>

      <Modal open={blocked} onClose={() => setBlocked(false)} title="🛑 신규 IP/MAC 차단">
        <p>등록되지 않은 네트워크 위치에서 접속 시도가 감지되었습니다.</p>
        <p className="muted">로그인 차단 + 정보보안팀 자동 알림. 등록 폼은 노출되지 않습니다.</p>
      </Modal>

      <Modal
        open={dup}
        onClose={() => setDup(false)}
        title="동시 접속 — 인플라이트 거래 확인"
        footer={
          <>
            <button onClick={() => setDup(false)}>취소</button>
            <button className="primary" onClick={() => setDup(false)}>인플라이트 정리 후 새 세션</button>
          </>
        }
      >
        <p>다른 단말에서 활성 세션이 있습니다. 처리 중인 거래에 대한 결정이 필요합니다:</p>
        <ul>
          <li>거래 A — 결재 대기 → 재할당</li>
          <li>거래 B — 진행 중 입력 → 폐기</li>
        </ul>
      </Modal>

      <Modal open={bcp} onClose={() => setBcp(false)} title="BCP 대안 인증 (24h 한시 토큰)">
        <p>OTP/PKI 가용성 장애 시 24h 한시 토큰 + 영상통화 본인확인으로 대체합니다 (상시 사용 금지).</p>
      </Modal>
    </div>
  );
}
