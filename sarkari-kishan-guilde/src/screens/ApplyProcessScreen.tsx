// src/screens/ApplyProcessScreen.tsx
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { getSchemeById } from '../data/schemes';
import { Colors, Shadow } from '../theme/colors';
import { DisclaimerBanner } from '../components';
import { BannerAd, MediumRect, useInterstitialAd } from '../services/ads';
import { WhereToApply } from '../data/whereToApply';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ApplyProcess'>;
  route: RouteProp<RootStackParamList, 'ApplyProcess'>;
};

const ApplyProcessScreen: React.FC<Props> = ({ navigation, route }) => {
  const { showNow } = useInterstitialAd();
  const scheme = getSchemeById(route.params.schemeId);
  if (!scheme) return null;

  const openWebsite = () => {
    Linking.openURL(scheme.officialLink).catch(() =>
      Alert.alert('Error', 'Could not open website'),
    );
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { backgroundColor: '#6A1B9A' }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>How to Apply</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.hero, { backgroundColor: '#6A1B9A' }]}>
          <Text style={styles.heroEmoji}>📋</Text>
          <Text style={styles.heroTitle}>Step-by-Step Guide</Text>
          <Text style={styles.heroSub}>
            Simple {scheme.applySteps.length} steps to apply
          </Text>
        </View>

        {/* Steps */}
        <View style={styles.section}>
          {scheme.applySteps.map((step, i) => (
            <View key={i} style={styles.stepRow}>
              <View style={styles.stepLeft}>
                <View style={styles.stepBadge}>
                  <Text style={styles.stepBadgeText}>{step.step}</Text>
                </View>
                {i < scheme.applySteps.length - 1 && (
                  <View style={styles.stepLine} />
                )}
              </View>
              <View style={styles.stepCard}>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text style={styles.stepDesc}>{step.description}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Apply Mode Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📍 Where to Apply</Text>
          {WhereToApply.map((mode, i) => (
            <View key={i} style={styles.modeCard}>
              <Text style={styles.modeIcon}>{mode.icon}</Text>
              <View style={styles.modeContent}>
                <Text style={styles.modeLabel}>{mode.label}</Text>
                <Text style={styles.modeDesc}>{mode.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Important Notes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚠️ Important Notes</Text>
          {scheme.importantNotes.slice(0, 4).map((note, i) => (
            <View key={i} style={styles.noteRow}>
              <Text style={styles.noteNum}>{i + 1}</Text>
              <Text style={styles.noteText}>{note}</Text>
            </View>
          ))}
        </View>

        {/* Apply Now CTA */}
        <TouchableOpacity
          style={styles.applyNowBtn}
          onPress={() => {
            showNow();
            openWebsite();
          }}
          activeOpacity={0.85}
        >
          <Text style={styles.applyNowIcon}>🌐</Text>
          <View>
            <Text style={styles.applyNowTitle}>Apply Now Online</Text>
            <Text style={styles.applyNowSub}>pmkisan.gov.in</Text>
          </View>
          <Text style={styles.applyNowArrow}>→</Text>
        </TouchableOpacity>

        <MediumRect style={{ marginHorizontal: 16 }} />
        <DisclaimerBanner />
        <BannerAd />
        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  backBtn: { padding: 4, marginRight: 8 },
  backArrow: { fontSize: 22, color: Colors.white, fontWeight: '600' },
  headerTitle: {
    flex: 1,
    fontSize: 17,
    fontWeight: '700',
    color: Colors.white,
  },

  hero: { padding: 24, alignItems: 'center', paddingBottom: 32 },
  heroEmoji: { fontSize: 48, marginBottom: 12 },
  heroTitle: { fontSize: 22, fontWeight: '800', color: Colors.white },
  heroSub: { fontSize: 13, color: 'rgba(255,255,255,0.75)', marginTop: 6 },

  section: { padding: 16, paddingBottom: 0 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 14,
  },

  stepRow: { flexDirection: 'row', marginBottom: 4 },
  stepLeft: { width: 40, alignItems: 'center' },
  stepBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#6A1B9A',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  stepBadgeText: { color: Colors.white, fontWeight: '800', fontSize: 13 },
  stepLine: {
    flex: 1,
    width: 2,
    backgroundColor: '#E1BEE7',
    marginTop: 4,
    marginBottom: -6,
  },
  stepCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 14,
    marginLeft: 10,
    marginBottom: 10,
    ...Shadow.sm,
  },
  stepTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  stepDesc: { fontSize: 13, color: Colors.textSecondary, lineHeight: 20 },

  modeCard: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    ...Shadow.sm,
  },
  modeIcon: { fontSize: 28, marginRight: 14 },
  modeContent: { flex: 1 },
  modeLabel: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary },
  modeDesc: { fontSize: 13, color: Colors.textSecondary, marginTop: 2 },

  noteRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  noteNum: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.accentLight,
    textAlign: 'center',
    lineHeight: 24,
    fontSize: 12,
    fontWeight: '800',
    color: Colors.accent,
    marginRight: 10,
    flexShrink: 0,
  },
  noteText: {
    flex: 1,
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 20,
  },

  applyNowBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.green,
    borderRadius: 16,
    padding: 18,
    margin: 16,
    marginBottom: 8,
  },
  applyNowIcon: { fontSize: 28, marginRight: 14 },
  applyNowTitle: { color: Colors.white, fontWeight: '800', fontSize: 16 },
  applyNowSub: { color: 'rgba(255,255,255,0.75)', fontSize: 12, marginTop: 2 },
  applyNowArrow: {
    marginLeft: 'auto',
    fontSize: 22,
    color: Colors.white,
    fontWeight: '700',
  },
});

export default ApplyProcessScreen;
