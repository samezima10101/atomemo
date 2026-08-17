import WeekCalendar from "@/src/components/calendar/WeekCalendar";
import { getWeekDays } from "@/src/utils/date";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import TaskList, { type Task } from "../../src/components/task/TaskList";

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

  return (
    <View style={styles.container}>
      <WeekCalendar
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
      />
      <TaskList tasks={tasks} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 24,
  },
});
