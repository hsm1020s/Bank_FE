import { useState } from 'react';
import { notifications } from '../../data/mockData';

export default function Header({ title }) {
  const [showNotifications, setShowNotifications] = useState(false);

  const alertCount = notifications.filter((n) => n.type === 'alert' || n.type === 'warning').length;

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="header-title">{title}</h1>
      </div>

      <div className="header-right">
        <div className="header-search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input type="text" placeholder="검색..." />
        </div>

        <div className="header-notification">
          <button className="notification-btn" onClick={() => setShowNotifications(!showNotifications)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            {alertCount > 0 && <span className="notification-badge">{alertCount}</span>}
          </button>

          {showNotifications && (
            <div className="notification-dropdown">
              <div className="notification-header">
                <span>알림</span>
                <button className="mark-read">모두 읽음</button>
              </div>
              {notifications.map((n) => (
                <div key={n.id} className={`notification-item ${n.type}`}>
                  <div className={`notification-dot ${n.type}`} />
                  <div className="notification-content">
                    <p>{n.message}</p>
                    <span className="notification-time">{n.time}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="header-date">
          {new Date().toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
          })}
        </div>
      </div>
    </header>
  );
}
