import { Pressable, StyleSheet, Text, View } from "react-native";
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
      style={styles.button}
    >
      <View
        style={[
          styles.today,
          {
            backgroundColor: highlighted ? Colors.grayLight : "transparent",
          },
        ]}
      >
        <Text style={{ fontSize: 20, textAlign: "center" }}>{content}</Text>
        <Text style={{ fontSize: 20, textAlign: "center" }}>{date}</Text>
        <View
          style={[
            styles.underline,
            { backgroundColor: selected ? Colors.blue : "transparent" },
          ]}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    minWidth: 0,
    minHeight: 56,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
    paddingVertical: 8,
  },
  today: {
    alignItems: "center",
    paddingHorizontal: 9,
    paddingVertical: 4,
    minWidth: 52,
  },
  underline: {
    marginTop: 6,
    width: 32,
    height: 2,
    borderRadius: 1,
  },
});
