import { View } from "react-native";
import { ThemedIcon } from "./themed-icon";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

type ProfileItemProps = {
    icon: any;
    label: string;
    value: string;
};

export function ProfileItem({ icon, label, value }: ProfileItemProps) {
    return (
        <View className="flex-row items-center mb-4">
            <ThemedView className="h-10 w-10 rounded-xl bg-purple-100 items-center justify-center mr-4">
                <ThemedIcon
                    name={icon}
                />
            </ThemedView>

            <View>
                <ThemedText className="text-gray-500 text-sm">
                    {label}
                </ThemedText>
                <ThemedText className="text-black font-semibold">
                    {value}
                </ThemedText>
            </View>
        </View>
    );
}
