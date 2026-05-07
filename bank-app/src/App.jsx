import { createBrowserRouter } from 'react-router-dom';

import CustomerLayout from './routes/customer/CustomerLayout';
import HomePage from './routes/customer/HomePage';
import LoginPage from './routes/customer/LoginPage';
import SignupPage from './routes/customer/SignupPage';
import AuthMethodsPage from './routes/customer/AuthMethodsPage';
import DashboardPage from './routes/customer/DashboardPage';
import {
  DepositPage, TransferPage, LoanPage,
  DocumentsPage, LimitsPage, ProfilePage,
  ComplaintsPage, SecurityReportPage,
} from './routes/customer/PlaceholderPages';

import AdminLayout from './routes/admin/AdminLayout';
import AdminLoginPage from './routes/admin/AdminLoginPage';
import AdminDashboardPage from './routes/admin/AdminDashboardPage';
import {
  AdminCustomerSearch, AdminApprovalsPage,
  AdminOpsPage, AuditPage,
} from './routes/admin/AdminPlaceholderPages';

import {
  NotFoundPage, ForbiddenPage, ServerErrorPage,
  MaintenancePage, PartialOutagePage,
} from './routes/system/SystemPages';

export const router = createBrowserRouter([
  {
    element: <CustomerLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/signup', element: <SignupPage /> },
      { path: '/auth/methods', element: <AuthMethodsPage /> },
      { path: '/dashboard', element: <DashboardPage /> },
      { path: '/deposit', element: <DepositPage /> },
      { path: '/transfer', element: <TransferPage /> },
      { path: '/loan', element: <LoanPage /> },
      { path: '/documents', element: <DocumentsPage /> },
      { path: '/limits', element: <LimitsPage /> },
      { path: '/profile', element: <ProfilePage /> },
      { path: '/complaints', element: <ComplaintsPage /> },
      { path: '/security/report', element: <SecurityReportPage /> },
    ],
  },
  { path: '/admin/login', element: <AdminLoginPage /> },
  {
    element: <AdminLayout />,
    children: [
      { path: '/admin', element: <AdminDashboardPage /> },
      { path: '/admin/customer/search', element: <AdminCustomerSearch /> },
      { path: '/admin/approvals', element: <AdminApprovalsPage /> },
      { path: '/admin/ops', element: <AdminOpsPage /> },
      { path: '/admin/ops/release', element: <AdminOpsPage /> },
      { path: '/admin/ops/healthcheck', element: <AdminOpsPage /> },
      { path: '/audit', element: <AuditPage /> },
      { path: '/audit/logs', element: <AuditPage /> },
    ],
  },
  { path: '/forbidden', element: <ForbiddenPage /> },
  { path: '/error', element: <ServerErrorPage /> },
  { path: '/maintenance', element: <MaintenancePage /> },
  { path: '/partial-outage', element: <PartialOutagePage /> },
  { path: '*', element: <NotFoundPage /> },
]);
