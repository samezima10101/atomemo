import { Platform } from "react-native";

const blue = "#0994FF";
const blueDark = "#2A65BE";
const blueLight = "#D7EAF6";
const white = "#FFFFFF";
const gray = "#D9D9D9";
const grayLight = "#e5e7eb";
const grayDark = "#4B5563";
const red = "#FF0909";
const redLight = "#ef4444";
const black = "#000000";

export const Colors = {
  blue: blue,
  blueDark: blueDark,
  blueLight: blueLight,
  white: white,
  gray: gray,
  grayLight: grayLight,
  grayDark: grayDark,
  red: red,
  redLight: redLight,
  black: black,
};

export const Fonts = Platform.select({
  ios: {
    // iOS UIFontDescriptorSystemDesignDefault
    sans: "system-ui",
    // iOS UIFontDescriptorSystemDesignSerif
    serif: "ui-serif",
    // iOS UIFontDescriptorSystemDesignRounded
    rounded: "ui-rounded",
    // iOS UIFontDescriptorSystemDesignMonospaced
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
