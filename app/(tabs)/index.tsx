import { StyleSheet, View } from "react-native";
import TaskItem from "../../src/components/task/TaskItem";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <TaskItem
        taskStyle={styles.task}
        titleStyle={styles.title}
        subtasksStyle={styles.subtasks}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 80,
    paddingLeft: 90,
  },
  task: {
    marginBottom: 70,
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
  },
  subtasks: {
    marginTop: 20,
    fontSize: 18,
    opacity: 0.5,
  },
});
