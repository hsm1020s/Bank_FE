import { Outlet } from 'react-router-dom';
import AdminHeader from '../../components/layout/AdminHeader';
import AdminSidebar from '../../components/layout/AdminSidebar';

export default function AdminLayout() {
  return (
    <div className="admin-shell">
      <AdminHeader />
      <AdminSidebar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
