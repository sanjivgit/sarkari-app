import AsyncStorage from '@react-native-async-storage/async-storage';

export const Storage = {
    set: async (key: string, value: any) => {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    },

    get: async <T>(key: string): Promise<T | null> => {
        const data = await AsyncStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    },

    remove: async (key: string) => {
        await AsyncStorage.removeItem(key);
    },

    clear: async () => {
        await AsyncStorage.clear();
    },
};
