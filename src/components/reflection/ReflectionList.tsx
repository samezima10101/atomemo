import type { Task } from "@/src/types/task";
import { StyleSheet, Text, View } from "react-native";
import ReflectionDateGroup from "./ReflectionDateGroup";

const formatDate = (completedAt: string) => {
	const date = new Date(completedAt);
	return `${date.getMonth() + 1}月${date.getDate()}日(${"日月火水木金土"[date.getDay()]})`;
};

export default function ReflectionList({ tasks }: { tasks: Task[] }) {
	const groups = tasks.reduce<{ date: string; tasks: Task[] }[]>(
		(result, task) => {
			const date = formatDate(task.completed_at!);
			const group = result.find((item) => item.date === date);
			if (group) group.tasks.push(task);
			else result.push({ date, tasks: [task] });
			return result;
		},
		[],
	);

	if (groups.length === 0) {
		return <Text style={styles.empty}>メモ付きの完了タスクはありません。</Text>;
	}

	return (
		<View>
			{groups.map((group) => (
				<ReflectionDateGroup key={group.date} {...group} />
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	empty: { marginTop: 32, fontSize: 18, color: "#64748b" },
});
