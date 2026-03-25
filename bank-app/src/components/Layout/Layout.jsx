import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const titles = {
  '/': '대시보드',
  '/customers': '고객 관리',
  '/transactions': '거래 내역',
  '/accounts': '계좌 관리',
  '/loans': '대출 관리',
  '/settings': '설정',
};

export default function Layout() {
  const location = useLocation();
  const title = titles[location.pathname] || '대시보드';

  return (
    <div className="layout">
      <Sidebar />
      <div className="main-area">
        <Header title={title} />
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
