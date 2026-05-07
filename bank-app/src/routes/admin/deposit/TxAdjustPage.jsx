import { useState } from 'react';
import { txAdjustReasons } from '../../../data/mockData';

export default function TxAdjustPage() {
  const [reason, setReason] = useState(txAdjustReasons[0].code);
  const [today, setToday] = useState(true);

  return (
    <div className="col" style={{ gap: 16, maxWidth: 720 }}>
      <h1>수신 거래 정정 / 취소 (EMP-008)</h1>

      <div className="card" style={{ background: '#fff4d6', borderColor: '#f3e2a1' }}>
        ⚠️ 다중 차단 — 24h 5건 / 동일 대상 7일 2회 / 지점 24h 20건 / 1억+ 자동 차단
      </div>

      <section className="card">
        <h2>거래 검색</h2>
        <input placeholder="거래 ID / 계좌 / 금액" />
        <p className="muted" style={{ marginTop: 8 }}>당일 거래는 직접 정정 / 익일 이후는 역거래 생성 / 환수 실패 시 손실 인식</p>
        <label className="row" style={{ alignItems: 'center', gap: 8 }}>
          <input type="checkbox" checked={today} onChange={(e) => setToday(e.target.checked)} />
          <span>당일 거래 (체크 해제 시 역거래)</span>
        </label>
      </section>

      <section className="card">
        <h2>정정 사유</h2>
        <select value={reason} onChange={(e) => setReason(e.target.value)}>
          {txAdjustReasons.map((r) => <option key={r.code} value={r.code}>{r.label}</option>)}
        </select>
        {reason === 'OTHER' && <p className="muted" style={{ color: 'var(--c-warn)' }}>OTHER 사유 — 컴플라이언스 결재가 추가됩니다.</p>}
      </section>

      <section className="card">
        <h2>영향 미리보기</h2>
        <ul>
          <li>대상 계좌 잔액 변경: -1,000,000 KRW</li>
          <li>이자/세금 재계산: 자동</li>
          <li>감사로그 기록: 정정 + 사유 + 결재선</li>
        </ul>
      </section>

      <button className="primary">정정/취소 제출</button>
    </div>
  );
}
