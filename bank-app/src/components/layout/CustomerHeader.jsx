import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { customerMenu, notifications } from '../../data/mockData';
import SessionIndicator from '../auth/SessionIndicator';
import AgentToggle from '../agent/AgentToggle';

export default function CustomerHeader({ agentEnabled, onToggleAgent }) {
  const [notifOpen, setNotifOpen] = useState(false);
  return (
    <header style={{ background: '#fff', borderBottom: '1px solid var(--c-border)', padding: '8px 24px' }}>
      <div className="row" style={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <div className="row" style={{ alignItems: 'center', gap: 24 }}>
          <Link to="/" style={{ fontWeight: 700, fontSize: 18, color: 'var(--c-primary)' }}>🏦 코어뱅킹</Link>
          <nav>
            <ul className="row" style={{ listStyle: 'none', padding: 0, margin: 0, gap: 16 }}>
              {customerMenu.map((m) => (
                <li key={m.to}>
                  <NavLink
                    to={m.to}
                    style={({ isActive }) => ({
                      color: isActive ? 'var(--c-primary)' : 'var(--c-text)',
                      fontWeight: isActive ? 600 : 400,
                    })}
                  >
                    {m.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="row" style={{ alignItems: 'center', gap: 12, position: 'relative' }}>
          <SessionIndicator />
          <button onClick={() => setNotifOpen((v) => !v)} title="알림" aria-label="알림 보기">
            🔔 {notifications.length}
          </button>
          {!agentEnabled && <span className="badge l4">⛔ ARC 거부 중</span>}
          <AgentToggle enabled={agentEnabled} onToggle={onToggleAgent} compact />
          <Link to="/login">로그인</Link>
          {notifOpen && (
            <div className="card" style={{ position: 'absolute', top: 36, right: 0, width: 320, zIndex: 5 }}>
              <strong>알림</strong>
              <ul style={{ paddingLeft: 16 }}>
                {notifications.map((n) => (
                  <li key={n.id} style={{ marginBottom: 4 }}>
                    <span className={`badge ${n.level === 'danger' ? 'l4' : n.level === 'warn' ? 'l3' : 'l1'}`}>
                      {n.level}
                    </span>{' '}
                    {n.message}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
