const BASE = 'http://localhost:8080/api';

export const fetchStats = () => fetch(`${BASE}/dashboard/stats`).then(r => r.json());
export const fetchMonthly = () => fetch(`${BASE}/dashboard/monthly`).then(r => r.json());
export const fetchAccountTypes = () => fetch(`${BASE}/dashboard/account-types`).then(r => r.json());
export const fetchCustomers = () => fetch(`${BASE}/customers`).then(r => r.json());
export const fetchAccounts = () => fetch(`${BASE}/accounts`).then(r => r.json());
export const fetchLoans = () => fetch(`${BASE}/loans`).then(r => r.json());
export const fetchTransactions = () => fetch(`${BASE}/transactions`).then(r => r.json());
export const fetchNotifications = () => fetch(`${BASE}/notifications`).then(r => r.json());
