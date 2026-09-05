import { supabase } from "@/src/lib/supabase";
import { Task } from "@/src/types/task";

export const insertTask = async (
  taskData: Omit<Task, "id" | "created_at" | "completed_at" | "reflection">,
) => {
  const { data, error } = await supabase
    .from("tasks")
    .insert(taskData)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

// タスクの更新
export const updateTask = async (
  id: string,
  updates: Partial<Omit<Task, "id" | "created_at">>,
) => {
  const { data, error } = await supabase
    .from("tasks")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const deleteTask = async (id: string) => {
  const { error } = await supabase.from("tasks").delete().eq("id", id);

  if (error) throw new Error(error.message);
};

export const updateTaskCompletion = async (
  id: string,
  isCompleted: boolean,
  reflection: string | null = null,
) => {
  return updateTask(id, {
    is_completed: isCompleted,
    completed_at: isCompleted ? new Date().toISOString() : null,
    reflection: isCompleted ? reflection : null,
  });
};
