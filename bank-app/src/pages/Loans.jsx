import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { loans } from '../data/mockData';

function formatAmount(num) {
  return num.toLocaleString('ko-KR') + '원';
}

function formatShort(num) {
  if (num >= 100_000_000) return `${(num / 100_000_000).toFixed(1)}억`;
  if (num >= 10_000) return `${(num / 10_000).toFixed(0)}만`;
  return num.toLocaleString();
}

export default function Loans() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('전체');

  const filtered = loans.filter((loan) => {
    const matchSearch = loan.customer.includes(search) || loan.id.includes(search);
    const matchType = typeFilter === '전체' || loan.type === typeFilter;
    return matchSearch && matchType;
  });

  const totalLoan = loans.reduce((sum, l) => sum + l.amount, 0);
  const totalRemaining = loans.reduce((sum, l) => sum + l.remaining, 0);
  const overdueCount = loans.filter((l) => l.status === '연체').length;
  const avgRate = (loans.reduce((sum, l) => sum + l.rate, 0) / loans.length).toFixed(2);

  const loanByType = loans.reduce((acc, l) => {
    const existing = acc.find((item) => item.type === l.type);
    if (existing) {
      existing.amount += l.amount / 100_000_000;
      existing.remaining += l.remaining / 100_000_000;
    } else {
      acc.push({ type: l.type, amount: l.amount / 100_000_000, remaining: l.remaining / 100_000_000 });
    }
    return acc;
  }, []);

  return (
    <div className="page-loans">
      <div className="stat-cards small">
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-label">총 대출 실행액</span>
          </div>
          <div className="stat-value">{formatShort(totalLoan)}원</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-label">대출 잔액</span>
          </div>
          <div className="stat-value">{formatShort(totalRemaining)}원</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-label">평균 금리</span>
          </div>
          <div className="stat-value">{avgRate}%</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-label">연체 건수</span>
          </div>
          <div className="stat-value danger-text">{overdueCount}건</div>
        </div>
      </div>

      <div className="card chart-card" style={{ marginBottom: 24 }}>
        <div className="card-header">
          <h3>대출 유형별 현황</h3>
          <span className="card-subtitle">단위: 억원</span>
        </div>
        <div className="card-body chart-container">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={loanByType} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
              <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <YAxis type="category" dataKey="type" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 13 }} width={100} />
              <Tooltip formatter={(value) => `${value.toFixed(1)}억원`} />
              <Bar dataKey="amount" name="실행액" fill="#6366f1" radius={[0, 6, 6, 0]} barSize={20} />
              <Bar dataKey="remaining" name="잔액" fill="#a78bfa" radius={[0, 6, 6, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>대출 목록</h3>
          <button className="btn btn-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            신규 대출
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
              placeholder="대출번호, 고객명으로 검색..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
            <option>전체</option>
            <option>주택담보대출</option>
            <option>전세자금대출</option>
            <option>신용대출</option>
            <option>자동차대출</option>
            <option>기업대출</option>
          </select>
        </div>
        <div className="card-body">
          <table className="data-table">
            <thead>
              <tr>
                <th>대출번호</th>
                <th>고객명</th>
                <th>유형</th>
                <th>대출액</th>
                <th>잔액</th>
                <th>금리</th>
                <th>월상환액</th>
                <th>만기일</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((loan) => (
                <tr key={loan.id} className={loan.status === '연체' ? 'row-danger' : ''}>
                  <td className="mono">{loan.id}</td>
                  <td className="bold">{loan.customer}</td>
                  <td>{loan.type}</td>
                  <td className="amount">{formatAmount(loan.amount)}</td>
                  <td className="amount">{formatAmount(loan.remaining)}</td>
                  <td>{loan.rate}%</td>
                  <td className="amount">{formatAmount(loan.monthlyPayment)}</td>
                  <td className="muted">{loan.endDate}</td>
                  <td>
                    <span className={`status-badge ${loan.status === '정상' ? 'success' : 'danger'}`}>
                      {loan.status}
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
