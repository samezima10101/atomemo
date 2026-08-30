import type { Task } from "@/src/types/task";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TaskItem from "./TaskItem";

type TaskListProps = {
  tasks: Task[];
  selectedDate: string;
};

export default function TaskList({ tasks, selectedDate }: TaskListProps) {
  return (
    <View>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          title={task.title}
          subtasks={task.description ?? undefined}
          completed={task.is_completed}
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
          <AntDesign name="plus-circle" size={32} />
        </TouchableOpacity>
        <View style={styles.addRightColumn}>
          <Text style={styles.addText}>今日のタスクを追加する</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  addRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  addLeftColumn: {
    width: 60,
    alignItems: "center",
  },
  addRightColumn: {
    flex: 1,
  },
  addText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
