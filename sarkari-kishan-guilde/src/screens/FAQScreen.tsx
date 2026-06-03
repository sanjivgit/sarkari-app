// src/screens/FAQScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  Pressable,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { getSchemeById } from '../data/schemes';
import { Colors, Shadow } from '../theme/colors';
import { DisclaimerBanner } from '../components';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'FAQ'>;
  route: RouteProp<RootStackParamList, 'FAQ'>;
};

const FAQItem: React.FC<{
  question: string;
  answer: string;
  index: number;
}> = ({ question, answer, index }) => {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen(prev => !prev);
  };

  return (
    <TouchableOpacity
      onPress={toggle}
      activeOpacity={0.85}
      style={styles.faqCard}
    >
      <View style={styles.faqHeader}>
        <View style={styles.faqNumber}>
          <Text style={styles.faqNumberText}>{index + 1}</Text>
        </View>
        <Text style={styles.faqQuestion}>{question}</Text>
        <Text
          style={[
            styles.faqToggle,
            open && { transform: [{ rotate: '180deg' }] },
          ]}
        >
          ↓
        </Text>
      </View>
      {open && (
        <View style={styles.faqAnswerBox}>
          <Text style={styles.faqAnswer}>{answer}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const FAQScreen: React.FC<Props> = ({ navigation, route }) => {
  const scheme = getSchemeById(route.params.schemeId);
  if (!scheme) return null;

  return (
    <View style={styles.container}>
      <View style={[styles.header, { backgroundColor: '#00695C' }]}>
        <Pressable
          hitSlop={50}
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Text style={styles.backArrow}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Frequently Asked Questions</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.hero, { backgroundColor: '#00695C' }]}>
          <Text style={styles.heroEmoji}>💬</Text>
          <Text style={styles.heroTitle}>Common Questions</Text>
          <Text style={styles.heroSub}>
            {scheme.faq.length} questions answered
          </Text>
        </View>

        <View style={styles.hint}>
          <Text style={styles.hintText}>
            👆 Tap any question to see the answer
          </Text>
        </View>

        <View style={styles.section}>
          {scheme.faq.map((item, i) => (
            <FAQItem
              key={i}
              question={item.question}
              answer={item.answer}
              index={i}
            />
          ))}
        </View>

        {/* Still have questions? */}
        {scheme.helplineNumber && (
          <View style={styles.helpBox}>
            <Text style={styles.helpTitle}>Still have questions?</Text>
            <Text style={styles.helpText}>Call the PM-KISAN Helpline</Text>
            <Text style={styles.helpNumber}>📞 {scheme.helplineNumber}</Text>
            <Text style={styles.helpSub}>Toll Free • Mon–Sat, 9am–6pm</Text>
          </View>
        )}

        <DisclaimerBanner />
        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  backBtn: { padding: 4, marginRight: 8 },
  backArrow: { fontSize: 22, color: Colors.white, fontWeight: '600' },
  headerTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: Colors.white,
  },

  hero: { padding: 24, alignItems: 'center', paddingBottom: 28 },
  heroEmoji: { fontSize: 48, marginBottom: 12 },
  heroTitle: { fontSize: 22, fontWeight: '800', color: Colors.white },
  heroSub: { fontSize: 13, color: 'rgba(255,255,255,0.75)', marginTop: 6 },

  hint: {
    alignSelf: 'center',
    backgroundColor: '#E0F7FA',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 16,
    marginBottom: 4,
  },
  hintText: { fontSize: 13, color: '#00695C', fontWeight: '600' },

  section: { padding: 16, paddingBottom: 0 },

  faqCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginBottom: 10,
    overflow: 'hidden',
    ...Shadow.sm,
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  faqNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E0F7FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    flexShrink: 0,
  },
  faqNumberText: { color: '#00695C', fontWeight: '800', fontSize: 13 },
  faqQuestion: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
    lineHeight: 20,
  },
  faqToggle: {
    fontSize: 16,
    color: '#00695C',
    marginLeft: 8,
    fontWeight: '700',
  },
  faqAnswerBox: {
    backgroundColor: '#F1FFFE',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  faqAnswer: { fontSize: 14, color: Colors.textSecondary, lineHeight: 22 },

  helpBox: {
    backgroundColor: Colors.greenLight,
    borderRadius: 16,
    padding: 20,
    margin: 16,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#A5D6A7',
  },
  helpTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.green,
    marginBottom: 4,
  },
  helpText: { fontSize: 13, color: Colors.textSecondary, marginBottom: 10 },
  helpNumber: { fontSize: 22, fontWeight: '900', color: Colors.green },
  helpSub: { fontSize: 12, color: Colors.textSecondary, marginTop: 4 },
});

export default FAQScreen;
