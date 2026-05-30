import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS, FONT_SIZE, SPACING } from '../constants/theme';

interface EmptyStateProps {
  icon?: string;
  title: string;
  subtitle?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'search-off',
  title,
  subtitle,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <Icon name={icon} size={48} color={COLORS.text.light} />
      </View>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  iconWrapper: {
    backgroundColor: COLORS.gray[100],
    borderRadius: 999,
    padding: 24,
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '700',
    color: COLORS.text.secondary,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text.tertiary,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default EmptyState;
