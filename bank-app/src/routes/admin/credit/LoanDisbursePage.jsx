import { useState } from 'react';

export default function LoanDisbursePage() {
  const [c1, setC1] = useState(false);
  const [c2, setC2] = useState(false);
  const [c3, setC3] = useState(false);

  const all = c1 && c2 && c3;

  return (
    <div className="col" style={{ gap: 16, maxWidth: 720 }}>
      <h1>여신 실행 (지급) (EMP-012)</h1>

      <div className="card" style={{ background: '#fff4d6', borderColor: '#f3e2a1' }}>
        ⚠️ 결재 후 24h 초과 시 KYC 재스크리닝 강제. HIT 발생 즉시 차단. 영업시간 외 1억+ 지급은 본부장·컴플라이언스 병렬 승인.
      </div>

      <div className="row" style={{ alignItems: 'flex-start' }}>
        <div className="col" style={{ flex: 1 }}>
          <section className="card">
            <h2>직무분리 검증</h2>
            <ul>
              <li>심사자: kim_emp_03 (자기 자신 차단됨) ⛔</li>
              <li>검토자: lee_emp_07 ✅</li>
              <li>결재자: park_head ✅</li>
              <li>실행자: <strong>본인 (yoon_emp_11)</strong> ✅</li>
            </ul>
          </section>

          <section className="card">
            <h2>KYC / 제재 재스크리닝</h2>
            <p>마지막 스크리닝: 18시간 전 (24h 임계 미달)</p>
            <button>재스크리닝 강제 실행</button>
          </section>
        </div>

        <div className="col" style={{ flex: 1 }}>
          <section className="card">
            <h2>지급 정보</h2>
            <ul>
              <li>약정 ID: L-2026-0101</li>
              <li>지급 금액: 50,000,000 KRW</li>
              <li>지급 계좌: 홍길동 1002-***-1234</li>
            </ul>
          </section>

          <section className="card">
            <h2>최종 3점 체크</h2>
            <label className="consent-line">
              <input type="checkbox" checked={c1} onChange={(e) => setC1(e.target.checked)} />
              ① 직무분리 (SoD) 위반 없음 확인
            </label>
            <label className="consent-line">
              <input type="checkbox" checked={c2} onChange={(e) => setC2(e.target.checked)} />
              ② KYC/제재 재스크리닝 24h 이내 통과
            </label>
            <label className="consent-line">
              <input type="checkbox" checked={c3} onChange={(e) => setC3(e.target.checked)} />
              ③ 지급 계좌·금액 차주 본인 일치
            </label>
            <button className="primary" disabled={!all}>지급 실행</button>
          </section>
        </div>
      </div>
    </div>
  );
}
