import { Colors } from "@/src/constants/theme";
import type { Task } from "@/src/types/task";
import { StyleSheet, Text, View } from "react-native";
import ReflectionItem from "./ReflectionItem";

type ReflectionDateGroupProps = { date: string; tasks: Task[] };

export default function ReflectionDateGroup({
	date,
	tasks,
}: ReflectionDateGroupProps) {
	return (
		<View style={styles.group}>
			<Text style={styles.heading}>
				{date} • {tasks.length} done
			</Text>
			{tasks.map((task) => (
				<ReflectionItem key={task.id} task={task} />
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	group: { marginBottom: 20 },
	heading: { fontSize: 24, lineHeight: 32, color: Colors.black, marginBottom: 12 },
});
