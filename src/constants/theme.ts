import { Platform } from "react-native";

const themeMain = "#2de38b";
const themeDark = "#9a9ee4";
const themeLight = "#ff7d7d";
const white = "#FFFFFF";
const grayLight = "#970044";
const grayMidLight = "#ffa4c4";
const gray = "#ff0505";
const grayDark = "#5bffce";
const grayText = "#00716f";
const red = "#FF0909";
const black = "#ff00d9";
const lightBlue = "#eaff00";
const shadow = "#000000";
const transparent = "transparent";
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
  grayText: grayText,
  red: red,
  black: black,
  lightBlue: lightBlue,
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
