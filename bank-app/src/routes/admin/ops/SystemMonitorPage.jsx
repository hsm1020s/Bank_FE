import { batchJobs, systemHealth, adminTrend } from '../../../data/mockData';
import KpiCard from '../../../components/admin/KpiCard';
import MiniLineChart from '../../../components/banking/MiniLineChart';
import WorklistTable from '../../../components/admin/WorklistTable';

export default function SystemMonitorPage() {
  return (
    <div className="col" style={{ gap: 16 }}>
      <h1>시스템 / 배치 모니터링 (EMP-018)</h1>

      <section className="row">
        {systemHealth.map((s) => (
          <KpiCard
            key={s.name}
            label={s.name}
            value={s.status}
            unit={s.latency}
            tone={s.status === 'OK' ? 'positive' : s.status === 'WARN' ? 'negative' : 'neutral'}
          />
        ))}
      </section>

      <section className="card">
        <h2>거래량 추이</h2>
        <MiniLineChart series={adminTrend} width={520} height={120} />
      </section>

      <section className="card">
        <h2>배치 11종</h2>
        <WorklistTable
          columns={[
            { key: 'code', label: '코드' },
            { key: 'name', label: '이름' },
            { key: 'schedule', label: '예정' },
            { key: 'state', label: '상태', render: (r) => (
              <span className={`badge ${r.state === 'OK' ? 'l1' : r.state === 'WARN' ? 'l3' : 'l4'}`}>{r.state}</span>
            ) },
            { key: 'last', label: '마지막' },
          ]}
          rows={batchJobs}
        />
        <p className="muted" style={{ marginTop: 8 }}>
          BAT-008 (AML 제재) 24h 초과 실패 → 신규 고객/1천만+/해외 송금 자동 보류 큐.
          BAT-012 환율 갱신 2회 연속 실패 → EMP-007 차단.
        </p>
      </section>
    </div>
  );
}
