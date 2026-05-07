import { useState } from 'react';
import { Link } from 'react-router-dom';
import Stepper from '../../../components/banking/Stepper';
import DsrGauge from '../../../components/banking/DsrGauge';
import RecordingConsentModal from '../../../components/modals/RecordingConsentModal';
import TermsScrollModal from '../../../components/modals/TermsScrollModal';
import RiskBadge from '../../../components/common/RiskBadge';

const STEPS = [
  '상품 선택', '적합성', '본인/소득증빙',
  '한도/금리 산출', '조건 선택', '핵심설명서',
  '약관/서명', '숙려기간', '실행 예약',
];

const LOAN_PRODUCTS = [
  { code: 'L-CR', name: '신용대출', rate: '4.2~7.9' },
  { code: 'L-MTG', name: '주택담보대출', rate: '3.5~5.4' },
  { code: 'L-DEP', name: '예적금담보', rate: '예적금금리+1.0' },
];

export default function LoanApplyPage() {
  const [step, setStep] = useState(0);
  const [product, setProduct] = useState(null);
  const [income, setIncome] = useState(60000000);
  const [requested, setRequested] = useState(50000000);
  const [period, setPeriod] = useState(60);
  const [recOpen, setRecOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const [contemplate, setContemplate] = useState(48 * 60 * 60); // 48h

  // 단순 시뮬: 신청금액의 연 5.4% × 12개월을 연봉으로 나눈 비율 + 기존 부채 가정 20%
  const annualPay = (requested * 0.054) + (requested / period) * 12;
  const dsr = ((annualPay / income) * 100) + 20;

  const next = () => setStep((s) => Math.min(STEPS.length - 1, s + 1));
  const prev = () => setStep((s) => Math.max(0, s - 1));

  const blocked = dsr >= 50;

  return (
    <div className="col" style={{ gap: 16 }}>
      <h1>대출 신청</h1>
      <Stepper steps={STEPS} current={step} />

      <section className="card">
        {step === 0 && (
          <>
            <h2>상품 선택</h2>
            <div className="demo-grid">
              {LOAN_PRODUCTS.map((p) => (
                <button
                  key={p.code}
                  onClick={() => setProduct(p)}
                  className={product?.code === p.code ? 'primary' : ''}
                  style={{ textAlign: 'left', padding: 12, height: 'auto' }}
                >
                  <strong>{p.name}</strong>
                  <div className="muted" style={{ marginTop: 4 }}>금리 {p.rate}%</div>
                </button>
              ))}
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <h2>적합성 진단</h2>
            <p className="muted">CIA 본 동의 필요 — 신용정보 활용에 동의해야 진행됩니다.</p>
            <ul>
              <li>대출 목적은? <select><option>생활자금</option><option>주거</option><option>사업</option></select></li>
              <li>소득의 정기성? <select><option>정기</option><option>비정기</option></select></li>
              <li>총 10문항 …</li>
            </ul>
            <p className="muted">부적합 진단 시: 별도 동의 + 음성 녹취 후에만 강행 가능.</p>
            <button onClick={() => setRecOpen(true)}>부적합 강행 — 녹취 동의</button>
          </>
        )}

        {step === 2 && (
          <>
            <h2>본인 / 소득 증빙</h2>
            <div className="col">
              <label>직업
                <select><option>회사원</option><option>자영업</option><option>전문직</option></select>
              </label>
              <label>연소득 (KRW)
                <input type="number" value={income} onChange={(e) => setIncome(+e.target.value)} />
              </label>
              <label>재직 기간
                <input placeholder="예: 5년 3개월" />
              </label>
              <label>부양 가족
                <input type="number" defaultValue={2} />
              </label>
              <label>소득 증빙 (PDF)
                <input type="file" accept=".pdf" />
              </label>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2>한도 / 금리 산출 (CB → CSS)</h2>
            <div className="row">
              <div className="card" style={{ flex: 1 }}>
                <div className="muted">신용등급</div>
                <h2 style={{ marginTop: 4 }}>3등급 (CSS 720)</h2>
              </div>
              <div className="card" style={{ flex: 1 }}>
                <div className="muted">예상 한도</div>
                <h2 style={{ marginTop: 4 }}>1.2억 KRW</h2>
              </div>
              <div className="card" style={{ flex: 1 }}>
                <div className="muted">제시 금리</div>
                <h2 style={{ marginTop: 4 }}>5.4% (변동)</h2>
              </div>
            </div>
            <div style={{ marginTop: 12 }}>
              <DsrGauge value={dsr} />
            </div>
            {blocked && (
              <p className="muted" style={{ color: 'var(--c-danger)', marginTop: 8 }}>
                ⛔ DSR 50% 이상 — 신청 차단됩니다. 신청금액/기간을 조정하거나 사람 검토를 요청하세요.
              </p>
            )}
          </>
        )}

        {step === 4 && (
          <>
            <h2>조건 선택</h2>
            <div className="col">
              <label>신청 금액
                <input type="number" value={requested} onChange={(e) => setRequested(+e.target.value)} />
              </label>
              <label>약정 기간 (개월)
                <input type="number" value={period} onChange={(e) => setPeriod(+e.target.value)} />
              </label>
              <label>상환 방식
                <select><option>원리금균등</option><option>원금균등</option><option>만기일시</option></select>
              </label>
              <label>거치 기간
                <select><option>없음</option><option>6개월</option><option>12개월</option></select>
              </label>
              <label>금리 옵션
                <select><option>변동</option><option>고정</option><option>혼합 5/5</option></select>
              </label>
              <label>출금일 (1~28일)
                <input type="number" min={1} max={28} defaultValue={15} />
              </label>
              <label>휴일 처리
                <select><option>익영업일</option><option>전영업일</option></select>
              </label>
            </div>
            <p className="muted" style={{ marginTop: 8 }}>예상 월상환액 ≈ {Math.round(requested / period * 1.06).toLocaleString()} KRW</p>
          </>
        )}

        {step === 5 && (
          <>
            <h2>핵심 설명서</h2>
            <p className="muted">[PDF + 음성 시뮬] 이자 산정, 중도상환수수료, 연체 시 가산금리 등 의무 안내 사항을 확인하세요.</p>
            <button>🔊 음성으로 듣기</button>
          </>
        )}

        {step === 6 && (
          <>
            <h2>약관 / 서명</h2>
            <button onClick={() => setTermsOpen(true)}>약관 전문 (스크롤 강제)</button>
            <p className="muted">약관 끝까지 확인 후 인증서 서명을 진행합니다.</p>
          </>
        )}

        {step === 7 && (
          <>
            <h2>숙려기간 (24~48시간)</h2>
            <p>실행까지 남은 숙려 시간: <strong>{Math.floor(contemplate / 3600)}시간 {Math.floor((contemplate % 3600) / 60)}분</strong></p>
            <button onClick={() => setContemplate((c) => Math.max(0, c - 3600))}>1시간 시뮬 단축</button>
            <p className="muted" style={{ marginTop: 8 }}>
              숙려 중 철회 가능. 명시적 즉시 실행은 1억 미만 + 저위험만 허용 (사유 + OTP + ARS 추가 인증 필요).
            </p>
            <RiskBadge level="L3" />
          </>
        )}

        {step === 8 && (
          <>
            <h2>✅ 실행 예약 완료</h2>
            <p>실행 시점에 DSR 재산출 — 5%p 이상 변동 시 재확인이 필요합니다.</p>
            <Link to="/dashboard"><button className="primary">대시보드로</button></Link>
          </>
        )}
      </section>

      <div className="row" style={{ justifyContent: 'space-between' }}>
        <button onClick={prev} disabled={step === 0}>이전</button>
        <button onClick={next} disabled={step === STEPS.length - 1 || (step === 3 && blocked)} className="primary">
          다음
        </button>
      </div>

      <RecordingConsentModal open={recOpen} onClose={() => setRecOpen(false)} onConsent={() => setRecOpen(false)} />
      <TermsScrollModal open={termsOpen} onClose={() => setTermsOpen(false)} onAgree={() => setTermsOpen(false)} />
    </div>
  );
}
