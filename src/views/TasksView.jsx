import { useState } from "react";
import { TaskCard } from "../components/TaskCard.jsx";

export function TasksView({ tasks, onToggle, onAdd }) {
  const [draft, setDraft] = useState("");

  function submit(e) {
    e.preventDefault();
    onAdd(draft, { dueLabel: "Nova", priority: "media" });
    setDraft("");
  }

  return (
    <>
      <header className="page-head">
        <div>
          <p className="page-head__eyebrow">Produtividade</p>
          <h1 className="page-head__title">Tarefas</h1>
          <p className="page-head__sub">Lista completa e entrada rápida.</p>
        </div>
      </header>

      <form className="quick-add" onSubmit={submit}>
        <label htmlFor="task-input" className="sr-only">
          Nova tarefa
        </label>
        <input
          id="task-input"
          className="quick-add__input"
          type="text"
          placeholder="O que você precisa fazer?"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          autoComplete="off"
        />
        <button type="submit" className="quick-add__btn">
          Adicionar
        </button>
      </form>

      <section className="card-block" aria-labelledby="all-tasks-heading">
        <div className="card-block__head">
          <h2 id="all-tasks-heading">Todas</h2>
          <p className="card-block__hint">{tasks.length} itens</p>
        </div>
        <div className="stack">
          {tasks.length === 0 ? (
            <p className="empty-hint">Lista vazia. Crie sua primeira tarefa acima.</p>
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
