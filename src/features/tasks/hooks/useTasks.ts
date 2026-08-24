import { useState } from "react";
import { router } from "expo-router";
import { insertTask, updateTask } from "../services/reflectionServices";
import { Task } from "@/src/types/task";

export const useTasks = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitTask = async (
    taskData: Omit<Task, "id" | "created_at" | "completed_at" | "reflection">,
    taskId?: string,
  ) => {
    setIsSubmitting(true);
    setError(null);

    try {
      if (taskId) {
        // 編集モード
        await updateTask(taskId, taskData);
      } else {
        // 新規作成モード
        await insertTask(taskData);
      }
      // 成功したら前の画面（リスト等）に戻る
      router.back();
    } catch (err: any) {
      setError(err.message || "エラーが発生しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitTask, isSubmitting, error };
};
