import Modal from '../Modal';
import { StatusBadge, TypeBadge } from '../Badge';
import { formatAmount } from '../../utils/format';
import { customers, accounts } from '../../data/mockData';

export default function TransactionDetail({ transaction, onClose }) {
  if (!transaction) return null;

  const tx = transaction;
  const customer = customers.find((c) => c.name === tx.customer);
  const account = accounts.find((a) => a.number === tx.account);

  return (
    <Modal open={!!transaction} onClose={onClose} title="거래 상세 정보">
      <div className="detail-section">
        <div className="detail-section-title">거래 정보</div>
        <div className="detail-grid">
          <div className="detail-item">
            <span className="detail-label">거래번호</span>
            <span className="detail-value mono">{tx.id}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">구분</span>
            <span className="detail-value"><TypeBadge type={tx.type} /></span>
          </div>
          <div className="detail-item">
            <span className="detail-label">금액</span>
            <span className="detail-value large">{formatAmount(tx.amount)}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">상태</span>
            <span className="detail-value"><StatusBadge status={tx.status} /></span>
          </div>
          <div className="detail-item">
            <span className="detail-label">일시</span>
            <span className="detail-value">{tx.date}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">계좌번호</span>
            <span className="detail-value mono">{tx.account}</span>
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

      {account && (
        <div className="detail-section">
          <div className="detail-section-title">계좌 정보</div>
          <div className="detail-grid">
            <div className="detail-item">
              <span className="detail-label">계좌번호</span>
              <span className="detail-value mono">{account.number}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">유형</span>
              <span className="detail-value"><TypeBadge type={account.type} /></span>
            </div>
            <div className="detail-item">
              <span className="detail-label">잔액</span>
              <span className="detail-value">{formatAmount(account.balance)}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">금리</span>
              <span className="detail-value">{account.interestRate}%</span>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
