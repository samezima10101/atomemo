import WeekCalendar from "@/src/components/calendar/WeekCalendar";
import { AppIcon } from "@/src/components/common/AppIcon";
import TaskList from "@/src/components/task/TaskList";
import { Colors } from "@/src/constants/theme";
import { useAuth } from "@/src/features/auth/AuthContext";
import { getTasksByDate } from "@/src/features/reflections/services/reflectionService";
import type { Task } from "@/src/types/task";
import { getWeekDays } from "@/src/utils/date";

import { router, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

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
        <ActivityIndicator size="large" color={Colors.themeMain} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <WeekCalendar
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
      />
      {isTasksLoading ? (
        <ActivityIndicator size="small" color={Colors.themeMain} />
      ) : taskError ? (
        <Text style={styles.errorText}>{taskError}</Text>
      ) : (
        <TaskList tasks={tasks} selectedDate={selectedDate} />
      )}
      <TouchableOpacity
        style={styles.fab}
        onPress={() =>
          router.push({
            pathname: "/tasks/edit",
            params: { targetDate: selectedDate },
          })
        }
      >
        <AppIcon name="plus" size={32} />
      </TouchableOpacity>
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
    padding: 24,
    position: "relative",
  },
  errorText: {
    color: Colors.red,
    marginTop: 16,
  },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 24,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#dbeafe", // Figma通りの水色・薄青背景
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
});
