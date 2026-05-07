import { Link } from 'react-router-dom';

export default function AlertFeed({ alerts = [] }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {alerts.map((a) => (
        <li key={a.id} style={{ padding: '8px 0', borderBottom: '1px dashed var(--c-border)' }}>
          <div className="row" style={{ alignItems: 'center', justifyContent: 'space-between' }}>
            <span>
              <span className="muted" style={{ marginRight: 8 }}>{a.time}</span>
              <span className={`badge ${a.level === 'danger' ? 'l4' : a.level === 'warn' ? 'l3' : 'l1'}`}>{a.level}</span>{' '}
              {a.text}
            </span>
            {a.target && <Link to={a.target}><button>이동</button></Link>}
          </div>
        </li>
      ))}
    </ul>
  );
}
