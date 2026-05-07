import { useState } from 'react';
import { Link } from 'react-router-dom';
import FcpaRateBanner from '../../components/compliance/FcpaRateBanner';
import AutoDecisionRefusal from '../../components/compliance/AutoDecisionRefusal';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';
import ProgressBar from '../../components/common/ProgressBar';
import RiskBadge from '../../components/common/RiskBadge';

import SessionTimeoutModal from '../../components/modals/SessionTimeoutModal';
import AuthStepUpModal from '../../components/modals/AuthStepUpModal';
import DeviceRegistrationModal from '../../components/modals/DeviceRegistrationModal';
import UnmaskModal from '../../components/modals/UnmaskModal';
import OtpModal from '../../components/modals/OtpModal';
import ThreeStepAuthModal from '../../components/modals/ThreeStepAuthModal';
import HumanReviewModal from '../../components/modals/HumanReviewModal';
import RecordingConsentModal from '../../components/modals/RecordingConsentModal';
import PipaConsentModal from '../../components/modals/PipaConsentModal';
import TermsScrollModal from '../../components/modals/TermsScrollModal';
import FdsBlockModal from '../../components/modals/FdsBlockModal';
import AmlMatchModal from '../../components/modals/AmlMatchModal';
import OcrFallbackModal from '../../components/modals/OcrFallbackModal';
import EmergencyLogoutModal from '../../components/modals/EmergencyLogoutModal';

const MODALS = [
  { key: 'session', label: '세션 만료 임박', Comp: SessionTimeoutModal },
  { key: 'stepup', label: '인증 승급 (2→3)', Comp: AuthStepUpModal },
  { key: 'device', label: '디바이스 등록', Comp: DeviceRegistrationModal },
  { key: 'unmask', label: '마스킹 풀기', Comp: UnmaskModal },
  { key: 'otp', label: 'OTP (L2)', Comp: OtpModal },
  { key: '3step', label: '3단계 인증 (L3)', Comp: ThreeStepAuthModal },
  { key: 'human', label: '사람 검토 요청 (L4)', Comp: HumanReviewModal },
  { key: 'rec', label: '녹취 동의', Comp: RecordingConsentModal },
  { key: 'pipa', label: 'PIPA 동의', Comp: PipaConsentModal },
  { key: 'terms', label: '약관 (스크롤 강제)', Comp: TermsScrollModal },
  { key: 'fds', label: 'FDS 차단', Comp: FdsBlockModal },
  { key: 'aml', label: 'AML 매칭', Comp: AmlMatchModal },
  { key: 'ocr', label: 'OCR 실패', Comp: OcrFallbackModal },
  { key: 'emer', label: '비상 로그아웃', Comp: EmergencyLogoutModal },
];

export default function HomePage() {
  const [openKey, setOpenKey] = useState(null);
  return (
    <div className="col" style={{ gap: 24 }}>
      <section className="card">
        <h1>🏦 코어뱅킹 시뮬레이터 — 공통 화면</h1>
        <p className="muted">
          이 페이지는 화면정의서 <code>00_공통/</code> 명세를 React로 정적 목업한 결과입니다.
          실제 API/세션/RBAC은 다음 페이즈에서 연결합니다.
        </p>
        <div className="row" style={{ marginTop: 12 }}>
          <Link to="/login"><button>로그인</button></Link>
          <Link to="/signup"><button>회원가입</button></Link>
          <Link to="/dashboard"><button className="primary">대시보드</button></Link>
          <Link to="/admin"><button>직원 콘솔로 이동</button></Link>
        </div>
      </section>

      <section className="card">
        <h2>공통 모달 시연 (14종)</h2>
        <p className="muted">버튼을 눌러 명세에 정의된 모든 공통 모달을 직접 확인할 수 있습니다.</p>
        <div className="demo-grid" style={{ marginTop: 12 }}>
          {MODALS.map((m) => (
            <button key={m.key} onClick={() => setOpenKey(m.key)}>{m.label}</button>
          ))}
        </div>
      </section>

      <section className="row" style={{ alignItems: 'flex-start' }}>
        <div style={{ flex: 1, minWidth: 280 }}><FcpaRateBanner /></div>
        <div style={{ flex: 1, minWidth: 280 }}><AutoDecisionRefusal /></div>
      </section>

      <section className="card">
        <h2>위험도(L0~L4) 시각 비교</h2>
        <div className="row">
          {['L0', 'L1', 'L2', 'L3', 'L4'].map((l) => <RiskBadge key={l} level={l} />)}
        </div>
        <p className="muted" style={{ marginTop: 8 }}>색·아이콘·텍스트 3중 표시.</p>
      </section>

      <section className="card">
        <h2>로딩/진행 표시</h2>
        <LoadingSkeleton lines={3} />
        <div style={{ marginTop: 12 }}><ProgressBar value={42} label="외부 IF 응답 대기" /></div>
      </section>

      {MODALS.map((m) => (
        <m.Comp
          key={m.key}
          open={openKey === m.key}
          onClose={() => setOpenKey(null)}
          onContinue={() => setOpenKey(null)}
          onComplete={() => setOpenKey(null)}
          onRegister={() => setOpenKey(null)}
          onVerify={() => setOpenKey(null)}
          onSubmit={() => setOpenKey(null)}
          onConsent={() => setOpenKey(null)}
          onAgree={() => setOpenKey(null)}
          onContact={() => setOpenKey(null)}
          onVideo={() => setOpenKey(null)}
          onVisit={() => setOpenKey(null)}
          onConfirm={() => setOpenKey(null)}
        />
      ))}
    </div>
  );
}
