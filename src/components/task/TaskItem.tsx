import { Text, View } from "react-native";

type TaskItemProps = {
  title: string;
  subtasks?: string;
};

export default function TaskItem({ title, subtasks }: TaskItemProps) {
  return (
    <View className="flex-1 py-7 bg-white">
      <Text style={{ fontSize: 50, fontWeight: "bold" }}>{title}</Text>{" "}
      <Text style={{ fontSize: 20, fontWeight: "bold", opacity: 0.5 }}>
        {subtasks}
      </Text>
    </View>
  );
}
