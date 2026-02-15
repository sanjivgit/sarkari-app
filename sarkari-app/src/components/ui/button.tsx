import React from "react";
import {
    Pressable,
    type PressableProps,
    Text,
    useColorScheme,
} from "react-native";
import clsx from "clsx";
import { tintColorDark, tintColorLight } from "@/src/constants/theme";

export type ButtonVariant = "primary" | "secondary" | "danger";

export type ThemedButtonProps = PressableProps & {
    isLoading?: boolean;
    workingText?: string;
    buttonText?: string;
    className?: string;
    buttonTextClassName?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    variant: ButtonVariant;
};
type ThemeMode = "light" | "dark";

type VariantStyle = Record<ButtonVariant, Record<ThemeMode, string>>;

export const buttonContainerStyle: VariantStyle = {
    primary: {
        light: `bg-blue-600`,
        dark: `bg-blue-600`,
    },
    secondary: {
        light: "bg-gray-200",
        dark: "bg-gray-800",
    },
    danger: {
        light: "bg-red-500",
        dark: "bg-red-600",
    },
};

export const buttonTextStyle: VariantStyle = {
    primary: {
        light: "text-white",
        dark: "text-white",
    },
    secondary: {
        light: "text-black",
        dark: "text-white",
    },
    danger: {
        light: "text-white",
        dark: "text-white",
    },
};

export default function Button({
    isLoading,
    workingText,
    buttonText,
    className,
    buttonTextClassName,
    rightIcon,
    leftIcon,
    variant = "primary",
    disabled,
    ...otherProps
}: ThemedButtonProps) {
    const scheme = useColorScheme();

    const theme: ThemeMode = scheme === "dark" ? "dark" : "light";

    const baseStyle =
        "h-12 rounded-xl flex-row items-center justify-center gap-3 px-6";

    return (
        <Pressable
            {...otherProps}
            disabled={disabled || isLoading}
            className={clsx(
                baseStyle,
                buttonContainerStyle[variant][theme],
                (disabled || isLoading) && "opacity-50",
                // pressed && !disabled && !isLoading && "opacity-80",
                className
            )}
        >
            {isLoading ? (
                <Text
                    className={clsx(
                        "text-base font-semibold",
                        buttonTextStyle[variant][theme],
                        buttonTextClassName
                    )}
                >
                    {workingText || "Connecting..."}
                </Text>
            ) : (
                <>
                    {leftIcon}
                    <Text
                        className={clsx(
                            "text-base font-semibold",
                            buttonTextStyle[variant][theme],
                            buttonTextClassName
                        )}
                    >
                        {buttonText}
                    </Text>
                    {rightIcon}
                </>
            )}
        </Pressable>
    );
}

