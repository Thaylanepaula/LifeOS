import { useEffect, useMemo, useState } from "react";
import { supabase } from "./lib/supabaseClient.js";
import { Auth } from "./components/Auth.jsx";
import { Sidebar } from "./components/Sidebar.jsx";
import { HomeView } from "./views/HomeView.jsx";
import { TodayView } from "./views/TodayView.jsx";
import { TasksView } from "./views/TasksView.jsx";
import { CalendarView } from "./views/CalendarView.jsx";
import { SetupProfileView } from "./views/SetupProfileView.jsx";
import { useTasks } from "./hooks/useTasks.js";
import "./App.css";

const PROFILE_MODULES = {
  Analista: ["home", "today", "tasks", "calendar"],
  Freelancer: ["home", "tasks", "calendar"],
  Gestora: ["home", "today", "calendar"],
};

function App() {
  const [nav, setNav] = useState("home");
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [setupBusy, setSetupBusy] = useState(false);

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
  const profile = session.user?.user_metadata?.template_profile;
  const activeModules = session.user?.user_metadata?.active_modules;
  const welcomeName =
    typeof rawName === "string" && rawName.trim() !== ""
      ? rawName.trim()
      : "Usuária";
  const enabledNavIds = Array.isArray(activeModules) && activeModules.length > 0
    ? activeModules
    : PROFILE_MODULES[profile] ?? ["home", "today", "tasks", "calendar"];
  const needsSetup = !profile;

  async function handleSetupProfileSelection(selectedProfile) {
    if (!selectedProfile?.id || !Array.isArray(selectedProfile?.modules)) return;

    setSetupBusy(true);
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: {
          template_profile: selectedProfile.id,
          active_modules: selectedProfile.modules,
        },
      });

      if (error) return;

      if (data?.user) {
        setSession((prev) => {
          if (!prev) return prev;
          return { ...prev, user: data.user };
        });
      }
      setNav("home");
    } finally {
      setSetupBusy(false);
    }
  }

  if (needsSetup) {
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

        <main className="setup-main">
          <SetupProfileView
            busy={setupBusy}
            onSelectProfile={handleSetupProfileSelection}
          />
        </main>
      </div>
    );
  }

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
        <Sidebar activeId={nav} onSelect={setNav} enabledNavIds={enabledNavIds} />
        <main className="app-root__main">{mainContent}</main>
      </div>
    </div>
  );
}

export default App;
