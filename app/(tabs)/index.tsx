import WeekCalendar from "@/src/components/calendar/WeekCalendar";
import TaskList, { type Task } from "@/src/components/task/TaskList";
import { useAuth } from "@/src/features/auth/AuthContext";
import { getWeekDays } from "@/src/utils/date";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const tasks: Task[] = [
  {
    id: "dog-walk",
    title: "犬の散歩",
  },
  {
    id: "development",
    title: "開発",
    subtasks: "・イラストレーターさん委託\n・デザイナー資料\n・要件定義書作成",
  },
];

const getInitialDate = () => {
  const weekDays = getWeekDays();
  return weekDays.find((d) => d.isToday)?.fullDate || weekDays[0].fullDate;
};

export default function HomeScreen() {
  const [selectedDate, setSelectedDate] = useState(getInitialDate());
  const { user, isLoading, signInDev } = useAuth();

  useEffect(() => {
    // 起動時に未ログインであれば開発用ログインを実行
    if (!isLoading && !user) {
      signInDev();
    }
  }, [isLoading, user]);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <WeekCalendar
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
      />
      <TaskList tasks={tasks} />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/tasks/edit")}
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
    backgroundColor: "white",
    padding: 24,
  },
  fab: {
    position: "absolute",
    bottom: 40,
    right: 40,
    borderRadius: 32,
  },
});
