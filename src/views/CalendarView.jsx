const DOW = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

function weekDatesFromToday() {
  const now = new Date();
  const day = now.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;
  const monday = new Date(now);
  monday.setHours(12, 0, 0, 0);
  monday.setDate(now.getDate() + mondayOffset);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
}

function sameCalendarDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function CalendarView() {
  const days = weekDatesFromToday();
  const now = new Date();

  return (
    <>
      <header className="page-head">
        <div>
          <p className="page-head__eyebrow">Tempo</p>
          <h1 className="page-head__title">Calendário</h1>
          <p className="page-head__sub">Semana corrente em uma linha.</p>
        </div>
      </header>

      <div className="week-strip" role="list">
        {days.map((d, i) => {
          const isToday = sameCalendarDay(d, now);
          const dayNum = d.getDate();
          return (
            <div
              key={`${d.getFullYear()}-${d.getMonth()}-${dayNum}`}
              className={`week-cell${isToday ? " is-today" : ""}`}
              role="listitem"
            >
              <span className="week-cell__dow">{DOW[i]}</span>
              <span className="week-cell__num">{dayNum}</span>
            </div>
          );
        })}
      </div>

      <section className="card-block card-block--ghost" aria-labelledby="cal-placeholder">
        <h2 id="cal-placeholder" className="card-block__title-inline">
          Próximos passos
        </h2>
        <p className="empty-hint">
          Depois você pode integrar Google Calendar ou blocos de tempo. Por enquanto, use{" "}
          <strong>Hoje</strong> e <strong>Tarefas</strong> no dia a dia.
        </p>
      </section>
    </>
  );
}
