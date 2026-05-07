import { useState } from 'react';
import Stepper from '../../components/banking/Stepper';
import PipaConsentModal from '../../components/modals/PipaConsentModal';
import TermsScrollModal from '../../components/modals/TermsScrollModal';
import OcrFallbackModal from '../../components/modals/OcrFallbackModal';
import PasswordField from '../../components/auth/PasswordField';

const STEPS = ['약관', '개인정보 동의', '신분증 OCR', '진위 확인 API', '셀피 라이브니스', '연락처 인증', '비밀번호 설정', '완료'];

export default function SignupPage() {
  const [step, setStep] = useState(0);
  const [pipaOpen, setPipaOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const [ocrFail, setOcrFail] = useState(false);

  return (
    <div className="col" style={{ maxWidth: 640, margin: '24px auto', gap: 16 }}>
      <h1>회원가입 / 비대면 실명확인</h1>
      <Stepper steps={STEPS} current={step} />

      <div className="card">
        {step === 0 && (
          <>
            <h2>약관</h2>
            <button onClick={() => setTermsOpen(true)}>약관 전문 (스크롤 강제)</button>
          </>
        )}
        {step === 1 && (
          <>
            <h2>개인정보 동의</h2>
            <button onClick={() => setPipaOpen(true)}>PIPA 동의</button>
          </>
        )}
        {step === 2 && (
          <>
            <h2>신분증 OCR</h2>
            <div className="card" style={{ background: '#1c2330', color: '#aaa', textAlign: 'center', minHeight: 140, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              📷 신분증 촬영 시뮬
            </div>
            <button onClick={() => setOcrFail(true)}>OCR 실패 시뮬</button>
          </>
        )}
        {step === 3 && (
          <>
            <h2>진위 확인 API</h2>
            <p className="muted">행정안전부 본인확인기관 호출 — 응답 약 1.5초</p>
            <p>✅ 진위 확인 완료</p>
          </>
        )}
        {step === 4 && (
          <>
            <h2>셀피 라이브니스</h2>
            <p className="muted">정면 응시 + 깜빡임 + 좌우 회전 (3단계)</p>
            <div className="card" style={{ background: '#1c2330', color: '#aaa', textAlign: 'center', minHeight: 140, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              🤳 라이브니스 시뮬
            </div>
          </>
        )}
        {step === 5 && (
          <>
            <h2>연락처 인증</h2>
            <p className="muted">3택: 영상통화 / 1원 입금 / 통신사 본인확인</p>
            <div className="row">
              <button>영상통화</button>
              <button>1원 입금 확인</button>
              <button>통신사 본인확인</button>
            </div>
          </>
        )}
        {step === 6 && (
          <>
            <h2>비밀번호 설정</h2>
            <PasswordField label="새 비밀번호" name="new" autoComplete="new-password" />
            <PasswordField label="비밀번호 확인" name="confirm" autoComplete="new-password" />
          </>
        )}
        {step === 7 && (
          <>
            <h2>✅ 가입 완료 — 한도제한계좌</h2>
            <p>가입 직후에는 한도제한계좌가 적용됩니다.</p>
            <ul>
              <li>1회 이체 한도: <strong>1,000,000 KRW</strong></li>
              <li>1일 이체 한도: <strong>3,000,000 KRW</strong></li>
              <li>해제 조건: 영업점 내방 또는 영상통화 본인확인</li>
            </ul>
          </>
        )}
      </div>

      <div className="row" style={{ justifyContent: 'space-between' }}>
        <button onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>이전</button>
        <button className="primary" onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))} disabled={step === STEPS.length - 1}>다음</button>
      </div>

      <TermsScrollModal open={termsOpen} onClose={() => setTermsOpen(false)} onAgree={() => setTermsOpen(false)} />
      <PipaConsentModal open={pipaOpen} onClose={() => setPipaOpen(false)} onSubmit={() => setPipaOpen(false)} />
      <OcrFallbackModal open={ocrFail} onClose={() => setOcrFail(false)} onVideo={() => setOcrFail(false)} onVisit={() => setOcrFail(false)} />
    </div>
  );
}
