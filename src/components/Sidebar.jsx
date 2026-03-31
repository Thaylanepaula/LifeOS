const NAV = [
  { id: "home", label: "Início", abbr: "In" },
  { id: "today", label: "Hoje", abbr: "Hj" },
  { id: "tasks", label: "Tarefas", abbr: "Ta" },
  { id: "calendar", label: "Agenda", abbr: "Ag" },
];

export function Sidebar({ activeId = "home", onSelect, enabledNavIds }) {
  const visibleNav = Array.isArray(enabledNavIds) && enabledNavIds.length > 0
    ? NAV.filter((item) => enabledNavIds.includes(item.id))
    : NAV;

  return (
    <aside className="sidebar" aria-label="Navegação principal">
      <div className="sidebar__brand">
        <span className="sidebar__gem" aria-hidden />
        <div className="sidebar__brand-text">
          <button
            type="button"
            className="sidebar__title sidebar__title--link"
            onClick={() => onSelect?.("home")}
          >
            Luma
          </button>
          <span className="sidebar__tagline">seu painel</span>
        </div>
      </div>

      <nav className="sidebar__nav" aria-label="Seções">
        <ul>
          {visibleNav.map((item) => (
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
