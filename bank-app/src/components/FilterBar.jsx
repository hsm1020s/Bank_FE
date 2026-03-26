const SearchIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

export default function FilterBar({ search, filters = [] }) {
  return (
    <div className="card-filters">
      {search && (
        <div className="filter-search">
          {SearchIcon}
          <input
            type="text"
            placeholder={search.placeholder}
            value={search.value}
            onChange={(e) => search.onChange(e.target.value)}
          />
        </div>
      )}
      {filters.map((filter, i) => (
        <select key={i} value={filter.value} onChange={(e) => filter.onChange(e.target.value)}>
          {filter.options.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
      ))}
    </div>
  );
}
