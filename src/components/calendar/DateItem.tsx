import { Pressable, Text, View } from "react-native";

type DateItemProps = {
  date: string;
  content: string;
  selected?: boolean;
  highlighted?: boolean;
  onPress?: () => void;
};

export default function DateItem({
  date,
  content,
  selected,
  highlighted,
  onPress,
}: DateItemProps) {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      android_ripple={{ color: "rgba(56, 189, 248, 0.24)" }}
      accessibilityRole="button"
      style={{
        flex: 1,
        minWidth: 0,
        minHeight: 56,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 6,
        paddingVertical: 8,
      }}
    >
      <View
        style={{
          alignItems: "center",
          backgroundColor: highlighted ? "#e5e7eb" : "transparent",
          paddingHorizontal: 9,
          paddingVertical: 4,
          minWidth: 52,
        }}
      >
        <Text style={{ fontSize: 20, textAlign: "center" }}>{content}</Text>
        <Text style={{ fontSize: 20, textAlign: "center" }}>{date}</Text>
        <View
          style={{
            marginTop: 6,
            width: 32,
            height: 2,
            borderRadius: 1,
            backgroundColor: selected ? "#38bdf8" : "transparent",
          }}
        />
      </View>
    </Pressable>
  );
}
