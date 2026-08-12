import DateItem from "@/src/components/calendar/DateItem";
import { useState } from "react";
import { View } from "react-native";

const dateItems = [
  { date: "1", content: "月" },
  { date: "2", content: "火" },
  { date: "3", content: "水" },
  { date: "4", content: "木" },
  { date: "5", content: "金" },
  { date: "6", content: "土" },
  { date: "7", content: "日" },
];

export default function HomeScreen() {
  const [selectedDate, setSelectedDate] = useState("1");

  return (
    <View className="flex-1 bg-white p-6">
      <View className="flex-row justify-between items-center space-x-1">
        {dateItems.map((item) => (
          <DateItem
            key={item.date}
            date={item.date}
            content={item.content}
            selected={item.date === selectedDate}
            highlighted={item.date === "2" && item.content === "火"}
            onPress={() => setSelectedDate(item.date)}
          />
        ))}
      </View>
    </View>
  );
}
