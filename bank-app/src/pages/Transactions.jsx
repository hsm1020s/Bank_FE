import { useState } from 'react';
import { recentTransactions } from '../data/mockData';

function formatAmount(num) {
  return num.toLocaleString('ko-KR') + '원';
}

export default function Transactions() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('전체');
  const [statusFilter, setStatusFilter] = useState('전체');

  const filtered = recentTransactions.filter((tx) => {
    const matchSearch = tx.customer.includes(search) || tx.id.includes(search) || tx.account.includes(search);
    const matchType = typeFilter === '전체' || tx.type === typeFilter;
    const matchStatus = statusFilter === '전체' || tx.status === statusFilter;
    return matchSearch && matchType && matchStatus;
  });

  const totalAmount = recentTransactions.reduce((sum, tx) => sum + tx.amount, 0);
  const completedCount = recentTransactions.filter((tx) => tx.status === '완료').length;
  const failedCount = recentTransactions.filter((tx) => tx.status === '실패').length;

  return (
    <div className="page-transactions">
      <div className="stat-cards small">
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-label">총 거래건수</span>
          </div>
          <div className="stat-value">{recentTransactions.length}건</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-label">총 거래금액</span>
          </div>
          <div className="stat-value">{formatAmount(totalAmount)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-label">완료</span>
          </div>
          <div className="stat-value">{completedCount}건</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-label">실패</span>
          </div>
          <div className="stat-value danger-text">{failedCount}건</div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>거래 내역</h3>
          <button className="btn btn-outline">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7,10 12,15 17,10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            내보내기
          </button>
        </div>
        <div className="card-filters">
          <div className="filter-search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="거래번호, 고객명, 계좌번호로 검색..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
            <option>전체</option>
            <option>입금</option>
            <option>출금</option>
            <option>이체</option>
            <option>대출상환</option>
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option>전체</option>
            <option>완료</option>
            <option>처리중</option>
            <option>실패</option>
          </select>
        </div>
        <div className="card-body">
          <table className="data-table">
            <thead>
              <tr>
                <th>거래번호</th>
                <th>고객명</th>
                <th>구분</th>
                <th>계좌번호</th>
                <th>금액</th>
                <th>일시</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((tx) => (
                <tr key={tx.id}>
                  <td className="mono">{tx.id}</td>
                  <td className="bold">{tx.customer}</td>
                  <td>
                    <span className={`type-badge ${tx.type === '입금' ? 'deposit' : tx.type === '출금' ? 'withdraw' : tx.type === '이체' ? 'transfer' : 'loan'}`}>
                      {tx.type}
                    </span>
                  </td>
                  <td className="mono">{tx.account}</td>
                  <td className="amount">{formatAmount(tx.amount)}</td>
                  <td className="muted">{tx.date}</td>
                  <td>
                    <span className={`status-badge ${tx.status === '완료' ? 'success' : tx.status === '처리중' ? 'warning' : 'danger'}`}>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="empty-state">검색 결과가 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
}
