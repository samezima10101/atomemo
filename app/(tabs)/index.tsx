import WeekCalendar from "@/src/components/calendar/WeekCalendar";
import TaskList from "@/src/components/task/TaskList";
import { Colors } from "@/src/constants/theme";
import { useAuth } from "@/src/features/auth/AuthContext";
import { getTasksByDate } from "@/src/features/reflections/services/reflectionService";
import type { Task } from "@/src/types/task";
import { getWeekDays } from "@/src/utils/date";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
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
  const { user, isLoading, signInDev } = useAuth();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [isTasksLoading, setIsTasksLoading] = useState(false);
  const [taskError, setTaskError] = useState<string | null>(null);

  useEffect(() => {
    // 起動時に未ログインであれば開発用ログインを実行
    if (!isLoading && !user) {
      signInDev();
    }
  }, [isLoading, signInDev, user]);

  useEffect(() => {
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
  }, [selectedDate, user]);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.blue500} />
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
        <ActivityIndicator size="small" color={Colors.blue500} />
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
        <AntDesign name="plus" size={32} />
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
  },
  errorText: {
    color: Colors.redLight,
    marginTop: 16,
  },
  fab: {
    position: "absolute",
    bottom: 40,
    right: 40,
    borderRadius: 32,
  },
});
