import { AppIcon } from "@/src/components/common/AppIcon";
import { TaskForm } from "@/src/components/task/TaskForm";
import { Colors } from "@/src/constants/theme";
import { useAuth } from "@/src/features/auth/AuthContext";
import { getTaskById } from "@/src/features/reflections/services/reflectionService";
import { useTasks } from "@/src/features/tasks/hooks/useTasks";
import type { Task } from "@/src/types/task";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function EditScreen() {
  const handlePrivacyPolicyPress = async () => {
    try {
      await Linking.openURL(
        "https://docs.google.com/document/d/1lUVf7WuBIVnJM1s5k509vIohi_qOyk_RIt9k5MPmGQM/edit?usp=sharing",
      );
    } catch (error) {
      Alert.alert(
        "リンクを開けませんでした",
        error instanceof Error
          ? error.message
          : "プライバシーポリシーを開けませんでした。",
      );
    }
  };

  // [taskId].tsxから遷移してきた場合、URLパラメータからtaskIdを取得
  const { taskId, targetDate } = useLocalSearchParams<{
    taskId?: string;
    targetDate: string;
  }>();
  const { submitTask, deleteTask, isSubmitting, error } = useTasks();
  const { user } = useAuth();
  const [task, setTask] = useState<Task | null>(null);
  const [isTaskLoading, setIsTaskLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const handleFormSubmit = async (formData: {
    title: string;
    description: string;
    target_date: string;
  }): Promise<boolean> => {
    if (!user) {
      alert("ユーザー情報が見つかりません。ホーム画面に戻ってください。");
      return false;
    }

    return submitTask(
      {
        user_id: user.id,
        title: formData.title,
        description: formData.description || null,
        target_date: formData.target_date,
        is_completed: task?.is_completed ?? false,
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
        const data = await getTaskById(taskId);
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
  }, [taskId, targetDate, user]);

  const handleDelete = () => {
    if (!taskId || isSubmitting) return;

    Alert.alert("タスクを削除", "このタスクを削除しますか？", [
      { text: "キャンセル", style: "cancel" },
      {
        text: "削除",
        style: "destructive",
        onPress: () => deleteTask(taskId),
      },
    ]);
  };

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
              <Text style={styles.backText}>＜ 戻る</Text>
            </TouchableOpacity>

            {/* 既存タスクの編集時のみ削除ボタンを表示する制御 */}
            {taskId && (
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={handleDelete}
                disabled={isSubmitting}
                accessibilityLabel="タスクを削除"
              >
                <AppIcon
                  name="trash"
                  size={26}
                  style={{ tintColor: Colors.red }}
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
          {(!taskId || task) && (
            <TaskForm
              onSubmit={handleFormSubmit}
              isSubmitting={isSubmitting}
              initialTitle={task?.title ?? ""}
              initialDescription={task?.description ?? ""}
              initialTargetDate={task?.target_date ?? targetDate}
            />
          )}
          <TouchableOpacity
            onPress={handlePrivacyPolicyPress}
            style={styles.privacyPolicyLink}
            accessibilityRole="link"
          >
            <Text style={styles.privacyPolicyText}>プライバシーポリシー</Text>
          </TouchableOpacity>
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
  privacyPolicyLink: {
    alignSelf: "center",
    marginTop: 24,
    padding: 8,
  },
  privacyPolicyText: {
    color: Colors.themeDark,
    fontSize: 14,
    textDecorationLine: "underline",
  },
});
