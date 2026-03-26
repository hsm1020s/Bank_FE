import Modal from '../Modal';
import { StatusBadge, TypeBadge, GradeBadge } from '../Badge';
import { formatAmount } from '../../utils/format';
import { accounts, recentTransactions, loans } from '../../data/mockData';

export default function CustomerDetail({ customer, onClose }) {
  if (!customer) return null;

  const relatedAccounts = accounts.filter((a) => a.customer === customer.name);
  const relatedTx = recentTransactions.filter((tx) => tx.customer === customer.name);
  const relatedLoans = loans.filter((l) => l.customer === customer.name);

  return (
    <Modal open={!!customer} onClose={onClose} title="고객 상세 정보" width={720}>
      <div className="detail-section">
        <div className="detail-section-title">기본 정보</div>
        <div className="detail-grid">
          <div className="detail-item">
            <span className="detail-label">고객 ID</span>
            <span className="detail-value mono">{customer.id}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">이름</span>
            <span className="detail-value">{customer.name}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">연락처</span>
            <span className="detail-value">{customer.phone}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">이메일</span>
            <span className="detail-value">{customer.email}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">등급</span>
            <span className="detail-value"><GradeBadge grade={customer.grade} /></span>
          </div>
          <div className="detail-item">
            <span className="detail-label">상태</span>
            <span className="detail-value"><StatusBadge status={customer.status} /></span>
          </div>
          <div className="detail-item">
            <span className="detail-label">가입일</span>
            <span className="detail-value">{customer.joinDate}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">총 잔액</span>
            <span className="detail-value large">{formatAmount(customer.totalBalance)}</span>
          </div>
        </div>
      </div>

      <div className="detail-section">
        <div className="detail-section-title">보유 계좌 ({relatedAccounts.length})</div>
        {relatedAccounts.length > 0 ? (
          <table className="detail-table">
            <thead>
              <tr>
                <th>계좌번호</th>
                <th>유형</th>
                <th>잔액</th>
                <th>금리</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              {relatedAccounts.map((acc) => (
                <tr key={acc.id}>
                  <td className="mono">{acc.number}</td>
                  <td><TypeBadge type={acc.type} /></td>
                  <td className="amount">{formatAmount(acc.balance)}</td>
                  <td>{acc.interestRate}%</td>
                  <td><StatusBadge status={acc.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="detail-empty">보유 계좌가 없습니다.</div>
        )}
      </div>

      <div className="detail-section">
        <div className="detail-section-title">최근 거래 ({relatedTx.length})</div>
        {relatedTx.length > 0 ? (
          <table className="detail-table">
            <thead>
              <tr>
                <th>거래번호</th>
                <th>구분</th>
                <th>금액</th>
                <th>일시</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              {relatedTx.map((tx) => (
                <tr key={tx.id}>
                  <td className="mono">{tx.id}</td>
                  <td><TypeBadge type={tx.type} /></td>
                  <td className="amount">{formatAmount(tx.amount)}</td>
                  <td>{tx.date}</td>
                  <td><StatusBadge status={tx.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="detail-empty">최근 거래 내역이 없습니다.</div>
        )}
      </div>

      {relatedLoans.length > 0 && (
        <div className="detail-section">
          <div className="detail-section-title">대출 현황 ({relatedLoans.length})</div>
          <table className="detail-table">
            <thead>
              <tr>
                <th>대출번호</th>
                <th>유형</th>
                <th>대출액</th>
                <th>잔액</th>
                <th>금리</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              {relatedLoans.map((loan) => (
                <tr key={loan.id}>
                  <td className="mono">{loan.id}</td>
                  <td>{loan.type}</td>
                  <td className="amount">{formatAmount(loan.amount)}</td>
                  <td className="amount">{formatAmount(loan.remaining)}</td>
                  <td>{loan.rate}%</td>
                  <td><StatusBadge status={loan.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Modal>
  );
}
