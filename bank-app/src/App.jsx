import { createBrowserRouter, Navigate } from 'react-router-dom';

import CustomerLayout from './routes/customer/CustomerLayout';
import HomePage from './routes/customer/HomePage';
import LoginPage from './routes/customer/LoginPage';
import SignupPage from './routes/customer/SignupPage';
import AuthMethodsPage from './routes/customer/AuthMethodsPage';
import DashboardPage from './routes/customer/DashboardPage';
import ProfilePage from './routes/customer/ProfilePage';
import DocumentsPage from './routes/customer/DocumentsPage';
import LimitsPage from './routes/customer/LimitsPage';
import ComplaintsPage from './routes/customer/ComplaintsPage';
import SecurityReportPage from './routes/customer/SecurityReportPage';
import DepositListPage from './routes/customer/deposit/DepositListPage';
import DepositDetailPage from './routes/customer/deposit/DepositDetailPage';
import DepositOpenPage from './routes/customer/deposit/DepositOpenPage';
import DepositClosePage from './routes/customer/deposit/DepositClosePage';
import TransferPage from './routes/customer/transfer/TransferPage';
import AutoTransferPage from './routes/customer/transfer/AutoTransferPage';
import LoanApplyPage from './routes/customer/loan/LoanApplyPage';
import LoanDetailPage from './routes/customer/loan/LoanDetailPage';
import LoanRepayPage from './routes/customer/loan/LoanRepayPage';
import LoanCatalogPage from './routes/customer/loan/LoanCatalogPage';
import LoanPreCheckPage from './routes/customer/loan/LoanPreCheckPage';
import LoanContractPage from './routes/customer/loan/LoanContractPage';
import LoanRateReductionPage from './routes/customer/loan/LoanRateReductionPage';

import AdminLayout from './routes/admin/AdminLayout';
import AdminLoginPage from './routes/admin/AdminLoginPage';
import AdminDashboardPage from './routes/admin/AdminDashboardPage';
import {
  AdminCustomerSearch, AdminApprovalsPage,
  AdminOpsPage, AuditPage,
} from './routes/admin/AdminPlaceholderPages';
import CreditWorklistPage from './routes/admin/credit/CreditWorklistPage';
import CreditReviewPage from './routes/admin/credit/CreditReviewPage';
import DelinquentPage from './routes/admin/delinquent/DelinquentPage';
import AmlConsolePage from './routes/admin/aml/AmlConsolePage';
import AgentOpsConsolePage from './routes/admin/agent/AgentOpsConsolePage';
import AuditLogPage from './routes/admin/audit/AuditLogPage';

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
      { path: '/deposit', element: <DepositListPage /> },
      { path: '/deposit/new', element: <DepositOpenPage /> },
      { path: '/deposit/:id', element: <DepositDetailPage /> },
      { path: '/deposit/:id/close', element: <DepositClosePage /> },
      { path: '/transfer', element: <TransferPage /> },
      { path: '/transfer/auto', element: <AutoTransferPage /> },
      { path: '/loan', element: <Navigate to="/loan/catalog" replace /> },
      { path: '/loan/catalog', element: <LoanCatalogPage /> },
      { path: '/loan/precheck', element: <LoanPreCheckPage /> },
      { path: '/loan/apply', element: <LoanApplyPage /> },
      { path: '/loan/contract', element: <LoanContractPage /> },
      { path: '/loan/:id', element: <LoanDetailPage /> },
      { path: '/loan/:id/repay', element: <LoanRepayPage /> },
      { path: '/loan/:id/rate-reduction', element: <LoanRateReductionPage /> },
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
      { path: '/admin/credit', element: <CreditWorklistPage /> },
      { path: '/admin/credit/:caseId', element: <CreditReviewPage /> },
      { path: '/admin/delinquent', element: <DelinquentPage /> },
      { path: '/admin/aml', element: <AmlConsolePage /> },
      { path: '/admin/agent/console', element: <AgentOpsConsolePage /> },
      { path: '/admin/approvals', element: <AdminApprovalsPage /> },
      { path: '/admin/ops', element: <AdminOpsPage /> },
      { path: '/admin/ops/release', element: <AdminOpsPage /> },
      { path: '/admin/ops/healthcheck', element: <AdminOpsPage /> },
      { path: '/audit', element: <AuditPage /> },
      { path: '/audit/logs', element: <AuditLogPage /> },
    ],
  },
  { path: '/forbidden', element: <ForbiddenPage /> },
  { path: '/error', element: <ServerErrorPage /> },
  { path: '/maintenance', element: <MaintenancePage /> },
  { path: '/partial-outage', element: <PartialOutagePage /> },
  { path: '*', element: <NotFoundPage /> },
]);
