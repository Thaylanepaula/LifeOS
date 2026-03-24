import { TaskCard } from "../components/TaskCard.jsx";

export function HomeView({ greeting, dateLabel, stats, focusTasks, onToggle }) {
  return (
    <>
      <header className="page-head">
        <div>
          <p className="page-head__eyebrow">Visão geral</p>
          <h1 className="page-head__title">{greeting}</h1>
          <p className="page-head__sub">{dateLabel}</p>
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

      <section className="card-block" aria-labelledby="focus-heading">
        <div className="card-block__head">
          <h2 id="focus-heading">Foco de hoje</h2>
          <p className="card-block__hint">Prioridade no que importa agora.</p>
        </div>
        <div className="stack">
          {focusTasks.length === 0 ? (
            <p className="empty-hint">Nada pendente com prioridade alta. Ótimo momento para planejar.</p>
          ) : (
            focusTasks.map((t) => (
              <TaskCard
                key={t.id}
                title={t.title}
                due={t.dueLabel}
                priority={t.priority}
                done={t.done}
                onToggle={() => onToggle(t.id)}
              />
            ))
          )}
        </div>
      </section>
    </>
  );
}
