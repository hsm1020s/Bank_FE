import { useState } from 'react';

export default function PasswordField({ label = '비밀번호', name = 'password', autoComplete = 'current-password' }) {
  const [show, setShow] = useState(false);
  const [val, setVal] = useState('');
  return (
    <label className="col" style={{ gap: 4 }}>
      <span className="muted">{label}</span>
      <span style={{ display: 'flex', gap: 4 }}>
        <input
          type={show ? 'text' : 'password'}
          name={name}
          autoComplete={autoComplete}
          value={val}
          onChange={(e) => setVal(e.target.value)}
          style={{ flex: 1 }}
        />
        <button type="button" onClick={() => setShow((s) => !s)}>{show ? '숨김' : '보기'}</button>
      </span>
    </label>
  );
}
