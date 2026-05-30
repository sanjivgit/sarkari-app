import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Scheme } from '../types';
import { COLORS, RADIUS, SHADOW, FONT_SIZE, SPACING } from '../constants/theme';

interface SchemeCardProps {
  scheme: Scheme;
  onPress: (schemeId: string) => void;
  isBookmarked?: boolean;
  onToggleBookmark?: (schemeId: string) => void;
  compact?: boolean;
}

const SchemeCard: React.FC<SchemeCardProps> = ({
  scheme,
  onPress,
  isBookmarked = false,
  onToggleBookmark,
  compact = false,
}) => {
  return (
    <TouchableOpacity
      style={[styles.card, compact && styles.compactCard]}
      onPress={() => onPress(scheme.id)}
      activeOpacity={0.85}>
      {/* Color Banner */}
      <View style={[styles.banner, { backgroundColor: scheme.imageColor }]}>
        <View style={styles.bannerOverlay}>
          <Icon name="account-balance" size={32} color="rgba(255,255,255,0.3)" />
        </View>
        <View style={styles.bannerContent}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{scheme.category}</Text>
          </View>
          {onToggleBookmark && (
            <TouchableOpacity
              onPress={() => onToggleBookmark(scheme.id)}
              style={styles.bookmarkBtn}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Icon
                name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
                size={22}
                color="#fff"
              />
            </TouchableOpacity>
          )}
        </View>
        {scheme.isTrending && (
          <View style={styles.trendingBadge}>
            <Icon name="trending-up" size={10} color="#fff" />
            <Text style={styles.trendingText}>Trending</Text>
          </View>
        )}
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {scheme.title}
        </Text>
        {!compact && (
          <Text style={styles.description} numberOfLines={2}>
            {scheme.shortDescription}
          </Text>
        )}
        <View style={styles.footer}>
          <View style={styles.ministry}>
            <Icon name="business" size={11} color={COLORS.text.tertiary} />
            <Text style={styles.ministryText} numberOfLines={1}>
              {scheme.launchedYear}
            </Text>
          </View>
          <View style={styles.arrowBtn}>
            <Icon name="arrow-forward" size={14} color={scheme.imageColor} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.xl,
    overflow: 'hidden',
    ...SHADOW.md,
    marginBottom: SPACING.lg,
  },
  compactCard: {
    width: 220,
    marginBottom: 0,
    marginRight: SPACING.md,
  },
  banner: {
    height: 110,
    padding: SPACING.md,
    justifyContent: 'space-between',
  },
  bannerOverlay: {
    position: 'absolute',
    bottom: -8,
    right: -8,
    opacity: 0.5,
  },
  bannerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  categoryBadge: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
  },
  categoryText: {
    color: '#fff',
    fontSize: FONT_SIZE.xs,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  bookmarkBtn: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: RADIUS.full,
    padding: 6,
  },
  trendingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
    alignSelf: 'flex-start',
    gap: 3,
  },
  trendingText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  content: {
    padding: SPACING.md,
    gap: SPACING.xs,
  },
  title: {
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
    color: COLORS.text.primary,
    lineHeight: 20,
  },
  description: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.text.secondary,
    lineHeight: 18,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.xs,
  },
  ministry: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    flex: 1,
  },
  ministryText: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.text.tertiary,
  },
  arrowBtn: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: RADIUS.full,
    padding: 6,
  },
});

export default SchemeCard;
