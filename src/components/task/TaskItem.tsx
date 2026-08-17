import { StyleSheet, Text, View } from "react-native";

type TaskItemProps = {
  title: string;
  subtasks?: string;
};

export default function TaskItem({ title, subtasks }: TaskItemProps) {
  return (
    <View style={styles.task}>
      <Text style={styles.title}>{title}</Text>

      {subtasks && <Text style={styles.subtasks}>{subtasks}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
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
