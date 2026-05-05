import { GlassView, isGlassEffectAPIAvailable } from 'expo-glass-effect';
import * as Haptics from 'expo-haptics';
import { SymbolView } from 'expo-symbols';
import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View, type GestureResponderEvent } from 'react-native';

import { Radius, Spacing, Typography, type AppTheme } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type AppleGlassButtonProps = {
  accessibilityLabel?: string;
  disabled?: boolean;
  icon?: string;
  label?: string;
  onLongPress?: ((event: GestureResponderEvent) => void) | null;
  onPress?: ((event: GestureResponderEvent) => void) | null;
  selected?: boolean;
  size?: 'compact' | 'regular';
  variant?: 'accent' | 'neutral';
};

export function AppleGlassButton({
  accessibilityLabel,
  disabled = false,
  icon,
  label,
  onLongPress,
  onPress,
  selected = false,
  size = 'regular',
  variant = 'neutral',
}: AppleGlassButtonProps) {
  const theme = useTheme();
  const styles = createStyles(theme);
  const canUseGlass = Platform.OS === 'ios' && isGlassEffectAPIAvailable();
  const tintColor = selected || variant === 'accent' ? theme.accentSoft : theme.surface;
  const contentColor = selected || variant === 'accent' ? theme.text : theme.textSecondary;
  const handlePress = (event: GestureResponderEvent) => {
    if (onPress && Platform.OS !== 'web') {
      void Haptics.selectionAsync();
    }

    onPress?.(event);
  };

  const content = (
    <>
      {icon ? (
        <SymbolView
          name={{ ios: icon as never, android: 'circle', web: 'circle' }}
          size={size === 'compact' ? 18 : 18}
          tintColor={contentColor}
          weight="semibold"
        />
      ) : null}
      {label ? <Text style={[styles.label, { color: contentColor }]}>{label}</Text> : null}
    </>
  );

  return (
    <Pressable
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityRole="button"
      accessibilityState={{ disabled, selected }}
      disabled={disabled}
      onLongPress={onLongPress}
      onPress={handlePress}
      style={({ pressed }) => [
        size === 'compact' ? styles.pressableCompact : styles.pressable,
        disabled ? styles.disabled : null,
        pressed ? styles.pressed : null,
      ]}>
      {canUseGlass ? (
        <GlassView
          colorScheme="light"
          glassEffectStyle="regular"
          pointerEvents="none"
          style={size === 'compact' ? styles.glassCompact : styles.glass}
          tintColor={tintColor}>
          {content}
        </GlassView>
      ) : (
        <View
          style={[
            size === 'compact' ? styles.fallbackCompact : styles.fallback,
            selected || variant === 'accent' ? styles.fallbackActive : null,
          ]}>
          {content}
        </View>
      )}
    </Pressable>
  );
}

function createStyles(theme: AppTheme) {
  return StyleSheet.create({
    pressable: {
      minHeight: 54,
      borderRadius: Radius.full,
    },
    pressableCompact: {
      minWidth: 48,
      minHeight: 48,
      borderRadius: Radius.full,
    },
    glass: {
      minHeight: 54,
      borderRadius: Radius.full,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: Spacing.two,
      paddingHorizontal: Spacing.two,
    },
    glassCompact: {
      minWidth: 48,
      minHeight: 48,
      borderRadius: Radius.full,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: Spacing.two,
      paddingHorizontal: Spacing.two,
    },
    fallback: {
      minHeight: 54,
      borderRadius: Radius.full,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: Spacing.two,
      paddingHorizontal: Spacing.two,
      backgroundColor: theme.surface,
    },
    fallbackCompact: {
      minWidth: 48,
      minHeight: 48,
      borderRadius: Radius.full,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: Spacing.two,
      paddingHorizontal: Spacing.two,
      backgroundColor: theme.surface,
    },
    fallbackActive: {
      backgroundColor: theme.accentSoft,
    },
    label: {
      ...Typography.label,
    },
    pressed: {
      transform: [{ scale: 0.98 }],
    },
    disabled: {
      opacity: 0.35,
    },
  });
}
