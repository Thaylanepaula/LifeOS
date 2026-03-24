import { useMemo, useState } from "react";
import { Sidebar } from "./components/Sidebar.jsx";
import { HomeView } from "./views/HomeView.jsx";
import { TodayView } from "./views/TodayView.jsx";
import { TasksView } from "./views/TasksView.jsx";
import { CalendarView } from "./views/CalendarView.jsx";
import { useTasks } from "./hooks/useTasks.js";
import { greetingForNow } from "./lib/greeting.js";
import "./App.css";

function App() {
  const [nav, setNav] = useState("home");
  const { tasks, addTask, toggleTask } = useTasks();

  const stats = useMemo(() => {
    const total = tasks.length;
    const done = tasks.filter((t) => t.done).length;
    return { total, done, pending: total - done };
  }, [tasks]);

  const todayTasks = useMemo(() => {
    return tasks.filter(
      (t) => t.dueDate === "today" || /\bhoje\b/i.test(t.dueLabel ?? "")
    );
  }, [tasks]);

  const focusTasks = useMemo(() => {
    const high = tasks.filter((t) => !t.done && t.priority === "alta");
    if (high.length) return high.slice(0, 6);
    return tasks.filter((t) => !t.done).slice(0, 4);
  }, [tasks]);

  const dateLabel = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const content = (() => {
    switch (nav) {
      case "home":
        return (
          <HomeView
            greeting={greetingForNow()}
            dateLabel={dateLabel}
            stats={stats}
            focusTasks={focusTasks}
            onToggle={toggleTask}
          />
        );
      case "today":
        return <TodayView tasks={todayTasks} onToggle={toggleTask} />;
      case "tasks":
        return (
          <TasksView tasks={tasks} onToggle={toggleTask} onAdd={addTask} />
        );
      case "calendar":
        return <CalendarView />;
      default:
        return null;
    }
  })();

  return (
    <div className="app-root">
      <Sidebar activeId={nav} onSelect={setNav} />
      <main className="app-root__main">{content}</main>
    </div>
  );
}

export default App;
