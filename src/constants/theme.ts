import { Platform } from "react-native";

const BLUE = "#0994FF";
const BLUE_DARK = "#2A65BE";
const BLUE_LIGHT = "#D7EAF6";
const SURFACE = "#FFFFFF";
const GRAY = "#D9D9D9";
const GRAY_LIGHT = "#e5e7eb";
const RED = "#FF0909";

export const Colors = {
  blue: BLUE,
  blue_dark: BLUE_DARK,
  blue_light: BLUE_LIGHT,
  surface: SURFACE,
  gray: GRAY,
  gray_light: GRAY_LIGHT,
  red: RED,
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
