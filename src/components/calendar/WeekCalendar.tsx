import { Colors } from "@/src/constants/theme";
import { addWeeks, getWeekDays } from "@/src/utils/date";
import { useMemo, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import DateItem from "./DateItem";

type WeekCalendarProps = {
  selectedDate: string;
  onSelectDate: (date: string) => void;
};

export default function WeekCalendar({
  selectedDate,
  onSelectDate,
}: WeekCalendarProps) {
  const [calendarWidth, setCalendarWidth] = useState(0);
  const [year, month, day] = selectedDate.split("-").map(Number);
  const selectedWeekStart = getWeekDays(new Date(year, month - 1, day))[0].fullDate;
  const weeks = useMemo(() => {
    const [year, month, day] = selectedWeekStart.split("-").map(Number);
    const baseDate = new Date(year, month - 1, day);

    return [-1, 0, 1].map((offset) => getWeekDays(addWeeks(baseDate, offset)));
  }, [selectedWeekStart]);

  return (
    <View
      onLayout={(event) => setCalendarWidth(event.nativeEvent.layout.width)}
    >
      {calendarWidth > 0 && (
        <FlatList
          key={`${calendarWidth}-${selectedWeekStart}`}
          data={weeks}
          horizontal
          pagingEnabled
          initialScrollIndex={1}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => String(index)}
          getItemLayout={(_, index) => ({
            length: calendarWidth,
            offset: calendarWidth * index,
            index,
          })}
          renderItem={({ item: weekDays }) => (
            <View style={[styles.weekRow, { width: calendarWidth }]}>
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
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 20,
    backgroundColor: Colors.themeGreenLight,
    borderBottomWidth: 1,
    borderBottomColor: Colors.themeGreenDark,
  },
});
