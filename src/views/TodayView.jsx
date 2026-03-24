import { TaskCard } from "../components/TaskCard.jsx";

export function TodayView({ tasks, onToggle }) {
  return (
    <>
      <header className="page-head">
        <div>
          <p className="page-head__eyebrow">Agenda</p>
          <h1 className="page-head__title">Hoje</h1>
          <p className="page-head__sub">Só o que está marcado para hoje.</p>
        </div>
      </header>

      <section className="card-block" aria-labelledby="today-heading">
        <h2 id="today-heading" className="sr-only">
          Lista do dia
        </h2>
        <div className="stack">
          {tasks.length === 0 ? (
            <p className="empty-hint">Nenhuma tarefa para hoje. Adicione em Tarefas.</p>
          ) : (
            tasks.map((t) => (
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
