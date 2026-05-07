import { useState } from 'react';
import { regulatoryReports } from '../../../data/mockData';

export default function RegulatoryReportPage() {
  const [cat, setCat] = useState(regulatoryReports[0].cat);
  const items = regulatoryReports.find((r) => r.cat === cat)?.items || [];

  return (
    <div className="col" style={{ gap: 16 }}>
      <h1>규제 보고서 (EMP-021)</h1>

      <div className="card" style={{ background: '#e1efff', borderColor: '#a8c8eb' }}>
        ℹ️ STR 개별 케이스는 AML 한정. OPERATOR 권한은 통계만 R 가능. 다운로드는 PDF / sealed XML만 (CSV 차단).
        외부 IF 응답 표준 스키마: trace_id · code · message · external_ref · echo_payload_hash.
      </div>

      <section className="row" style={{ alignItems: 'flex-start' }}>
        <div className="card" style={{ flex: 1, minWidth: 220 }}>
          <h2>카테고리</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {regulatoryReports.map((r) => (
              <li key={r.cat}>
                <button
                  onClick={() => setCat(r.cat)}
                  className={cat === r.cat ? 'primary' : ''}
                  style={{ width: '100%', textAlign: 'left' }}
                >
                  {r.cat} ({r.items.length})
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="card" style={{ flex: 2 }}>
          <h2>{cat} — 워크리스트</h2>
          <ul>
            {items.map((it) => (
              <li key={it.code} style={{ marginBottom: 8 }}>
                <code>{it.code}</code> — {it.name}{' '}
                <span className="badge">{it.status}</span>
                <span className="muted" style={{ marginLeft: 8 }}>마감 {it.dueAt}</span>
                <button style={{ marginLeft: 8 }}>미리보기 PDF</button>
                <button style={{ marginLeft: 4 }} disabled title="DLP 차단됨">CSV 다운로드</button>
              </li>
            ))}
          </ul>
          <p className="muted" style={{ marginTop: 8 }}>
            워터마크 카운터 + DLP 연계. 가입자 통지 의무 별도 페이지에서 관리.
          </p>
        </div>
      </section>
    </div>
  );
}
