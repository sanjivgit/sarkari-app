// src/screens/BookmarksScreen.tsx
import React from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  StatusBar, TouchableOpacity,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { schemes } from '../data/schemes';
import { Colors, Shadow } from '../theme/colors';
import { useBookmarks } from '../hooks/useBookmarks';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Bookmarks'>;
};

const BookmarksScreen: React.FC<Props> = ({ navigation }) => {
  const { bookmarks, isBookmarked, toggleBookmark } = useBookmarks();
  const savedSchemes = schemes.filter(s => isBookmarked(s.id));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bookmarks</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {savedSchemes.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🔖</Text>
            <Text style={styles.emptyTitle}>No Bookmarks Yet</Text>
            <Text style={styles.emptyText}>
              Save schemes you are interested in by tapping the bookmark icon on any scheme.
            </Text>
            <TouchableOpacity
              style={styles.goHomeBtn}
              onPress={() => navigation.goBack()}>
              <Text style={styles.goHomeBtnText}>← Go Back</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Text style={styles.countLabel}>{savedSchemes.length} scheme saved</Text>
            {savedSchemes.map(scheme => (
              <View key={scheme.id} style={styles.schemeCard}>
                <TouchableOpacity
                  style={styles.schemeMain}
                  onPress={() => navigation.navigate('SchemeDetail', { schemeId: scheme.id })}
                  activeOpacity={0.85}>
                  <View style={styles.schemeIconBox}>
                    <Text style={styles.schemeIcon}>🌾</Text>
                  </View>
                  <View style={styles.schemeContent}>
                    <Text style={styles.schemeTitle}>{scheme.title}</Text>
                    <Text style={styles.schemeTagline} numberOfLines={1}>{scheme.tagline}</Text>
                    <View style={styles.schemeTag}>
                      <Text style={styles.schemeTagText}>{scheme.category}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => toggleBookmark(scheme.id)}
                  style={styles.removeBtn}>
                  <Text style={styles.removeBtnText}>🗑</Text>
                </TouchableOpacity>
              </View>
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C62828',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  backBtn: { padding: 4, marginRight: 8 },
  backArrow: { fontSize: 22, color: Colors.white, fontWeight: '600' },
  headerTitle: { flex: 1, fontSize: 17, fontWeight: '700', color: Colors.white },

  content: { padding: 16, flexGrow: 1 },
  countLabel: { fontSize: 13, color: Colors.textSecondary, marginBottom: 14, fontWeight: '600' },

  schemeCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    overflow: 'hidden',
    ...Shadow.sm,
  },
  schemeMain: { flex: 1, flexDirection: 'row', alignItems: 'center', padding: 14 },
  schemeIconBox: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: Colors.greenLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  schemeIcon: { fontSize: 28 },
  schemeContent: { flex: 1 },
  schemeTitle: { fontSize: 15, fontWeight: '800', color: Colors.textPrimary },
  schemeTagline: { fontSize: 12, color: Colors.textSecondary, marginTop: 3, marginBottom: 6 },
  schemeTag: {
    backgroundColor: Colors.primaryLight,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  schemeTagText: { fontSize: 11, color: Colors.primary, fontWeight: '700' },

  removeBtn: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#FFEBEE',
  },
  removeBtnText: { fontSize: 20 },

  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 80 },
  emptyEmoji: { fontSize: 64, marginBottom: 20 },
  emptyTitle: { fontSize: 20, fontWeight: '800', color: Colors.textPrimary, marginBottom: 10 },
  emptyText: { fontSize: 14, color: Colors.textSecondary, textAlign: 'center', lineHeight: 22, paddingHorizontal: 20 },
  goHomeBtn: {
    marginTop: 24,
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  goHomeBtnText: { color: Colors.primary, fontWeight: '700', fontSize: 15 },
});

export default BookmarksScreen;
