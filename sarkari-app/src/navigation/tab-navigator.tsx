import { useColorScheme } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import FeedScreen from "@/src/screens/feed-screen";
import SubjectScreen from "@/src/screens/subject-screen";
import ProfileScreen from "@/src/screens/profile-screen";
import { Colors } from "@/src/constants/theme";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    const scheme = useColorScheme();
    const theme = scheme === "dark" ? "dark" : "light";

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: Colors[theme].tint,
                tabBarInactiveTintColor: Colors[theme].tabIconDefault,
                tabBarStyle: {
                    backgroundColor: Colors[theme].background,
                    borderTopColor: Colors[theme].border ?? "rgba(148,163,184,0.2)",
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: "600",
                },
            }}
        >
            <Tab.Screen
                name="Feed"
                component={FeedScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" size={size} color={color} />
                    ),
                }}
            />

            <Tab.Screen
                name="Subject"
                component={SubjectScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="book-outline" size={size} color={color} />
                    ),
                }}
            />

            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person-outline" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
