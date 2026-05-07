import { useState } from 'react';
import { Link } from 'react-router-dom';
import { customerSearchResults } from '../../../data/mockData';
import UnmaskModal from '../../../components/modals/UnmaskModal';
import MaskingWatermark from '../../../components/compliance/MaskingWatermark';

const REASONS = ['상담', '민원 처리', '서류 발급', '본인확인', '감사/조사'];

export default function CustomerSearchPage() {
  const [reason, setReason] = useState(REASONS[0]);
  const [q, setQ] = useState('');
  const [unmask, setUnmask] = useState(false);
  const dailyCount = 14;

  return (
    <div className="col" style={{ gap: 16 }}>
      <h1>고객 검색 (EMP-003)</h1>

      <div className="card" style={{ background: '#e1efff', borderColor: '#a8c8eb' }}>
        ℹ️ 본인확인 사유 필수. 사유 × 권한 매트릭스로 노출 필드 자동 필터링.
        오늘 마스킹 풀기: <strong>{dailyCount}/20</strong>건 (일일 임계). 30초 자동 재마스킹 의무. 본인 가족 검색 자동 차단.
      </div>

      <section className="card">
        <div className="row" style={{ flexWrap: 'wrap', gap: 8 }}>
          <label>사유 <select value={reason} onChange={(e) => setReason(e.target.value)}>{REASONS.map((r) => <option key={r}>{r}</option>)}</select></label>
          <input placeholder="고객명/주민번호/계좌/연락처 (2자+)" value={q} onChange={(e) => setQ(e.target.value)} style={{ flex: 1, minWidth: 240 }} />
          <button>검색</button>
        </div>
      </section>

      <section className="card">
        <h2>결과</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--c-border)', textAlign: 'left' }}>
              <th>CIF ID</th><th>이름</th><th>주민번호</th><th>연락처</th><th>지점</th><th></th>
            </tr>
          </thead>
          <tbody>
            {customerSearchResults.map((r) => (
              <tr key={r.id} style={{ borderBottom: '1px dashed var(--c-border)' }}>
                <td><code>{r.id}</code></td>
                <td>{r.name}</td>
                <td><code>{r.resident}</code></td>
                <td>{r.phone}</td>
                <td>{r.branch}</td>
                <td>
                  <Link to={`/admin/customer/${r.id}`}><button>CIF</button></Link>
                  <button style={{ marginLeft: 4 }} onClick={() => setUnmask(true)}>마스킹 풀기</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="card">
        <h2>워터마크 데모 (마스킹 풀기 후)</h2>
        <MaskingWatermark>
          <p>홍길동 · 881212-1******</p>
          <p>주소: 서울특별시 강남구 ***</p>
        </MaskingWatermark>
      </section>

      <UnmaskModal open={unmask} onClose={() => setUnmask(false)} />
    </div>
  );
}
