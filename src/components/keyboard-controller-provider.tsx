import { KeyboardProvider } from 'react-native-keyboard-controller';

import type { ReactNode } from 'react';

export function AppKeyboardProvider({ children }: { children: ReactNode }) {
  return <KeyboardProvider>{children}</KeyboardProvider>;
}
