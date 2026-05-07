import { fcpaRates } from '../../data/mockData';

export default function FcpaRateBanner({ product = '신용대출' }) {
  return (
    <div className="card" style={{ background: '#fffce6', borderColor: '#f3e2a1' }}>
      <strong>[법규 표시] {product} 금리 (연이율 %)</strong>
      <div className="row" style={{ marginTop: 8 }}>
        <div><div className="muted">최저</div><strong>{fcpaRates.min.toFixed(1)}%</strong></div>
        <div><div className="muted">평균</div><strong>{fcpaRates.avg.toFixed(1)}%</strong></div>
        <div><div className="muted">최고</div><strong>{fcpaRates.max.toFixed(1)}%</strong></div>
      </div>
      <p className="muted" style={{ marginTop: 8, marginBottom: 0 }}>
        FCPA — 광고 시 최저/평균/최고 금리를 동일 비중으로 표시합니다.
      </p>
    </div>
  );
}
