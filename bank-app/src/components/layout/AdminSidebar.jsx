import { NavLink } from 'react-router-dom';
import { adminMenu } from '../../data/mockData';

export default function AdminSidebar() {
  return (
    <nav>
      {adminMenu.map((g) => (
        <div key={g.group}>
          <div className="menu-group">{g.group}</div>
          <ul className="menu-list">
            {g.items.map((it) => (
              <li key={it.to}>
                <NavLink
                  to={it.to}
                  end={it.to === '/admin' || it.to === '/audit'}
                  style={({ isActive }) => ({
                    color: isActive ? '#fff' : '#cfd5e2',
                    background: isActive ? '#27314a' : 'transparent',
                  })}
                >
                  {it.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
