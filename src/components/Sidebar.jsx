const NAV = [
  { id: "home", label: "Início", abbr: "In" },
  { id: "today", label: "Hoje", abbr: "Hj" },
  { id: "tasks", label: "Tarefas", abbr: "Ta" },
  { id: "calendar", label: "Agenda", abbr: "Ag" },
];

export function Sidebar({ activeId = "home", onSelect }) {
  return (
    <aside className="sidebar" aria-label="Navegação principal">
      <div className="sidebar__brand">
        <span className="sidebar__logo" aria-hidden>
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12"
              cy="12"
              r="4.2"
              stroke="#0071e3"
              strokeWidth="1.8"
            />
            <path
              d="M12 2.8V6.2"
              stroke="#0071e3"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="M12 17.8V21.2"
              stroke="#0071e3"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="M2.8 12H6.2"
              stroke="#0071e3"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="M17.8 12H21.2"
              stroke="#0071e3"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <div className="sidebar__brand-text">
          <span className="sidebar__title">Luma</span>
          <span className="sidebar__tagline">seu painel</span>
        </div>
      </div>

      <nav className="sidebar__nav" aria-label="Seções">
        <ul>
          {NAV.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className={`sidebar__link${activeId === item.id ? " is-active" : ""}`}
                onClick={() => onSelect?.(item.id)}
              >
                <span className="sidebar__abbr" aria-hidden>
                  {item.abbr}
                </span>
                <span className="sidebar__label">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar__footer">
        <span className="sidebar__dot" aria-hidden />
        <span className="sidebar__version">local · v0.2</span>
      </div>
    </aside>
  );
}
