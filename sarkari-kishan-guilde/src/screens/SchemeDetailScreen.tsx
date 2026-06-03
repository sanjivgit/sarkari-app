// src/screens/SchemeDetailScreen.tsx
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Share,
  Linking,
  Alert,
  Pressable,
  Image,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { getSchemeById, SECTIONS } from '../data/schemes';
import { Colors, Shadow } from '../theme/colors';
import { DisclaimerBanner } from '../components';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SchemeDetail'>;
  route: RouteProp<RootStackParamList, 'SchemeDetail'>;
};

const SchemeDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { schemeId } = route.params;
  const scheme = getSchemeById(schemeId);

  if (!scheme) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Scheme not found</Text>
      </View>
    );
  }

  const handleShare = () => {
    Share.share({
      title: scheme.title,
      message: `Check out ${scheme.title} — ${scheme.tagline}\n\nOfficial Website: ${scheme.officialLink}\n\nShared via YojanaGuide`,
    });
  };

  const handleOpenWebsite = () => {
    Linking.canOpenURL(scheme.officialLink)
      .then(ok =>
        ok
          ? Linking.openURL(scheme.officialLink)
          : Alert.alert('Error', 'Cannot open URL'),
      )
      .catch(() => Alert.alert('Error', 'Failed to open link'));
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable
          hitSlop={50}
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Text style={styles.backArrow}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {scheme.shortTitle}
        </Text>
        <View style={styles.headerActions}>
          <Pressable
            hitSlop={50}
            onPress={handleShare}
            style={styles.actionBtn}
          >
            <Text style={styles.actionIcon}>↗</Text>
          </Pressable>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={styles.heroSection}>
          <View style={styles.heroEmoji}>
            <Image
              style={styles.heroLogo}
              source={require('../assets/logo.png')}
            />
          </View>
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeText}>{scheme.category} Scheme</Text>
          </View>
          <Text style={styles.heroTitle}>{scheme.title}</Text>
          <Text style={styles.heroTagline}>{scheme.tagline}</Text>

          {/* Stats */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>₹6,000</Text>
              <Text style={styles.statLabel}>Annual Benefit</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>3</Text>
              <Text style={styles.statLabel}>Installments</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>2019</Text>
              <Text style={styles.statLabel}>Since</Text>
            </View>
          </View>
        </View>

        {/* Ministry Info */}
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>🏛️</Text>
            <View>
              <Text style={styles.infoLabel}>Ministry</Text>
              <Text style={styles.infoValue}>{scheme.ministry}</Text>
            </View>
          </View>
          <View style={styles.infoDivider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>👤</Text>
            <View>
              <Text style={styles.infoLabel}>Launched By</Text>
              <Text style={styles.infoValue}>
                {scheme.launchedBy} ({scheme.launchYear})
              </Text>
            </View>
          </View>
          {scheme.helplineNumber && (
            <>
              <View style={styles.infoDivider} />
              <View style={styles.infoRow}>
                <Text style={styles.infoIcon}>📞</Text>
                <View>
                  <Text style={styles.infoLabel}>Helpline</Text>
                  <Text style={[styles.infoValue, { color: Colors.green }]}>
                    {scheme.helplineNumber}
                  </Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* Description */}
        <View style={styles.descCard}>
          <Text style={styles.descTitle}>About this Scheme</Text>
          <Text style={styles.descText}>{scheme.description}</Text>
        </View>

        {/* Navigation Sections */}
        <View style={styles.sectionGrid}>
          <Text style={styles.gridTitle}>Explore Details</Text>
          {SECTIONS.map(s => (
            <TouchableOpacity
              key={s.screen}
              style={[styles.sectionCard, { borderLeftColor: s.accent }]}
              onPress={() =>
                navigation.navigate(s.screen as any, { schemeId: scheme.id })
              }
              activeOpacity={0.85}
            >
              <View
                style={[styles.sectionIconBox, { backgroundColor: s.color }]}
              >
                <Text style={styles.sectionCardIcon}>{s.icon}</Text>
              </View>
              <View style={styles.sectionCardContent}>
                <Text style={[styles.sectionCardLabel, { color: s.accent }]}>
                  {s.label}
                </Text>
                <Text style={styles.sectionCardSub}>{s.subtitle}</Text>
              </View>
              <Text style={[styles.sectionArrow, { color: s.accent }]}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.websiteBtn}
            onPress={handleOpenWebsite}
            activeOpacity={0.85}
          >
            <Text style={styles.websiteBtnText}>🌐 Open Official Website</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.shareFullBtn}
            onPress={handleShare}
            activeOpacity={0.85}
          >
            <Text style={styles.shareFullBtnText}>↗ Share</Text>
          </TouchableOpacity>
        </View>

        <DisclaimerBanner />
        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  errorContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  errorText: { fontSize: 16, color: Colors.textSecondary },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    ...Shadow.sm,
  },
  backBtn: { padding: 4, marginRight: 8 },
  backArrow: { fontSize: 22, color: Colors.primary, fontWeight: '600' },
  headerTitle: {
    flex: 1,
    fontSize: 17,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  headerActions: { flexDirection: 'row' },
  actionBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  actionIcon: { fontSize: 16, fontWeight: '700', color: Colors.primary },

  heroSection: {
    backgroundColor: Colors.primary,
    padding: 24,
    alignItems: 'center',
    paddingBottom: 32,
  },
  heroEmoji: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  heroLogo: { width: 70, height: 70 },
  heroBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 12,
  },
  heroBadgeText: { color: Colors.white, fontSize: 12, fontWeight: '700' },
  heroTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 6,
  },
  heroTagline: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
  },

  statsRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 16,
    padding: 14,
    marginTop: 20,
    width: '100%',
  },
  statItem: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 18, fontWeight: '800', color: Colors.white },
  statLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 4,
    textAlign: 'center',
  },
  statDivider: { width: 1, backgroundColor: 'rgba(255,255,255,0.3)' },

  infoCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    margin: 16,
    marginBottom: 0,
    padding: 16,
    ...Shadow.sm,
  },
  infoRow: { flexDirection: 'row', alignItems: 'flex-start' },
  infoIcon: { fontSize: 22, marginRight: 12, marginTop: 2 },
  infoLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '600',
    marginBottom: 2,
  },
  infoValue: { fontSize: 14, color: Colors.textPrimary, fontWeight: '700' },
  infoDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 12,
  },

  descCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    margin: 16,
    marginBottom: 0,
    padding: 16,
    ...Shadow.sm,
  },
  descTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 10,
  },
  descText: { fontSize: 14, color: Colors.textSecondary, lineHeight: 22 },

  sectionGrid: { margin: 16, marginBottom: 0 },
  gridTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  sectionCard: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderLeftWidth: 4,
    ...Shadow.sm,
  },
  sectionIconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  sectionCardIcon: { fontSize: 24 },
  sectionCardContent: { flex: 1 },
  sectionCardLabel: { fontSize: 15, fontWeight: '800' },
  sectionCardSub: { fontSize: 12, color: Colors.textSecondary, marginTop: 2 },
  sectionArrow: { fontSize: 24, fontWeight: '700' },

  actionRow: { flexDirection: 'row', gap: 12, margin: 16, marginBottom: 8 },
  websiteBtn: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  websiteBtnText: { color: Colors.white, fontWeight: '700', fontSize: 14 },
  shareFullBtn: {
    backgroundColor: Colors.white,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  shareFullBtnText: {
    color: Colors.textPrimary,
    fontWeight: '700',
    fontSize: 14,
  },
});

export default SchemeDetailScreen;
