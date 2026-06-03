// src/navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabParamList, RootStackParamList } from '../types';

import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import SchemeDetailScreen from '../screens/SchemeDetailScreen';
import EligibilityScreen from '../screens/EligibilityScreen';
import BenefitsScreen from '../screens/BenefitsScreen';
import DocumentsScreen from '../screens/DocumentsScreen';
import ApplyProcessScreen from '../screens/ApplyProcessScreen';
import FAQScreen from '../screens/FAQScreen';
import BookmarksScreen from '../screens/BookmarksScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<BottomTabParamList>();

import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../theme/colors';
import PrivacyPolicy from '../screens/PrivacyPolicy';
import { navigationRef } from '../utils/helper';
import TermsAndConditions from '../screens/TermsAndConditions';

const BottomTabs: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.text.light,
        tabBarLabelStyle: styles.tabLabel,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = 'home';
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Bookmarks')
            iconName = focused ? 'bookmark' : 'bookmark-outline';
          else if (route.name === 'Settings') iconName = 'settings';
          else if (route.name === 'Eligibility') iconName = 'checklist';
          else if (route.name === 'FAQ') iconName = 'message';
          return <Icon name={iconName} size={24} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen
        name="Eligibility"
        component={EligibilityScreen}
        initialParams={{
          schemeId: 'pm-kisan',
        }}
        options={{ tabBarLabel: 'Eligibility' }}
      />
      <Tab.Screen
        name="FAQ"
        component={FAQScreen}
        initialParams={{
          schemeId: 'pm-kisan',
        }}
        options={{ tabBarLabel: 'FAQ' }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ tabBarLabel: 'Settings' }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => (
  <NavigationContainer ref={navigationRef}>
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Main" component={BottomTabs} />
      <Stack.Screen name="SchemeDetail" component={SchemeDetailScreen} />
      <Stack.Screen name="Eligibility" component={EligibilityScreen} />
      <Stack.Screen name="Benefits" component={BenefitsScreen} />
      <Stack.Screen name="Documents" component={DocumentsScreen} />
      <Stack.Screen name="ApplyProcess" component={ApplyProcessScreen} />
      <Stack.Screen name="FAQ" component={FAQScreen} />
      <Stack.Screen name="Bookmarks" component={BookmarksScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
    </Stack.Navigator> 
  </NavigationContainer>
);

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#fff',
    borderTopWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 12,
    height: 65,
    paddingBottom: 10,
    paddingTop: 8,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
});

export default AppNavigator;
