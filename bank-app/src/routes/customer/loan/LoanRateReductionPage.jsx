import { useState } from 'react';
import { Link } from 'react-router-dom';
import { loanContract } from '../../../data/mockData';

export default function LoanRateReductionPage() {
  const [reasons, setReasons] = useState({ income_up: false, job_up: false, family_change: false, credit_up: false });
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="col" style={{ gap: 16, maxWidth: 720 }}>
      <Link to={`/loan/${loanContract.id}`} className="muted">← 대출 상세</Link>
      <h1>금리 인하 요구권</h1>

      <div className="card" style={{ background: '#e1efff', borderColor: '#a8c8eb' }}>
        ℹ️ 신청 가능 시점: 대출 실행 후 <strong>6개월 경과</strong>. 결과는 <strong>14영업일 이내</strong> 통지 의무.
      </div>

      <section className="card">
        <h2>약정 요약</h2>
        <p>약정 ID: <code>{loanContract.id}</code> · 현재 금리: {loanContract.rate}% ({loanContract.rateType})</p>
      </section>

      <section className="card">
        <h2>신청 사유</h2>
        <label className="consent-line">
          <input type="checkbox" checked={reasons.income_up} onChange={(e) => setReasons({ ...reasons, income_up: e.target.checked })} />
          소득 증가 (재직증명서 + 소득증명원 첨부)
        </label>
        <label className="consent-line">
          <input type="checkbox" checked={reasons.job_up} onChange={(e) => setReasons({ ...reasons, job_up: e.target.checked })} />
          승진/취업 변경 (재직증명서)
        </label>
        <label className="consent-line">
          <input type="checkbox" checked={reasons.family_change} onChange={(e) => setReasons({ ...reasons, family_change: e.target.checked })} />
          부양가족 감소
        </label>
        <label className="consent-line">
          <input type="checkbox" checked={reasons.credit_up} onChange={(e) => setReasons({ ...reasons, credit_up: e.target.checked })} />
          신용도 개선 (CB 점수 상승)
        </label>
        <input type="file" multiple accept=".pdf" />
        <button className="primary" disabled={Object.values(reasons).every((v) => !v)} onClick={() => setSubmitted(true)} style={{ marginTop: 8 }}>제출</button>
      </section>

      {submitted && (
        <section className="card" style={{ background: '#e6f3ea', borderColor: '#a8d8b9' }}>
          ✅ 신청 접수 — <strong>14영업일</strong> 이내에 결과를 알림으로 통지합니다.
          <ul>
            <li>거절 사유 분기:
              <ul>
                <li><strong>보완 가능</strong> 사유 → 즉시 재제출 가능</li>
                <li><strong>자격 미충족</strong> 사유 → 6개월 대기 후 재신청</li>
              </ul>
            </li>
            <li>수용 시 → 신규 약정서 체결 (CUS-014)</li>
          </ul>
        </section>
      )}
    </div>
  );
}
