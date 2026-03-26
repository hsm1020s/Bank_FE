import Modal from '../Modal';
import { StatusBadge, TypeBadge } from '../Badge';
import { formatAmount } from '../../utils/format';
import { customers, recentTransactions } from '../../data/mockData';

export default function AccountDetail({ account, onClose }) {
  if (!account) return null;

  const acc = account;
  const customer = customers.find((c) => c.name === acc.customer);
  const relatedTx = recentTransactions.filter((tx) => tx.account === acc.number);

  return (
    <Modal open={!!account} onClose={onClose} title="계좌 상세 정보">
      <div className="detail-section">
        <div className="detail-section-title">계좌 정보</div>
        <div className="detail-grid">
          <div className="detail-item">
            <span className="detail-label">계좌번호</span>
            <span className="detail-value mono">{acc.number}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">유형</span>
            <span className="detail-value"><TypeBadge type={acc.type} /></span>
          </div>
          <div className="detail-item">
            <span className="detail-label">잔액</span>
            <span className="detail-value large">{formatAmount(acc.balance)}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">상태</span>
            <span className="detail-value"><StatusBadge status={acc.status} /></span>
          </div>
          <div className="detail-item">
            <span className="detail-label">금리</span>
            <span className="detail-value">{acc.interestRate}%</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">개설일</span>
            <span className="detail-value">{acc.openDate}</span>
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
              <span className="detail-label">등급</span>
              <span className="detail-value">{customer.grade}</span>
            </div>
          </div>
        </div>
      )}

      <div className="detail-section">
        <div className="detail-section-title">관련 거래 ({relatedTx.length})</div>
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
          <div className="detail-empty">관련 거래 내역이 없습니다.</div>
        )}
      </div>
    </Modal>
  );
}
