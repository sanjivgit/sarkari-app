import { Text, type TextProps } from 'react-native';

import { useThemeColor } from '@/src/hooks/use-theme-color';
import clsx from 'clsx';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
  className?: string;
};

export const textBaseStyle = "text-base leading-6";

export const textVariantStyle = {
  default: "text-base",
  defaultSemiBold: "text-base leading-6 font-semibold",
  title: "text-3xl font-bold leading-8",
  subtitle: "text-xl font-bold",
  link: "text-base leading-[30px] text-[#0a7ea4]",
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  className,
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        style,
      ]}
      className={clsx(textVariantStyle[type], className)}
      {...rest}
    />
  );
}
