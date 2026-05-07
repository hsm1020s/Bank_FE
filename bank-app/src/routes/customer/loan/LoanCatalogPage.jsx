import { Link } from 'react-router-dom';
import { loanCatalog } from '../../../data/mockData';

export default function LoanCatalogPage() {
  return (
    <div className="col" style={{ gap: 16 }}>
      <h1>대출 상품 카탈로그</h1>
      <p className="muted">FCPA — 최저 단독 강조 금지. 최저/평균/최고 금리를 동일 비중으로 표시합니다 (SEO/SNS OG에도 동일).</p>

      <section className="row">
        {loanCatalog.map((p) => (
          <div key={p.code} className="card" style={{ flex: 1, minWidth: 260 }}>
            <h2>{p.name}</h2>
            <p className="muted">{p.kind} · 최대 한도 {(p.max_amount / 100_000_000).toFixed(1)}억</p>
            <div className="row" style={{ marginTop: 8 }}>
              <div style={{ flex: 1 }}>
                <div className="muted">최저</div>
                <strong>{p.min}%</strong>
              </div>
              <div style={{ flex: 1 }}>
                <div className="muted">평균</div>
                <strong>{p.avg}%</strong>
              </div>
              <div style={{ flex: 1 }}>
                <div className="muted">최고</div>
                <strong>{p.max}%</strong>
              </div>
            </div>
            <div className="row" style={{ marginTop: 12 }}>
              <Link to="/loan/precheck"><button>한도 사전조회</button></Link>
              <Link to="/loan/apply"><button className="primary">신청</button></Link>
            </div>
          </div>
        ))}
      </section>

      <p className="muted" style={{ fontSize: 12 }}>
        ※ 금리 변경 시 30일 사전조회 결과는 자동 재계산 → 변동 ±0.5%p 이상이면 강제 재조회.
      </p>
    </div>
  );
}
