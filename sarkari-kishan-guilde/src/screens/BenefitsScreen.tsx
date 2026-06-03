// src/screens/BenefitsScreen.tsx
import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { getSchemeById } from '../data/schemes';
import { Colors, Shadow } from '../theme/colors';
import { DisclaimerBanner } from '../components';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Benefits'>;
  route: RouteProp<RootStackParamList, 'Benefits'>;
};

const INSTALLMENT_MONTHS = [
  { label: '1st Installment', month: 'April', amount: '₹2,000', icon: '🌸' },
  { label: '2nd Installment', month: 'August', amount: '₹2,000', icon: '☀️' },
  { label: '3rd Installment', month: 'December', amount: '₹2,000', icon: '❄️' },
];

const BenefitsScreen: React.FC<Props> = ({ navigation, route }) => {
  const scheme = getSchemeById(route.params.schemeId);
  if (!scheme) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          hitSlop={50}
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Text style={styles.backArrow}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Benefits</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.heroEmoji}>🎁</Text>
          <Text style={styles.heroAmount}>₹6,000</Text>
          <Text style={styles.heroLabel}>Per Year • Direct Bank Transfer</Text>
          <Text style={styles.heroSub}>{scheme.title}</Text>
        </View>

        {/* Installment Timeline */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Schedule</Text>
          <View style={styles.timelineContainer}>
            {INSTALLMENT_MONTHS.map((inst, i) => (
              <View key={i} style={styles.timelineItem}>
                <View style={styles.timelineLeft}>
                  <View style={styles.timelineDot} />
                  {i < 2 && <View style={styles.timelineLine} />}
                </View>
                <View style={styles.timelineCard}>
                  <Text style={styles.timelineIcon}>{inst.icon}</Text>
                  <View style={styles.timelineContent}>
                    <Text style={styles.timelineLabel}>{inst.label}</Text>
                    <Text style={styles.timelineMonth}>{inst.month}</Text>
                  </View>
                  <Text style={styles.timelineAmount}>{inst.amount}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Key Benefits */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Benefits</Text>
          {scheme.benefits.map((benefit, i) => (
            <View key={i} style={styles.benefitCard}>
              <View style={styles.benefitIconBox}>
                <Text style={styles.benefitIconEmoji}>
                  {['💰', '🏦', '📅', '🛡️'][i] || '✨'}
                </Text>
              </View>
              <View style={styles.benefitContent}>
                <Text style={styles.benefitTitle}>{benefit.title}</Text>
                <Text style={styles.benefitDesc}>{benefit.description}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* How funds are used infographic */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How Farmers Use This Fund</Text>
          <View style={styles.usageGrid}>
            {[
              { emoji: '🌱', label: 'Seeds', pct: '35%' },
              { emoji: '💧', label: 'Irrigation', pct: '25%' },
              { emoji: '🧪', label: 'Fertilizers', pct: '20%' },
              { emoji: '🔧', label: 'Equipment', pct: '20%' },
            ].map((u, i) => (
              <View key={i} style={styles.usageItem}>
                <Text style={styles.usageEmoji}>{u.emoji}</Text>
                <Text style={styles.usagePct}>{u.pct}</Text>
                <Text style={styles.usageLabel}>{u.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Important Note */}
        <View style={styles.noteBox}>
          <Text style={styles.noteTitle}>📌 Important</Text>
          <Text style={styles.noteText}>
            e-KYC must be completed every year to continue receiving benefits.
            Benefits are linked directly to Aadhaar-verified bank accounts — no
            middlemen involved.
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
    backgroundColor: Colors.primary,
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
    backgroundColor: Colors.primary,
    padding: 28,
    alignItems: 'center',
    paddingBottom: 36,
  },
  heroEmoji: { fontSize: 52, marginBottom: 12 },
  heroAmount: { fontSize: 44, fontWeight: '900', color: Colors.white },
  heroLabel: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 4 },
  heroSub: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 8,
    textAlign: 'center',
  },

  section: { padding: 16, paddingBottom: 0 },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 14,
  },

  timelineContainer: {},
  timelineItem: { flexDirection: 'row', marginBottom: 4 },
  timelineLeft: { width: 28, alignItems: 'center' },
  timelineDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Colors.primary,
    marginTop: 16,
  },
  timelineLine: {
    flex: 1,
    width: 2,
    backgroundColor: Colors.primaryLight,
    marginTop: 2,
    marginBottom: -4,
  },
  timelineCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 14,
    marginLeft: 12,
    marginBottom: 10,
    ...Shadow.sm,
  },
  timelineIcon: { fontSize: 28, marginRight: 12 },
  timelineContent: { flex: 1 },
  timelineLabel: { fontSize: 13, fontWeight: '700', color: Colors.textPrimary },
  timelineMonth: { fontSize: 12, color: Colors.textSecondary, marginTop: 2 },
  timelineAmount: { fontSize: 20, fontWeight: '900', color: Colors.primary },

  benefitCard: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
    ...Shadow.sm,
  },
  benefitIconBox: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  benefitIconEmoji: { fontSize: 26 },
  benefitContent: { flex: 1 },
  benefitTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  benefitDesc: { fontSize: 13, color: Colors.textSecondary, lineHeight: 20 },

  usageGrid: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    ...Shadow.sm,
  },
  usageItem: { flex: 1, alignItems: 'center' },
  usageEmoji: { fontSize: 28, marginBottom: 6 },
  usagePct: { fontSize: 16, fontWeight: '800', color: Colors.primary },
  usageLabel: { fontSize: 11, color: Colors.textSecondary, marginTop: 2 },

  noteBox: {
    backgroundColor: Colors.primaryLight,
    borderRadius: 16,
    padding: 16,
    margin: 16,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  noteTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.primaryDark,
    marginBottom: 8,
  },
  noteText: { fontSize: 14, color: Colors.primary, lineHeight: 22 },
});

export default BenefitsScreen;
