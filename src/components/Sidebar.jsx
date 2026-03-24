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
          /
        </span>
        <div className="sidebar__brand-text">
          <span className="sidebar__title">LifeOS</span>
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
