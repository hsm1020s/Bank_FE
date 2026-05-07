import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  accounts, assetSummary, trendSeries,
  transactions, loanContract,
} from '../../data/mockData';
import AssetCard from '../../components/banking/AssetCard';
import MiniLineChart from '../../components/banking/MiniLineChart';
import TransactionRow from '../../components/banking/TransactionRow';
import UnmaskModal from '../../components/modals/UnmaskModal';
import MaskingWatermark from '../../components/compliance/MaskingWatermark';
import Modal from '../../components/common/Modal';

export default function DashboardPage() {
  const [unmask, setUnmask] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const recent = transactions.slice(0, 5);
  const activeAccounts = accounts.filter((a) => a.status === 'active');

  return (
    <div className="col" style={{ gap: 16, position: 'relative' }}>
      <div className="row" style={{ alignItems: 'baseline', justifyContent: 'space-between' }}>
        <h1 style={{ margin: 0 }}>안녕하세요, 홍길동님</h1>
        <span className="muted">마지막 접속 — 2026-05-07 09:12 (서울/Mac/Safari)</span>
      </div>

      <section className="row">
        <AssetCard label="총자산" amount={assetSummary.asset} tone="positive" sub="수신 4건 합계" />
        <AssetCard label="부채" amount={assetSummary.debt} tone="negative" sub="여신 1건" />
        <AssetCard label="순자산" amount={assetSummary.net} sub="자산 - 부채" />
      </section>

      <section className="row" style={{ alignItems: 'flex-start' }}>
        <div className="card" style={{ flex: 2, minWidth: 320 }}>
          <h2>6개월 순자산 추이</h2>
          <MiniLineChart series={trendSeries} width={420} height={100} />
          <div className="muted">기간/단위 토글은 명세에 정의됨 (시연 생략)</div>
        </div>
        <div className="card" style={{ flex: 1, minWidth: 240 }}>
          <h2>여신 미리보기</h2>
          <p className="muted">{loanContract.id} · {loanContract.status}</p>
          <p>잔액 <strong>{loanContract.remaining.toLocaleString()}</strong> KRW</p>
          <p className="muted">금리 {loanContract.rate}% · 만기 {loanContract.maturity}</p>
          <Link to={`/loan/${loanContract.id}`}><button>상세 보기</button></Link>
        </div>
      </section>

      <section className="card">
        <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0 }}>수신 계좌 미리보기</h2>
          <Link to="/deposit"><button>전체 보기</button></Link>
        </div>
        <div className="row" style={{ marginTop: 8 }}>
          {activeAccounts.slice(0, 3).map((a) => (
            <div key={a.id} className="card" style={{ flex: 1, minWidth: 200 }}>
              <div className="muted">{a.alias || a.name}</div>
              <code>{a.number}</code>
              <p style={{ fontSize: 18, fontWeight: 700, marginTop: 4 }}>{a.balance.toLocaleString()} {a.currency}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="card">
        <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0 }}>최근 거래 5건</h2>
          <button onClick={() => setUnmask(true)}>마스킹 풀기</button>
        </div>
        <div style={{ overflowX: 'auto', marginTop: 8 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--c-border)', textAlign: 'left' }}>
                <th>일시</th><th>구분</th><th style={{ textAlign: 'right' }}>금액</th>
                <th style={{ textAlign: 'right' }}>잔액</th><th>상대</th><th>적요</th><th>비고</th>
              </tr>
            </thead>
            <tbody>{recent.map((t) => <TransactionRow key={t.id} tx={t} />)}</tbody>
          </table>
        </div>
      </section>

      <section className="card">
        <h2>본인확인 정보 (워터마크 데모)</h2>
        <MaskingWatermark>
          <p>홍길동 · 881212-1******</p>
          <p>주소: 서울특별시 강남구 ***</p>
        </MaskingWatermark>
      </section>

      <button
        className="danger"
        onClick={() => setReportOpen(true)}
        style={{
          position: 'fixed',
          right: 24,
          bottom: 24,
          padding: '12px 20px',
          borderRadius: 999,
          fontSize: 13,
          fontWeight: 700,
          boxShadow: 'var(--shadow-md)',
          zIndex: 10,
        }}
      >
        🚨 사고 신고
      </button>

      <UnmaskModal open={unmask} onClose={() => setUnmask(false)} />
      <Modal
        open={reportOpen}
        onClose={() => setReportOpen(false)}
        title="🚨 사고 신고"
        footer={
          <>
            <button onClick={() => setReportOpen(false)}>취소</button>
            <button className="danger" onClick={() => { alert('신고 접수 — 모든 거래 즉시 차단'); setReportOpen(false); }}>
              즉시 신고
            </button>
          </>
        }
      >
        <p>본인 명의 도용/피싱/스미싱 등이 의심되는 즉시 모든 거래를 차단합니다.</p>
        <ul>
          <li>모든 카드/계좌 즉시 일시정지</li>
          <li>당행 채널 모든 세션 종료</li>
          <li>FDS 자동 분석 + 영업점/콜센터 안내</li>
        </ul>
      </Modal>
    </div>
  );
}
