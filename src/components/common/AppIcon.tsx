import { Colors } from "@/src/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { ImageStyle, StyleProp, StyleSheet, TextStyle } from "react-native";

const ICONS = {
  check: require("@/assets/images/check-fill.svg"),
  circle: require("@/assets/images/circle-outline.svg"),
  plus: require("@/assets/images/plus-icon.svg"), // 右下ボタン用
  icons8_plus: require("@/assets/images/icons8_plus.svg"), // 黒丸＋用
  calendar: require("@/assets/images/calendar-icon.svg"),
  note: require("@/assets/images/note-icon.svg"),
  tabList: require("@/assets/images/tab-list-icon.svg"),
  tabMemo: require("@/assets/images/tab-memo-icon.svg"),
  arrowLeft: require("@/assets/images/arrow-left.svg"),
  trash: require("@/assets/images/trash-icon.svg"),
} as const;

export type AppIconName = keyof typeof ICONS | "settings-outline";

type AppIconProps = {
  name: AppIconName;
  size?: number;
  style?: StyleProp<ImageStyle>;
};

export function AppIcon({ name, size = 24, style }: AppIconProps) {
  if (name === "settings-outline") {
    return (
      <Ionicons
        name={name}
        size={size}
        color={Colors.black}
        style={style as StyleProp<TextStyle>}
      />
    );
  }

  return (
    <Image
      source={ICONS[name]}
      style={[styles.icon, { width: size, height: size }, style]}
      contentFit="contain"
    />
  );
}

const styles = StyleSheet.create({
  icon: {
    flexShrink: 0,
    tintColor: Colors.black,
  },
});
