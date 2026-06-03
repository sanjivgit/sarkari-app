// src/screens/DocumentsScreen.tsx
import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { getSchemeById } from '../data/schemes';
import { Colors, Shadow } from '../theme/colors';
import { DisclaimerBanner } from '../components';

const DOC_ICONS: Record<number, string> = {
  0: '🪪',
  1: '📜',
  2: '🏦',
  3: '📱',
  4: '📋',
  5: '🏠',
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Documents'>;
  route: RouteProp<RootStackParamList, 'Documents'>;
};

const DocumentsScreen: React.FC<Props> = ({ navigation, route }) => {
  const scheme = getSchemeById(route.params.schemeId);
  if (!scheme) return null;

  return (
    <View style={styles.container}>
      <View style={[styles.header, { backgroundColor: '#E65100' }]}>
        <Pressable
          hitSlop={50}
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Text style={styles.backArrow}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Required Documents</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.hero, { backgroundColor: '#E65100' }]}>
          <Text style={styles.heroEmoji}>📄</Text>
          <Text style={styles.heroTitle}>Documents Required</Text>
          <Text style={styles.heroSub}>Keep these ready before applying</Text>
        </View>

        {/* Documents Count Badge */}
        <View style={styles.countBadge}>
          <Text style={styles.countText}>
            {scheme.documents.length} Documents Needed
          </Text>
        </View>

        {/* Documents List */}
        <View style={styles.section}>
          {scheme.documents.map((doc, i) => (
            <View key={i} style={styles.docCard}>
              <View style={styles.docIconBox}>
                <Text style={styles.docIcon}>{DOC_ICONS[i] || '📄'}</Text>
              </View>
              <View style={styles.docContent}>
                <Text style={styles.docNumber}>Document {i + 1}</Text>
                <Text style={styles.docText}>{doc}</Text>
              </View>
              <View style={styles.docCheck}>
                <Text style={styles.docCheckIcon}>○</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💡 Document Tips</Text>
          {[
            'Make photocopies of all documents before submitting.',
            'Ensure your Aadhaar is linked to your bank account.',
            'Land records must be up-to-date and in your name.',
            'Self-attested copies are usually sufficient for registration.',
          ].map((tip, i) => (
            <View key={i} style={styles.tipRow}>
              <Text style={styles.tipBullet}>•</Text>
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </View>

        {/* Warning Box */}
        <View style={styles.warningBox}>
          <Text style={styles.warningTitle}>⚠️ Beware of Fraud</Text>
          <Text style={styles.warningText}>
            Do NOT give your original documents to any agent. Registration is
            completely FREE and can be done online at pmkisan.gov.in or at your
            nearest Common Service Centre (CSC).
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

  hero: { padding: 24, alignItems: 'center', paddingBottom: 32 },
  heroEmoji: { fontSize: 48, marginBottom: 12 },
  heroTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.white,
    textAlign: 'center',
  },
  heroSub: { fontSize: 13, color: 'rgba(255,255,255,0.75)', marginTop: 6 },

  countBadge: {
    backgroundColor: '#FFF3E0',
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 24,
    marginTop: 16,
    marginBottom: 4,
    borderWidth: 1.5,
    borderColor: '#FFE0B2',
  },
  countText: { color: '#E65100', fontWeight: '800', fontSize: 14 },

  section: { padding: 16, paddingBottom: 0 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 12,
  },

  docCard: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    ...Shadow.sm,
  },
  docIconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#FFF3E0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  docIcon: { fontSize: 24 },
  docContent: { flex: 1 },
  docNumber: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: '600',
    marginBottom: 2,
  },
  docText: {
    fontSize: 14,
    color: Colors.textPrimary,
    fontWeight: '600',
    lineHeight: 20,
  },
  docCheck: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  docCheckIcon: { color: Colors.textLight, fontSize: 12 },

  tipRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 },
  tipBullet: { fontSize: 16, color: '#E65100', marginRight: 8, marginTop: 1 },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 22,
  },

  warningBox: {
    backgroundColor: '#FFEBEE',
    borderRadius: 16,
    padding: 16,
    margin: 16,
    borderLeftWidth: 4,
    borderLeftColor: Colors.error,
  },
  warningTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.error,
    marginBottom: 8,
  },
  warningText: { fontSize: 13, color: '#B71C1C', lineHeight: 20 },
});

export default DocumentsScreen;
