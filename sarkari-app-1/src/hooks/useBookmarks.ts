// src/hooks/useBookmarks.ts
import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BOOKMARK_KEY = '@yojanaguide_bookmarks';

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = async () => {
    try {
      const stored = await AsyncStorage.getItem(BOOKMARK_KEY);
      if (stored) setBookmarks(JSON.parse(stored));
    } catch (_) {}
    setLoading(false);
  };

  const toggleBookmark = useCallback(async (schemeId: string) => {
    setBookmarks(prev => {
      const updated = prev.includes(schemeId)
        ? prev.filter(id => id !== schemeId)
        : [...prev, schemeId];
      AsyncStorage.setItem(BOOKMARK_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const isBookmarked = useCallback(
    (schemeId: string) => bookmarks.includes(schemeId),
    [bookmarks],
  );

  return { bookmarks, loading, toggleBookmark, isBookmarked };
};
