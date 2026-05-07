import { useState } from 'react';
import { Link } from 'react-router-dom';
import PasswordField from '../../components/auth/PasswordField';
import OtpField from '../../components/auth/OtpField';
import Modal from '../../components/common/Modal';
import FdsBlockModal from '../../components/modals/FdsBlockModal';

const TABS = [
  { key: 'idpw', label: 'ID/PW' },
  { key: 'pki',  label: '공동인증서' },
  { key: 'fpki', label: '금융인증서' },
  { key: 'easy', label: '간편 PIN' },
  { key: 'bio',  label: '생체' },
];

function VirtualKeypad() {
  const keys = ['7','8','9','4','5','6','1','2','3','←','0','✓'];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 4, marginTop: 8 }}>
      {keys.map((k) => (
        <button type="button" key={k} disabled style={{ height: 36 }}>{k}</button>
      ))}
    </div>
  );
}

export default function LoginPage() {
  const [tab, setTab] = useState('idpw');
  const [id, setId] = useState('');
  const [tries, setTries] = useState(0);
  const [lockOpen, setLockOpen] = useState(false);
  const [fdsOpen, setFdsOpen] = useState(false);
  const [dupOpen, setDupOpen] = useState(false);
  const [newDeviceOpen, setNewDeviceOpen] = useState(false);
  const locked = tries >= 5;

  const onSubmit = (e) => {
    e.preventDefault();
    if (locked) { setLockOpen(true); return; }
    setTries((t) => t + 1);
    alert('인증 (시연) — 서버 권위 세션 발급');
  };

  return (
    <div style={{ maxWidth: 420, margin: '32px auto' }}>
      <div className="card">
        <h1>로그인</h1>
        <div className="row" style={{ marginBottom: 12, flexWrap: 'wrap' }}>
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              className={tab === t.key ? 'primary' : ''}
              onClick={() => setTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <form className="col" onSubmit={onSubmit}>
          {tab === 'idpw' && (
            <>
              <label className="col" style={{ gap: 4 }}>
                <span className="muted">아이디</span>
                <input value={id} onChange={(e) => setId(e.target.value)} autoComplete="username" />
              </label>
              <PasswordField />
              <details>
                <summary className="muted">가상 보안 키패드 (시연)</summary>
                <VirtualKeypad />
              </details>
            </>
          )}
          {tab === 'pki' && (
            <div className="col">
              <p className="muted">공동인증서 — 인증서 비밀번호를 입력하세요.</p>
              <PasswordField label="인증서 비밀번호" name="pki-password" autoComplete="off" />
              <p className="muted">발급 인증기관: KISA / 만료: 2026-12-31</p>
            </div>
          )}
          {tab === 'fpki' && (
            <div className="col">
              <p className="muted">금융인증서 — 클라우드 인증서로 로그인합니다.</p>
              <PasswordField label="금융인증서 비밀번호" name="fpki-password" autoComplete="off" />
            </div>
          )}
          {tab === 'easy' && (
            <div className="col">
              <p className="muted">간편 PIN (6자리)</p>
              <OtpField length={6} />
            </div>
          )}
          {tab === 'bio' && (
            <div className="col">
              <p className="muted">생체 인증 — Face ID / Touch ID</p>
              <button type="button">📷 생체 인증 시작</button>
            </div>
          )}

          {tries > 0 && !locked && (
            <p className="muted" style={{ color: 'var(--c-warn)' }}>
              인증 실패 {tries}/5 — 5회 실패 시 30분 잠금
            </p>
          )}
          {locked && (
            <p className="muted" style={{ color: 'var(--c-danger)' }}>
              계정 잠금 — 30분 후 자동 해제
            </p>
          )}

          <button className="primary" type="submit" disabled={locked}>로그인</button>
        </form>

        <hr style={{ margin: '16px 0', borderColor: 'var(--c-border)' }} />
        <h3>보안 모달 시연</h3>
        <div className="row" style={{ flexWrap: 'wrap', gap: 4 }}>
          <button onClick={() => setLockOpen(true)}>5회 실패 잠금</button>
          <button onClick={() => setFdsOpen(true)}>FDS 차단</button>
          <button onClick={() => setDupOpen(true)}>동일 ID 동시접속</button>
          <button onClick={() => setNewDeviceOpen(true)}>새 기기 추가인증</button>
        </div>

        <p className="muted" style={{ marginTop: 12 }}>
          <Link to="/signup">회원가입</Link> · <Link to="/auth/methods">인증수단 관리</Link>
        </p>
        <p className="muted" style={{ marginTop: 4 }}>
          서버 권위 세션 — 절대 4시간 / 비활성 10분 / 거래 중 동시접속 거부.
        </p>
      </div>

      <Modal
        open={lockOpen}
        onClose={() => setLockOpen(false)}
        title="🔒 계정 잠금"
      >
        <p>비밀번호 5회 오류 — 30분 후 자동 해제됩니다.</p>
        <p className="muted">긴급한 경우 영업점 본인확인 후 즉시 해제 가능합니다.</p>
      </Modal>

      <FdsBlockModal open={fdsOpen} onClose={() => setFdsOpen(false)} onContact={() => setFdsOpen(false)} />

      <Modal
        open={dupOpen}
        onClose={() => setDupOpen(false)}
        title="동일 ID 동시 접속 감지"
        footer={
          <>
            <button onClick={() => setDupOpen(false)}>다른 세션 종료</button>
            <button className="primary" onClick={() => setDupOpen(false)}>이 세션 종료</button>
          </>
        }
      >
        <p>현재 다른 디바이스에서 로그인 세션이 활성화되어 있습니다.</p>
        <ul>
          <li>디바이스: Windows / Chrome 130</li>
          <li>위치: 서울 강남 (192.0.2.7)</li>
          <li>거래 중에는 자동 거부 처리됩니다.</li>
        </ul>
      </Modal>

      <Modal
        open={newDeviceOpen}
        onClose={() => setNewDeviceOpen(false)}
        title="새 기기 추가 인증"
        footer={
          <>
            <button onClick={() => setNewDeviceOpen(false)}>취소</button>
            <button className="primary" onClick={() => setNewDeviceOpen(false)}>OTP 인증</button>
          </>
        }
      >
        <p>등록되지 않은 기기로 접속 — 추가 인증이 필요합니다.</p>
        <OtpField />
      </Modal>
    </div>
  );
}
