export function HomeView({
  welcomeName,
  welcomeDate,
  stats,
}) {
  return (
    <>
      <header className="page-head">
        <div>
          <p className="page-head__eyebrow">Visão geral</p>
          <h1 className="page-head__title">Bem-vinda, {welcomeName}</h1>
          <p className="page-head__sub">{welcomeDate}</p>
        </div>
      </header>

      <div className="metric-row">
        <div className="metric">
          <span className="metric__value">{stats.total}</span>
          <span className="metric__label">Tarefas</span>
        </div>
        <div className="metric">
          <span className="metric__value metric__value--accent">{stats.pending}</span>
          <span className="metric__label">Abertas</span>
        </div>
        <div className="metric">
          <span className="metric__value">{stats.done}</span>
          <span className="metric__label">Feitas</span>
        </div>
      </div>
    </>
  );
}
