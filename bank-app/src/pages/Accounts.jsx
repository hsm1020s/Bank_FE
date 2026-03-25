import { useState } from 'react';
import { accounts } from '../data/mockData';

function formatAmount(num) {
  return num.toLocaleString('ko-KR') + '원';
}

export default function Accounts() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('전체');

  const filtered = accounts.filter((acc) => {
    const matchSearch = acc.customer.includes(search) || acc.number.includes(search) || acc.id.includes(search);
    const matchType = typeFilter === '전체' || acc.type === typeFilter;
    return matchSearch && matchType;
  });

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
  const activeCount = accounts.filter((acc) => acc.status === '정상').length;

  return (
    <div className="page-accounts">
      <div className="stat-cards small">
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-label">총 계좌수</span>
          </div>
          <div className="stat-value">{accounts.length}개</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-label">총 잔액</span>
          </div>
          <div className="stat-value">{formatAmount(totalBalance)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-label">정상 계좌</span>
          </div>
          <div className="stat-value">{activeCount}개</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-label">휴면 계좌</span>
          </div>
          <div className="stat-value">{accounts.length - activeCount}개</div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>계좌 목록</h3>
          <button className="btn btn-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            신규 계좌 개설
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
              placeholder="계좌번호, 고객명으로 검색..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
            <option>전체</option>
            <option>보통예금</option>
            <option>정기예금</option>
            <option>적금</option>
            <option>자유적금</option>
          </select>
        </div>
        <div className="card-body">
          <table className="data-table">
            <thead>
              <tr>
                <th>계좌 ID</th>
                <th>계좌번호</th>
                <th>고객명</th>
                <th>유형</th>
                <th>잔액</th>
                <th>금리</th>
                <th>개설일</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((acc) => (
                <tr key={acc.id}>
                  <td className="mono">{acc.id}</td>
                  <td className="mono bold">{acc.number}</td>
                  <td>{acc.customer}</td>
                  <td>
                    <span className={`type-badge ${acc.type === '보통예금' ? 'deposit' : acc.type === '정기예금' ? 'transfer' : 'loan'}`}>
                      {acc.type}
                    </span>
                  </td>
                  <td className="amount">{formatAmount(acc.balance)}</td>
                  <td>{acc.interestRate}%</td>
                  <td className="muted">{acc.openDate}</td>
                  <td>
                    <span className={`status-badge ${acc.status === '정상' ? 'success' : 'warning'}`}>
                      {acc.status}
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
