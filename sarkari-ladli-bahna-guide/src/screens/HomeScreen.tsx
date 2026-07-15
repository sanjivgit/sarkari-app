// src/screens/HomeScreen.tsx
import React, { useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  Image,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { featuredScheme } from '../data/schemes';
import { Colors, Shadow } from '../theme/colors';
import { DisclaimerBanner } from '../components';
import { BannerAd, MediumRect, useInterstitialAd } from '../services/ads';
import { appName } from '../data/constant';

const { width } = Dimensions.get('window');

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Main'>;
};

const MENU_ITEMS = [
  // { icon: '✅', label: 'पात्रता\nEligibility', screen: 'Eligibility', color: '#E8F5E9', accent: '#2E7D32' },
  {
    icon: '🎁',
    label: 'लाभ\nBenefits',
    screen: 'Benefits',
    color: '#E3F2FD',
    accent: '#1565C0',
  },
  {
    icon: '📄',
    label: 'दस्तावेज़\nDocuments',
    screen: 'Documents',
    color: '#FFF3E0',
    accent: '#E65100',
  },
  {
    icon: '📋',
    label: 'आवेदन\nApply Steps',
    screen: 'ApplyProcess',
    color: '#F3E5F5',
    accent: '#6A1B9A',
  },
  // { icon: '💬', label: 'सवाल\nFAQ', screen: 'FAQ', color: '#E0F7FA', accent: '#00695C' },
  // { icon: '🔖', label: 'सेव\nBookmarks', screen: 'Bookmarks', color: '#FCE4EC', accent: '#C62828' },
];

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const scheme = featuredScheme;
  const { showNow } = useInterstitialAd();

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      {/* Sticky mini header */}
      <Animated.View style={[styles.stickyHeader, { opacity: headerOpacity }]}>
        <Text style={styles.stickyTitle}>Ladli Behna Yojana</Text>
      </Animated.View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          {
            useNativeDriver: true,
          },
        )}
        scrollEventThrottle={16}
      >
        {/* ── Hero Banner ── */}
        <View style={styles.hero}>
          <View style={styles.heroBg} />
          <View style={styles.heroContent}>
            <View style={styles.heroTop}>
              <View style={styles.appBrand}>
                <Image
                  style={styles.brandIcon}
                  source={require('../assets/logo.png')}
                />
                <View>
                  <Text style={styles.brandName}>{appName}</Text>
                  <Text style={styles.brandSub}>Govt. Scheme Info</Text>
                </View>
              </View>
            </View>

            {/* Scheme Hero Card */}
            <View style={styles.schemeHeroCard}>
              <View style={styles.schemeHeroBadge}>
                <Text style={styles.schemeHeroBadgeText}>
                  🌟 Featured Scheme
                </Text>
              </View>
              <Text style={styles.schemeHeroTitle}>{scheme.title}</Text>
              <Text style={styles.schemeHeroTagline}>{scheme.tagline}</Text>

              <View style={styles.schemeMetaRow}>
                <View style={styles.schemeMeta}>
                  <Text style={styles.schemeMetaVal}>₹1,500</Text>
                  <Text style={styles.schemeMetaLabel}>Per Month</Text>
                </View>
                <View style={styles.schemeMetaDivider} />
                <View style={styles.schemeMeta}>
                  <Text style={styles.schemeMetaVal}>DBT</Text>
                  <Text style={styles.schemeMetaLabel}>Bank Transfer</Text>
                </View>
                <View style={styles.schemeMetaDivider} />
                <View style={styles.schemeMeta}>
                  <Text style={styles.schemeMetaVal}>2023</Text>
                  <Text style={styles.schemeMetaLabel}>Launched</Text>
                </View>
              </View>

              <View style={styles.schemeHeroBtns}>
                <TouchableOpacity
                  style={styles.exploreBtn}
                  onPress={() => {
                    showNow();
                    navigation.navigate('SchemeDetail', { schemeId: scheme.id });
                  }}
                  activeOpacity={0.85}
                >
                  <Text style={styles.exploreBtnText}>Explore Scheme →</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* ── Quick Actions Grid ── */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Quick Access</Text>
          <View style={styles.menuGrid}>
            {MENU_ITEMS.map(item => (
              <TouchableOpacity
                key={item.screen}
                style={[styles.menuItem, { backgroundColor: item.color }]}
                onPress={() => {
                  if (item.screen === 'Bookmarks') {
                    navigation.navigate('Bookmarks');
                  } else {
                    navigation.navigate(item.screen as any, {
                      schemeId: scheme.id,
                    });
                  }
                }}
                activeOpacity={0.8}
              >
                <Text style={styles.menuItemIcon}>{item.icon}</Text>
                <Text style={[styles.menuItemLabel, { color: item.accent }]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ── Inline Ad ── */}
        <MediumRect style={{ marginHorizontal: 16, marginTop: 16 }} />

        {/* ── About This Scheme ── */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>About Scheme</Text>
          <TouchableOpacity
            style={styles.aboutCard}
            onPress={() =>
              navigation.navigate('SchemeDetail', { schemeId: scheme.id })
            }
            activeOpacity={0.9}
          >
            <Text style={styles.aboutText} numberOfLines={4}>
              {scheme.description}
            </Text>
            <Text style={styles.readMore}>Read more →</Text>
          </TouchableOpacity>
        </View>

        {/* ── Key Highlights ── */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Key Highlights</Text>
          {[
            {
              icon: '💰',
              text: 'Direct ₹1,500 every month in your bank account',
            },
            {
              icon: '📱',
              text: 'Apply at Gram Panchayat, Ward office, or Ladli Behna camp',
            },
            { icon: '🆓', text: 'Completely FREE — no agent fees required' },
            {
              icon: '🏦',
              text: 'Samagra ID & Aadhaar-linked DBT bank account required',
            },
          ].map((h, i) => (
            <View key={i} style={styles.highlightRow}>
              <Text style={styles.highlightIcon}>{h.icon}</Text>
              <Text style={styles.highlightText}>{h.text}</Text>
            </View>
          ))}
        </View>

        {/* ── Tags ── */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Tags</Text>
          <View style={styles.tagsRow}>
            {scheme.tags.map(tag => (
              <View key={tag} style={styles.tagPill}>
                <Text style={styles.tagPillText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Helpline */}
        {scheme.helplineNumber && (
          <View style={styles.section}>
            <View style={styles.helplineCard}>
              <Text style={styles.helplineIcon}>📞</Text>
              <View style={styles.helplineContent}>
                <Text style={styles.helplineLabel}>Helpline Number</Text>
                <Text style={styles.helplineNumber}>
                  {scheme.helplineNumber}
                </Text>
                <Text style={styles.helplineSub}>
                  Toll Free • Mon–Sat, 9am–6pm
                </Text>
              </View>
            </View>
          </View>
        )}

        <DisclaimerBanner />
        <BannerAd />
        <View style={{ height: 32 }} />
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },

  stickyHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  stickyTitle: { color: Colors.white, fontWeight: '700', fontSize: 16 },

  hero: { backgroundColor: Colors.primary, paddingBottom: 24 },
  heroBg: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
    backgroundColor: Colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  heroContent: { padding: 20 },

  heroTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  appBrand: { flexDirection: 'row', alignItems: 'center' },
  brandIcon: { fontSize: 28, marginRight: 10, height: 50, width: 50 },
  brandName: { color: Colors.white, fontWeight: '800', fontSize: 18 },
  brandSub: { color: 'rgba(255,255,255,0.7)', fontSize: 11 },
  settingsBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsIcon: { fontSize: 18 },

  schemeHeroCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    ...Shadow.md,
  },
  schemeHeroBadge: {
    backgroundColor: Colors.primaryLight,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 10,
  },
  schemeHeroBadgeText: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '700',
  },
  schemeHeroTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  schemeHeroTagline: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 16,
  },

  schemeMetaRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 14,
    marginBottom: 16,
  },
  schemeMeta: { flex: 1, alignItems: 'center' },
  schemeMetaVal: { fontSize: 18, fontWeight: '800', color: Colors.primary },
  schemeMetaLabel: { fontSize: 11, color: Colors.textSecondary, marginTop: 2 },
  schemeMetaDivider: { width: 1, backgroundColor: Colors.border },

  schemeHeroBtns: { flexDirection: 'row', gap: 10 },
  exploreBtn: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: 'center',
  },
  exploreBtnText: { color: Colors.white, fontWeight: '700', fontSize: 15 },
  bookmarkBtn: {
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  bookmarkBtnActive: {
    backgroundColor: Colors.primaryLight,
    borderColor: Colors.primary,
  },
  bookmarkBtnIcon: { fontSize: 20 },

  section: { paddingHorizontal: 16, marginTop: 20 },
  sectionLabel: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 12,
  },

  menuGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  menuItem: {
    width: (width - 53) / 3,
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 16,
    alignItems: 'center',
  },
  menuItemIcon: { fontSize: 26, marginBottom: 8 },
  menuItemLabel: {
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 16,
  },

  aboutCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    ...Shadow.sm,
  },
  aboutText: { fontSize: 14, color: Colors.textSecondary, lineHeight: 22 },
  readMore: {
    color: Colors.primary,
    fontWeight: '700',
    marginTop: 10,
    fontSize: 14,
  },

  highlightRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    ...Shadow.sm,
  },
  highlightIcon: { fontSize: 20, marginRight: 12 },
  highlightText: {
    flex: 1,
    fontSize: 14,
    color: Colors.textPrimary,
    lineHeight: 20,
    fontWeight: '500',
  },

  tagsRow: { flexDirection: 'row', flexWrap: 'wrap' },
  tagPill: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  tagPillText: { color: Colors.primary, fontSize: 12, fontWeight: '600' },

  helplineCard: {
    backgroundColor: '#E8F5E9',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: Colors.green,
  },
  helplineIcon: { fontSize: 32, marginRight: 14 },
  helplineContent: { flex: 1 },
  helplineLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  helplineNumber: {
    fontSize: 20,
    color: Colors.green,
    fontWeight: '800',
    marginTop: 2,
  },
  helplineSub: { fontSize: 11, color: Colors.textSecondary, marginTop: 2 },
});

export default HomeScreen;
