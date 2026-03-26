export function formatAmount(num) {
  return num.toLocaleString('ko-KR') + '원';
}

export function formatKRW(num) {
  if (num >= 1_000_000_000_000) return `${(num / 1_000_000_000_000).toFixed(1)}조`;
  if (num >= 100_000_000) return `${(num / 100_000_000).toFixed(0)}억`;
  if (num >= 10_000) return `${(num / 10_000).toFixed(0)}만`;
  return num.toLocaleString();
}

export function formatShort(num) {
  if (num >= 100_000_000) return `${(num / 100_000_000).toFixed(1)}억`;
  if (num >= 10_000) return `${(num / 10_000).toFixed(0)}만`;
  return num.toLocaleString();
}
