import { useState } from 'react';
import { Link } from 'react-router-dom';
import { productCatalog } from '../../../data/mockData';
import Stepper from '../../../components/banking/Stepper';
import TermsScrollModal from '../../../components/modals/TermsScrollModal';
import RiskBadge from '../../../components/common/RiskBadge';

const STEPS = ['상품 선택', '적합성', '조건 입력', '핵심설명서', '약관', '서명', '한도', '완료'];

export default function DepositOpenPage() {
  const [step, setStep] = useState(0);
  const [product, setProduct] = useState(null);
  const [amount, setAmount] = useState(1_000_000);
  const [term, setTerm] = useState('12');
  const [agreed, setAgreed] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  const next = () => setStep((s) => Math.min(STEPS.length - 1, s + 1));
  const prev = () => setStep((s) => Math.max(0, s - 1));
  const canNext = () => {
    if (step === 0) return !!product;
    if (step === 4) return agreed;
    return true;
  };

  return (
    <div className="col" style={{ gap: 16 }}>
      <div className="row" style={{ alignItems: 'baseline' }}>
        <Link to="/deposit" className="muted">← 목록</Link>
        <h1 style={{ margin: 0 }}>수신 신규 계좌 개설</h1>
      </div>

      <Stepper steps={STEPS} current={step} />

      <section className="card">
        {step === 0 && (
          <>
            <h2>상품 선택</h2>
            <div className="demo-grid">
              {productCatalog.map((p) => (
                <button
                  key={p.code}
                  onClick={() => setProduct(p)}
                  className={product?.code === p.code ? 'primary' : ''}
                  style={{ textAlign: 'left', padding: 12, height: 'auto' }}
                >
                  <strong>{p.name}</strong>
                  <div className="muted" style={{ marginTop: 4 }}>{p.kind} · {p.period}</div>
                  <div style={{ marginTop: 4 }}>금리 {p.rate}%</div>
                </button>
              ))}
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <h2>적합성 진단 (10문항 시연)</h2>
            <ol>
              <li>본 상품 목적은? <select><option>저축</option><option>투자</option><option>유동성 확보</option></select></li>
              <li>소득 정기성? <select><option>정기</option><option>비정기</option></select></li>
              <li>...총 10문항</li>
            </ol>
            <p className="muted">부적합 진단 시 별도 동의 + 녹취 후에만 진행 가능합니다.</p>
          </>
        )}

        {step === 2 && (
          <>
            <h2>조건 입력 — {product?.name}</h2>
            <div className="col">
              <label>금액 (KRW)
                <input type="number" value={amount} onChange={(e) => setAmount(+e.target.value)} />
              </label>
              <label>기간
                <select value={term} onChange={(e) => setTerm(e.target.value)}>
                  <option value="6">6개월</option><option value="12">12개월</option><option value="24">24개월</option>
                </select>
              </label>
              <label>출금 계좌
                <select><option>1002-***-1234 주거래통장</option></select>
              </label>
              <label>비과세 자격 <input type="checkbox" /> (해당 시)</label>
              <label>자금 원천
                <select><option>근로소득</option><option>사업소득</option><option>증여</option><option>기타</option></select>
              </label>
            </div>
            <p className="muted">예상 만기 수령액: <strong>{Math.round(amount * (1 + (product?.rate || 0) / 100 * (+term / 12))).toLocaleString()}</strong> KRW</p>
          </>
        )}

        {step === 3 && (
          <>
            <h2>핵심 설명서 (PDF + 음성)</h2>
            <div className="card" style={{ background: '#fafbfd', minHeight: 160 }}>
              <p className="muted">[PDF 뷰어 시뮬]</p>
              <p>본 상품은 원금 보장 + 이자 과세(15.4%) 상품입니다. 중도 해지 시 약정 금리가 아닌 중도해지 금리가 적용됩니다 …</p>
            </div>
            <button>🔊 음성으로 듣기</button>
            <p className="muted" style={{ marginTop: 8 }}>핵심설명서 확인은 필수입니다 (감사로그 기록).</p>
          </>
        )}

        {step === 4 && (
          <>
            <h2>약관 동의</h2>
            <button onClick={() => setTermsOpen(true)}>약관 전문 (스크롤 강제)</button>
            <div className="consent-line" style={{ marginTop: 12 }}>
              <input type="checkbox" id="agr" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
              <label htmlFor="agr">위 약관을 모두 확인했고 동의합니다.</label>
            </div>
          </>
        )}

        {step === 5 && (
          <>
            <h2>서명</h2>
            <div className="card" style={{ background: '#1c2330', color: '#aaa', textAlign: 'center', height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              [공동/금융 인증서 서명 시뮬]
            </div>
          </>
        )}

        {step === 6 && (
          <>
            <h2>한도 안내 <RiskBadge level="L2" /></h2>
            <ul>
              <li>1회 한도: 50,000,000 KRW</li>
              <li>1일 한도: 100,000,000 KRW</li>
              <li>본 거래 OTP 추가 인증 후 진행됩니다.</li>
            </ul>
          </>
        )}

        {step === 7 && (
          <>
            <h2>✅ 개설 완료</h2>
            <p>{product?.name} · {amount.toLocaleString()} KRW · {term}개월</p>
            <Link to="/deposit"><button className="primary">목록으로</button></Link>
          </>
        )}
      </section>

      <div className="row" style={{ justifyContent: 'space-between' }}>
        <button onClick={prev} disabled={step === 0}>이전</button>
        <button onClick={next} disabled={step === STEPS.length - 1 || !canNext()} className="primary">
          {step === STEPS.length - 2 ? '개설하기' : '다음'}
        </button>
      </div>

      <TermsScrollModal
        open={termsOpen}
        onClose={() => setTermsOpen(false)}
        onAgree={() => { setAgreed(true); setTermsOpen(false); }}
      />
    </div>
  );
}
