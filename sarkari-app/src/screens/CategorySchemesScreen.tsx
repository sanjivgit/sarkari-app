import React, { useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { schemes } from '../data/schemes';
import { categories } from '../data/categories';
import { useBookmarks } from '../hooks/useBookmarks';
import SchemeCard from '../components/SchemeCard';
import EmptyState from '../components/EmptyState';
import { COLORS, SPACING, FONT_SIZE, RADIUS } from '../constants/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'CategorySchemes'>;

const CategorySchemesScreen: React.FC<Props> = ({ navigation, route }) => {
  const { categoryId, categoryName } = route.params;
  const { isBookmarked, toggleBookmark } = useBookmarks();

  const filteredSchemes = useMemo(() => {
    if (!categoryId) return schemes;
    return schemes.filter(s => s.categoryId === categoryId);
  }, [categoryId]);

  const category = categories.find(c => c.id === categoryId);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar backgroundColor={category?.color || COLORS.primary} barStyle="light-content" />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: category?.color || COLORS.primary }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Icon name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>{categoryName}</Text>
          <Text style={styles.headerSubtitle}>{filteredSchemes.length} schemes available</Text>
        </View>
        {category && (
          <View style={[styles.headerIcon, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
            <Icon name={category.icon} size={24} color="#fff" />
          </View>
        )}
      </View>

      <FlatList
        data={filteredSchemes}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState
            icon="folder-off"
            title="No schemes found"
            subtitle="We are working on adding more schemes in this category."
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F8FAFF' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.xl,
    gap: SPACING.md,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -0.3,
  },
  headerSubtitle: {
    fontSize: FONT_SIZE.sm,
    color: 'rgba(255,255,255,0.75)',
    fontWeight: '500',
    marginTop: 2,
  },
  headerIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    padding: SPACING.xl,
    paddingBottom: 80,
  },
});

export default CategorySchemesScreen;
