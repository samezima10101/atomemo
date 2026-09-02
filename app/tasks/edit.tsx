import { TaskForm } from "@/src/components/task/TaskForm";
import { Colors } from "@/src/constants/theme";
import { useAuth } from "@/src/features/auth/AuthContext";
import { getTaskById } from "@/src/features/reflections/services/reflectionService";
import { useTasks } from "@/src/features/tasks/hooks/useTasks";
import type { Task } from "@/src/types/task";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function EditScreen() {
  // [taskId].tsxから遷移してきた場合、URLパラメータからtaskIdを取得
  const { taskId, targetDate } = useLocalSearchParams<{
    taskId?: string;
    targetDate: string;
  }>();
  const { submitTask, isSubmitting, error } = useTasks();
  const { user } = useAuth();
  const [task, setTask] = useState<Task | null>(null);
  const [isTaskLoading, setIsTaskLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const handleFormSubmit = async (formData: {
    title: string;
    description: string;
    target_date: string;
  }) => {
    if (task?.is_completed) {
      return;
    }

    if (!user) {
      alert("ユーザー情報が見つかりません。ホーム画面に戻ってください。");
      return;
    }

    await submitTask(
      {
        user_id: user.id,
        title: formData.title,
        description: formData.description || null,
        target_date: formData.target_date,
        is_completed: false,
      },
      taskId,
    );
  };

  useEffect(() => {
    if (!taskId || !user) {
      return;
    }

    const loadTask = async () => {
      setIsTaskLoading(true);
      setLoadError(null);

      try {
        const data = await getTaskById(taskId, user.id);
        setTask(data);
      } catch (error) {
        setLoadError(
          error instanceof Error
            ? error.message
            : "タスクの取得に失敗しました。",
        );
      } finally {
        setIsTaskLoading(false);
      }
    };

    loadTask();
  }, [taskId, user]);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          {/* ヘッダーエリア */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <AntDesign name="left" size={18} color={Colors.black} />
              <Text style={styles.backText}>戻る</Text>
            </TouchableOpacity>

            {/* 既存タスクの編集時のみ削除ボタンを表示する制御 */}
            {taskId && (
              <TouchableOpacity style={styles.deleteButton}>
                <MaterialCommunityIcons
                  name="trash-can-outline"
                  size={26}
                  color={Colors.red}
                />
              </TouchableOpacity>
            )}
          </View>

          {/* エラーメッセージ表示 */}
          {error && (
            <Text style={{ color: Colors.red, marginVertical: 10 }}>
              {error}
            </Text>
          )}

          {/* フォームコンポーネントの呼び出し */}
          {(!taskId || (task && !task.is_completed)) && (
            <TaskForm
              onSubmit={handleFormSubmit}
              isSubmitting={isSubmitting}
              initialTitle={task?.title ?? ""}
              initialDescription={task?.description ?? ""}
              initialTargetDate={task?.target_date ?? targetDate}
              // TODO: 編集モード(taskIdがある)の場合は、初期値としてDBから取得したデータをinitialPropsへ渡す処理を追記する
            />
          )}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingTop: 54,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    gap: 6,
    // iOS shadow
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    // Android elevation
    elevation: 3,
  },
  backText: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.black,
  },
  deleteButton: {
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 999,
    // iOS shadow
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    // Android elevation
    elevation: 3,
  },
  errorText: {
    color: Colors.red,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});
