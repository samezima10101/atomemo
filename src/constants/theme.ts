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
const blue100 = "#dbeafe";
const blue500 = "#3b82f6";
const blue600 = "#2563eb";
const slate50 = "#f8fafc";
const slate200 = "#e2e8f0";
const slate300 = "#cbd5e1";
const slate900 = "#0f172a";
const slateBackdrop = "#0F172A59";

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
  blue100: blue100,
  blue500: blue500,
  blue600: blue600,
  slate50: slate50,
  slate200: slate200,
  slate300: slate300,
  slate900: slate900,
  slateBackdrop: slateBackdrop,
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
