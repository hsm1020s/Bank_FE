import { useState } from 'react';
import { nplCases } from '../../../data/mockData';
import Tabs from '../../../components/admin/Tabs';
import KpiCard from '../../../components/admin/KpiCard';
import WorklistTable from '../../../components/admin/WorklistTable';

const TABS = [
  { key: 'cand', label: '상각 후보' },
  { key: 'pend', label: '결재 대기' },
  { key: 'sale', label: '매각' },
  { key: 'recover', label: '환입' },
];

export default function NplPage() {
  const [tab, setTab] = useState('cand');

  return (
    <div className="col" style={{ gap: 16 }}>
      <h1>부실채권 / 상각 관리 (EMP-014)</h1>

      <section className="row">
        <KpiCard label="정상" value={4_120} unit="건" />
        <KpiCard label="요주의" value={142} unit="건" tone="negative" />
        <KpiCard label="고정" value={38} unit="건" tone="negative" />
        <KpiCard label="회수의문" value={12} unit="건" tone="negative" />
        <KpiCard label="추정손실" value={7} unit="건" tone="negative" />
      </section>

      <Tabs tabs={TABS} current={tab} onChange={setTab} />

      <section className="card">
        <p className="muted">충당금 적립률 매트릭스: 정상 0.85% / 요주의 7% / 고정 20% / 회수의문 50% / 추정손실 100%</p>
        <p className="muted" style={{ color: 'var(--c-warn)' }}>외부감사 기간 — 상각·매각·환입 자동 보류. 채권 양도 통지 7영업일 자동 등록.</p>
        <WorklistTable
          columns={[
            { key: 'id', label: 'ID' },
            { key: 'customer', label: '고객' },
            { key: 'remaining', label: '잔액', render: (r) => r.remaining.toLocaleString() },
            { key: 'classification', label: '분류' },
            { key: 'overdue', label: '연체일' },
            { key: 'action', label: '액션' },
          ]}
          rows={nplCases}
        />
      </section>
    </div>
  );
}
