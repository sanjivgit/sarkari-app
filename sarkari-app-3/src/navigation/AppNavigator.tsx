import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { RootStackParamList, BottomTabParamList } from '../types';
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import SchemeDetailsScreen from '../screens/SchemeDetailsScreen';
import CategorySchemesScreen from '../screens/CategorySchemesScreen';
import BookmarkScreen from '../screens/BookmarkScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { COLORS } from '../constants/theme';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabs: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.text.light,
        tabBarLabelStyle: styles.tabLabel,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = 'home';
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Bookmarks') iconName = focused ? 'bookmark' : 'bookmark-outline';
          else if (route.name === 'Settings') iconName = 'settings';
          return <Icon name={iconName} size={24} color={color} />;
        },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name="Bookmarks" component={BookmarkScreen} options={{ tabBarLabel: 'Saved' }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ tabBarLabel: 'Settings' }} />
    </Tab.Navigator>
  );
};

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Main" component={BottomTabs} />
        <Stack.Screen name="SchemeDetails" component={SchemeDetailsScreen} />
        <Stack.Screen name="CategorySchemes" component={CategorySchemesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

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
