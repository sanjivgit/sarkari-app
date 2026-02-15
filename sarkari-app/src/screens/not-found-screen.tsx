import { useEffect } from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { ThemedText } from '@/src/components/ui/themed-text';
import { ThemedView } from '@/src/components/ui/themed-view';

export default function NotFoundScreen() {
    const navigation = useNavigation();

    // Equivalent of <Stack.Screen options={{ title: 'Oops!' }} />
    useEffect(() => {
        navigation.setOptions({ title: 'Oops!' });
    }, [navigation]);

    return (
        <ThemedView style={styles.container}>
            <ThemedText type="title">This screen does not exist.</ThemedText>

            <Pressable
                style={styles.link}
                onPress={() => navigation.navigate('Home' as never)}
            >
                <ThemedText type="link">Go to home screen!</ThemedText>
            </Pressable>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    link: { marginTop: 15, paddingVertical: 15 },
});
