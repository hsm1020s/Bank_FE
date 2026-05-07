import { useState } from 'react';
import { consentMatrix, userDevices, consentHistory } from '../../data/mockData';
import Tabs from '../../components/admin/Tabs';
import OtpModal from '../../components/modals/OtpModal';
import Modal from '../../components/common/Modal';

const TABS = [
  { key: 'basic', label: '기본정보' },
  { key: 'contact', label: '연락처' },
  { key: 'mkt', label: '마케팅 동의' },
  { key: 'use', label: '정보활용' },
  { key: 'terms', label: '약관' },
  { key: 'auto', label: '자동결정' },
  { key: 'devices', label: '기기' },
];

export default function ProfilePage() {
  const [tab, setTab] = useState('basic');
  const [matrix, setMatrix] = useState(consentMatrix);
  const [otpOpen, setOtpOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(null); // key
  const [autoChange, setAutoChange] = useState(false);
  const [deviceOpen, setDeviceOpen] = useState(false);

  const toggle = (key) => {
    const item = matrix.find((m) => m.key === key);
    if (item.value) {
      setWithdrawOpen(key);
    } else {
      setMatrix(matrix.map((m) => m.key === key ? { ...m, value: true } : m));
    }
  };

  const confirmWithdraw = () => {
    setMatrix(matrix.map((m) => m.key === withdrawOpen ? { ...m, value: false } : m));
    setWithdrawOpen(null);
  };

  return (
    <div className="col" style={{ gap: 16 }}>
      <h1>내정보 — 개인정보·약관·동의 관리</h1>
      <Tabs tabs={TABS} current={tab} onChange={setTab} />

      {tab === 'basic' && (
        <section className="card">
          <h2>기본 정보</h2>
          <ul>
            <li>이름: 홍길동</li>
            <li>주민등록번호: 881212-1****** <button onClick={() => setOtpOpen(true)}>변경 (OTP)</button></li>
            <li>가입일: 2018-03-12</li>
          </ul>
        </section>
      )}

      {tab === 'contact' && (
        <section className="card">
          <h2>연락처</h2>
          <p className="muted">휴대폰/주소 변경 시 OTP + ARS 인증이 강제됩니다.</p>
          <ul>
            <li>휴대폰: 010-****-1234 <button onClick={() => setOtpOpen(true)}>변경</button></li>
            <li>이메일: hong@example.com <button onClick={() => setOtpOpen(true)}>변경</button></li>
            <li>주소: 서울특별시 강남구 *** <button onClick={() => setOtpOpen(true)}>변경</button></li>
          </ul>
        </section>
      )}

      {(tab === 'mkt' || tab === 'use') && (
        <section className="card">
          <h2>{tab === 'mkt' ? '마케팅 동의' : '정보 활용'}</h2>
          {matrix.filter((m) => tab === 'mkt' ? m.key.startsWith('mkt_') || m.key === 'voice_record' : m.key.startsWith('credit_')).map((m) => (
            <div key={m.key} className="consent-line">
              <input type="checkbox" id={m.key} checked={m.value} disabled={m.required} onChange={() => toggle(m.key)} />
              <label htmlFor={m.key} style={{ flex: 1 }}>
                <strong>{m.label}</strong>
                {m.required && <span className="badge l4" style={{ marginLeft: 8 }}>필수</span>}
              </label>
            </div>
          ))}
        </section>
      )}

      {tab === 'terms' && (
        <section className="card">
          <h2>약관</h2>
          <ul>
            <li>서비스 이용약관 v3.2 (2025-12-30 동의)</li>
            <li>전자금융거래 기본약관 v2.1</li>
            <li>개인정보 처리방침 v4.0</li>
          </ul>
          <h3 style={{ marginTop: 16 }}>변경 이력</h3>
          <ul>
            {consentHistory.map((h, i) => (
              <li key={i}>{h.at} — {h.action} <span className="muted">({h.who})</span></li>
            ))}
          </ul>
        </section>
      )}

      {tab === 'auto' && (
        <section className="card">
          <h2>AI 자동결정 거부</h2>
          <p className="muted">PIPA — 자동결정 거부권. ON 상태에서는 모든 권리 영향 결정이 사람 검토로 라우팅됩니다.</p>
          <label className="row" style={{ alignItems: 'center', gap: 8 }}>
            <input
              type="checkbox"
              checked={matrix.find((m) => m.key === 'auto_decision_refused').value}
              onChange={(e) => {
                if (matrix.find((m) => m.key === 'auto_decision_refused').value && !e.target.checked) {
                  setAutoChange(true);
                }
                setMatrix(matrix.map((m) => m.key === 'auto_decision_refused' ? { ...m, value: e.target.checked } : m));
              }}
            />
            <span>AI 자동결정 거부 ON</span>
          </label>
        </section>
      )}

      {tab === 'devices' && (
        <section className="card">
          <h2>등록 디바이스 ({userDevices.length}/5)</h2>
          {userDevices.length > 5 && (
            <div className="card" style={{ background: '#fff4d6', borderColor: '#f3e2a1', marginBottom: 8 }}>
              ⚠️ 6개 이상 등록 — 사용자 선택으로 1개 이상 해제가 필요합니다 (OTP+ARS 인증).
              <button style={{ marginLeft: 8 }} onClick={() => setDeviceOpen(true)}>해제 디바이스 선택</button>
            </div>
          )}
          <ul>
            {userDevices.map((d) => (
              <li key={d.id} style={{ marginBottom: 4 }}>
                {d.current && <span className="badge l1">현재</span>}
                <strong style={{ marginLeft: 4 }}>{d.name}</strong>
                <span className="muted" style={{ marginLeft: 8 }}>마지막 접속 {d.last}</span>
                {!d.current && <button style={{ marginLeft: 8 }} onClick={() => alert('OTP+ARS 인증 후 해제됩니다 (시연)')}>해제</button>}
              </li>
            ))}
          </ul>
        </section>
      )}

      <OtpModal open={otpOpen} onClose={() => setOtpOpen(false)} onVerify={() => { setOtpOpen(false); alert('인증 완료 — 변경 적용 (시연)'); }} />

      <Modal
        open={!!withdrawOpen}
        onClose={() => setWithdrawOpen(null)}
        title="동의 철회 — 영향 안내"
        footer={
          <>
            <button onClick={() => setWithdrawOpen(null)}>취소</button>
            <button className="primary" onClick={confirmWithdraw}>철회 진행</button>
          </>
        }
      >
        <p>이 항목 동의를 철회하면 다음 영향이 있습니다:</p>
        <ul>
          <li>관련 자동 안내·푸시·이메일이 즉시 중단됩니다.</li>
          <li>일부 부가 서비스가 제한될 수 있습니다.</li>
          <li>이미 처리된 결과(예: 자동결정)는 영향 받지 않으며, 진행 중 건은 사람 검토 큐로 라우팅됩니다.</li>
        </ul>
      </Modal>

      <Modal
        open={autoChange}
        onClose={() => setAutoChange(false)}
        title="자동결정 거부 → 허용 변경"
      >
        <p>자동결정 거부를 OFF로 변경하면:</p>
        <ul>
          <li>이미 자동결정된 건은 재심사가 가능합니다.</li>
          <li>진행 중인 심사는 사람 큐로 라우팅됩니다.</li>
          <li>변경 사실은 감사로그에 기록됩니다.</li>
        </ul>
      </Modal>

      <Modal
        open={deviceOpen}
        onClose={() => setDeviceOpen(false)}
        title="디바이스 해제 선택"
        footer={
          <>
            <button onClick={() => setDeviceOpen(false)}>취소</button>
            <button className="primary" onClick={() => { setDeviceOpen(false); alert('OTP+ARS 인증 후 적용 (시연)'); }}>인증으로 진행</button>
          </>
        }
      >
        <p>해제할 기기 1개 이상을 선택하세요. (OTP+ARS 인증 필요)</p>
        <ul>
          {userDevices.filter((d) => !d.current).map((d) => (
            <li key={d.id}>
              <input type="checkbox" /> {d.name}
            </li>
          ))}
        </ul>
      </Modal>
    </div>
  );
}
