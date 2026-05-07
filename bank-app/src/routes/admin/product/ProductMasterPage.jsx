import { useState } from 'react';
import { productMasterTree } from '../../../data/mockData';
import Tabs from '../../../components/admin/Tabs';

const TABS = [
  { key: 'basic', label: '기본' },
  { key: 'rate', label: '금리' },
  { key: 'terms', label: '약관' },
  { key: 'desc', label: '설명서' },
  { key: 'ad', label: '광고' },
  { key: 'history', label: '이력' },
  { key: 'subscribers', label: '가입자' },
];

export default function ProductMasterPage() {
  const [picked, setPicked] = useState('P-DEP-12M');
  const [tab, setTab] = useState('basic');

  return (
    <div className="col" style={{ gap: 16 }}>
      <h1>상품 마스터 관리 (EMP-023)</h1>

      <div className="row" style={{ alignItems: 'flex-start' }}>
        <div className="card" style={{ flex: 1, minWidth: 220 }}>
          <h2>카탈로그</h2>
          {productMasterTree.map((g) => (
            <div key={g.code} style={{ marginBottom: 8 }}>
              <strong>{g.name}</strong>
              <ul style={{ paddingLeft: 16, listStyle: 'none' }}>
                {g.children.map((c) => (
                  <li key={c.code}>
                    <button
                      onClick={() => setPicked(c.code)}
                      className={picked === c.code ? 'primary' : ''}
                      style={{ width: '100%', textAlign: 'left', fontSize: 12 }}
                    >
                      {c.code} {c.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="col" style={{ flex: 3 }}>
          <Tabs tabs={TABS} current={tab} onChange={setTab} />

          <div className="card">
            <h2>{picked} — {TABS.find((t) => t.key === tab).label}</h2>

            {tab === 'ad' && (
              <>
                <p className="muted">의무 표기 자동 검증 — 최저금리 단독 강조 금지.</p>
                <div className="card" style={{ background: '#fafbfd' }}>
                  <strong>광고 미리보기</strong>
                  <p>최저 4.2% / 평균 5.6% / 최고 7.9% (3값 동일 비중 표시)</p>
                </div>
              </>
            )}

            {tab === 'terms' && (
              <p className="muted">약관 변경 — D-14 사전 공지 강제 (광고만 D+0). 가입자 통지 3회 (결재 후 / 7일 전 / 1일 전).</p>
            )}

            {tab === 'subscribers' && (
              <>
                <p>현재 가입자: 12,034명</p>
                <p className="muted">
                  수신 거부 = 해지 (수수료 면제) / 여신 거부 = 옵션 (기존 약관 유지 또는 부분 적용 거부; 일시상환 강제 금지).
                </p>
              </>
            )}

            {!['ad','terms','subscribers'].includes(tab) && (
              <p className="muted">{TABS.find((t) => t.key === tab).label} 탭 — 시연 정적 컨텐츠</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
