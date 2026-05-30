import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BOOKMARKS_KEY = '@govscheme_bookmarks';

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = async () => {
    try {
      const stored = await AsyncStorage.getItem(BOOKMARKS_KEY);
      if (stored) {
        setBookmarks(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading bookmarks:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleBookmark = useCallback(async (schemeId: string) => {
    try {
      const updated = bookmarks.includes(schemeId)
        ? bookmarks.filter(id => id !== schemeId)
        : [...bookmarks, schemeId];

      setBookmarks(updated);
      await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('Error saving bookmark:', error);
    }
  }, [bookmarks]);

  const isBookmarked = useCallback(
    (schemeId: string) => bookmarks.includes(schemeId),
    [bookmarks],
  );

  return { bookmarks, loading, toggleBookmark, isBookmarked };
};
