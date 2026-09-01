import { AppIcon } from "@/src/components/common/AppIcon";
import type { Task } from "@/src/types/task";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TaskItem from "./TaskItem";

type TaskListProps = {
  tasks: Task[];
  selectedDate: string;
};

export default function TaskList({ tasks, selectedDate }: TaskListProps) {
  return (
    <View style={styles.container}>
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
