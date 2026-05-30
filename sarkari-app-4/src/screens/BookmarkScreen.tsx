import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, BottomTabParamList } from '../types';
import { schemes } from '../data/schemes';
import { useBookmarks } from '../hooks/useBookmarks';
import SchemeCard from '../components/SchemeCard';
import EmptyState from '../components/EmptyState';
import { COLORS, SPACING, FONT_SIZE } from '../constants/theme';

type Props = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, 'Bookmarks'>,
  NativeStackScreenProps<RootStackParamList>
>;

const BookmarkScreen: React.FC<Props> = ({ navigation }) => {
  const { bookmarks, isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarkedSchemes = schemes.filter(s => bookmarks.includes(s.id));

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>Saved Schemes</Text>
        <Text style={styles.subtitle}>
          {bookmarkedSchemes.length} bookmark{bookmarkedSchemes.length !== 1 ? 's' : ''}
        </Text>
      </View>

      <FlatList
        data={bookmarkedSchemes}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState
            icon="bookmark-outline"
            title="No bookmarks yet"
            subtitle="Tap the bookmark icon on any scheme to save it here for quick access."
          />
        }
        renderItem={({ item }) => (
          <SchemeCard
            scheme={item}
            onPress={id => navigation.navigate('SchemeDetails', { schemeId: id })}
            isBookmarked={isBookmarked(item.id)}
            onToggleBookmark={toggleBookmark}
          />
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F8FAFF' },
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
  subtitle: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text.secondary,
    marginTop: 4,
  },
  list: {
    paddingHorizontal: SPACING.xl,
    paddingBottom: 80,
    flexGrow: 1,
  },
});

export default BookmarkScreen;
