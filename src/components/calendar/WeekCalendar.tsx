import { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import DateItem from "./DateItem";
import { getWeekDays } from "@/src/utils/date";

type WeekCalendarProps = {
  selectedDate: string;
  onSelectDate: (date: string) => void;
};

export default function WeekCalendar({
  selectedDate,
  onSelectDate,
}: WeekCalendarProps) {
  const weekDays = useMemo(() => getWeekDays(), []);

  return (
    <View style={styles.weekRow}>
      {weekDays.map((item) => (
        <DateItem
          key={item.fullDate}
          date={item.date}
          content={item.content}
          selected={item.fullDate === selectedDate}
          highlighted={item.isToday}
          onPress={() => onSelectDate(item.fullDate)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
