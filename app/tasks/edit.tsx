import { TaskForm } from "@/src/components/task/TaskForm";
import { useAuth } from "@/src/features/auth/AuthContext";
import { useTasks } from "@/src/features/tasks/hooks/useTasks";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { router, Stack, useLocalSearchParams } from "expo-router";
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
    taskId: string;
    targetDate: string;
  }>();
  const { submitTask, isSubmitting, error } = useTasks();
  const { user } = useAuth();

  const handleFormSubmit = async (formData: {
    title: string;
    description: string;
    target_date: string;
  }) => {
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
              <AntDesign name="left" size={18} color="#0f172a" />
              <Text style={styles.backText}>戻る</Text>
            </TouchableOpacity>

            {/* 既存タスクの編集時のみ削除ボタンを表示する制御 */}
            {taskId && (
              <TouchableOpacity style={styles.deleteButton}>
                <MaterialCommunityIcons
                  name="trash-can-outline"
                  size={26}
                  color="#ef4444"
                />
              </TouchableOpacity>
            )}
          </View>

          {/* エラーメッセージ表示 */}
          {error && (
            <Text style={{ color: "red", marginVertical: 10 }}>{error}</Text>
          )}

          {/* フォームコンポーネントの呼び出し */}
          <TaskForm
            onSubmit={handleFormSubmit}
            isSubmitting={isSubmitting}
            initialTargetDate={targetDate}
            // TODO: 編集モード(taskIdがある)の場合は、初期値としてDBから取得したデータをinitialPropsへ渡す処理を追記する
          />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
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
    backgroundColor: "#ffffff",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    gap: 6,
    // iOS shadow
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    // Android elevation
    elevation: 3,
  },
  backText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0f172a",
  },
  deleteButton: {
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 999,
    // iOS shadow
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    // Android elevation
    elevation: 3,
  },
  errorText: {
    color: "#ef4444",
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});
