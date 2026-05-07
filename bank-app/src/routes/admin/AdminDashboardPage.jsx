import { useState } from 'react';
import { adminKpis, adminTrend, adminAlerts, auditLogSamples } from '../../data/mockData';
import KpiCard from '../../components/admin/KpiCard';
import AlertFeed from '../../components/admin/AlertFeed';
import MiniLineChart from '../../components/banking/MiniLineChart';
import RiskBadge from '../../components/common/RiskBadge';
import NetworkZoneBadge from '../../components/common/NetworkZoneBadge';

const ROLES = [
  { key: 'TELLER',   label: '창구(TELLER)' },
  { key: 'CRED',     label: '심사(CRED)' },
  { key: 'AML',      label: '자금세탁방지(AML)' },
  { key: 'AUDITOR',  label: '감사(AUDITOR)' },
];
const PERIODS = ['오늘', '7일', '30일'];

export default function AdminDashboardPage() {
  const [role, setRole] = useState('TELLER');
  const [period, setPeriod] = useState('오늘');
  const visible = adminKpis.filter((k) => k.forRoles.includes(role));

  return (
    <div className="col" style={{ gap: 16 }}>
      <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0 }}>통합 대시보드</h1>
        <div className="row" style={{ alignItems: 'center', gap: 8 }}>
          <NetworkZoneBadge zone="business" />
          <span className="muted">권한:</span>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            {ROLES.map((r) => <option key={r.key} value={r.key}>{r.label}</option>)}
          </select>
          <span className="muted">기간:</span>
          <select value={period} onChange={(e) => setPeriod(e.target.value)}>
            {PERIODS.map((p) => <option key={p}>{p}</option>)}
          </select>
        </div>
      </div>

      <section className="row" style={{ flexWrap: 'wrap' }}>
        {visible.map((k) => <KpiCard key={k.key} {...k} />)}
      </section>

      <section className="row" style={{ alignItems: 'flex-start' }}>
        <div className="card" style={{ flex: 2, minWidth: 320 }}>
          <h2>실시간 거래 추이</h2>
          <MiniLineChart series={adminTrend} width={460} height={100} />
          <p className="muted">WebSocket push 갱신 (시연 — 정적). 임계 초과 시 자동 알림 → 우측 피드.</p>
        </div>
        <div className="card" style={{ flex: 1, minWidth: 280 }}>
          <h2>에이전트 알림 피드</h2>
          <AlertFeed alerts={adminAlerts} />
        </div>
      </section>

      <section className="row">
        <div className="card" style={{ flex: 1, minWidth: 240 }}>
          <h2>심사 워크리스트 요약</h2>
          <p>대기 47 · 자동승인 23 · 자동거절 9 · 수동심사 15</p>
          <a href="/admin/credit"><button>심사 콘솔로</button></a>
        </div>
        <div className="card" style={{ flex: 1, minWidth: 240 }}>
          <h2>연체 워크리스트 요약</h2>
          <p>1단계 12 · 2단계 8 · 3단계 4 · 4단계 2</p>
          <a href="/admin/delinquent"><button>연체 콘솔로</button></a>
        </div>
        <div className="card" style={{ flex: 1, minWidth: 240 }}>
          <h2>결재 미처리</h2>
          <p style={{ fontSize: 28, fontWeight: 700 }}>7</p>
          <a href="/admin/approvals"><button>결재함</button></a>
        </div>
      </section>

      <section className="card">
        <h2>최근 감사로그 (서버 권위)</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--c-border)', textAlign: 'left' }}>
              <th>시각</th><th>주체</th><th>액션</th><th>위험도</th><th>결과</th>
            </tr>
          </thead>
          <tbody>
            {auditLogSamples.map((r, i) => (
              <tr key={i} style={{ borderBottom: '1px dashed var(--c-border)' }}>
                <td>{r.ts}</td>
                <td><code>{r.actor}</code></td>
                <td>{r.action}</td>
                <td><RiskBadge level={r.risk} showLabel={false} /></td>
                <td>{r.result}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
