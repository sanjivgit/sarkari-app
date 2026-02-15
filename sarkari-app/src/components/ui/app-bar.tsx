import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { ThemedView } from "./themed-view";

type AppBarProps = {
    children: React.ReactNode;
};

const AppBar: FC<AppBarProps> = ({ children }) => {
    return (
        <ThemedView
            className="px-5 py-2 border-b"
            style={[styles.appBar]}
        >
            {children}
        </ThemedView>
    );
};

export default AppBar;

const styles = StyleSheet.create({
    appBar: {
        // Divider (works well in dark mode)
        borderBottomColor: "rgba(148,163,184,0.2)",

        // iOS shadow (bottom only)
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },

        // Android shadow
        elevation: 6,
    },
});