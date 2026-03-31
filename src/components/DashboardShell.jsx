import { useMemo, useState } from "react";
import { supabase } from "../lib/supabaseClient.js";
import { Sidebar } from "./Sidebar.jsx";
import { HomeView } from "../views/HomeView.jsx";
import { TodayView } from "../views/TodayView.jsx";
import { TasksView } from "../views/TasksView.jsx";
import { CalendarView } from "../views/CalendarView.jsx";
import { useTasks } from "../hooks/useTasks.js";

/** Módulos da sidebar quando o usuário ainda não tem preferências salvas (definição interna). */
const DEFAULT_MODULES = ["home", "today", "tasks", "calendar"];

const PROFILE_MODULES = {
  Analista: ["home", "today", "tasks", "calendar"],
  Freelancer: ["home", "tasks", "calendar"],
  Gestora: ["home", "today", "calendar"],
};

export function DashboardShell({ session }) {
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

  const welcomeDate = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const email = session.user?.email ?? "";
  const rawName = session.user?.user_metadata?.full_name;
  const profile = session.user?.user_metadata?.template_profile;
  const activeModules = session.user?.user_metadata?.active_modules;
  const welcomeName =
    typeof rawName === "string" && rawName.trim() !== ""
      ? rawName.trim()
      : "Usuária";
  const enabledNavIds =
    Array.isArray(activeModules) && activeModules.length > 0
      ? activeModules
      : PROFILE_MODULES[profile] ?? DEFAULT_MODULES;

  const mainContent = (() => {
    switch (nav) {
      case "home":
        return (
          <HomeView
            welcomeName={welcomeName}
            welcomeDate={welcomeDate}
            stats={stats}
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
    <div className="app-shell-logged app-shell-logged--central">
      <div className="opal-bg" aria-hidden />
      <header className="auth-bar auth-bar--central">
        <span className="auth-bar__badge" aria-hidden>
          Centro de comando
        </span>
        <span className="auth-bar__spacer" aria-hidden />
        <span className="auth-bar__email">{email}</span>
        <button
          type="button"
          className="auth-bar__out"
          onClick={() => supabase.auth.signOut()}
        >
          Sair
        </button>
      </header>

      <div className="app-root app-root--central">
        <Sidebar activeId={nav} onSelect={setNav} enabledNavIds={enabledNavIds} />
        <main className="app-root__main">{mainContent}</main>
      </div>
    </div>
  );
}
