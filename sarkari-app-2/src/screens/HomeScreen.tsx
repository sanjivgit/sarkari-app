import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackParamList, BottomTabParamList } from '../types';
import { schemes } from '../data/schemes';
import { categories } from '../data/categories';
import { useBookmarks } from '../hooks/useBookmarks';
import SchemeCard from '../components/SchemeCard';
import CategoryCard from '../components/CategoryCard';
import SectionHeader from '../components/SectionHeader';
import SearchBar from '../components/SearchBar';
import DisclaimerBanner from '../components/DisclaimerBanner';
import EmptyState from '../components/EmptyState';
import { COLORS, SPACING, FONT_SIZE, RADIUS } from '../constants/theme';

type Props = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { isBookmarked, toggleBookmark } = useBookmarks();

  const featuredSchemes = useMemo(() => schemes.filter(s => s.isFeatured), []);
  const trendingSchemes = useMemo(() => schemes.filter(s => s.isTrending), []);
  const recentSchemes = useMemo(() => [...schemes].slice(-4).reverse(), []);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return schemes.filter(s =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())),
    );
  }, [searchQuery]);

  const handleSchemePress = (schemeId: string) => {
    navigation.navigate('SchemeDetails', { schemeId });
  };

  const handleCategoryPress = (categoryId: string, categoryName: string) => {
    navigation.navigate('CategorySchemes', { categoryId, categoryName });
  };


  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}>

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Namaste! 🙏</Text>
          <Text style={styles.heading}>Find Your{'\n'}Right Scheme</Text>
        </View>
        <TouchableOpacity style={styles.notifBtn}>
          <Icon name="notifications-none" size={24} color={COLORS.text.primary} />
          <View style={styles.notifDot} />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        onClear={() => setSearchQuery('')}
      />

      {/* Search Results */}
      {searchQuery.trim().length > 0 ? (
        <View style={styles.searchResults}>
          <Text style={styles.searchResultsTitle}>
            {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{searchQuery}"
          </Text>
          {searchResults.length === 0 ? (
            <EmptyState
              icon="search-off"
              title="No schemes found"
              subtitle="Try different keywords or browse by category"
            />
          ) : (
            searchResults.map(scheme => (
              <SchemeCard
                key={scheme.id}
                scheme={scheme}
                onPress={handleSchemePress}
                isBookmarked={isBookmarked(scheme.id)}
                onToggleBookmark={toggleBookmark}
              />
            ))
          )}
        </View>
      ) : (
        <>
          {/* Disclaimer */}
          <View style={styles.section}>
            <DisclaimerBanner />
          </View>

          {/* Stats Banner */}
          <View style={styles.statsBanner}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{schemes.length}+</Text>
              <Text style={styles.statLabel}>Schemes</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{categories.length}</Text>
              <Text style={styles.statLabel}>Categories</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>Free</Text>
              <Text style={styles.statLabel}>Access</Text>
            </View>
          </View>

          {/* Categories */}
          <View style={styles.section}>
            <SectionHeader
              title="Categories"
              onSeeAll={() => { }}
            />
            <View style={styles.categoriesGrid}>
              {categories.map((cat, index) => (
                <View key={cat.id} style={styles.categoryItem}>
                  <CategoryCard
                    category={cat}
                    onPress={handleCategoryPress}
                  />
                </View>
              ))}
            </View>
          </View>

          {/* Featured Schemes */}
          <View style={styles.section}>
            <SectionHeader
              title="Featured Schemes"
              onSeeAll={() => navigation.navigate('CategorySchemes', { categoryId: '', categoryName: 'All' })}
            />
            <FlatList
              data={featuredSchemes}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <SchemeCard
                  scheme={item}
                  onPress={handleSchemePress}
                  isBookmarked={isBookmarked(item.id)}
                  onToggleBookmark={toggleBookmark}
                  compact
                />
              )}
              contentContainerStyle={styles.horizontalList}
            />
          </View>

          {/* Trending */}
          <View style={styles.section}>
            <SectionHeader title="🔥 Trending Now" />
            {trendingSchemes.slice(0, 3).map(scheme => (
              <SchemeCard
                key={scheme.id}
                scheme={scheme}
                onPress={handleSchemePress}
                isBookmarked={isBookmarked(scheme.id)}
                onToggleBookmark={toggleBookmark}
              />
            ))}
          </View>

          {/* Recent */}
          <View style={styles.section}>
            <SectionHeader title="Recently Added" />
            {recentSchemes.slice(0, 3).map(scheme => (
              <SchemeCard
                key={scheme.id}
                scheme={scheme}
                onPress={handleSchemePress}
                isBookmarked={isBookmarked(scheme.id)}
                onToggleBookmark={toggleBookmark}
              />
            ))}
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F8FAFF',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  greeting: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text.secondary,
    marginBottom: 4,
  },
  heading: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.text.primary,
    lineHeight: 32,
    letterSpacing: -0.5,
  },
  notifBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  notifDot: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EA4335',
    borderWidth: 1.5,
    borderColor: '#fff',
  },
  section: {
    paddingHorizontal: SPACING.xl,
    marginTop: SPACING.xl,
  },
  searchResults: {
    paddingHorizontal: SPACING.xl,
    marginTop: SPACING.xl,
  },
  searchResultsTitle: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text.secondary,
    marginBottom: SPACING.lg,
    fontWeight: '600',
  },
  statsBanner: {
    flexDirection: 'row',
    marginHorizontal: SPACING.xl,
    marginTop: SPACING.xl,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.xl,
    padding: SPACING.xl,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: '800',
    color: '#fff',
  },
  statLabel: {
    fontSize: FONT_SIZE.xs,
    color: 'rgba(255,255,255,0.75)',
    fontWeight: '600',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
  },
  categoryItem: {
    width: '22%',
  },
  horizontalList: {
    paddingRight: SPACING.xl,
  },
});

export default HomeScreen;
