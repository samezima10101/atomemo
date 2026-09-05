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
      android_ripple={{ color: Colors.themeLight }}
      accessibilityRole="button"
      style={styles.button}
    >
      <View
        style={[
          styles.today,
          {
            // ※必要に応じて selected の場合も背景色を変えるならここを調整してください
            backgroundColor: highlighted
              ? Colors.themeGreen
              : Colors.transparent,
          },
        ]}
      >
        {/* 変更箇所: selected が true の場合は "black" に、そうでない場合は themeGreenDark にする */}
        <Text
          style={[
            styles.dateText,
            { color: selected ? "black" : Colors.themeGreenDark },
          ]}
        >
          {content}
        </Text>
        <Text
          style={[
            styles.dateText,
            { color: selected ? "black" : Colors.themeGreenDark },
          ]}
        >
          {date}
        </Text>
        <View
          style={[
            styles.underline,
            {
              backgroundColor: selected ? Colors.themePink : Colors.transparent,
            },
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
  dateText: {
    fontSize: 20,
    textAlign: "center",
    // ここで指定していた color: Colors.themeGreenDark は、インラインスタイルで上書きされるため残していても問題ありません
  },
  underline: {
    marginTop: 6,
    width: 32,
    height: 2,
    borderRadius: 1,
  },
});
