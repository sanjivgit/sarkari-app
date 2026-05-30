import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Category } from '../types';
import { RADIUS, SHADOW, FONT_SIZE, SPACING } from '../constants/theme';

interface CategoryCardProps {
  category: Category;
  onPress: (categoryId: string, categoryName: string) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: category.bgColor }]}
      onPress={() => onPress(category.id, category.name)}
      activeOpacity={0.8}>
      <View style={[styles.iconCircle, { backgroundColor: category.color }]}>
        <Icon name={category.icon} size={22} color="#fff" />
      </View>
      <Text style={[styles.name, { color: category.color }]} numberOfLines={1}>
        {category.name}
      </Text>
      <Text style={styles.count}>{category.count} schemes</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: RADIUS.xl,
    padding: SPACING.md,
    alignItems: 'center',
    gap: SPACING.xs,
    ...SHADOW.sm,
    flex: 1,
    minWidth: 80,
  },
  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: RADIUS.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '700',
    textAlign: 'center',
  },
  count: {
    fontSize: 10,
    color: '#718096',
    textAlign: 'center',
  },
});

export default CategoryCard;
