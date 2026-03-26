import Modal from '../Modal';
import { StatusBadge } from '../Badge';
import { formatAmount } from '../../utils/format';
import { customers, accounts } from '../../data/mockData';

export default function LoanDetail({ loan, onClose }) {
  if (!loan) return null;

  const customer = customers.find((c) => c.name === loan.customer);
  const customerAccounts = accounts.filter((a) => a.customer === loan.customer);
  const repaidAmount = loan.amount - loan.remaining;
  const repaidPercent = ((repaidAmount / loan.amount) * 100).toFixed(1);
  const progressVariant = loan.status === '연체' ? 'danger' : repaidPercent > 50 ? '' : 'warning';

  return (
    <Modal open={!!loan} onClose={onClose} title="대출 상세 정보" width={680}>
      <div className="detail-section">
        <div className="detail-section-title">대출 정보</div>
        <div className="detail-grid">
          <div className="detail-item">
            <span className="detail-label">대출번호</span>
            <span className="detail-value mono">{loan.id}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">유형</span>
            <span className="detail-value">{loan.type}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">대출액</span>
            <span className="detail-value large">{formatAmount(loan.amount)}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">잔여액</span>
            <span className="detail-value large">{formatAmount(loan.remaining)}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">금리</span>
            <span className="detail-value">{loan.rate}%</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">월 상환액</span>
            <span className="detail-value">{formatAmount(loan.monthlyPayment)}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">실행일</span>
            <span className="detail-value">{loan.startDate}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">만기일</span>
            <span className="detail-value">{loan.endDate}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">상태</span>
            <span className="detail-value"><StatusBadge status={loan.status} /></span>
          </div>
        </div>
      </div>

      <div className="detail-section">
        <div className="detail-section-title">상환 진행률</div>
        <div className="progress-bar-container">
          <div className="progress-info">
            <span>상환 완료: {formatAmount(repaidAmount)}</span>
            <span>{repaidPercent}%</span>
          </div>
          <div className="progress-bar">
            <div className={`progress-fill ${progressVariant}`} style={{ width: `${repaidPercent}%` }} />
          </div>
        </div>
      </div>

      {customer && (
        <div className="detail-section">
          <div className="detail-section-title">고객 정보</div>
          <div className="detail-grid">
            <div className="detail-item">
              <span className="detail-label">고객명</span>
              <span className="detail-value">{customer.name}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">고객 ID</span>
              <span className="detail-value mono">{customer.id}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">연락처</span>
              <span className="detail-value">{customer.phone}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">이메일</span>
              <span className="detail-value">{customer.email}</span>
            </div>
          </div>
        </div>
      )}

      {customerAccounts.length > 0 && (
        <div className="detail-section">
          <div className="detail-section-title">보유 계좌 ({customerAccounts.length})</div>
          <table className="detail-table">
            <thead>
              <tr>
                <th>계좌번호</th>
                <th>유형</th>
                <th>잔액</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              {customerAccounts.map((acc) => (
                <tr key={acc.id}>
                  <td className="mono">{acc.number}</td>
                  <td>{acc.type}</td>
                  <td className="amount">{formatAmount(acc.balance)}</td>
                  <td><StatusBadge status={acc.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Modal>
  );
}
