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

export const getTaskById = async (
  id: string,
  userId: string,
): Promise<Task> => {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("id", id)
    .eq("user_id", userId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Task;
};
