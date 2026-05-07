import { useState } from 'react';
import NetworkZoneBadge from '../common/NetworkZoneBadge';
import EmergencyLogoutModal from '../modals/EmergencyLogoutModal';

export default function AdminHeader({ pendingApprovals = 7 }) {
  const [emerOpen, setEmerOpen] = useState(false);
  return (
    <header style={{ background: '#0e1726', color: '#dde3ee', padding: '8px 24px' }}>
      <div className="row" style={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <div className="row" style={{ alignItems: 'center', gap: 16 }}>
          <strong style={{ color: '#fff' }}>🏢 직원 콘솔</strong>
          <input
            type="search"
            placeholder="고객명/ID/계좌번호 검색…"
            style={{ width: 320, background: '#1c2330', color: '#fff', borderColor: '#2a3346' }}
          />
        </div>
        <div className="row" style={{ alignItems: 'center', gap: 12 }}>
          <NetworkZoneBadge zone="business" />
          <button title="결재함 미처리">📥 결재 {pendingApprovals}</button>
          <span className="muted" style={{ color: '#aaa' }}>창구A · 강남지점</span>
          <button className="danger" onClick={() => setEmerOpen(true)}>🚨 비상 로그아웃</button>
        </div>
      </div>
      <EmergencyLogoutModal
        open={emerOpen}
        onClose={() => setEmerOpen(false)}
        onConfirm={() => { alert('전 세션 종료 — 로그인 페이지로'); setEmerOpen(false); }}
      />
    </header>
  );
}
