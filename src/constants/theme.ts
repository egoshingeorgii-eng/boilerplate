import '@/global.css';

import { Platform } from 'react-native';

function alpha(hex: string, opacity: number) {
  const value = hex.replace('#', '');
  const red = parseInt(value.slice(0, 2), 16);
  const green = parseInt(value.slice(2, 4), 16);
  const blue = parseInt(value.slice(4, 6), 16);

  return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
}

const neutral = {
  50: '#fafafa',
  100: '#f4f4f5',
  200: '#e4e4e7',
  500: '#71717a',
  700: '#3f3f46',
  950: '#09090b',
} as const;

export const Colors = {
  light: {
    text: neutral[950],
    textSecondary: neutral[500],
    background: neutral[50],
    surface: '#ffffff',
    surfaceMuted: neutral[100],
    border: neutral[200],
    accent: neutral[950],
    accentSoft: alpha(neutral[950], 0.08),
    onAccent: '#ffffff',
    onAccentMuted: alpha('#ffffff', 0.72),
  },
  dark: {
    text: neutral[50],
    textSecondary: neutral[200],
    background: neutral[950],
    surface: '#18181b',
    surfaceMuted: neutral[700],
    border: alpha('#ffffff', 0.16),
    accent: neutral[50],
    accentSoft: alpha('#ffffff', 0.14),
    onAccent: neutral[950],
    onAccentMuted: alpha(neutral[950], 0.66),
  },
} as const;

export type AppTheme = (typeof Colors)[keyof typeof Colors];

const fontFamily = Platform.select({
  ios: 'System',
  android: 'sans-serif',
  default: 'sans-serif',
  web: 'system-ui',
});

export const Typography = {
  title: {
    fontFamily,
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '700',
  },
  sectionTitle: {
    fontFamily,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '700',
  },
  body: {
    fontFamily,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '500',
  },
  label: {
    fontFamily,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '700',
  },
  eyebrow: {
    fontFamily,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  button: {
    fontFamily,
    fontSize: 22,
    lineHeight: 26,
    fontWeight: '800',
  },
} as const;

export const Radius = {
  md: 18,
  full: 999,
} as const;

function shadow(opacity: number, y: number, blur: number, elevation: number) {
  return {
    shadowColor: '#000000',
    shadowOpacity: opacity,
    shadowRadius: blur,
    shadowOffset: { width: 0, height: y },
    elevation,
    boxShadow: `0 ${y}px ${blur}px ${alpha('#000000', opacity)}`,
  } as const;
}

export const Shadows = {
  card: shadow(0.05, 4, 14, 2),
  floating: shadow(0.12, 8, 24, 6),
} as const;

export const Spacing = {
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
} as const;

export const TabBar = {
  height: 64,
  buttonHeight: 54,
  iconSize: 18,
} as const;

export const BottomTabInset = Platform.select({
  default: 32,
  web: 112,
});
export const MaxContentWidth = 720;
