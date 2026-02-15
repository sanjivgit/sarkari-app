import React, { useEffect, useRef, useState } from "react";
import { View, Animated, ScrollView } from "react-native";
import { ThemedView } from "@/src/components/ui/themed-view";
import { ThemedText } from "@/src/components/ui/themed-text";
import { tintColorDark, tintColorLight } from "../constants/theme";
import Button from "../components/ui/button";
import { ThemedIcon } from "../components/ui/themed-icon";



export default function LoginScreen() {

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(40)).current;
    const scaleAnim = useRef(new Animated.Value(0.9)).current;
    const buttonScale = useRef(new Animated.Value(1)).current;

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 700,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 700,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 900,
                useNativeDriver: true,
            }),
        ]).start();
    }, [fadeAnim, slideAnim, scaleAnim]);

    const handlePressIn = () => {
        Animated.spring(buttonScale, {
            toValue: 0.96,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(buttonScale, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const handleLogin = () => {

    }

    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
        >
            {/* ROOT BACKGROUND */}
            <ThemedView className="flex-1 px-6 py-14 justify-between">

                {/* 🔝 HERO SECTION */}
                <Animated.View
                    style={{
                        opacity: fadeAnim,
                        transform: [{ translateY: slideAnim }],
                    }}
                    className="items-center"
                >
                    {/* Logo */}
                    <Animated.View
                        style={{ transform: [{ scale: scaleAnim }] }}
                        className="mb-10"
                    >
                        <ThemedView lightColor={tintColorLight} darkColor={tintColorDark} className="w-24 h-24 rounded-3xl items-center justify-center shadow-xl">
                            <ThemedIcon lightColor="#fff" darkColor="#fff" name="rocket" size={'xl'} />
                        </ThemedView>
                    </Animated.View>

                    {/* Headings */}
                    <ThemedText
                        type="title"
                        className="text-center mb-3"
                    >
                        Welcome Back
                    </ThemedText>

                    <ThemedText
                        type="default"
                        className="text-center leading-relaxed max-w-[280px] opacity-70"
                    >
                        Your next adventure starts here
                    </ThemedText>

                    {/* Feature Pills */}
                    <View className="w-full mt-10 gap-3">
                        {[
                            "Quick & Secure Login",
                            "One-Click Authentication",
                            "Your Data, Protected",
                        ].map((item, index) => (
                            <ThemedView
                                key={index}
                                className="flex-row items-center gap-3 px-4 py-3 rounded-2xl border"
                                lightColor="#FFFFFF"
                                darkColor="#0F172A" // slate-900 (matches your dark UI)
                                style={{ borderColor: "rgba(148,163,184,0.2)" }}
                            >
                                <View className="w-2 h-2 rounded-full bg-emerald-400" />
                                <ThemedText className="text-sm flex-1 opacity-80">
                                    {item}
                                </ThemedText>
                            </ThemedView>
                        ))}
                    </View>
                </Animated.View>

                {/* 🔽 ACTION SECTION */}
                <Animated.View
                    style={{
                        opacity: fadeAnim,
                        transform: [{ translateY: slideAnim }],
                    }}
                    className="gap-5 mt-14"
                >
                    <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
                        <Button
                            onPress={handleLogin}
                            onPressIn={handlePressIn}
                            onPressOut={handlePressOut}
                            className="flex-row items-center justify-center gap-3  rounded-2xl"
                            buttonText="Continue with Google"
                            variant="primary"
                            isLoading={isLoading}
                            leftIcon={<ThemedIcon.AntDesign lightColor="#fff" darkColor="#fff" name="google" />}
                        />
                    </Animated.View>

                    {/* Divider */}
                    <View className="flex-row items-center gap-3">
                        <View className="flex-1 h-px bg-slate-400/20" />
                        <ThemedText className="text-xs opacity-60">
                            Secure
                        </ThemedText>
                        <View className="flex-1 h-px bg-slate-400/20" />
                    </View>

                    {/* Footer */}
                    <ThemedText className="text-xs text-center leading-relaxed px-4 opacity-60">
                        By signing in, you agree to our{" "}
                        <ThemedText lightColor={tintColorLight} darkColor={tintColorDark} className="font-semibold">
                            Terms of Service
                        </ThemedText>{" "}
                        and{" "}
                        <ThemedText lightColor={tintColorLight} darkColor={tintColorDark} className="font-semibold">
                            Privacy Policy
                        </ThemedText>
                    </ThemedText>
                </Animated.View>

            </ThemedView>
        </ScrollView>
    );
}
