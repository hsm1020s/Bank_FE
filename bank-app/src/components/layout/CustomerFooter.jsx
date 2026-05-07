import { Link } from 'react-router-dom';
import { customerFooterLinks } from '../../data/mockData';

export default function CustomerFooter() {
  return (
    <footer style={{ background: '#1c2330', color: '#cfd5e2', padding: '16px 24px' }}>
      <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="row" style={{ gap: 16 }}>
          {customerFooterLinks.map((l) =>
            l.href.startsWith('/') ? (
              <Link key={l.label} to={l.href} style={{ color: '#cfd5e2' }}>{l.label}</Link>
            ) : (
              <a key={l.label} href={l.href} style={{ color: '#cfd5e2' }}>{l.label}</a>
            )
          )}
        </div>
        <small className="muted" style={{ color: '#8a92a3' }}>
          ⓒ 2026 코어뱅킹 시뮬레이터 · 본 화면은 학습/시연용 목업입니다.
        </small>
      </div>
    </footer>
  );
}
