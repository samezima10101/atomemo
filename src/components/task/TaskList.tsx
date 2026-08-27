import { AppIcon } from "@/src/components/common/AppIcon";
import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TaskItem from "./TaskItem";

export type Task = {
  id: string;
  title: string;
  subtasks?: string;
  completed?: boolean;
};

type TaskListProps = {
  tasks: Task[];
};

export default function TaskList({ tasks: initialTasks }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const handleToggle = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  return (
    <View style={styles.container}>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          title={task.title}
          subtasks={task.subtasks}
          completed={task.completed}
          onToggle={() => handleToggle(task.id)}
        />
      ))}

      <View style={styles.addRow}>
        <TouchableOpacity
          style={styles.addLeftColumn}
          onPress={() => router.push("/tasks/edit")}
          activeOpacity={0.7}
        >
          {/* 黒の○の中に＋が入ったSVGアイコン */}
          <AppIcon name="icons8_plus" size={32} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addRightColumn}
          onPress={() => router.push("/tasks/edit")}
          activeOpacity={0.7}
        >
          <Text style={styles.addText}>今日のタスクを追加する</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
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
    color: "#0f172a",
  },
});
