export default function Toggle({ label, description, checked, onChange }) {
  return (
    <div className="form-group toggle-group">
      <div className="toggle-info">
        <label>{label}</label>
        {description && <span className="toggle-desc">{description}</span>}
      </div>
      <button className={`toggle ${checked ? 'active' : ''}`} onClick={() => onChange(!checked)}>
        <span className="toggle-knob" />
      </button>
    </div>
  );
}
