import { useState } from 'react';
import { accounts, banks, transferLimits } from '../../../data/mockData';
import OtpModal from '../../../components/modals/OtpModal';
import FdsBlockModal from '../../../components/modals/FdsBlockModal';
import Modal from '../../../components/common/Modal';
import RiskBadge from '../../../components/common/RiskBadge';

const TABS = [
  { key: 'now',    label: '즉시 이체' },
  { key: 'sched',  label: '예약 이체' },
  { key: 'fx',     label: '외화 송금' },
  { key: 'recent', label: '자주 쓰는 이체' },
];

const FAVORITES = [
  { name: '엄마', bank: '국민', account: '1234-***-5678', memo: '월용돈' },
  { name: '월세', bank: '신한', account: '8888-***-2222', memo: '월세' },
  { name: '카드결제', bank: '하나', account: '7777-***-1111', memo: '카드' },
];

export default function TransferPage() {
  const [tab, setTab] = useState('now');
  const [from, setFrom] = useState(accounts[0].id);
  const [bank, setBank] = useState(banks[0].code);
  const [acc, setAcc] = useState('');
  const [holder, setHolder] = useState('');
  const [amount, setAmount] = useState(0);
  const [memo, setMemo] = useState('');
  const [otpOpen, setOtpOpen] = useState(false);
  const [arsOpen, setArsOpen] = useState(false);
  const [fdsOpen, setFdsOpen] = useState(false);
  const [accAuthOpen, setAccAuthOpen] = useState(false);

  const fromAccount = accounts.find((a) => a.id === from);
  const overTx = amount > transferLimits.perTx;

  return (
    <div className="col" style={{ gap: 16 }}>
      <h1>이체</h1>

      <div className="row" style={{ flexWrap: 'wrap', gap: 4 }}>
        {TABS.map((t) => (
          <button
            key={t.key}
            className={tab === t.key ? 'primary' : ''}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {(tab === 'now' || tab === 'sched' || tab === 'fx') && (
        <div className="card col">
          <label>출금 계좌
            <select value={from} onChange={(e) => setFrom(e.target.value)}>
              {accounts.filter((a) => a.status === 'active').map((a) => (
                <option key={a.id} value={a.id}>{a.alias || a.name} ({a.number}) — {a.balance.toLocaleString()}</option>
              ))}
            </select>
          </label>

          <div className="row">
            <label style={{ flex: 1 }}>입금 은행
              <select value={bank} onChange={(e) => setBank(e.target.value)}>
                {banks.map((b) => <option key={b.code} value={b.code}>{b.name}</option>)}
              </select>
            </label>
            <label style={{ flex: 2 }}>입금 계좌번호
              <input value={acc} onChange={(e) => setAcc(e.target.value)} placeholder="숫자만" />
            </label>
          </div>

          <div className="row">
            <label style={{ flex: 1 }}>예금주
              <input value={holder} readOnly placeholder="예금주 확인 후 자동 표시" />
            </label>
            <button onClick={() => setHolder('홍** (확인됨)')}>예금주 확인</button>
          </div>

          <div className="row">
            <label style={{ flex: 1 }}>금액
              <input type="number" value={amount} onChange={(e) => setAmount(+e.target.value)} />
            </label>
            <div style={{ flex: 1 }} className="muted">
              1회 한도 {transferLimits.perTx.toLocaleString()} / 1일 {transferLimits.perDay.toLocaleString()}
            </div>
          </div>

          {overTx && (
            <p className="muted" style={{ color: 'var(--c-danger)' }}>
              ⚠️ 1회 한도 초과 — 한도 변경 또는 분할 이체 필요
            </p>
          )}

          <label>받는 분에게 표시
            <input value={memo} onChange={(e) => setMemo(e.target.value)} placeholder="메모" />
          </label>

          {tab === 'sched' && (
            <label>예약 일시
              <input type="datetime-local" />
            </label>
          )}

          {tab === 'fx' && (
            <>
              <label>송금 사유
                <select><option>유학</option><option>여행</option><option>가족송금</option><option>기타</option></select>
              </label>
              <p className="muted">실시간 환율 USD 1 = 1,378.20 KRW (시연)</p>
            </>
          )}

          <p className="muted">
            <RiskBadge level="L2" /> — 본 이체는 OTP 추가 인증이 필요합니다.
            (사전 동의 미검증 / KFTC 장애 시 자행 한정 모드 / 청각장애인 ARS 대체 — 영상·문자·창구)
          </p>

          <div className="row">
            <button className="primary" disabled={overTx} onClick={() => setOtpOpen(true)}>이체 (OTP)</button>
            <button onClick={() => setArsOpen(true)}>ARS 인증</button>
            <button onClick={() => setAccAuthOpen(true)}>청각장애인 대체</button>
            <button className="danger" onClick={() => setFdsOpen(true)}>FDS 차단 시뮬</button>
          </div>
        </div>
      )}

      {tab === 'recent' && (
        <div className="card">
          <h2>자주 쓰는 이체</h2>
          <ul style={{ paddingLeft: 16 }}>
            {FAVORITES.map((f, i) => (
              <li key={i} style={{ padding: 8, borderBottom: '1px dashed var(--c-border)' }}>
                <strong>{f.name}</strong> — {f.bank} {f.account} <span className="muted">({f.memo})</span>
                <button style={{ marginLeft: 8 }} onClick={() => setTab('now')}>선택</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="muted" style={{ fontSize: 12 }}>
        출금 계좌 잔액: {fromAccount.balance.toLocaleString()} {fromAccount.currency}.
        고액/신규 수취인은 60분 지연(hold) 적용. 사전 동의 채널은 미검증으로 분류됩니다.
      </p>

      <OtpModal open={otpOpen} onClose={() => setOtpOpen(false)} onVerify={() => { setOtpOpen(false); alert('이체 완료 (시연)'); }} />
      <FdsBlockModal open={fdsOpen} onClose={() => setFdsOpen(false)} onContact={() => setFdsOpen(false)} />
      <Modal
        open={arsOpen}
        onClose={() => setArsOpen(false)}
        title="ARS 인증 (전화 응답)"
      >
        <p>등록된 전화번호로 자동응답 시스템이 호출합니다. 안내에 따라 4자리 비밀번호를 입력하세요.</p>
      </Modal>
      <Modal
        open={accAuthOpen}
        onClose={() => setAccAuthOpen(false)}
        title="청각장애인 대체 인증"
        footer={<button onClick={() => setAccAuthOpen(false)}>닫기</button>}
      >
        <p>ARS 사용이 어려운 경우 다음 중 하나로 대체할 수 있습니다:</p>
        <ul>
          <li>영상통화 인증 (대기 약 3~5분)</li>
          <li>문자(SMS) 인증</li>
          <li>가까운 영업점 내방 본인확인</li>
        </ul>
      </Modal>
    </div>
  );
}
