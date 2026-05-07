import { useEffect, useRef, useState } from 'react';

const PAGES = [
  '제1면 — 약정 개요 및 적용 법규',
  '제2면 — 금리·이자 계산식·연체 가산금리',
  '제3면 — 핵심 조항 (연체율, 기한이익상실, 중도상환수수료)',
  '제4면 — 상환 일정 및 계좌 자동이체',
  '제5면 — 변동금리 변경 절차',
  '제6면 — 담보·보증·연대 보증',
  '제7면 — 분쟁해결 및 관할 법원',
  '제8면 — 전자서명 및 보존(7년 → 대출 종료 + 10년)',
];

export default function LoanContractPage() {
  const [page, setPage] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [video, setVideo] = useState(false);
  const [tokenLeft, setTokenLeft] = useState(30 * 60); // 30분
  const ref = useRef(0);

  useEffect(() => {
    const t = setInterval(() => setElapsed((e) => e + 1), 1000);
    const tk = setInterval(() => setTokenLeft((s) => Math.max(0, s - 1)), 1000);
    return () => { clearInterval(t); clearInterval(tk); };
  }, []);

  const canNext = elapsed >= 5 * (page + 1) && (page !== 2 || video);

  return (
    <div className="col" style={{ gap: 16, maxWidth: 720 }}>
      <h1>약정 체결·전자서명</h1>
      <div className="card" style={{ background: '#fff4d6', borderColor: '#f3e2a1' }}>
        ⏰ 진행 토큰 남은 시간: <strong>{Math.floor(tokenLeft / 60)}:{String(tokenLeft % 60).padStart(2, '0')}</strong> (30분 초과 시 초기화). 디바이스 바인딩.
      </div>

      <section className="card">
        <h2>{PAGES[page]} ({page + 1}/8)</h2>
        <div className="terms-box" style={{ height: 220 }}>
          {Array.from({ length: 14 }, (_, i) => (
            <p key={i}>본 약정의 제{page + 1}면 {i + 1}번 조항. 차주는 본 조항을 확인하고 동의함을 서약합니다.</p>
          ))}
        </div>
        <p className="muted" style={{ marginTop: 8 }}>
          이 페이지 체류 시간: <strong>{elapsed}초</strong> (페이지당 최소 5초 강제)
        </p>
        {page === 2 && (
          <>
            <p className="muted" style={{ color: 'var(--c-warn)' }}>
              핵심 조항 — 연체율 / 기한이익상실 / 중도상환수수료 영상 100% 시청 강제
            </p>
            <button onClick={() => setVideo(true)} disabled={video}>{video ? '✅ 시청 완료' : '▶ 영상 시청 시작'}</button>
          </>
        )}
        {page === 7 && (
          <>
            <p className="muted">RFC3161 TSA 토큰 + PAdES-LTA 서명 보존 (대출 종료 + 10년)</p>
            <p className="muted">녹취 default ON — 5천만 초과·신용/주담대.</p>
          </>
        )}
      </section>

      <div className="row" style={{ justifyContent: 'space-between' }}>
        <button onClick={() => { setPage((p) => Math.max(0, p - 1)); ref.current = 0; setElapsed(0); }} disabled={page === 0}>이전</button>
        <button
          className="primary"
          disabled={!canNext}
          onClick={() => {
            if (page === PAGES.length - 1) {
              alert('전자서명 완료 — 약정 체결됨');
            } else {
              setPage((p) => p + 1);
              setElapsed(0);
            }
          }}
        >
          {page === PAGES.length - 1 ? '전자서명' : '다음'}
        </button>
      </div>
    </div>
  );
}
