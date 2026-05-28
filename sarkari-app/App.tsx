// import "./global.css"
import { StyleSheet } from 'react-native'
import React from 'react'
// import AuthGate from './src/auth/auth-gate'
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import AppNavigator from './src/navigation/AppNavigator'
// import { themeColor } from "./src/constants/theme"

// backgroundColor: themeColor
const App = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#F8FAFC" }} edges={["top"]} >
        {/* <AuthGate /> */}
        <AppNavigator />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default App

const styles = StyleSheet.create({})