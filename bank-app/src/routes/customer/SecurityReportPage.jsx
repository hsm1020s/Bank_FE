import { useState } from 'react';
import { accidentCategories } from '../../data/mockData';
import Modal from '../../components/common/Modal';

export default function SecurityReportPage() {
  const [picked, setPicked] = useState(null);
  const [confirm, setConfirm] = useState(false);

  return (
    <div className="col" style={{ gap: 16 }}>
      <h1>사고 신고 / 지급 정지</h1>

      <div className="card" style={{ background: '#ffd9d9', borderColor: '#e5b8b8' }}>
        🚨 <strong>즉시 동기 차단</strong> — SLO p95 ≤ 3초. 차단 실패 시 임시 동결 + 콜센터 강제 연결.
        24/7 핫라인은 BCP 이중화 (2분 무응답 시 외부 위탁 + SMS 신고번호 발급).
      </div>

      <section className="row">
        {accidentCategories.map((c) => (
          <button
            key={c.key}
            onClick={() => setPicked(c)}
            className={picked?.key === c.key ? 'primary' : ''}
            style={{ flex: 1, minWidth: 200, textAlign: 'left', padding: 12, height: 'auto' }}
          >
            <strong>{c.label}</strong>
            <div className="muted" style={{ marginTop: 4 }}>
              {c.mode === 'revoke' ? '⚠️ revoke (재발급 필요)' : '🔒 freeze (복구 가능)'}
            </div>
            <div className="muted">{c.target}</div>
          </button>
        ))}
      </section>

      {picked && (
        <section className="card">
          <h2>선택: {picked.label}</h2>
          {picked.mode === 'revoke' ? (
            <p>이 사고 유형은 <strong>revoke</strong> — 재발급이 필요한 영구 차단입니다.</p>
          ) : (
            <p>이 사고 유형은 <strong>freeze</strong> — 복구 가능한 일시 동결입니다.</p>
          )}
          {picked.key === 'voice_phishing' && (
            <ul>
              <li>KFTC 채권소멸시스템 자동 연동</li>
              <li>타행 수취 계좌 지급정지 요청 자동 발송</li>
              <li>환급 신청 D+5 안내</li>
            </ul>
          )}
          <button className="danger" onClick={() => setConfirm(true)}>즉시 신고/차단</button>
        </section>
      )}

      <Modal
        open={confirm}
        onClose={() => setConfirm(false)}
        title="🚨 즉시 차단 확인"
        footer={
          <>
            <button onClick={() => setConfirm(false)}>취소</button>
            <button className="danger" onClick={() => { alert('차단 처리됨 (SLO p95 ≤ 3초)'); setConfirm(false); }}>실행</button>
          </>
        }
      >
        <p>{picked?.label} — {picked?.mode === 'revoke' ? 'revoke (재발급)' : 'freeze (복구 가능)'}</p>
        <p className="muted">처리 결과는 SMS와 이메일로 통보되며 감사로그에 영구 기록됩니다.</p>
      </Modal>
    </div>
  );
}
