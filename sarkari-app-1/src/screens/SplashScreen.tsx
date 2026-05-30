import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  StatusBar,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

const { width } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const SplashScreen: React.FC<Props> = ({ navigation }) => {
  const logoScale = useRef(new Animated.Value(0)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textTranslate = useRef(new Animated.Value(20)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const dotsOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1,
          useNativeDriver: true,
          damping: 12,
          stiffness: 120,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(textTranslate, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(taglineOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(dotsOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace('Main');
    }, 2600);

    return () => clearTimeout(timer);
  }, [navigation, logoScale, logoOpacity, textOpacity, textTranslate, taglineOpacity, dotsOpacity]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#1A73E8" barStyle="light-content" />

      {/* Background circles */}
      <View style={styles.circle1} />
      <View style={styles.circle2} />
      <View style={styles.circle3} />

      {/* Logo */}
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: logoOpacity,
            transform: [{ scale: logoScale }],
          },
        ]}>
        <View style={styles.logoOuter}>
          <View style={styles.logoInner}>
            <Icon name="account-balance" size={48} color="#1A73E8" />
          </View>
        </View>
      </Animated.View>

      {/* App Name */}
      <Animated.Text
        style={[
          styles.appName,
          {
            opacity: textOpacity,
            transform: [{ translateY: textTranslate }],
          },
        ]}>
        YojanaGuide
      </Animated.Text>

      {/* Tagline */}
      <Animated.Text style={[styles.tagline, { opacity: taglineOpacity }]}>
        Your Guide to Government Schemes
      </Animated.Text>

      {/* Loading dots */}
      <Animated.View style={[styles.dots, { opacity: dotsOpacity }]}>
        <View style={[styles.dot, styles.dotActive]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </Animated.View>

      {/* Disclaimer */}
      <Text style={styles.disclaimer}>
        Not affiliated with any government entity
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A73E8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle1: {
    position: 'absolute',
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
    backgroundColor: 'rgba(255,255,255,0.05)',
    top: -width * 0.2,
    right: -width * 0.2,
  },
  circle2: {
    position: 'absolute',
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: width * 0.3,
    backgroundColor: 'rgba(255,255,255,0.07)',
    bottom: -width * 0.15,
    left: -width * 0.15,
  },
  circle3: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.06)',
    top: 100,
    left: 40,
  },
  logoContainer: {
    marginBottom: 28,
  },
  logoOuter: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoInner: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
  },
  appName: {
    fontSize: 34,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -0.5,
    marginBottom: 10,
  },
  tagline: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '500',
    letterSpacing: 0.2,
    marginBottom: 60,
  },
  dots: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 80,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  dotActive: {
    backgroundColor: '#fff',
    width: 24,
  },
  disclaimer: {
    position: 'absolute',
    bottom: 40,
    fontSize: 11,
    color: 'rgba(255,255,255,0.5)',
    letterSpacing: 0.3,
  },
});

export default SplashScreen;
