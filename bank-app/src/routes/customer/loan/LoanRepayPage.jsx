import { useState } from 'react';
import { Link } from 'react-router-dom';
import { loanContract, loanSchedule, accounts } from '../../../data/mockData';
import ScheduleTable from '../../../components/banking/ScheduleTable';
import OtpModal from '../../../components/modals/OtpModal';
import Modal from '../../../components/common/Modal';

const TABS = [
  { key: 'reg',  label: '정기/미납' },
  { key: 'part', label: '일부 상환' },
  { key: 'full', label: '전액 상환' },
];

export default function LoanRepayPage() {
  const [tab, setTab] = useState('part');
  const [from, setFrom] = useState(accounts[0].id);
  const [amount, setAmount] = useState(5_000_000);
  const [post, setPost] = useState('shorten');
  const [preview, setPreview] = useState(null);
  const [otp, setOtp] = useState(false);
  const [confirm, setConfirm] = useState(false);

  // 중도상환수수료 시뮬: 잔액의 1.5%, 면제일까지 D-Day
  const feeRate = 0.015;
  const fee = Math.round(amount * feeRate);
  const exemptionDate = '2027-06-01';

  const buildPreview = () => {
    const newBalance = Math.max(0, loanContract.remaining - amount);
    const sample = loanSchedule.slice(0, 6).map((r, i) => ({
      ...r,
      principal: Math.round(r.principal * (post === 'reduce' ? newBalance / loanContract.remaining : 1)),
      total: Math.round(r.total * (post === 'reduce' ? newBalance / loanContract.remaining : 1)),
      balance: Math.max(0, newBalance - Math.round(r.principal * (i + 1))),
      status: '예정',
    }));
    setPreview({
      newBalance,
      fee,
      sample,
      token: `prev_${Date.now()}`,
    });
  };

  return (
    <div className="col" style={{ gap: 16 }}>
      <Link to={`/loan/${loanContract.id}`} className="muted">← 대출 상세</Link>
      <h1>대출 상환</h1>

      <div className="row" style={{ flexWrap: 'wrap', gap: 4 }}>
        {TABS.map((t) => (
          <button key={t.key} className={tab === t.key ? 'primary' : ''} onClick={() => setTab(t.key)}>{t.label}</button>
        ))}
      </div>

      {tab === 'reg' && (
        <div className="card">
          <h2>정기 / 미납</h2>
          <p>다음 출금일: <strong>2026-06-15</strong></p>
          <p>이번 회차 미납 0건 — 정상 상태입니다.</p>
        </div>
      )}

      {(tab === 'part' || tab === 'full') && (
        <div className="card col">
          <label>출금 계좌
            <select value={from} onChange={(e) => setFrom(e.target.value)}>
              {accounts.filter((a) => a.status === 'active').map((a) => (
                <option key={a.id} value={a.id}>{a.alias || a.name} ({a.balance.toLocaleString()})</option>
              ))}
            </select>
          </label>

          {tab === 'part' && (
            <>
              <label>상환 금액
                <input type="number" value={amount} onChange={(e) => { setAmount(+e.target.value); setPreview(null); }} />
              </label>
              <label>일부 상환 후 처리
                <select value={post} onChange={(e) => { setPost(e.target.value); setPreview(null); }}>
                  <option value="shorten">만기 단축</option>
                  <option value="reduce">월 납입액 감소</option>
                </select>
              </label>
            </>
          )}
          {tab === 'full' && (
            <p>전액 상환 금액: <strong>{(loanContract.remaining + fee).toLocaleString()}</strong> KRW (수수료 포함)</p>
          )}

          <div className="card" style={{ background: '#fafbfd' }}>
            <strong>중도상환수수료 산정식</strong>
            <p className="muted" style={{ marginTop: 4 }}>
              상환금액 × 수수료율(1.5%) × (남은 약정기간 / 전체 약정기간)
            </p>
            <p>예상 수수료: <strong>{fee.toLocaleString()}</strong> KRW</p>
            <p className="muted">면제일: <strong>{exemptionDate}</strong> 이후 0원</p>
          </div>

          <div className="row">
            <button onClick={buildPreview}>변경 후 스케줄 미리보기</button>
            <button className="primary" disabled={!preview} onClick={() => setOtp(true)}>OTP 인증 후 진행</button>
          </div>

          {preview && (
            <div className="card">
              <h3>미리보기 (당일 24시 만료, 1회 소비)</h3>
              <p className="muted">preview_token: <code>{preview.token}</code></p>
              <p>예상 잔액: <strong>{preview.newBalance.toLocaleString()}</strong> KRW</p>
              <p className="muted">변경 후 첫 6회 스케줄</p>
              <ScheduleTable rows={preview.sample} compact />
              <p className="muted">
                ※ 영업일 변경 / D+1 이상 일할이자 변동 / 0.01% 이상 금리 변동 시 preview 자동 만료 → 재미리보기 강제.
              </p>
            </div>
          )}
        </div>
      )}

      <OtpModal open={otp} onClose={() => setOtp(false)} onVerify={() => { setOtp(false); setConfirm(true); }} />
      <Modal
        open={confirm}
        onClose={() => setConfirm(false)}
        title="최종 확인"
        footer={
          <>
            <button onClick={() => setConfirm(false)}>취소</button>
            <button className="primary" onClick={() => { alert('상환 완료 (idempotency_key 적용)'); setConfirm(false); }}>실행</button>
          </>
        }
      >
        <p>상환 금액 {amount.toLocaleString()} KRW + 수수료 {fee.toLocaleString()} KRW</p>
        <p className="muted">중복 차감 방지 idempotency_key가 적용됩니다. 실행 후 즉시 감사로그 기록.</p>
      </Modal>
    </div>
  );
}
