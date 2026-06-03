import React from 'react';
import WebView from 'react-native-webview';

const TermsAndConditions = () => {
  return (
    <WebView
      source={{
        uri: 'https://github.com/facebook/react-native',
      }}
      style={{ flex: 1 }}
    />
  );
};

export default TermsAndConditions;
