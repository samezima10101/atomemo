import { Colors } from "@/src/constants/theme";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type TaskItemProps = {
  title: string;
  subtasks?: string;
  completed?: boolean;
};

export default function TaskItem({
  title,
  subtasks,
  completed,
}: TaskItemProps) {
  const [isCompleted, setIsCompleted] = useState(completed || false);

  // アイコンがタップされた時に状態を反転させる関数
  const toggleComplete = () => {
    setIsCompleted(!isCompleted);
  };
  return (
    <View style={styles.container}>
      {/* 左側のタイムライン */}
      <View style={styles.leftColumn}>
        <TouchableOpacity onPress={toggleComplete}>
          {isCompleted ? (
            <AntDesign name="check-circle" size={32} />
          ) : (
            <View style={styles.uncheckCircle} />
          )}
        </TouchableOpacity>
        <View style={styles.verticalLine} />
      </View>

      {/* 右側のタスク内容部分 */}
      <View style={styles.rightColumn}>
        <View style={styles.titleRow}>
          <Text style={[styles.title, isCompleted && styles.completedTitle]}>
            {title}
          </Text>
        </View>

        {subtasks && <Text style={styles.subtasks}>{subtasks}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    minHeight: 90,
  },
  leftColumn: {
    width: 60,
    alignItems: "center",
  },
  uncheckCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
  },
  verticalLine: {
    width: 3,
    backgroundColor: Colors.blue,
    flexGrow: 1,
    marginTop: 8,
    marginBottom: 8,
  },
  rightColumn: {
    flex: 1,
    paddingBottom: 50,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
  },
  completedTitle: {
    textDecorationLine: "line-through",
    color: Colors.gray,
  },
  moreIcon: {
    marginLeft: 20,
  },
  subtasks: {
    marginTop: 16,
    fontSize: 20,
    lineHeight: 30,
  },
});
