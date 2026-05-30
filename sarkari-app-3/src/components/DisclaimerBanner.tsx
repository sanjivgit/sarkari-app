import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RADIUS, SPACING, FONT_SIZE } from '../constants/theme';

const DisclaimerBanner: React.FC = () => {
  return (
    <View style={styles.container}>
      <Icon name="info-outline" size={14} color="#E65100" style={styles.icon} />
      <Text style={styles.text}>
        This app is not affiliated with any government entity. Information is from publicly available sources.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFF8E1',
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    gap: SPACING.xs,
    borderLeftWidth: 3,
    borderLeftColor: '#E65100',
  },
  icon: {
    marginTop: 1,
  },
  text: {
    flex: 1,
    fontSize: FONT_SIZE.xs,
    color: '#7B4700',
    lineHeight: 16,
    fontWeight: '500',
  },
});

export default DisclaimerBanner;
