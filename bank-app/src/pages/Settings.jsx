import { useState } from 'react';
import Card from '../components/Card';
import Toggle from '../components/Toggle';
import Button from '../components/Button';
import { ConfirmModal } from '../components/Modal';

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
  const [showConfirm, setShowConfirm] = useState(false);

  const update = (key, value) => setSettings((prev) => ({ ...prev, [key]: value }));

  const handleSave = () => {
    setShowConfirm(false);
    alert('설정이 저장되었습니다.');
  };

  return (
    <div className="page-settings">
      <div className="settings-grid">
        <Card title="기본 설정">
          <div className="settings-form">
            <div className="form-group">
              <label>은행명</label>
              <input type="text" value={settings.bankName} onChange={(e) => update('bankName', e.target.value)} />
            </div>
            <div className="form-group">
              <label>일일 이체 한도 (원)</label>
              <input type="text" value={settings.dailyTransferLimit} onChange={(e) => update('dailyTransferLimit', e.target.value)} />
            </div>
            <div className="form-group">
              <label>일일 출금 한도 (원)</label>
              <input type="text" value={settings.dailyWithdrawLimit} onChange={(e) => update('dailyWithdrawLimit', e.target.value)} />
            </div>
            <div className="form-group">
              <label>자동 로그아웃 (분)</label>
              <input type="number" value={settings.autoLogout} onChange={(e) => update('autoLogout', e.target.value)} />
            </div>
          </div>
        </Card>

        <Card title="보안 설정">
          <div className="settings-form">
            <Toggle label="2단계 인증" description="관리자 로그인 시 2단계 인증을 요구합니다." checked={settings.twoFactor} onChange={(v) => update('twoFactor', v)} />
            <Toggle label="유지보수 모드" description="활성화 시 고객 접근이 제한됩니다." checked={settings.maintenanceMode} onChange={(v) => update('maintenanceMode', v)} />
          </div>
        </Card>

        <Card title="알림 설정">
          <div className="settings-form">
            <Toggle label="이메일 알림" description="중요 이벤트 발생 시 이메일 알림을 보냅니다." checked={settings.emailAlert} onChange={(v) => update('emailAlert', v)} />
            <Toggle label="SMS 알림" description="대량 거래 및 이상 거래 SMS 알림을 보냅니다." checked={settings.smsAlert} onChange={(v) => update('smsAlert', v)} />
            <Toggle label="연체 알림" description="대출 연체 발생 시 즉시 알림을 보냅니다." checked={settings.overdueAlert} onChange={(v) => update('overdueAlert', v)} />
          </div>
        </Card>

        <Card title="시스템 정보">
          <div className="settings-form">
            <div className="info-row"><span className="info-label">시스템 버전</span><span className="info-value">v2.4.1</span></div>
            <div className="info-row"><span className="info-label">마지막 업데이트</span><span className="info-value">2026-03-20</span></div>
            <div className="info-row"><span className="info-label">DB 상태</span><span className="info-value status-online">정상</span></div>
            <div className="info-row"><span className="info-label">서버 상태</span><span className="info-value status-online">정상</span></div>
            <div className="info-row"><span className="info-label">SSL 인증서</span><span className="info-value">2027-01-15 만료</span></div>
          </div>
        </Card>
      </div>

      <div style={{ marginTop: 24, display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
        <Button variant="outline">취소</Button>
        <Button onClick={() => setShowConfirm(true)}>저장</Button>
      </div>

      <ConfirmModal
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleSave}
        title="설정 저장"
        message="변경된 설정을 저장하시겠습니까? 일부 설정은 즉시 적용되며, 되돌리기가 어려울 수 있습니다."
      />
    </div>
  );
}
