import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { Pressable, Platform } from 'react-native';
import React from 'react';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

const hapticOptions = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

export function HapticTab({
  children,
  onPress,
  onLongPress,
  accessibilityState,
  accessibilityLabel,
  testID,
}: BottomTabBarButtonProps) {
  return (
    <Pressable
      accessibilityState={accessibilityState}
      accessibilityLabel={accessibilityLabel}
      testID={testID}
      onPress={onPress}
      onLongPress={onLongPress}
      onPressIn={() => {
        if (Platform.OS === 'ios') {
          ReactNativeHapticFeedback.trigger('impactLight', hapticOptions);
        }
      }}
      style={{ flex: 1 }}
    >
      {children}
    </Pressable>
  );
}
