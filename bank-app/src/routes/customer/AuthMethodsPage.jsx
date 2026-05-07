import { useState } from 'react';
import DeviceRegistrationModal from '../../components/modals/DeviceRegistrationModal';

const METHODS = [
  { kind: '비밀번호', registered: true, expires: '2026-11-04', state: 'D-180 (정상)' },
  { kind: 'OTP (TOTP)', registered: true, expires: '2026-08-12', state: 'D-97 (정상)' },
  { kind: '공동인증서', registered: true, expires: '2026-06-08', state: 'D-32 (D-30 알림 발송됨)' },
  { kind: '금융인증서', registered: false, expires: null, state: '미등록' },
  { kind: '생체 (Face/Touch)', registered: true, expires: null, state: '디바이스 키체인' },
  { kind: '간편 PIN', registered: true, expires: null, state: '6자리 등록' },
];

export default function AuthMethodsPage() {
  const [devOpen, setDevOpen] = useState(false);
  return (
    <div className="col" style={{ gap: 16 }}>
      <h1>인증수단 등록·관리</h1>

      <section className="card">
        <h2>등록 현황</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--c-border)', textAlign: 'left' }}>
              <th>인증수단</th><th>등록</th><th>만료</th><th>상태</th><th></th>
            </tr>
          </thead>
          <tbody>
            {METHODS.map((m) => (
              <tr key={m.kind} style={{ borderBottom: '1px dashed var(--c-border)' }}>
                <td>{m.kind}</td>
                <td>{m.registered ? <span className="badge l1">등록</span> : <span className="badge">미등록</span>}</td>
                <td>{m.expires || '-'}</td>
                <td>{m.state}</td>
                <td>
                  {m.registered ? (
                    <>
                      <button>갱신</button>
                      <button style={{ marginLeft: 4 }} className="danger">해제</button>
                    </>
                  ) : (
                    <button>등록</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="card">
        <h2>만료 알림 정책</h2>
        <ul>
          <li>D-30: 이메일 + SMS</li>
          <li>D-7: SMS + Push</li>
          <li>D-1: SMS + Push + 배너</li>
          <li>D-day: 강제 갱신 모달 + 만료 후 사용 차단</li>
        </ul>
        <p className="muted">SMS 실패 시 Push + 이메일 + 배너 다중 채널로 자동 전환. CRL/OCSP 실시간 폐기 검증.</p>
      </section>

      <section className="card">
        <h2>디바이스 (1대 등록)</h2>
        <button onClick={() => setDevOpen(true)}>이 디바이스 추가 등록</button>
      </section>

      <DeviceRegistrationModal open={devOpen} onClose={() => setDevOpen(false)} onRegister={() => setDevOpen(false)} />
    </div>
  );
}
