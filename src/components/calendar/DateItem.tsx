import { Pressable, Text, View } from "react-native";
import { Colors } from "../../constants/theme";

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
      android_ripple={{ color: Colors.blueLight }}
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
          backgroundColor: highlighted ? Colors.grayLight : "transparent",
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
            backgroundColor: selected ? Colors.blueLight : "transparent",
          }}
        />
      </View>
    </Pressable>
  );
}
