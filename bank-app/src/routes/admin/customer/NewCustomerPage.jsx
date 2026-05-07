import { useState } from 'react';
import { newCustomerSteps } from '../../../data/mockData';
import Stepper from '../../../components/banking/Stepper';

export default function NewCustomerPage() {
  const [step, setStep] = useState(0);
  const [provisional, setProvisional] = useState(false);

  return (
    <div className="col" style={{ gap: 16, maxWidth: 720 }}>
      <h1>신규 고객 등록 (대면) (EMP-005)</h1>
      <Stepper steps={newCustomerSteps} current={step} />

      <section className="card">
        {step === 0 && <p>📷 신분증 OCR — 명세 키 인식</p>}
        {step === 1 && <p>🤳 본인 사진 / OCR 사진 얼굴 비교 — 점수 ≥ 0.7 필요</p>}
        {step === 2 && (
          <>
            <p>행정안전부 진위확인 API 호출 (타임아웃 5초)</p>
            <button onClick={() => { setProvisional(true); setStep((s) => s + 1); }}>5초 타임아웃 시뮬 (가등록)</button>
          </>
        )}
        {step === 3 && <p>AML / PEP / 제재 스크리닝 — 실시간 결과: 클린</p>}
        {step === 4 && (
          <>
            <p>책임자 결재 — 가등록 24h 내 재검증 강제.</p>
            {provisional && <span className="badge l3">가등록 (한도 0)</span>}
          </>
        )}
        {step === 5 && <p>✅ 등록 완료 — CIF 발급</p>}
      </section>

      <div className="row" style={{ justifyContent: 'space-between' }}>
        <button disabled={step === 0} onClick={() => setStep((s) => s - 1)}>이전</button>
        <button className="primary" disabled={step === newCustomerSteps.length - 1} onClick={() => setStep((s) => s + 1)}>다음</button>
      </div>
    </div>
  );
}
