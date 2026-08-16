import { View } from "react-native";
import TaskItem from "./TaskItem";

export type Task = {
  id: string;
  title: string;
  subtasks?: string;
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
        />
      ))}
    </View>
  );
}
