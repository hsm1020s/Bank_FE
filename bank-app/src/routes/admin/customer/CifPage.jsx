import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { cifSummary, cifTimeline } from '../../../data/mockData';
import Tabs from '../../../components/admin/Tabs';

const TABS = [
  { key: 'deposit', label: '수신' },
  { key: 'loan', label: '여신' },
  { key: 'card', label: '카드' },
  { key: 'fx', label: '외환' },
  { key: 'invest', label: '투자' },
  { key: 'applied', label: '신청 이력' },
  { key: 'aml', label: 'AML (제한)' },
];

export default function CifPage() {
  const { id } = useParams();
  const [tab, setTab] = useState('deposit');
  const cif = { ...cifSummary, id: id || cifSummary.id };

  return (
    <div className="col" style={{ gap: 16 }}>
      <Link to="/admin/customer/search" className="muted">← 검색</Link>
      <h1>고객 종합정보 — {cif.id} (EMP-004)</h1>

      {cif.status !== 'active' && (
        <div className="card" style={{ background: '#ffd9d9' }}>
          🛑 사망/한정후견 — 모든 거래 차단됨
        </div>
      )}

      <section className="card">
        <h2>{cif.name}</h2>
        <ul>
          <li>생년월일: {cif.birth} · 주민: <code>{cif.resident}</code></li>
          <li>연락처: {cif.phone} · 이메일: {cif.email}</li>
          <li>지점: {cif.branch} · 가입: {cif.joinedAt}</li>
          <li>AML 위험도: <span className="badge l1">{cif.amlRisk}</span> · PEP: {cif.pep ? 'Yes' : 'No'}</li>
        </ul>
      </section>

      <div className="row" style={{ alignItems: 'flex-start' }}>
        <div className="col" style={{ flex: 2 }}>
          <Tabs tabs={TABS} current={tab} onChange={setTab} />
          <section className="card">
            {tab === 'aml' ? (
              <p className="muted">AML 권한 미보유 — 본 탭은 비공개입니다. ROLE_AUDITOR는 별도 auditor_view 로그를 남깁니다.</p>
            ) : (
              <p>{TABS.find((t) => t.key === tab).label} — 보유 {cif.domains[tab]}건 (시연 정적 데이터)</p>
            )}
          </section>
        </div>
        <div className="col" style={{ flex: 1, minWidth: 280 }}>
          <section className="card">
            <h2>거래 타임라인</h2>
            <ul>
              {cifTimeline.map((t, i) => (
                <li key={i} style={{ marginBottom: 6 }}>
                  <span className="muted" style={{ marginRight: 6 }}>{t.ts}</span>
                  <span className="badge">{t.kind}</span>
                  <div style={{ marginTop: 2 }}>{t.text}</div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
