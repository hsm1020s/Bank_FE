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
import { AdminOpsPage, AuditPage } from './routes/admin/AdminPlaceholderPages';
import CreditWorklistPage from './routes/admin/credit/CreditWorklistPage';
import CreditReviewPage from './routes/admin/credit/CreditReviewPage';
import DelinquentPage from './routes/admin/delinquent/DelinquentPage';
import AmlConsolePage from './routes/admin/aml/AmlConsolePage';
import AgentOpsConsolePage from './routes/admin/agent/AgentOpsConsolePage';
import AuditLogPage from './routes/admin/audit/AuditLogPage';
import CustomerSearchPage from './routes/admin/customer/CustomerSearchPage';
import CifPage from './routes/admin/customer/CifPage';
import NewCustomerPage from './routes/admin/customer/NewCustomerPage';
import DepositManagePage from './routes/admin/deposit/DepositManagePage';
import TellerTxPage from './routes/admin/deposit/TellerTxPage';
import TxAdjustPage from './routes/admin/deposit/TxAdjustPage';
import LoanContractMgmtPage from './routes/admin/credit/LoanContractMgmtPage';
import LoanDisbursePage from './routes/admin/credit/LoanDisbursePage';
import NplPage from './routes/admin/credit/NplPage';
import SeizurePage from './routes/admin/credit/SeizurePage';
import IncidentResponsePage from './routes/admin/ops/IncidentResponsePage';
import SystemMonitorPage from './routes/admin/ops/SystemMonitorPage';
import RegulatoryReportPage from './routes/admin/compliance/RegulatoryReportPage';
import ApprovalsPage from './routes/admin/approvals/ApprovalsPage';
import ProductMasterPage from './routes/admin/product/ProductMasterPage';

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
      { path: '/admin/customer/search', element: <CustomerSearchPage /> },
      { path: '/admin/customer/new', element: <NewCustomerPage /> },
      { path: '/admin/customer/:id', element: <CifPage /> },
      { path: '/admin/deposit', element: <DepositManagePage /> },
      { path: '/admin/teller', element: <TellerTxPage /> },
      { path: '/admin/teller/adjust', element: <TxAdjustPage /> },
      { path: '/admin/credit', element: <CreditWorklistPage /> },
      { path: '/admin/credit/:caseId', element: <CreditReviewPage /> },
      { path: '/admin/loan/contracts', element: <LoanContractMgmtPage /> },
      { path: '/admin/loan/disburse', element: <LoanDisbursePage /> },
      { path: '/admin/loan/npl', element: <NplPage /> },
      { path: '/admin/loan/seizure', element: <SeizurePage /> },
      { path: '/admin/delinquent', element: <DelinquentPage /> },
      { path: '/admin/aml', element: <AmlConsolePage /> },
      { path: '/admin/agent/console', element: <AgentOpsConsolePage /> },
      { path: '/admin/regulatory', element: <RegulatoryReportPage /> },
      { path: '/admin/approvals', element: <ApprovalsPage /> },
      { path: '/admin/product', element: <ProductMasterPage /> },
      { path: '/admin/ops', element: <AdminOpsPage /> },
      { path: '/admin/ops/incident', element: <IncidentResponsePage /> },
      { path: '/admin/ops/release', element: <AdminOpsPage /> },
      { path: '/admin/ops/healthcheck', element: <SystemMonitorPage /> },
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
