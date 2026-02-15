import { View, type ViewProps } from "react-native";
import { useThemeColor } from "@/src/hooks/use-theme-color";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  className?: string;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  className,
  ...rest
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <View
      {...rest}
      className={className}
      style={[{ backgroundColor }, style]}
    />
  );
}
