import { StyleSheet, View } from "react-native";
import TaskList, { type Task } from "../../src/components/task/TaskList";

const tasks: Task[] = [
  {
    id: "dog-walk",
    title: "犬の散歩",
  },
  {
    id: "development",
    title: "開発",
    subtasks: "・イラストレーターさん委託\n・デザイナー資料\n・要件定義書作成",
  },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <TaskList tasks={tasks} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 24,
  },
});
