import { useState } from 'react';
import { accounts } from '../../data/mockData';
import UnmaskModal from '../../components/modals/UnmaskModal';
import MaskingWatermark from '../../components/compliance/MaskingWatermark';
import RiskBadge from '../../components/common/RiskBadge';

export default function DashboardPage() {
  const [unmask, setUnmask] = useState(false);
  return (
    <div className="col" style={{ gap: 16 }}>
      <h1>대시보드 (고객)</h1>
      <div className="row">
        {accounts.map((a) => (
          <div key={a.number} className="card" style={{ flex: 1, minWidth: 240 }}>
            <div className="muted">{a.name} <RiskBadge level="L0" showLabel={false} /></div>
            <h2 style={{ marginTop: 8 }}>{a.number}</h2>
            <p style={{ fontSize: 22, fontWeight: 700 }}>{a.balance.toLocaleString()} {a.currency}</p>
            <button onClick={() => setUnmask(true)}>마스킹 풀기</button>
          </div>
        ))}
      </div>
      <div className="card">
        <h2>본인확인 정보 (워터마크 데모)</h2>
        <MaskingWatermark>
          <p>홍길동 · 881212-1******</p>
          <p>주소: 서울특별시 강남구 ***</p>
        </MaskingWatermark>
      </div>
      <UnmaskModal open={unmask} onClose={() => setUnmask(false)} />
    </div>
  );
}
