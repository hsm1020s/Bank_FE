import { useState } from 'react';

export default function Settings() {
  const [settings, setSettings] = useState({
    bankName: 'KB Bank',
    dailyTransferLimit: '500,000,000',
    dailyWithdrawLimit: '100,000,000',
    autoLogout: '30',
    twoFactor: true,
    emailAlert: true,
    smsAlert: true,
    overdueAlert: true,
    maintenanceMode: false,
  });

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="page-settings">
      <div className="settings-grid">
        <div className="card">
          <div className="card-header">
            <h3>기본 설정</h3>
          </div>
          <div className="card-body settings-form">
            <div className="form-group">
              <label>은행명</label>
              <input
                type="text"
                value={settings.bankName}
                onChange={(e) => updateSetting('bankName', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>일일 이체 한도 (원)</label>
              <input
                type="text"
                value={settings.dailyTransferLimit}
                onChange={(e) => updateSetting('dailyTransferLimit', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>일일 출금 한도 (원)</label>
              <input
                type="text"
                value={settings.dailyWithdrawLimit}
                onChange={(e) => updateSetting('dailyWithdrawLimit', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>자동 로그아웃 (분)</label>
              <input
                type="number"
                value={settings.autoLogout}
                onChange={(e) => updateSetting('autoLogout', e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>보안 설정</h3>
          </div>
          <div className="card-body settings-form">
            <div className="form-group toggle-group">
              <div className="toggle-info">
                <label>2단계 인증</label>
                <span className="toggle-desc">관리자 로그인 시 2단계 인증을 요구합니다.</span>
              </div>
              <button
                className={`toggle ${settings.twoFactor ? 'active' : ''}`}
                onClick={() => updateSetting('twoFactor', !settings.twoFactor)}
              >
                <span className="toggle-knob" />
              </button>
            </div>
            <div className="form-group toggle-group">
              <div className="toggle-info">
                <label>유지보수 모드</label>
                <span className="toggle-desc">활성화 시 고객 접근이 제한됩니다.</span>
              </div>
              <button
                className={`toggle ${settings.maintenanceMode ? 'active' : ''}`}
                onClick={() => updateSetting('maintenanceMode', !settings.maintenanceMode)}
              >
                <span className="toggle-knob" />
              </button>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>알림 설정</h3>
          </div>
          <div className="card-body settings-form">
            <div className="form-group toggle-group">
              <div className="toggle-info">
                <label>이메일 알림</label>
                <span className="toggle-desc">중요 이벤트 발생 시 이메일 알림을 보냅니다.</span>
              </div>
              <button
                className={`toggle ${settings.emailAlert ? 'active' : ''}`}
                onClick={() => updateSetting('emailAlert', !settings.emailAlert)}
              >
                <span className="toggle-knob" />
              </button>
            </div>
            <div className="form-group toggle-group">
              <div className="toggle-info">
                <label>SMS 알림</label>
                <span className="toggle-desc">대량 거래 및 이상 거래 SMS 알림을 보냅니다.</span>
              </div>
              <button
                className={`toggle ${settings.smsAlert ? 'active' : ''}`}
                onClick={() => updateSetting('smsAlert', !settings.smsAlert)}
              >
                <span className="toggle-knob" />
              </button>
            </div>
            <div className="form-group toggle-group">
              <div className="toggle-info">
                <label>연체 알림</label>
                <span className="toggle-desc">대출 연체 발생 시 즉시 알림을 보냅니다.</span>
              </div>
              <button
                className={`toggle ${settings.overdueAlert ? 'active' : ''}`}
                onClick={() => updateSetting('overdueAlert', !settings.overdueAlert)}
              >
                <span className="toggle-knob" />
              </button>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>시스템 정보</h3>
          </div>
          <div className="card-body settings-form">
            <div className="info-row">
              <span className="info-label">시스템 버전</span>
              <span className="info-value">v2.4.1</span>
            </div>
            <div className="info-row">
              <span className="info-label">마지막 업데이트</span>
              <span className="info-value">2026-03-20</span>
            </div>
            <div className="info-row">
              <span className="info-label">DB 상태</span>
              <span className="info-value status-online">정상</span>
            </div>
            <div className="info-row">
              <span className="info-label">서버 상태</span>
              <span className="info-value status-online">정상</span>
            </div>
            <div className="info-row">
              <span className="info-label">SSL 인증서</span>
              <span className="info-value">2027-01-15 만료</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 24, display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
        <button className="btn btn-outline">취소</button>
        <button className="btn btn-primary">저장</button>
      </div>
    </div>
  );
}
