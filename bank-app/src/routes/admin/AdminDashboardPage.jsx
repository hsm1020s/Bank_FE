import { useState } from 'react';
import { auditLogSamples } from '../../data/mockData';
import RiskBadge from '../../components/common/RiskBadge';
import NetworkZoneBadge from '../../components/common/NetworkZoneBadge';
import KinshipBlockedBadge from '../../components/compliance/KinshipBlockedBadge';
import ApprovalChain from '../../components/compliance/ApprovalChain';
import OtpModal from '../../components/modals/OtpModal';
import ThreeStepAuthModal from '../../components/modals/ThreeStepAuthModal';
import HumanReviewModal from '../../components/modals/HumanReviewModal';
import UnmaskModal from '../../components/modals/UnmaskModal';
import FdsBlockModal from '../../components/modals/FdsBlockModal';
import AmlMatchModal from '../../components/modals/AmlMatchModal';
import OcrFallbackModal from '../../components/modals/OcrFallbackModal';

export default function AdminDashboardPage() {
  const [open, setOpen] = useState(null);
  return (
    <div className="col" style={{ gap: 16 }}>
      <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0 }}>통합 대시보드</h1>
        <NetworkZoneBadge zone="business" />
      </div>

      <div className="row">
        <div className="card" style={{ flex: 1 }}>
          <strong>📥 결재 미처리</strong>
          <p style={{ fontSize: 28, fontWeight: 700, margin: '8px 0' }}>7</p>
          <p className="muted">신규 4 · 보류 2 · 반려 1</p>
        </div>
        <div className="card" style={{ flex: 1 }}>
          <strong>🛡 FDS 차단 (오늘)</strong>
          <p style={{ fontSize: 28, fontWeight: 700, margin: '8px 0' }}>12</p>
          <p className="muted">이상거래 자동 차단</p>
        </div>
        <div className="card" style={{ flex: 1 }}>
          <strong>⚠️ AML 보류</strong>
          <p style={{ fontSize: 28, fontWeight: 700, margin: '8px 0' }}>3</p>
          <p className="muted">제재명단 부분 매칭</p>
        </div>
      </div>

      <div className="card">
        <h2>결재 라인 (예시)</h2>
        <ApprovalChain />
        <div className="row" style={{ marginTop: 8 }}>
          <KinshipBlockedBadge />
          <span className="muted">— 친족 관계인 책임자는 자동 제외됩니다.</span>
        </div>
      </div>

      <div className="card">
        <h2>최근 감사로그 (서버 권위)</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--c-border)', textAlign: 'left' }}>
              <th>시각</th><th>주체</th><th>액션</th><th>위험도</th><th>결과</th>
            </tr>
          </thead>
          <tbody>
            {auditLogSamples.map((r, i) => (
              <tr key={i} style={{ borderBottom: '1px dashed var(--c-border)' }}>
                <td>{r.ts}</td>
                <td><code>{r.actor}</code></td>
                <td>{r.action}</td>
                <td><RiskBadge level={r.risk} showLabel={false} /></td>
                <td>{r.result}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <h2>업무 모달 시연</h2>
        <div className="demo-grid">
          <button onClick={() => setOpen('otp')}>OTP (L2)</button>
          <button onClick={() => setOpen('3step')}>3단계 인증 (L3)</button>
          <button onClick={() => setOpen('human')}>사람 검토 요청 (L4)</button>
          <button onClick={() => setOpen('unmask')}>마스킹 풀기</button>
          <button onClick={() => setOpen('fds')}>FDS 차단 안내</button>
          <button onClick={() => setOpen('aml')}>AML 매칭 안내</button>
          <button onClick={() => setOpen('ocr')}>OCR 실패 폴백</button>
        </div>
      </div>

      <OtpModal open={open === 'otp'} onClose={() => setOpen(null)} onVerify={() => setOpen(null)} />
      <ThreeStepAuthModal open={open === '3step'} onClose={() => setOpen(null)} onVerify={() => setOpen(null)} />
      <HumanReviewModal open={open === 'human'} onClose={() => setOpen(null)} onSubmit={() => setOpen(null)} />
      <UnmaskModal open={open === 'unmask'} onClose={() => setOpen(null)} />
      <FdsBlockModal open={open === 'fds'} onClose={() => setOpen(null)} onContact={() => setOpen(null)} />
      <AmlMatchModal open={open === 'aml'} onClose={() => setOpen(null)} />
      <OcrFallbackModal open={open === 'ocr'} onClose={() => setOpen(null)} onVideo={() => setOpen(null)} onVisit={() => setOpen(null)} />
    </div>
  );
}
