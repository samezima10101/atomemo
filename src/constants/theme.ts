import { Platform } from "react-native";

const themePink = "#f18aac";
const themePinkDark = "#bc7d85";
const themeGreen = "#d0f7ea";
const themeGreenDark = "#4caf8e";
const themeDark = "#9a9ee4";
const themeLight = "#f5e2e6";
const white = "#FFFFFF";
const grayLight = "#970044";
const grayMidLight = "#ffa4c4";
const gray = "#bed4ce";
const grayDark = "#647d75";
const grayText = "#00716f";
const red = "#FF0909";
const black = "#000000";
const lightBlue = "#eaff00";
const themeGreenLight = "#eefff7";
const shadow = "#000000";
const transparent = "transparent";
const slateBackdrop = "#0F172A59";

export const Colors = {
  themePink: themePink,
  themePinkDark: themePinkDark,
  themeGreen: themeGreen,
  themeGreenDark: themeGreenDark,
  themeDark: themeDark,
  themeLight: themeLight,
  white: white,
  grayLight: grayLight,
  grayMidLight: grayMidLight,
  gray: gray,
  grayDark: grayDark,
  grayText: grayText,
  red: red,
  black: black,
  lightBlue: lightBlue,
  themeGreenLight: themeGreenLight,
  shadow: shadow,
  transparent: transparent,
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
