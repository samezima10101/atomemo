import { Task } from "@/src/types/task";
import { router } from "expo-router";
import { useState } from "react";
import { useTutorial } from "@/src/tutorial/TutorialProvider";
import {
  deleteTask as removeTask,
  insertTask,
  updateTask,
} from "../services/reflectionServices";

export const useTasks = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { registerUndo, stepIndex } = useTutorial();

  const submitTask = async (
    taskData: Omit<Task, "id" | "created_at" | "completed_at" | "reflection">,
    taskId?: string,
  ): Promise<boolean> => {
    setIsSubmitting(true);
    setError(null);

    try {
      if (taskId) {
        // 編集モード
        await updateTask(taskId, taskData);
      } else {
        // 新規作成モード
        const createdTask = await insertTask(taskData);
        if (stepIndex === 2) {
          registerUndo("write-task", async () => {
            await removeTask(createdTask.id);
            router.push({
              pathname: "/tasks/edit",
              params: { targetDate: taskData.target_date },
            });
          });
        }
      }
      // 成功したら前の画面（リスト等）に戻る
      router.back();
      return true;
    } catch (err: any) {
      setError(err.message || "エラーが発生しました");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteTask = async (taskId: string) => {
    setIsSubmitting(true);
    setError(null);

    try {
      await removeTask(taskId);
      router.back();
    } catch (err: any) {
      setError(err.message || "タスクの削除に失敗しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitTask, deleteTask, isSubmitting, error };
};
