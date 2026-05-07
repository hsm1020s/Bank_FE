function Stub({ title, desc, extra }) {
  return (
    <div className="col" style={{ gap: 16 }}>
      <h1>{title}</h1>
      <p className="muted">{desc}</p>
      {extra}
      <p className="muted">※ 본 페이지는 페이즈4~5에서 본격 구현됩니다.</p>
    </div>
  );
}

export const DocumentsPage = () => <Stub title="증빙/문서함" desc="핵심설명서·계약서 PDF 보관함 (감사로그 권위)" />;
export const LimitsPage = () => <Stub title="이체/거래 한도" desc="일/월 한도 조회·변경 — L2 이상 인증 필요" />;
export const ComplaintsPage = () => <Stub title="민원" desc="분쟁/민원 접수 — 음성녹취/문서 첨부 지원" />;
export const SecurityReportPage = () => <Stub title="보안센터 / 신고" desc="피싱/스미싱 신고·FDS 차단 이력 조회" />;
