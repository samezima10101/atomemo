import { Platform } from "react-native";

const themeMain = "#0994FF";
const themeDark = "#2A65BE";
const themeLight = "#D7EAF6";
const white = "#FFFFFF";
const grayLight = "#f8fafc";
const grayMidLight = "#e2e8f0";
const gray = "#cbd5e1";
const grayDark = "#4B5563";
const red = "#FF0909";
const black = "#0f172a";
const slateBackdrop = "#0F172A59";

export const Colors = {
  themeMain: themeMain,
  themeDark: themeDark,
  themeLight: themeLight,
  white: white,
  grayLight: grayLight,
  grayMidLight: grayMidLight,
  gray: gray,
  grayDark: grayDark,
  red: red,
  black: black,
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
