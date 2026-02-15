import { Linking, Pressable } from 'react-native';
import { type ComponentProps, ReactNode } from 'react';

type Props = {
  href: string;
  children: ReactNode;
} & Omit<ComponentProps<typeof Pressable>, 'onPress'>;

export function ExternalLink({ href, children, ...rest }: Props) {
  const handlePress = async () => {
    const supported = await Linking.canOpenURL(href);

    if (supported) {
      await Linking.openURL(href);
    } else {
      console.warn(`Don't know how to open URI: ${href}`);
    }
  };

  return (
    <Pressable onPress={handlePress} {...rest}>
      {children}
    </Pressable>
  );
}
