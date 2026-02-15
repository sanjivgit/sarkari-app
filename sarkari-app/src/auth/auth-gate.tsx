import RootNavigator from '@/src/navigation/root-navigator';
import { NavigationContainer } from '@react-navigation/native';

export default function AuthGate() {

    return (
        <NavigationContainer>
            <RootNavigator />
            {/* {isLoading ? <Text>Loading...</Text> : <>
                {isLoggedIn ? <RootNavigator /> : <AuthNavigator />}
            </>} */}
        </NavigationContainer>
    );
}
