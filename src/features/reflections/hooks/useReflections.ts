import { useCallback, useEffect, useState } from "react";
import { getTasksWithReflections } from "../services/reflectionService";
import type { Task } from "@/src/types/task";

export const useReflections = (userId?: string) => {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const reload = useCallback(async () => {
		if (!userId) {
			setTasks([]);
			return;
		}

		setIsLoading(true);
		setError(null);
		try {
			setTasks(await getTasksWithReflections(userId));
		} catch (loadError) {
			setError(
				loadError instanceof Error
					? loadError.message
					: "振り返りの取得に失敗しました。",
			);
		} finally {
			setIsLoading(false);
		}
	}, [userId]);

	useEffect(() => {
		reload();
	}, [reload]);

	return { tasks, isLoading, error, reload };
};
