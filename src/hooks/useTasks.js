import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient.js";

function mapTask(task) {
  return {
    id: task.id,
    title: task.title ?? "",
    dueLabel: "",
    dueDate: null,
    priority: "media",
    done: Boolean(task.is_done),
  };
}

export function useTasks(userId) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    let active = true;

    async function loadTasks() {
      if (!userId) {
        if (active) setTasks([]);
        return;
      }

      const { data, error } = await supabase
        .from("tasks")
        .select("id, user_id, title, is_done")
        .eq("user_id", userId)
        .order("id", { ascending: false });

      if (!active) return;
      if (error || !Array.isArray(data)) {
        setTasks([]);
        return;
      }

      setTasks(data.map(mapTask));
    }

    loadTasks();

    return () => {
      active = false;
    };
  }, [userId]);

  const addTask = useCallback(
    async (title) => {
      const trimmed = title.trim();
      if (!trimmed || !userId) return;

      const payload = {
        user_id: userId,
        title: trimmed,
        is_done: false,
      };

      const { data, error } = await supabase
        .from("tasks")
        .insert(payload)
        .select("id, user_id, title, is_done")
        .single();

      if (error || !data) {
        console.log("Erro ao inserir tarefa no Supabase:", error);
        return;
      }

      setTasks((prev) => [mapTask(data), ...prev]);
    },
    [userId]
  );

  const toggleTask = useCallback(async (id) => {
    const { data, error } = await supabase
      .from("tasks")
      .update({ is_done: true })
      .eq("id", id)
      .select("id, is_done")
      .single();

    if (error || !data) return;

    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, done: Boolean(data.is_done) } : task))
    );
  }, []);

  const removeTask = useCallback(async (id) => {
    await supabase.from("tasks").delete().eq("id", id);
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  return { tasks, addTask, toggleTask, removeTask };
}
