import { useState } from 'react';
import DeviceRegistrationModal from '../../components/modals/DeviceRegistrationModal';

export default function AuthMethodsPage() {
  const [devOpen, setDevOpen] = useState(false);
  return (
    <div className="col" style={{ gap: 16 }}>
      <h1>인증수단 관리</h1>
      <div className="card">
        <h2>등록된 인증수단</h2>
        <ul>
          <li>비밀번호 — 마지막 변경 2025-11-04</li>
          <li>OTP — Google Authenticator (등록됨)</li>
          <li>안면인식 — 미등록</li>
          <li>디바이스 — 1대 등록 (Mac/Safari 26)</li>
        </ul>
        <button onClick={() => setDevOpen(true)}>이 디바이스 추가 등록</button>
      </div>
      <DeviceRegistrationModal open={devOpen} onClose={() => setDevOpen(false)} onRegister={() => setDevOpen(false)} />
    </div>
  );
}
