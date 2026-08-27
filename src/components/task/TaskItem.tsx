import { AppIcon } from "@/src/components/common/AppIcon";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export type TaskItemProps = {
  title: string;
  subtasks?: string;
  completed?: boolean;
  onToggle?: () => void;
};

export default function TaskItem({
  title,
  subtasks,
  completed = false,
  onToggle,
}: TaskItemProps) {
  return (
    <View style={styles.container}>
      {/* 左列：アイコン ＋ サブタスクの長さに追従する青い線 */}
      <View style={styles.iconColumn}>
        <TouchableOpacity
          onPress={onToggle}
          style={styles.checkButton}
          activeOpacity={0.7}
        >
          <AppIcon name={completed ? "check" : "circle"} size={36} />
        </TouchableOpacity>

        {/* 青い線のエリア：最小高さを設定してサブタスク無しでも棒を表示 */}
        <View style={styles.lineWrapper}>
          <View style={styles.blueLine} />
        </View>
      </View>

      {/* 右列：タイトル・サブタスク */}
      <View style={styles.content}>
        <Text style={[styles.title, completed && styles.completedTitle]}>
          {title}
        </Text>

        {subtasks && subtasks.trim().length > 0 && (
          <Text style={styles.subtasks}>{subtasks}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  iconColumn: {
    width: 48,
    alignItems: "center",
    alignSelf: "stretch",
  },
  checkButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  lineWrapper: {
    flex: 1,
    minHeight: 20, // サブタスクが無くても最低20pxの棒を表示
    alignItems: "center",
    paddingTop: 6,
    paddingBottom: 4,
  },
  blueLine: {
    width: 2,
    height: "100%", // 親要素の高さに合わせて可変伸縮
    backgroundColor: "#3b82f6",
  },
  content: {
    flex: 1,
    paddingTop: 2,
    paddingBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0f172a",
  },
  completedTitle: {
    textDecorationLine: "line-through",
    color: "#94a3b8",
  },
  subtasks: {
    fontSize: 16,
    color: "#64748b",
    marginTop: 6,
    lineHeight: 22,
  },
});
