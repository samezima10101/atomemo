import { AppIcon } from "@/src/components/common/AppIcon";
import TaskList from "@/src/components/task/TaskList";
import { Colors } from "@/src/constants/theme";
import type { Task } from "@/src/types/task";
import { getWeekDays } from "@/src/utils/date";
import { router } from "expo-router";
import { useMemo } from "react";
import type { Dispatch, SetStateAction } from "react";
import {
  ActivityIndicator,
  PanResponder,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type DailyTaskViewProps = {
  selectedDate: string;
  onSelectDate: Dispatch<SetStateAction<string>>;
  tasks: Task[];
  isTasksLoading: boolean;
  taskError: string | null;
  onCompletionChange: (
    taskId: string,
    isCompleted: boolean,
    reflection: string | null,
  ) => Promise<void>;
};

export default function DailyTaskView({
  selectedDate,
  onSelectDate,
  tasks,
  isTasksLoading,
  taskError,
  onCompletionChange,
}: DailyTaskViewProps) {
  const formatDateTitle = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayOfWeek = ["日", "月", "火", "水", "木", "金", "土"][date.getDay()];
    return `${month}月${day}日(${dayOfWeek})`;
  };

  const daySwipeResponder = useMemo(
    () =>
      PanResponder.create({
        // タップと縦スクロールは子要素に任せる。
        onMoveShouldSetPanResponderCapture: (_, { dx, dy, numberActiveTouches }) =>
          numberActiveTouches === 1 &&
          Math.abs(dx) > 20 &&
          Math.abs(dx) > Math.abs(dy) * 2,
        onPanResponderRelease: (_, { dx, dy }) => {
          if (Math.abs(dx) < 50 || Math.abs(dx) <= Math.abs(dy) * 2) return;

          onSelectDate((currentDate) => {
            const [year, month, day] = currentDate.split("-").map(Number);
            const nextDate = new Date(year, month - 1, day);
            nextDate.setDate(nextDate.getDate() + (dx < 0 ? 1 : -1));
            return getWeekDays(nextDate).find(
              (date) => Number(date.date) === nextDate.getDate(),
            )!.fullDate;
          });
        },
      }),
    [onSelectDate],
  );

  return (
    <View style={styles.dayContent} {...daySwipeResponder.panHandlers}>
      <ScrollView>
        <View style={styles.dateTitle}>
          <Text style={styles.dateTitleText}>
            {formatDateTitle(selectedDate)}
          </Text>
        </View>

        {isTasksLoading ? (
          <ActivityIndicator size="small" color={Colors.themePink} />
        ) : taskError ? (
          <Text style={styles.errorText}>{taskError}</Text>
        ) : (
          <TaskList
            tasks={tasks}
            selectedDate={selectedDate}
            onCompletionChange={onCompletionChange}
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
  );
}

const styles = StyleSheet.create({
  dayContent: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  dateTitle: {
    marginTop: 15,
  },
  dateTitleText: {
    fontSize: 26,
    color: Colors.themePinkDark,
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
});
