import { AppIcon } from "@/src/components/common/AppIcon";
import { Colors } from "@/src/constants/theme";
import type { Task } from "@/src/types/task";
import { router } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import TaskItem from "./TaskItem";

type TaskListProps = {
  tasks: Task[];
  selectedDate: string;
  onCompletionChange?: (
    taskId: string,
    isCompleted: boolean,
    reflection: string | null,
  ) => Promise<void>;
};

export default function TaskList({
  tasks,
  selectedDate,
  onCompletionChange,
}: TaskListProps) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onCompletionChange={onCompletionChange}
        />
      ))}

      <View style={styles.addRow}>
        <TouchableOpacity
          style={styles.addLeftColumn}
          onPress={() =>
            router.push({
              pathname: "/tasks/edit",
              params: { targetDate: selectedDate },
            })
          }
        >
          {/* 黒の○の中に＋が入ったSVGアイコン */}
          <AppIcon
            name="icons8_plus"
            size={32}
            style={{ tintColor: Colors.black }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addRightColumn}
          onPress={() =>
            router.push({
              pathname: "/tasks/edit",
              params: { targetDate: selectedDate },
            })
          }
          activeOpacity={0.7}
        >
          <Text style={styles.addText}>今日のタスクを追加する</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginRight: -20,
  },
  content: {
    paddingRight: 20,
    paddingBottom: 100,
  },
  addRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  addLeftColumn: {
    width: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  addRightColumn: {
    flex: 1,
  },
  addText: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.black,
  },
});
