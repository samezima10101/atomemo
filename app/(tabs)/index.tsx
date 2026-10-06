import WeekCalendar from "@/src/components/calendar/WeekCalendar";
import { AppIcon } from "@/src/components/common/AppIcon";
import TaskList from "@/src/components/task/TaskList";
import { Colors } from "@/src/constants/theme";
import { useAuth } from "@/src/features/auth/AuthContext";
import { getTasksByDate } from "@/src/features/reflections/services/reflectionService";
import { updateTaskCompletion } from "@/src/features/tasks/services/reflectionServices";
import type { Task } from "@/src/types/task";
import { getWeekDays } from "@/src/utils/date";

import { router, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  PanResponder,
  ScrollView,
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
  const formatDateTitle = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayOfWeek = ["日", "月", "火", "水", "木", "金", "土"][date.getDay()];
    return `${year}年${month}月${day}日(${dayOfWeek})`;
  };
  const [selectedDate, setSelectedDate] = useState(getInitialDate());
  const [todayResetRequest, setTodayResetRequest] = useState(0);

  const handleBackToToday = () => {
    setSelectedDate(getInitialDate());
    // 選択日が今日のまま、カレンダーだけスワイプしてる場合でも確実に今日の週に戻すためのリクエストを送る
    // 今日に戻るボタンを押すたびにこのsetTodayResetRequestが更新されるので、WeekCalendarのuseEffectが発火して今日の週に戻る
    setTodayResetRequest((request) => request + 1);
  };

  const daySwipeResponder = useMemo(
    () =>
      PanResponder.create({
        // タップと縦スクロールは子要素に任せる。
        onMoveShouldSetPanResponderCapture: (
          _,
          { dx, dy, numberActiveTouches },
        ) =>
          numberActiveTouches === 1 &&
          Math.abs(dx) > 20 &&
          Math.abs(dx) > Math.abs(dy) * 2,
        onPanResponderRelease: (_, { dx, dy }) => {
          if (Math.abs(dx) < 50 || Math.abs(dx) <= Math.abs(dy) * 2) return;

          setSelectedDate((currentDate) => {
            const [year, month, day] = currentDate.split("-").map(Number);
            const nextDate = new Date(year, month - 1, day);
            nextDate.setDate(nextDate.getDate() + (dx < 0 ? 1 : -1));
            return getWeekDays(nextDate).find(
              (date) => Number(date.date) === nextDate.getDate(),
            )!.fullDate;
          });
        },
      }),
    [],
  );

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
      <WeekCalendar
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
        todayResetRequest={todayResetRequest}
      />
      <View style={styles.dayContent} {...daySwipeResponder.panHandlers}>
        <ScrollView>
          <View style={styles.dateTitle}>
            <Text style={styles.dateTitleText}>
              {formatDateTitle(selectedDate)}
            </Text>
            <TouchableOpacity
              style={styles.todayButton}
              onPress={handleBackToToday}
            >
              <Text style={styles.todayButtonText}>今日に戻る</Text>
            </TouchableOpacity>
          </View>

          {isTasksLoading ? (
            <ActivityIndicator size="small" color={Colors.themePink} />
          ) : taskError ? (
            <Text style={styles.errorText}>{taskError}</Text>
          ) : (
            <TaskList
              tasks={tasks}
              selectedDate={selectedDate}
              onCompletionChange={handleCompletionChange}
            />
          )}
        </ScrollView>
        <TouchableOpacity
          style={styles.fab}
          onPress={() =>
            router.push({
              pathname: "/tasks/edit",
              params: { targetDate: selectedDate },
            })
          }
        >
          <AppIcon
            name="plus"
            size={32}
            style={{ tintColor: Colors.themePink }}
          />
        </TouchableOpacity>
      </View>
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
  dateTitle: {
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dateTitleText: {
    fontSize: 26,
    color: Colors.themePinkDark,
  },
  todayButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: Colors.themePink,
    borderRadius: 18,
  },
  todayButtonText: {
    color: Colors.themePinkDark,
    fontSize: 14,
    fontWeight: "600",
  },
  errorText: {
    color: Colors.red,
    marginTop: 16,
    marginBottom: 16,
  },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 24,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.themeLight,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  dayContent: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
});
