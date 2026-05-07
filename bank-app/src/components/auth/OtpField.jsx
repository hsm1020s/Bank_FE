import { useRef } from 'react';

export default function OtpField({ length = 6, onChange }) {
  const refs = useRef([]);
  const handle = (idx, e) => {
    const v = e.target.value.replace(/\D/g, '').slice(0, 1);
    e.target.value = v;
    if (v && idx < length - 1) refs.current[idx + 1]?.focus();
    onChange?.(refs.current.map((r) => r?.value || '').join(''));
  };
  return (
    <div style={{ display: 'flex', gap: 6 }}>
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          inputMode="numeric"
          maxLength={1}
          onChange={(e) => handle(i, e)}
          style={{ width: 36, textAlign: 'center', fontSize: 18 }}
          aria-label={`OTP 자리 ${i + 1}`}
        />
      ))}
    </div>
  );
}
