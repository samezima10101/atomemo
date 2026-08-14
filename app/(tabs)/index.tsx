import WeekCalendar from "@/src/components/calendar/WeekCalendar";
import { getWeekDays } from "@/src/utils/date";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

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
