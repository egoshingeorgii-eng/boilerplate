import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useMemo } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { useTheme } from '@/hooks/use-theme';

void SplashScreen.preventAutoHideAsync().catch(() => {
  // The splash controller can already be configured during dev reloads.
});

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = useTheme();

  useEffect(() => {
    void SplashScreen.hideAsync();
  }, []);

  const navigationTheme = useMemo(
    () => ({
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        background: theme.background,
        card: theme.surface,
        border: theme.border,
        primary: theme.accent,
        text: theme.text,
      },
    }),
    [theme],
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={navigationTheme}>
        <BottomSheetModalProvider>
          <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: theme.background } }} />
          <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        </BottomSheetModalProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
