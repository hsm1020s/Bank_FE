export default function Card({ title, subtitle, action, className = '', style, children }) {
  return (
    <div className={`card ${className}`} style={style}>
      {title && (
        <div className="card-header">
          <div>
            <h3>{title}</h3>
            {subtitle && <span className="card-subtitle">{subtitle}</span>}
          </div>
          {action}
        </div>
      )}
      {children}
    </div>
  );
}
