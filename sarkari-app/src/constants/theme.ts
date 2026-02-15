/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';
export const tintColorLight = "#2563EB"; // blue-600
export const tintColorDark = "#2563EB" // "#60A5FA";  // blue-400
export const themeColor = "#2563EB"

export const Colors = {
  light: {
    text: "#0F172A",          // slate-900
    background: "#F8FAFC",    // slate-50
    tint: tintColorLight,
    icon: "#2563EB",          // blue-600
    tabIconDefault: "#64748B",
    tabIconSelected: tintColorLight,
    card: "#FFFFFF",
    border: "#E5E7EB",
    muted: "#475569",
  },
  dark: {
    text: "#E5E7EB",          // slate-200
    background: "#020617",    // slate-950
    tint: tintColorDark,
    icon: "#60A5FA",          // blue-400
    tabIconDefault: "#94A3B8",
    tabIconSelected: tintColorDark,
    card: "#020617",
    border: "#1E293B",
    muted: "#94A3B8",
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
