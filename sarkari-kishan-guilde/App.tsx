// import "./global.css"
import { StatusBar } from 'react-native';
import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  return (
    <SafeAreaProvider>
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
