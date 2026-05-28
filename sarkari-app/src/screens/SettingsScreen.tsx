import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Linking,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS, SPACING, FONT_SIZE, RADIUS, SHADOW } from '../constants/theme';

interface SettingItemProps {
  icon: string;
  iconColor: string;
  label: string;
  subtitle?: string;
  onPress?: () => void;
  rightEl?: React.ReactNode;
}

const SettingItem: React.FC<SettingItemProps> = ({
  icon,
  iconColor,
  label,
  subtitle,
  onPress,
  rightEl,
}) => (
  <TouchableOpacity
    style={styles.settingItem}
    onPress={onPress}
    activeOpacity={onPress ? 0.7 : 1}>
    <View style={[styles.settingIcon, { backgroundColor: iconColor + '18' }]}>
      <Icon name={icon} size={20} color={iconColor} />
    </View>
    <View style={styles.settingContent}>
      <Text style={styles.settingLabel}>{label}</Text>
      {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
    </View>
    {rightEl || (onPress && (
      <Icon name="chevron-right" size={20} color={COLORS.text.light} />
    ))}
  </TouchableOpacity>
);

const SettingGroup: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <View style={styles.group}>
    <Text style={styles.groupTitle}>{title}</Text>
    <View style={styles.groupCard}>{children}</View>
  </View>
);

const SettingsScreen: React.FC = () => {
  const showDisclaimer = () => {
    Alert.alert(
      'Disclaimer',
      'YojanaGuide is an independent informational app. It is NOT affiliated with, endorsed by, or connected to any government entity, ministry, or department of India.\n\nAll information provided in this app is collected from publicly available government websites for general awareness purposes only.\n\nAlways visit official government portals to verify information before taking any action.',
      [{ text: 'I Understand', style: 'default' }],
    );
  };

  const showPrivacyPolicy = () => {
    Alert.alert(
      'Privacy Policy',
      'YojanaGuide respects your privacy.\n\n• We do not collect any personal data\n• We do not require any login or registration\n• Bookmarks are stored locally on your device only\n• We do not share data with third parties\n• No tracking or analytics\n\nThis app works entirely offline and does not transmit any user data.',
      [{ text: 'Close', style: 'default' }],
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar backgroundColor="#F8FAFF" barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
        </View>

        {/* App info card */}
        <View style={styles.appCard}>
          <View style={styles.appLogoBox}>
            <Icon name="account-balance" size={36} color={COLORS.primary} />
          </View>
          <Text style={styles.appName}>YojanaGuide</Text>
          <Text style={styles.appVersion}>Version 1.0.0</Text>
          <View style={styles.appBadge}>
            <Text style={styles.appBadgeText}>NOT AN OFFICIAL GOVERNMENT APP</Text>
          </View>
        </View>

        {/* About */}
        <SettingGroup title="About">
          <SettingItem
            icon="info-outline"
            iconColor={COLORS.primary}
            label="About App"
            subtitle="Learn what YojanaGuide does"
            onPress={() =>
              Alert.alert(
                'About YojanaGuide',
                'YojanaGuide helps Indian citizens discover government schemes that they may be eligible for.\n\nFeatures:\n• Browse 12+ government schemes\n• Search by name or category\n• Save bookmarks locally\n• View detailed eligibility & benefits\n• Open official government websites\n\nBuilt with ❤️ to help citizens access information easily.',
              )
            }
          />
          <SettingItem
            icon="policy"
            iconColor="#6A1B9A"
            label="Privacy Policy"
            subtitle="How we handle your data"
            onPress={showPrivacyPolicy}
          />
          <SettingItem
            icon="gavel"
            iconColor="#C62828"
            label="Disclaimer"
            subtitle="Not an official government app"
            onPress={showDisclaimer}
          />
        </SettingGroup>

        {/* Data */}
        <SettingGroup title="Data & Content">
          <SettingItem
            icon="storage"
            iconColor="#2E7D32"
            label="Data Source"
            subtitle="Publicly available government portals"
          />
          <SettingItem
            icon="update"
            iconColor="#E65100"
            label="Last Updated"
            subtitle="June 2025"
          />
          <SettingItem
            icon="language"
            iconColor={COLORS.primary}
            label="Language"
            subtitle="English"
          />
        </SettingGroup>

        {/* Legal */}
        <SettingGroup title="Legal">
          <SettingItem
            icon="verified-user"
            iconColor="#00695C"
            label="Terms of Use"
            onPress={() =>
              Alert.alert(
                'Terms of Use',
                'By using YojanaGuide, you agree that:\n\n1. This app provides information only\n2. We are not responsible for any decisions made based on app content\n3. Always verify information from official government portals\n4. We reserve the right to update content without notice\n5. This app is not a government service',
              )
            }
          />
          <SettingItem
            icon="copyright"
            iconColor={COLORS.text.tertiary}
            label="Licenses"
            subtitle="Open source acknowledgements"
            onPress={() =>
              Alert.alert('Licenses', 'Built with React Native, React Navigation, NativeWind, and other open-source libraries. See respective repositories for license details.')
            }
          />
        </SettingGroup>

        {/* Disclaimer block */}
        <View style={styles.disclaimerBox}>
          <Icon name="info-outline" size={16} color="#E65100" />
          <Text style={styles.disclaimerText}>
            YojanaGuide is not affiliated with any government entity. Information is collected from publicly available government websites for awareness purposes only. Always verify details at official portals before applying.
          </Text>
        </View>

        <Text style={styles.footerText}>Made in India 🇮🇳 · YojanaGuide © 2025</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F8FAFF' },
  content: { paddingBottom: 100 },
  header: {
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.text.primary,
    letterSpacing: -0.5,
  },
  appCard: {
    marginHorizontal: SPACING.xl,
    backgroundColor: '#fff',
    borderRadius: RADIUS.xl,
    padding: SPACING.xxl,
    alignItems: 'center',
    gap: SPACING.xs,
    ...SHADOW.sm,
    marginBottom: SPACING.xxl,
  },
  appLogoBox: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  appName: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '800',
    color: COLORS.text.primary,
  },
  appVersion: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.text.tertiary,
  },
  appBadge: {
    backgroundColor: '#FFEBEE',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
    marginTop: SPACING.xs,
  },
  appBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#C62828',
    letterSpacing: 0.5,
  },
  group: {
    marginHorizontal: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  groupTitle: {
    fontSize: FONT_SIZE.xs,
    fontWeight: '700',
    color: COLORS.text.tertiary,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: SPACING.sm,
    paddingLeft: SPACING.xs,
  },
  groupCard: {
    backgroundColor: '#fff',
    borderRadius: RADIUS.xl,
    overflow: 'hidden',
    ...SHADOW.sm,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    gap: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingIcon: {
    width: 38,
    height: 38,
    borderRadius: RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingContent: { flex: 1 },
  settingLabel: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  settingSubtitle: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.text.tertiary,
    marginTop: 2,
  },
  disclaimerBox: {
    marginHorizontal: SPACING.xl,
    backgroundColor: '#FFF8E1',
    borderRadius: RADIUS.xl,
    padding: SPACING.xl,
    flexDirection: 'row',
    gap: SPACING.sm,
    borderLeftWidth: 3,
    borderLeftColor: '#E65100',
    marginBottom: SPACING.xl,
  },
  disclaimerText: {
    flex: 1,
    fontSize: FONT_SIZE.xs,
    color: '#7B4700',
    lineHeight: 17,
    fontWeight: '500',
  },
  footerText: {
    textAlign: 'center',
    fontSize: FONT_SIZE.xs,
    color: COLORS.text.light,
    marginBottom: SPACING.xl,
  },
});

export default SettingsScreen;
