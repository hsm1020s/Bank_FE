import { useState } from 'react';
import PipaConsentModal from '../../components/modals/PipaConsentModal';
import TermsScrollModal from '../../components/modals/TermsScrollModal';

export default function SignupPage() {
  const [pipaOpen, setPipaOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  return (
    <div className="col" style={{ maxWidth: 480, margin: '24px auto', gap: 16 }}>
      <div className="card">
        <h1>회원가입</h1>
        <p className="muted">신규 계좌 개설/회원가입 절차의 공통 화면입니다.</p>
        <div className="col">
          <button onClick={() => setTermsOpen(true)}>① 약관 (스크롤 강제)</button>
          <button onClick={() => setPipaOpen(true)}>② 개인정보 동의 (PIPA)</button>
          <button>③ 본인확인 (휴대폰 / 신분증 OCR)</button>
          <button className="primary">④ 가입 완료</button>
        </div>
      </div>
      <TermsScrollModal open={termsOpen} onClose={() => setTermsOpen(false)} onAgree={() => setTermsOpen(false)} />
      <PipaConsentModal open={pipaOpen} onClose={() => setPipaOpen(false)} onSubmit={() => setPipaOpen(false)} />
    </div>
  );
}
