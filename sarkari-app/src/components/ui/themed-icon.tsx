import { useThemeColor } from "@/src/hooks/use-theme-color";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign"

export const iconVariantColor = {
    primary: "#ffffff",
    secondary: "#000000",
    muted: "#9ca3af",   // gray-400
    danger: "#ef4444",  // red-500
    success: "#22c55e", // green-500
};

export const iconSizeStyle = {
    sm: 16,
    md: 24,
    lg: 32,
    xl: 48,
};

export type ThemedIconProps = {
    name: string;
    type?: keyof typeof iconVariantColor;
    size?: keyof typeof iconSizeStyle;
    lightColor?: string;
    darkColor?: string;
};

function createThemedIcon(IconComponent: any) {
    return function ThemedIconComponent({
        name,
        type = "primary",
        size = "md",
        lightColor,
        darkColor,
    }: ThemedIconProps) {
        const themeColor = useThemeColor(
            { light: lightColor, dark: darkColor },
            "icon"
        );

        return (
            <IconComponent
                name={name}
                size={iconSizeStyle[size]}
                color={themeColor ?? iconVariantColor[type]}
            />
        );
    };
}

type ThemedIconComponent = React.FC<ThemedIconProps> & {
    Ionicons: React.FC<ThemedIconProps>;
    MaterialIcons: React.FC<ThemedIconProps>;
    FontAwesome: React.FC<ThemedIconProps>;
    MaterialCommunityIcons: React.FC<ThemedIconProps>;
    AntDesign: React.FC<ThemedIconProps>
};

const BaseThemedIcon = createThemedIcon(Ionicons);
export const ThemedIcon = BaseThemedIcon as ThemedIconComponent;

ThemedIcon.Ionicons = createThemedIcon(Ionicons);
ThemedIcon.MaterialIcons = createThemedIcon(MaterialIcons);
ThemedIcon.FontAwesome = createThemedIcon(FontAwesome);
ThemedIcon.MaterialCommunityIcons = createThemedIcon(MaterialCommunityIcons);
ThemedIcon.AntDesign = createThemedIcon(AntDesign)

