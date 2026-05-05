import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { DynamicColorIOS, Platform } from 'react-native';

import { useTheme } from '@/hooks/use-theme';

export default function TabsLayout() {
  const theme = useTheme();
  const tintColor =
    Platform.OS === 'ios'
      ? DynamicColorIOS({
          dark: '#fafafa',
          light: '#09090b',
        })
      : theme.accent;

  return (
    <NativeTabs
      disableTransparentOnScrollEdge
      iconColor={{ default: theme.textSecondary, selected: tintColor }}
      labelStyle={{
        default: { color: theme.textSecondary, fontSize: 12, fontWeight: '600' },
        selected: { color: tintColor, fontSize: 12, fontWeight: '700' },
      }}
      minimizeBehavior="automatic"
      shadowColor={theme.border}
      tintColor={tintColor}>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Icon
          md={'dashboard' as never}
          sf={{ default: 'square.grid.2x2' as never, selected: 'square.grid.2x2.fill' as never }}
        />
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="interactions">
        <NativeTabs.Trigger.Icon
          md={'tune' as never}
          sf={{ default: 'slider.horizontal.3' as never, selected: 'slider.horizontal.3' as never }}
        />
        <NativeTabs.Trigger.Label>Controls</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
