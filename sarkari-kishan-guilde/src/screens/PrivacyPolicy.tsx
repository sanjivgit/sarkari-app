import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

const PrivacyPolicy = () => {
  return (
    <View style={{ flex: 1 }}>
      <WebView source={{ uri: 'https://reactnative.dev/' }} />
    </View>
  );
};

export default PrivacyPolicy;
