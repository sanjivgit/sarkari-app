import { StatusBar } from 'react-native';
import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { AdInit } from './src/services/ads';

const App = () => {
  return (
    <SafeAreaProvider>
      <AdInit />
      <SafeAreaView
        style={{ flex: 1, backgroundColor: '#F8FAFC' }}
        edges={['top', 'bottom']}
      >
        <StatusBar backgroundColor="#F8FAFF" barStyle="dark-content" />
        <AppNavigator />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
