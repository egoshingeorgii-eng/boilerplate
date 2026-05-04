import { TabList, TabSlot, Tabs, TabTrigger, useTabTrigger } from 'expo-router/ui';
import { SymbolView } from 'expo-symbols';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Radius, Shadows, Spacing, TabBar, Typography, type AppTheme } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type TabName = 'index' | 'interactions';

function TabButton({
  icon,
  label,
  name,
}: {
  icon: string;
  label: string;
  name: TabName;
}) {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { triggerProps } = useTabTrigger({ name });
  const isFocused = triggerProps.isFocused;

  return (
    <Pressable
      accessibilityRole="tab"
      onLongPress={triggerProps.onLongPress}
      onPress={triggerProps.onPress}
      style={({ pressed }) => [
        styles.tabButton,
        isFocused ? styles.tabButtonActive : null,
        pressed ? styles.pressed : null,
      ]}>
      <SymbolView
        name={{ ios: icon as never, android: 'circle', web: 'circle' }}
        size={TabBar.iconSize}
        tintColor={isFocused ? theme.accent : theme.textSecondary}
        weight="semibold"
      />
      <Text style={[styles.tabLabel, isFocused ? styles.tabLabelActive : null]}>{label}</Text>
    </Pressable>
  );
}

export default function TabsLayout() {
  const theme = useTheme();
  const styles = createStyles(theme);
  const insets = useSafeAreaInsets();

  return (
    <Tabs>
      <TabList style={styles.hiddenTabList}>
        <TabTrigger href="/" name="index" />
        <TabTrigger href="/interactions" name="interactions" />
      </TabList>

      <View style={styles.container}>
        <TabSlot style={styles.slot} />

        <View style={[styles.rail, { paddingBottom: Math.max(insets.bottom, Spacing.two) }]}>
          <View style={styles.railInner}>
            <TabButton icon="square.grid.2x2" label="Home" name="index" />
            <TabButton icon="slider.horizontal.3" label="Controls" name="interactions" />
          </View>
        </View>
      </View>
    </Tabs>
  );
}

function createStyles(theme: AppTheme) {
  return StyleSheet.create({
    hiddenTabList: {
      display: 'none',
    },
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    slot: {
      flex: 1,
    },
    rail: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: 20,
      paddingHorizontal: Spacing.three,
    },
    railInner: {
      minHeight: TabBar.height,
      borderRadius: Radius.full,
      borderWidth: 1,
      borderColor: theme.border,
      backgroundColor: theme.surface,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: Spacing.two,
      padding: Spacing.one,
      ...Shadows.floating,
    },
    tabButton: {
      flex: 1,
      minHeight: TabBar.buttonHeight,
      borderRadius: Radius.full,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: Spacing.two,
      paddingHorizontal: Spacing.two,
    },
    tabButtonActive: {
      backgroundColor: theme.accentSoft,
    },
    pressed: {
      opacity: 0.75,
    },
    tabLabel: {
      color: theme.textSecondary,
      ...Typography.label,
    },
    tabLabelActive: {
      color: theme.text,
    },
  });
}
