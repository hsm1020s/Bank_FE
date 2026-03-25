import { useState } from 'react';
import { customers } from '../data/mockData';

function formatAmount(num) {
  return num.toLocaleString('ko-KR') + '원';
}

export default function Customers() {
  const [search, setSearch] = useState('');
  const [gradeFilter, setGradeFilter] = useState('전체');
  const [statusFilter, setStatusFilter] = useState('전체');

  const filtered = customers.filter((c) => {
    const matchSearch = c.name.includes(search) || c.id.includes(search) || c.phone.includes(search) || c.email.includes(search);
    const matchGrade = gradeFilter === '전체' || c.grade === gradeFilter;
    const matchStatus = statusFilter === '전체' || c.status === statusFilter;
    return matchSearch && matchGrade && matchStatus;
  });

  const gradeStats = {
    VVIP: customers.filter((c) => c.grade === 'VVIP').length,
    VIP: customers.filter((c) => c.grade === 'VIP').length,
    일반: customers.filter((c) => c.grade === '일반').length,
  };

  return (
    <div className="page-customers">
      <div className="stat-cards small">
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-label">전체 고객</span>
          </div>
          <div className="stat-value">{customers.length}명</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-label">VVIP</span>
            <span className="stat-badge vvip">Premium</span>
          </div>
          <div className="stat-value">{gradeStats.VVIP}명</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-label">VIP</span>
            <span className="stat-badge vip">Gold</span>
          </div>
          <div className="stat-value">{gradeStats.VIP}명</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-label">일반</span>
          </div>
          <div className="stat-value">{gradeStats.일반}명</div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>고객 목록</h3>
          <button className="btn btn-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            신규 고객 등록
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
              placeholder="이름, ID, 전화번호, 이메일로 검색..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select value={gradeFilter} onChange={(e) => setGradeFilter(e.target.value)}>
            <option>전체</option>
            <option>VVIP</option>
            <option>VIP</option>
            <option>일반</option>
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option>전체</option>
            <option>활성</option>
            <option>휴면</option>
            <option>정지</option>
          </select>
        </div>
        <div className="card-body">
          <table className="data-table">
            <thead>
              <tr>
                <th>고객 ID</th>
                <th>이름</th>
                <th>연락처</th>
                <th>이메일</th>
                <th>계좌수</th>
                <th>총 잔액</th>
                <th>등급</th>
                <th>가입일</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id}>
                  <td className="mono">{c.id}</td>
                  <td className="bold">{c.name}</td>
                  <td>{c.phone}</td>
                  <td className="muted">{c.email}</td>
                  <td>{c.accounts}</td>
                  <td className="amount">{formatAmount(c.totalBalance)}</td>
                  <td>
                    <span className={`grade-badge ${c.grade === '일반' ? 'normal' : c.grade.toLowerCase()}`}>{c.grade}</span>
                  </td>
                  <td className="muted">{c.joinDate}</td>
                  <td>
                    <span className={`status-badge ${c.status === '활성' ? 'success' : c.status === '휴면' ? 'warning' : 'danger'}`}>
                      {c.status}
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
