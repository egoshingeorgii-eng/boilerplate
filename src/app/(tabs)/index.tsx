import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BottomTabInset, MaxContentWidth, Radius, Shadows, Spacing, Typography, type AppTheme } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const tabs = [
  {
    title: 'Bottom navigation',
    body: 'A compact tab rail with safe-area spacing, active states, and press feedback.',
  },
  {
    title: 'Screen structure',
    body: 'Two simple routes show how to organize content without adding app-specific logic.',
  },
  {
    title: 'Reusable styling',
    body: 'Shared spacing, typography, color, radius, and shadow tokens stay easy to edit.',
  },
];

export default function TabsScreen() {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>UI Starter</Text>
          <Text style={styles.title}>App shell</Text>
          <Text style={styles.subtitle}>
            A small Expo starter with tab navigation, theme tokens, and ready-to-edit interaction patterns.
          </Text>
        </View>

        <View style={styles.grid}>
          {tabs.map((item) => (
            <View key={item.title} style={styles.card}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardText}>{item.body}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function createStyles(theme: AppTheme) {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.background,
    },
    content: {
      width: '100%',
      maxWidth: MaxContentWidth,
      alignSelf: 'center',
      paddingHorizontal: Spacing.three,
      paddingTop: Spacing.four,
      paddingBottom: BottomTabInset,
      gap: Spacing.four,
    },
    header: {
      gap: Spacing.two,
    },
    eyebrow: {
      color: theme.accent,
      ...Typography.eyebrow,
    },
    title: {
      color: theme.text,
      ...Typography.title,
    },
    subtitle: {
      color: theme.textSecondary,
      ...Typography.body,
    },
    grid: {
      gap: Spacing.three,
    },
    card: {
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: Radius.md,
      backgroundColor: theme.surface,
      padding: Spacing.three,
      gap: Spacing.one,
      ...Shadows.card,
    },
    cardTitle: {
      color: theme.text,
      ...Typography.sectionTitle,
    },
    cardText: {
      color: theme.textSecondary,
      ...Typography.body,
    },
  });
}
