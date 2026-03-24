import { useEffect, useMemo, useState } from "react";
import { supabase } from "./lib/supabaseClient.js";
import { Auth } from "./components/Auth.jsx";
import { Sidebar } from "./components/Sidebar.jsx";
import { HomeView } from "./views/HomeView.jsx";
import { TodayView } from "./views/TodayView.jsx";
import { TasksView } from "./views/TasksView.jsx";
import { CalendarView } from "./views/CalendarView.jsx";
import { useTasks } from "./hooks/useTasks.js";
import "./App.css";

function App() {
  const [nav, setNav] = useState("home");
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const { tasks, addTask, toggleTask } = useTasks();

  useEffect(() => {
    let cancelled = false;

    supabase.auth.getSession().then(({ data: { session: s } }) => {
      if (cancelled) return;
      setSession(s);
      setAuthLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setAuthLoading(false);
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, []);

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

  const welcomeDate = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  if (authLoading) {
    return (
      <div className="auth-loading" aria-live="polite">
        Carregando…
      </div>
    );
  }

  if (!session) {
    return <Auth />;
  }

  const email = session.user?.email ?? "";
  const rawName = session.user?.user_metadata?.full_name;
  const welcomeName =
    typeof rawName === "string" && rawName.trim() !== ""
      ? rawName.trim()
      : "Usuária";

  const mainContent = (() => {
    switch (nav) {
      case "home":
        return (
          <HomeView
            welcomeName={welcomeName}
            welcomeDate={welcomeDate}
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
    <div className="app-shell-logged">
      <header className="auth-bar">
        <span className="auth-bar__email">{email}</span>
        <button
          type="button"
          className="auth-bar__out"
          onClick={() => supabase.auth.signOut()}
        >
          Sair
        </button>
      </header>

      <div className="app-root">
        <Sidebar activeId={nav} onSelect={setNav} />
        <main className="app-root__main">{mainContent}</main>
      </div>
    </div>
  );
}

export default App;
