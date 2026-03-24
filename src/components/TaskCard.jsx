const PRIORITY_LABEL = {
  alta: "Alta",
  media: "Média",
  baixa: "Baixa",
};

export function TaskCard({ title, due, priority, done, onToggle }) {
  const priorityClass =
    priority === "alta" ? "is-high" : priority === "media" ? "is-mid" : "is-low";
  const priorityText = PRIORITY_LABEL[priority] ?? priority;

  return (
    <article className={`task-card${done ? " is-done" : ""}`}>
      <button
        type="button"
        className="task-card__check"
        onClick={onToggle}
        aria-pressed={done}
        aria-label={done ? "Marcar como pendente" : "Marcar como concluída"}
      >
        <span className="task-card__check-inner" aria-hidden>
          {done ? "✓" : ""}
        </span>
      </button>
      <div className="task-card__body">
        <h3 className="task-card__title">{title}</h3>
        <div className="task-card__meta">
          {due && <span className="task-card__due">{due}</span>}
          <span className={`task-card__priority ${priorityClass}`}>{priorityText}</span>
        </div>
      </div>
    </article>
  );
}
