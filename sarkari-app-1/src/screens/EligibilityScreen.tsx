// src/screens/EligibilityScreen.tsx
import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { getSchemeById } from '../data/schemes';
import { Colors, Shadow } from '../theme/colors';
import { DisclaimerBanner } from '../components';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Eligibility'>;
  route: RouteProp<RootStackParamList, 'Eligibility'>;
};

const NOT_ELIGIBLE = [
  'Income tax payers',
  'Government employees / pensioners',
  'Doctors, engineers, lawyers (professionals)',
  'Former and current MPs/MLAs',
  'Institutional landholders',
];

const EligibilityScreen: React.FC<Props> = ({ navigation, route }) => {
  const scheme = getSchemeById(route.params.schemeId);
  if (!scheme) return null;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: Colors.green }]}>
        <Pressable
          hitSlop={50}
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Text style={styles.backArrow}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Eligibility Criteria</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={[styles.hero, { backgroundColor: Colors.green }]}>
          <Text style={styles.heroEmoji}>✅</Text>
          <Text style={styles.heroTitle}>Who is Eligible?</Text>
          <Text style={styles.heroSub}>{scheme.title}</Text>
        </View>

        {/* Eligible Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={[styles.dot, { backgroundColor: Colors.green }]} />
            <Text style={[styles.sectionTitle, { color: Colors.green }]}>
              Eligible ✓
            </Text>
          </View>
          {scheme.eligibility.map((item, i) => (
            <View key={i} style={styles.eligibleCard}>
              <View
                style={[
                  styles.checkCircle,
                  { backgroundColor: Colors.greenLight },
                ]}
              >
                <Text style={styles.checkText}>✓</Text>
              </View>
              <Text style={styles.eligibleText}>{item}</Text>
            </View>
          ))}
        </View>

        {/* Not Eligible */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={[styles.dot, { backgroundColor: Colors.error }]} />
            <Text style={[styles.sectionTitle, { color: Colors.error }]}>
              Not Eligible ✗
            </Text>
          </View>
          {NOT_ELIGIBLE.map((item, i) => (
            <View key={i} style={styles.notEligibleCard}>
              <View style={styles.crossCircle}>
                <Text style={styles.crossText}>✗</Text>
              </View>
              <Text style={styles.notEligibleText}>{item}</Text>
            </View>
          ))}
        </View>

        {/* Tip Box */}
        <View style={styles.tipBox}>
          <Text style={styles.tipTitle}>💡 Pro Tip</Text>
          <Text style={styles.tipText}>
            Not sure if you're eligible? Visit your nearest Common Service
            Centre (CSC) or Agriculture Department office. They will help you
            check your eligibility for FREE.
          </Text>
        </View>

        <DisclaimerBanner />
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

  hero: {
    padding: 24,
    alignItems: 'center',
    paddingBottom: 32,
  },
  heroEmoji: { fontSize: 48, marginBottom: 12 },
  heroTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.white,
    textAlign: 'center',
  },
  heroSub: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 6,
    textAlign: 'center',
  },

  section: { padding: 16, paddingBottom: 0 },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  dot: { width: 8, height: 8, borderRadius: 4, marginRight: 8 },
  sectionTitle: { fontSize: 16, fontWeight: '800' },

  eligibleCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: Colors.green,
    ...Shadow.sm,
  },
  checkCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    flexShrink: 0,
  },
  checkText: { color: Colors.green, fontWeight: '800', fontSize: 14 },
  eligibleText: {
    flex: 1,
    fontSize: 14,
    color: Colors.textPrimary,
    lineHeight: 20,
  },

  notEligibleCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: Colors.error,
    ...Shadow.sm,
  },
  crossCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFEBEE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    flexShrink: 0,
  },
  crossText: { color: Colors.error, fontWeight: '800', fontSize: 14 },
  notEligibleText: {
    flex: 1,
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },

  tipBox: {
    backgroundColor: '#FFF8E1',
    borderRadius: 16,
    padding: 16,
    margin: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#FF6F00',
  },
  tipTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#E65100',
    marginBottom: 8,
  },
  tipText: { fontSize: 14, color: '#795548', lineHeight: 22 },
});

export default EligibilityScreen;
