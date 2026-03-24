import { TaskCard } from "../components/TaskCard.jsx";

export function HomeView({
  welcomeName,
  welcomeDate,
  stats,
  focusTasks,
  onToggle,
}) {
  return (
    <>
      <section className="welcome-hero" aria-labelledby="welcome-title">
        <p className="welcome-hero__date">{welcomeDate}</p>
        <h1 id="welcome-title" className="welcome-hero__title">
          Bem-vinda de volta,{" "}
          <span className="welcome-hero__name">{welcomeName}</span>! Vamos
          organizar o dia?
        </h1>
      </section>

      <div className="metric-row">
        <div className="metric">
          <span className="metric__value">{stats.total}</span>
          <span className="metric__label">Tarefas</span>
        </div>
        <div className="metric">
          <span className="metric__value metric__value--accent">
            {stats.pending}
          </span>
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
            <p className="empty-hint">
              Nada pendente com prioridade alta. Ótimo momento para planejar.
            </p>
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
