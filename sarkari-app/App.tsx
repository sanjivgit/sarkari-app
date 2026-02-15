import "./global.css"
import { StyleSheet } from 'react-native'
import React from 'react'
import AuthGate from './src/auth/auth-gate'
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { themeColor } from "./src/constants/theme"

const App = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: themeColor }} edges={["top"]} >
        <AuthGate />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default App

const styles = StyleSheet.create({})