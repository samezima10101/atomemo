import { supabase } from "@/src/lib/supabase";
import type { Task } from "@/src/types/task";

export const getTasksByDate = async (
  userId: string,
  targetDate: string,
): Promise<Task[]> => {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", userId)
    .eq("target_date", targetDate)
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
};

export const getTasksWithReflections = async (
  userId: string,
): Promise<Task[]> => {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", userId)
    .eq("is_completed", true)
    .not("completed_at", "is", null)
    .not("reflection", "is", null)
    .neq("reflection", "")
    .order("completed_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).filter(
    (task) => typeof task.reflection === "string" && task.reflection.trim(),
  );
};
