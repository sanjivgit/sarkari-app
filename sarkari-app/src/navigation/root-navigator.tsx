import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './tab-navigator';
import NotFoundScreen from '../screens/not-found-screen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={TabNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="NotFound"
                component={NotFoundScreen}
            />
        </Stack.Navigator>
    );
}
