import WeekCalendar from "@/src/components/calendar/WeekCalendar";
import DailyTaskView from "@/src/components/task/DailyTaskView";
import { Colors } from "@/src/constants/theme";
import { useAuth } from "@/src/features/auth/AuthContext";
import { getTasksByDate } from "@/src/features/reflections/services/reflectionService";
import { updateTaskCompletion } from "@/src/features/tasks/services/reflectionServices";
import type { Task } from "@/src/types/task";
import { getWeekDays } from "@/src/utils/date";

import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const getInitialDate = () => {
  const weekDays = getWeekDays();
  return weekDays.find((d) => d.isToday)?.fullDate || weekDays[0].fullDate;
};

export default function HomeScreen() {
  const [selectedDate, setSelectedDate] = useState(getInitialDate());

  const { user, isLoading, signInAnonymously } = useAuth();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [isTasksLoading, setIsTasksLoading] = useState(false);
  const [taskError, setTaskError] = useState<string | null>(null);

  const handleCompletionChange = async (
    taskId: string,
    isCompleted: boolean,
    reflection: string | null,
  ) => {
    await updateTaskCompletion(taskId, isCompleted, reflection);
    const data = await getTasksByDate(user!.id, selectedDate);
    setTasks(data);
  };

  {
    /*匿名ログイン処理 */
  }
  useEffect(() => {
    if (!isLoading && !user) {
      signInAnonymously();
    }
  }, [isLoading, signInAnonymously, user]);

  {
    /*画面がフォーカスされるたびにレンダリングする */
  }
  useFocusEffect(
    useCallback(() => {
      if (!user) {
        setTasks([]);
        return;
      }

      let isCancelled = false;

      const loadTasks = async () => {
        setIsTasksLoading(true);
        setTaskError(null);

        try {
          const data = await getTasksByDate(user.id, selectedDate);

          if (!isCancelled) {
            setTasks(data);
          }
        } catch (error) {
          if (!isCancelled) {
            setTaskError(
              error instanceof Error
                ? error.message
                : "タスクの取得に失敗しました。",
            );
          }
        } finally {
          if (!isCancelled) {
            setIsTasksLoading(false);
          }
        }
      };

      loadTasks();

      return () => {
        isCancelled = true;
      };
    }, [selectedDate, user]),
  );

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.themePink} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.calendar}>
        <WeekCalendar
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
      </View>
      <DailyTaskView
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
        tasks={tasks}
        isTasksLoading={isTasksLoading}
        taskError={taskError}
        onCompletionChange={handleCompletionChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: 24,
  },
  calendar: {
    marginHorizontal: 24,
  },
});
