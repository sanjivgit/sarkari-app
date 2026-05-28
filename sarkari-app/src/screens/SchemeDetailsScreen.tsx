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
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { schemes } from '../data/schemes';
import { useBookmarks } from '../hooks/useBookmarks';
import { COLORS, SPACING, FONT_SIZE, RADIUS, SHADOW } from '../constants/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'SchemeDetails'>;

const InfoSection: React.FC<{ title: string; icon: string; color: string; children: React.ReactNode }> = ({
  title,
  icon,
  color,
  children,
}) => (
  <View style={sectionStyles.container}>
    <View style={sectionStyles.header}>
      <View style={[sectionStyles.iconBox, { backgroundColor: color + '20' }]}>
        <Icon name={icon} size={18} color={color} />
      </View>
      <Text style={sectionStyles.title}>{title}</Text>
    </View>
    <View style={sectionStyles.content}>{children}</View>
  </View>
);

const BulletItem: React.FC<{ text: string; index: number; numbered?: boolean; color?: string }> = ({
  text,
  index,
  numbered,
  color = COLORS.primary,
}) => (
  <View style={bulletStyles.row}>
    {numbered ? (
      <View style={[bulletStyles.number, { backgroundColor: color }]}>
        <Text style={bulletStyles.numberText}>{index + 1}</Text>
      </View>
    ) : (
      <View style={[bulletStyles.dot, { backgroundColor: color }]} />
    )}
    <Text style={bulletStyles.text}>{text}</Text>
  </View>
);

const SchemeDetailsScreen: React.FC<Props> = ({ navigation, route }) => {
  const { schemeId } = route.params;
  const scheme = schemes.find(s => s.id === schemeId);
  const { isBookmarked, toggleBookmark } = useBookmarks();

  if (!scheme) {
    return (
      <View style={styles.notFound}>
        <Text>Scheme not found</Text>
      </View>
    );
  }

  const bookmarked = isBookmarked(scheme.id);

  const handleOpenWebsite = async () => {
    try {
      const supported = await Linking.canOpenURL(scheme.officialLink);
      if (supported) {
        await Linking.openURL(scheme.officialLink);
      } else {
        Alert.alert('Error', 'Cannot open this URL');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to open the website');
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this government scheme: ${scheme.title}\n\n${scheme.shortDescription}\n\nLearn more at: ${scheme.officialLink}\n\n(Shared via YojanaGuide — Not an official government app)`,
        title: scheme.title,
      });
    } catch (error) {
      console.log('Share error:', error);
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar backgroundColor={scheme.imageColor} barStyle="light-content" />

      {/* Banner Header */}
      <View style={[styles.banner, { backgroundColor: scheme.imageColor }]}>
        {/* Decorative circles */}
        <View style={styles.bannerCircle1} />
        <View style={styles.bannerCircle2} />

        {/* Nav */}
        <View style={styles.navRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.navBtn}>
            <Icon name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>
          <View style={styles.navActions}>
            <TouchableOpacity onPress={() => toggleBookmark(scheme.id)} style={styles.navBtn}>
              <Icon name={bookmarked ? 'bookmark' : 'bookmark-outline'} size={22} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleShare} style={styles.navBtn}>
              <Icon name="share" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Title area */}
        <View style={styles.bannerContent}>
          <View style={styles.categoryPill}>
            <Text style={styles.categoryPillText}>{scheme.category}</Text>
          </View>
          <Text style={styles.bannerTitle}>{scheme.title}</Text>
          <View style={styles.bannerMeta}>
            <Icon name="calendar-today" size={12} color="rgba(255,255,255,0.8)" />
            <Text style={styles.bannerMetaText}>Launched {scheme.launchedYear}</Text>
            <View style={styles.metaDot} />
            <Icon name="business" size={12} color="rgba(255,255,255,0.8)" />
            <Text style={styles.bannerMetaText} numberOfLines={1}>
              {scheme.ministry.split(' ').slice(0, 3).join(' ')}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.body}>

          {/* Description */}
          <InfoSection title="About the Scheme" icon="info-outline" color={scheme.imageColor}>
            <Text style={styles.descText}>{scheme.description}</Text>
          </InfoSection>

          {/* Eligibility */}
          <InfoSection title="Eligibility Criteria" icon="check-circle-outline" color="#2E7D32">
            {scheme.eligibility.map((item, i) => (
              <BulletItem key={i} text={item} index={i} color="#2E7D32" />
            ))}
          </InfoSection>

          {/* Benefits */}
          <InfoSection title="Benefits" icon="stars" color="#E65100">
            {scheme.benefits.map((item, i) => (
              <BulletItem key={i} text={item} index={i} color="#E65100" />
            ))}
          </InfoSection>

          {/* Documents */}
          <InfoSection title="Required Documents" icon="description" color="#1565C0">
            {scheme.documents.map((item, i) => (
              <BulletItem key={i} text={item} index={i} color="#1565C0" />
            ))}
          </InfoSection>

          {/* Apply Steps */}
          <InfoSection title="How to Apply" icon="assignment-turned-in" color="#6A1B9A">
            {scheme.applySteps.map((step, i) => (
              <BulletItem key={i} text={step} index={i} numbered color="#6A1B9A" />
            ))}
          </InfoSection>

          {/* Important Notes */}
          {scheme.importantNotes.length > 0 && (
            <View style={styles.notesBox}>
              <View style={styles.notesHeader}>
                <Icon name="warning-amber" size={16} color="#E65100" />
                <Text style={styles.notesTitle}>Important Notes</Text>
              </View>
              {scheme.importantNotes.map((note, i) => (
                <Text key={i} style={styles.noteItem}>• {note}</Text>
              ))}
            </View>
          )}

          {/* Tags */}
          <View style={styles.tagsRow}>
            {scheme.tags.map(tag => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>#{tag}</Text>
              </View>
            ))}
          </View>

          {/* Disclaimer */}
          <View style={styles.disclaimer}>
            <Icon name="info-outline" size={13} color="#718096" />
            <Text style={styles.disclaimerText}>
              YojanaGuide is not affiliated with any government entity. Always verify information from official sources.
            </Text>
          </View>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[styles.websiteBtn, { backgroundColor: scheme.imageColor }]}
          onPress={handleOpenWebsite}>
          <Icon name="open-in-new" size={18} color="#fff" />
          <Text style={styles.websiteBtnText}>Visit Official Website</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.bookmarkBtnLarge, { borderColor: scheme.imageColor }]}
          onPress={() => toggleBookmark(scheme.id)}>
          <Icon
            name={bookmarked ? 'bookmark' : 'bookmark-outline'}
            size={22}
            color={scheme.imageColor}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const sectionStyles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: RADIUS.xl,
    padding: SPACING.xl,
    marginBottom: SPACING.md,
    ...SHADOW.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  iconBox: {
    width: 34,
    height: 34,
    borderRadius: RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
    color: COLORS.text.primary,
  },
  content: {
    gap: SPACING.sm,
  },
});

const bulletStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.sm,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 7,
    flexShrink: 0,
  },
  number: {
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  numberText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#fff',
  },
  text: {
    flex: 1,
    fontSize: FONT_SIZE.sm,
    color: COLORS.text.secondary,
    lineHeight: 20,
  },
});

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F8FAFF' },
  notFound: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  banner: {
    paddingBottom: SPACING.xxl,
    paddingTop: SPACING.md,
    overflow: 'hidden',
  },
  bannerCircle1: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.08)',
    top: -60,
    right: -40,
  },
  bannerCircle2: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.06)',
    bottom: -20,
    left: 20,
  },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  navBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navActions: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  bannerContent: {
    paddingHorizontal: SPACING.xl,
    gap: SPACING.sm,
  },
  categoryPill: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: RADIUS.full,
    alignSelf: 'flex-start',
  },
  categoryPillText: {
    color: '#fff',
    fontSize: FONT_SIZE.xs,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  bannerTitle: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: '800',
    color: '#fff',
    lineHeight: 30,
    letterSpacing: -0.3,
  },
  bannerMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    flexWrap: 'wrap',
  },
  bannerMetaText: {
    fontSize: FONT_SIZE.xs,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '500',
  },
  metaDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  scroll: { flex: 1 },
  body: {
    padding: SPACING.xl,
    gap: SPACING.md,
  },
  descText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text.secondary,
    lineHeight: 22,
  },
  notesBox: {
    backgroundColor: '#FFF8E1',
    borderRadius: RADIUS.xl,
    padding: SPACING.xl,
    borderLeftWidth: 4,
    borderLeftColor: '#E65100',
    gap: SPACING.sm,
  },
  notesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  notesTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
    color: '#E65100',
  },
  noteItem: {
    fontSize: FONT_SIZE.sm,
    color: '#7B4700',
    lineHeight: 20,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  tag: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: RADIUS.full,
  },
  tagText: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.primary,
    fontWeight: '600',
  },
  disclaimer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.xs,
    padding: SPACING.md,
    backgroundColor: COLORS.gray[50],
    borderRadius: RADIUS.md,
  },
  disclaimerText: {
    flex: 1,
    fontSize: FONT_SIZE.xs,
    color: COLORS.text.tertiary,
    lineHeight: 16,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: SPACING.xl,
    paddingBottom: SPACING.xxl,
    flexDirection: 'row',
    gap: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 10,
  },
  websiteBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.sm,
    paddingVertical: 14,
    borderRadius: RADIUS.xl,
  },
  websiteBtnText: {
    color: '#fff',
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
  },
  bookmarkBtnLarge: {
    width: 52,
    height: 52,
    borderRadius: RADIUS.xl,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SchemeDetailsScreen;
