export default function LoadingSkeleton({ lines = 3 }) {
  return (
    <div className="col" aria-busy="true" aria-live="polite">
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="skeleton" style={{ width: `${60 + (i * 10) % 40}%` }} />
      ))}
    </div>
  );
}
