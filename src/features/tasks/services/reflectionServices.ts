import { supabase } from "@/src/lib/supabase";
import { Task } from "@/src/types/task";

// タスクの新規作成
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
