import { TrueSheet } from '@lodev09/react-native-true-sheet';
import { useMemo, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppleGlassButton } from '@/components/apple-glass-button';
import { BottomTabInset, MaxContentWidth, Radius, Shadows, Spacing, Typography, type AppTheme } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type Mode = 'Preview' | 'Build' | 'Ship';

const modes: Mode[] = ['Preview', 'Build', 'Ship'];

export default function InteractionsScreen() {
  const theme = useTheme();
  const styles = createStyles(theme);
  const sheetRef = useRef<TrueSheet>(null);
  const [mode, setMode] = useState<Mode>('Preview');
  const [enabled, setEnabled] = useState(true);
  const [count, setCount] = useState(2);

  const status = useMemo(() => {
    if (!enabled) {
      return 'Paused';
    }

    return `${mode} mode · ${count} step${count === 1 ? '' : 's'}`;
  }, [count, enabled, mode]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>Controls</Text>
          <Text style={styles.title}>Interaction states</Text>
          <Text style={styles.subtitle}>Basic controls for quick prototyping: selection, toggles, counters, and sheets.</Text>
        </View>

        <View style={styles.panel}>
          <Text style={styles.panelTitle}>Segmented control</Text>
          <View style={styles.segmented}>
            {modes.map((item) => {
              const isActive = item === mode;

              return (
                <Pressable
                  key={item}
                  accessibilityRole="button"
                  onPress={() => {
                    setMode(item);
                  }}
                  style={({ pressed }) => [
                    styles.segment,
                    isActive ? styles.segmentActive : null,
                    pressed ? styles.pressed : null,
                  ]}>
                  <Text style={[styles.segmentText, isActive ? styles.segmentTextActive : null]}>{item}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.panel}>
          <View style={styles.row}>
            <View style={styles.rowText}>
              <Text style={styles.panelTitle}>Enabled</Text>
              <Text style={styles.helperText}>Keep lightweight local state close to the UI.</Text>
            </View>
            <Switch value={enabled} onValueChange={setEnabled} />
          </View>
        </View>

        <View style={styles.panel}>
          <Text style={styles.panelTitle}>Counter</Text>
          <View style={styles.counterRow}>
            <Pressable
              accessibilityRole="button"
              disabled={count === 0}
              onPress={() => {
                setCount((value) => Math.max(0, value - 1));
              }}
              style={({ pressed }) => [
                styles.iconButton,
                count === 0 ? styles.disabled : null,
                pressed ? styles.pressed : null,
              ]}>
              <Text style={styles.iconButtonText}>-</Text>
            </Pressable>
            <Text style={styles.countText}>{count}</Text>
            <Pressable
              accessibilityRole="button"
              onPress={() => {
                setCount((value) => value + 1);
              }}
              style={({ pressed }) => [styles.iconButton, pressed ? styles.pressed : null]}>
              <Text style={styles.iconButtonText}>+</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.panel}>
          <Text style={styles.panelTitle}>Action sheet</Text>
          <Text style={styles.helperText}>A native sheet pattern for menus, pickers, and focused actions.</Text>
          <AppleGlassButton
            accessibilityLabel="Open sheet"
            icon="square.and.arrow.up"
            label="Open sheet"
            onPress={() => {
              void sheetRef.current?.present(0);
            }}
            variant="accent"
          />
        </View>

        <View style={styles.panel}>
          <Text style={styles.panelTitle}>Apple glass buttons</Text>
          <View style={styles.buttonDemoStack}>
            <AppleGlassButton icon="sparkles" label="Neutral" />
            <AppleGlassButton icon="checkmark.circle" label="Accent" variant="accent" />
          </View>
          <View style={styles.iconDemoRow}>
            <AppleGlassButton accessibilityLabel="Neutral icon button" icon="xmark" size="compact" />
            <AppleGlassButton
              accessibilityLabel="Accent icon button"
              icon="checkmark"
              size="compact"
              variant="accent"
            />
          </View>
        </View>

        <View style={styles.resultCard}>
          <Text style={styles.resultLabel}>State</Text>
          <Text style={styles.resultText}>{status}</Text>
        </View>

        <TrueSheet
          ref={sheetRef}
          backgroundColor={theme.surface}
          cornerRadius={28}
          detents={['auto', 0.5]}
          grabber
          name="ui-starter-actions">
          <View style={styles.sheetContent}>
            <View style={styles.sheetHeader}>
              <AppleGlassButton
                accessibilityLabel="Close"
                icon="xmark"
                onPress={() => {
                  void sheetRef.current?.dismiss();
                }}
                size="compact"
              />
              <Text numberOfLines={1} style={styles.sheetHeaderTitle}>
                Sheet example
              </Text>
              <AppleGlassButton
                accessibilityLabel="Set to Build"
                icon="checkmark"
                onPress={() => {
                  setMode('Build');
                  void sheetRef.current?.dismiss();
                }}
                size="compact"
                variant="accent"
              />
            </View>
            <Text style={styles.helperText}>
              Use this as a starting point for compact flows that should stay close to the current screen.
            </Text>
          </View>
        </TrueSheet>
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
      gap: Spacing.three,
    },
    header: {
      gap: Spacing.two,
      marginBottom: Spacing.one,
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
    panel: {
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: Radius.md,
      backgroundColor: theme.surface,
      padding: Spacing.three,
      gap: Spacing.two,
      ...Shadows.card,
    },
    panelTitle: {
      color: theme.text,
      ...Typography.sectionTitle,
    },
    segmented: {
      borderRadius: Radius.full,
      backgroundColor: theme.surfaceMuted,
      flexDirection: 'row',
      padding: Spacing.one,
      gap: Spacing.one,
    },
    segment: {
      flex: 1,
      minHeight: 44,
      borderRadius: Radius.full,
      alignItems: 'center',
      justifyContent: 'center',
    },
    segmentActive: {
      backgroundColor: theme.surface,
      ...Shadows.card,
    },
    segmentText: {
      color: theme.textSecondary,
      ...Typography.label,
    },
    segmentTextActive: {
      color: theme.text,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: Spacing.three,
    },
    rowText: {
      flex: 1,
      gap: Spacing.one,
    },
    buttonDemoStack: {
      gap: Spacing.two,
    },
    iconDemoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.two,
    },
    helperText: {
      color: theme.textSecondary,
      ...Typography.body,
    },
    counterRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.three,
    },
    iconButton: {
      width: 48,
      height: 48,
      borderRadius: Radius.full,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.accent,
    },
    iconButtonText: {
      color: theme.onAccent,
      ...Typography.button,
    },
    countText: {
      minWidth: 48,
      textAlign: 'center',
      color: theme.text,
      ...Typography.title,
    },
    resultCard: {
      borderRadius: Radius.md,
      backgroundColor: theme.accent,
      padding: Spacing.three,
      gap: Spacing.one,
    },
    resultLabel: {
      color: theme.onAccentMuted,
      ...Typography.eyebrow,
    },
    resultText: {
      color: theme.onAccent,
      ...Typography.sectionTitle,
    },
    primaryAction: {
      minHeight: 52,
      borderRadius: Radius.full,
      backgroundColor: theme.accent,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: Spacing.three,
    },
    primaryActionText: {
      color: theme.onAccent,
      ...Typography.label,
    },
    sheetContent: {
      paddingHorizontal: Spacing.three,
      paddingTop: Spacing.three,
      paddingBottom: Spacing.five,
      gap: Spacing.three,
      backgroundColor: theme.surface,
    },
    sheetHeader: {
      minHeight: 44,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: Spacing.two,
    },
    sheetHeaderTitle: {
      flex: 1,
      textAlign: 'center',
      color: theme.text,
      ...Typography.sectionTitle,
    },
    sheetButton: {
      minHeight: 52,
      borderRadius: Radius.full,
      backgroundColor: theme.accent,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: Spacing.three,
    },
    sheetButtonText: {
      color: theme.onAccent,
      ...Typography.label,
    },
    sheetButtonSecondary: {
      minHeight: 52,
      borderRadius: Radius.full,
      borderWidth: 1,
      borderColor: theme.border,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: Spacing.three,
      backgroundColor: theme.surface,
    },
    sheetButtonSecondaryText: {
      color: theme.text,
      ...Typography.label,
    },
    pressed: {
      opacity: 0.72,
    },
    disabled: {
      opacity: 0.35,
    },
  });
}
