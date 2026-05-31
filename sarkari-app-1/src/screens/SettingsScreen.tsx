// src/screens/SettingsScreen.tsx
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { Colors, Shadow } from '../theme/colors';
import { SETTINGS_SECTIONS } from '../data/schemes';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Settings'>;
};

const SettingsScreen: React.FC<Props> = ({ navigation }) => (
  <View style={styles.container}>
    <View style={styles.header}>
      <Pressable
        hitSlop={50}
        onPress={() => navigation.goBack()}
        style={styles.backBtn}
      >
        <Text style={styles.backArrow}>←</Text>
      </Pressable>
      <Text style={styles.headerTitle}>Settings & About</Text>
      <View style={{ width: 36 }} />
    </View>

    <ScrollView showsVerticalScrollIndicator={false}>
      {/* App Logo */}
      <View style={styles.appLogoSection}>
        <View style={styles.appLogo}>
          <Text style={styles.appLogoEmoji}>🌾</Text>
        </View>
        <Text style={styles.appName}>YojanaGuide</Text>
        <Text style={styles.appTagline}>Government Scheme Information</Text>
      </View>

      {/* Disclaimer Banner */}
      <View style={styles.disclaimerCard}>
        <Text style={styles.disclaimerIcon}>⚠️</Text>
        <Text style={styles.disclaimerText}>
          This app is not affiliated with any government entity. Information is
          sourced from publicly available government websites for informational
          purposes only.
        </Text>
      </View>

      {SETTINGS_SECTIONS.map(section => (
        <View key={section.title} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <View style={styles.sectionCard}>
            {section.items.map((item, i) => (
              <React.Fragment key={item.label}>
                <TouchableOpacity
                  style={styles.settingRow}
                  onPress={item.action ?? undefined}
                  activeOpacity={item.action ? 0.7 : 1}
                >
                  <Text style={styles.settingIcon}>{item.icon}</Text>
                  <Text style={styles.settingLabel}>{item.label}</Text>
                  {item.value ? (
                    <Text style={styles.settingValue}>{item.value}</Text>
                  ) : (
                    item.action && <Text style={styles.settingArrow}>›</Text>
                  )}
                </TouchableOpacity>
                {i < section.items.length - 1 && (
                  <View style={styles.divider} />
                )}
              </React.Fragment>
            ))}
          </View>
        </View>
      ))}

      <Text style={styles.footerText}>
        Made with ❤️ for Indian Farmers{'\n'} Free App
      </Text>
      <View style={{ height: 32 }} />
    </ScrollView>
  </View>
);

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

  appLogoSection: { alignItems: 'center', paddingVertical: 32 },
  appLogo: {
    width: 88,
    height: 88,
    borderRadius: 24,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  appLogoEmoji: { fontSize: 44 },
  appName: { fontSize: 26, fontWeight: '900', color: Colors.textPrimary },
  appTagline: { fontSize: 13, color: Colors.textSecondary, marginTop: 4 },

  disclaimerCard: {
    backgroundColor: '#FFF8E1',
    borderRadius: 14,
    padding: 14,
    marginHorizontal: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderLeftWidth: 4,
    borderLeftColor: Colors.warning,
  },
  disclaimerIcon: { fontSize: 20, marginRight: 10, marginTop: 2 },
  disclaimerText: { flex: 1, fontSize: 12, color: '#795548', lineHeight: 18 },

  section: { paddingHorizontal: 16, marginTop: 20 },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textSecondary,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  sectionCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    ...Shadow.sm,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
  },
  settingIcon: { fontSize: 20, marginRight: 12 },
  settingLabel: {
    flex: 1,
    fontSize: 14,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  settingValue: { fontSize: 13, color: Colors.textSecondary },
  settingArrow: { fontSize: 22, color: Colors.textLight, fontWeight: '600' },
  divider: { height: 1, backgroundColor: Colors.border, marginLeft: 46 },

  footerText: {
    textAlign: 'center',
    fontSize: 12,
    color: Colors.textLight,
    lineHeight: 20,
    marginTop: 32,
    paddingHorizontal: 24,
  },
});

export default SettingsScreen;
