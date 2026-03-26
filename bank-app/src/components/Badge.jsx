const STATUS_MAP = {
  '완료': 'success',
  '정상': 'success',
  '활성': 'success',
  '처리중': 'warning',
  '휴면': 'warning',
  '실패': 'danger',
  '정지': 'danger',
  '연체': 'danger',
};

const TYPE_MAP = {
  '입금': 'deposit',
  '출금': 'withdraw',
  '이체': 'transfer',
  '대출상환': 'loan',
  '보통예금': 'deposit',
  '정기예금': 'transfer',
  '적금': 'loan',
  '자유적금': 'loan',
};

const GRADE_MAP = {
  'VVIP': 'vvip',
  'VIP': 'vip',
  '일반': 'normal',
};

export function StatusBadge({ status }) {
  return (
    <span className={`status-badge ${STATUS_MAP[status] || 'success'}`}>
      {status}
    </span>
  );
}

export function TypeBadge({ type }) {
  return (
    <span className={`type-badge ${TYPE_MAP[type] || 'deposit'}`}>
      {type}
    </span>
  );
}

export function GradeBadge({ grade }) {
  return (
    <span className={`grade-badge ${GRADE_MAP[grade] || 'normal'}`}>
      {grade}
    </span>
  );
}
