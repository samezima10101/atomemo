import { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import WeekCalendar from "@/src/components/calendar/WeekCalendar";
import { getWeekDays } from "@/src/utils/date";

export default function HomeScreen() {
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const weekDays = getWeekDays();
    const today =
      weekDays.find((d) => d.isToday)?.fullDate || weekDays[0].fullDate;
    setSelectedDate(today);
  }, []);

  return (
    <View style={styles.container}>
      <WeekCalendar
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
      />
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
