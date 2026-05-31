// src/components/index.tsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Linking,
  Share,
  Alert,
} from 'react-native';
import { Colors, Shadow } from '../theme/colors';

// ─── Header ──────────────────────────────────────────────
interface HeaderProps {
  title: string;
  onBack?: () => void;
  rightIcon?: React.ReactNode;
}
export const Header: React.FC<HeaderProps> = ({ title, onBack, rightIcon }) => (
  <View style={styles.header}>
    {onBack && (
      <TouchableOpacity onPress={onBack} style={styles.backBtn}>
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>
    )}
    <Text style={styles.headerTitle} numberOfLines={1}>{title}</Text>
    {rightIcon ? <View style={styles.rightIcon}>{rightIcon}</View> : <View style={styles.rightPlaceholder} />}
  </View>
);

// ─── Card ─────────────────────────────────────────────────
interface CardProps {
  children: React.ReactNode;
  style?: object;
  onPress?: () => void;
}
export const Card: React.FC<CardProps> = ({ children, style, onPress }) => {
  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} style={[styles.card, style]} activeOpacity={0.85}>
        {children}
      </TouchableOpacity>
    );
  }
  return <View style={[styles.card, style]}>{children}</View>;
};

// ─── Section Title ─────────────────────────────────────────
export const SectionTitle: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {subtitle && <Text style={styles.sectionSubtitle}>{subtitle}</Text>}
  </View>
);

// ─── Tag Pill ─────────────────────────────────────────────
export const Tag: React.FC<{ label: string; color?: string }> = ({
  label,
  color = Colors.primaryLight,
}) => (
  <View style={[styles.tag, { backgroundColor: color }]}>
    <Text style={[styles.tagText, { color: Colors.primary }]}>{label}</Text>
  </View>
);

// ─── Info Row ─────────────────────────────────────────────
export const InfoRow: React.FC<{ icon: string; label: string; value: string }> = ({
  icon, label, value,
}) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoIcon}>{icon}</Text>
    <View style={styles.infoContent}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  </View>
);

// ─── Primary Button ───────────────────────────────────────
export const PrimaryButton: React.FC<{
  title: string;
  onPress: () => void;
  color?: string;
  icon?: string;
}> = ({ title, onPress, color = Colors.primary, icon }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.primaryBtn, { backgroundColor: color }]}
    activeOpacity={0.85}>
    {icon && <Text style={styles.btnIcon}>{icon}</Text>}
    <Text style={styles.primaryBtnText}>{title}</Text>
  </TouchableOpacity>
);

// ─── Official Link Button ─────────────────────────────────
export const OfficialLinkButton: React.FC<{ url: string; label?: string }> = ({
  url,
  label = '🌐  Open Official Website',
}) => {
  const handleOpen = () => {
    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) Linking.openURL(url);
        else Alert.alert('Error', 'Cannot open this URL');
      })
      .catch(() => Alert.alert('Error', 'Failed to open link'));
  };
  return (
    <TouchableOpacity onPress={handleOpen} style={styles.officialBtn} activeOpacity={0.85}>
      <Text style={styles.officialBtnText}>{label}</Text>
    </TouchableOpacity>
  );
};

// ─── Share Button ─────────────────────────────────────────
export const ShareButton: React.FC<{ title: string; message: string }> = ({
  title,
  message,
}) => {
  const handleShare = () => {
    Share.share({ title, message });
  };
  return (
    <TouchableOpacity onPress={handleShare} style={styles.shareBtn} activeOpacity={0.85}>
      <Text style={styles.shareBtnText}>↗  Share</Text>
    </TouchableOpacity>
  );
};

// ─── Loader ───────────────────────────────────────────────
export const Loader: React.FC = () => (
  <View style={styles.loader}>
    <ActivityIndicator size="large" color={Colors.primary} />
  </View>
);

// ─── Step Badge ───────────────────────────────────────────
export const StepBadge: React.FC<{ number: number }> = ({ number }) => (
  <View style={styles.stepBadge}>
    <Text style={styles.stepBadgeText}>{number}</Text>
  </View>
);

// ─── Divider ──────────────────────────────────────────────
export const Divider: React.FC = () => <View style={styles.divider} />;

// ─── Disclaimer Banner ────────────────────────────────────
export const DisclaimerBanner: React.FC = () => (
  <View style={styles.disclaimer}>
    <Text style={styles.disclaimerText}>
      ⚠️  This app is not affiliated with any government entity. Information is sourced from publicly available government websites.
    </Text>
  </View>
);

// ─── Styles ───────────────────────────────────────────────
const styles = StyleSheet.create({
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
  headerTitle: { flex: 1, fontSize: 17, fontWeight: '700', color: Colors.textPrimary },
  rightIcon: { marginLeft: 8 },
  rightPlaceholder: { width: 36 },

  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    ...Shadow.sm,
  },

  sectionHeader: { marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: Colors.textPrimary },
  sectionSubtitle: { fontSize: 13, color: Colors.textSecondary, marginTop: 2 },

  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginRight: 6,
    marginBottom: 6,
  },
  tagText: { fontSize: 12, fontWeight: '600' },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  infoIcon: { fontSize: 20, marginRight: 12, marginTop: 2 },
  infoContent: { flex: 1 },
  infoLabel: { fontSize: 12, color: Colors.textSecondary, fontWeight: '600', marginBottom: 2 },
  infoValue: { fontSize: 14, color: Colors.textPrimary, fontWeight: '600' },

  primaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  btnIcon: { fontSize: 18, marginRight: 8 },
  primaryBtnText: { color: Colors.white, fontSize: 16, fontWeight: '700' },

  officialBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  officialBtnText: { color: Colors.white, fontSize: 16, fontWeight: '700' },

  shareBtn: {
    backgroundColor: Colors.background,
    borderWidth: 1.5,
    borderColor: Colors.border,
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
  },
  shareBtnText: { color: Colors.textPrimary, fontSize: 15, fontWeight: '700' },

  loader: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.background },

  stepBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  stepBadgeText: { color: Colors.white, fontWeight: '800', fontSize: 14 },

  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 16,
  },

  disclaimer: {
    backgroundColor: '#FFF8E1',
    borderLeftWidth: 4,
    borderLeftColor: Colors.warning,
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  disclaimerText: { fontSize: 12, color: '#795548', lineHeight: 18 },
});
