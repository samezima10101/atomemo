import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TaskItem from "./TaskItem";
import { Colors } from "@/src/constants/theme";

export type Task = {
  id: string;
  title: string;
  subtasks?: string;
  completed?: boolean;
};

type TaskListProps = {
  tasks: Task[];
};

export default function TaskList({ tasks }: TaskListProps) {
  return (
    <View>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          title={task.title}
          subtasks={task.subtasks}
          completed={task.completed}
        />
      ))}
      <View style={styles.addRow}>
        <TouchableOpacity
          style={styles.addLeftColumn}
          onPress={() => router.push("/tasks/edit")}
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
