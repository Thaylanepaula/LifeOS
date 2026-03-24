import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "lifeos.tasks.v1";

const DEFAULT_TASKS = [
  {
    id: "1",
    title: "Revisar metas da semana",
    dueLabel: "Hoje · 18:00",
    dueDate: "today",
    priority: "alta",
    done: false,
  },
  {
    id: "2",
    title: "Treino leve (30 min)",
    dueLabel: "Hoje",
    dueDate: "today",
    priority: "media",
    done: false,
  },
  {
    id: "3",
    title: "Responder e-mails pendentes",
    dueLabel: "Amanhã",
    dueDate: "tomorrow",
    priority: "baixa",
    done: true,
  },
];

function normalizeTasks(list) {
  return list.map((t) => ({
    ...t,
    dueLabel: t.dueLabel ?? t.due ?? "",
    dueDate: t.dueDate ?? null,
  }));
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_TASKS;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) return DEFAULT_TASKS;
    return normalizeTasks(parsed);
  } catch {
    return DEFAULT_TASKS;
  }
}

function save(tasks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    /* ignore */
  }
}

export function useTasks() {
  const [tasks, setTasks] = useState(load);

  useEffect(() => {
    save(tasks);
  }, [tasks]);

  const addTask = useCallback((title, opts = {}) => {
    const trimmed = title.trim();
    if (!trimmed) return;
    const id =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : String(Date.now());
    setTasks((prev) => [
      {
        id,
        title: trimmed,
        dueLabel: opts.dueLabel ?? "Sem data",
        dueDate: opts.dueDate ?? null,
        priority: opts.priority ?? "media",
        done: false,
      },
      ...prev,
    ]);
  }, []);

  const toggleTask = useCallback((id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }, []);

  const removeTask = useCallback((id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { tasks, addTask, toggleTask, removeTask };
}
