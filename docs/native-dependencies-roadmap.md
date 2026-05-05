# Native Dependencies Roadmap

This project keeps Expo Continuous Native Generation as the default: do not commit generated `ios/` or `android/` projects, and prefer app config plus config plugins for native changes.

## Installed now

- `expo-dev-client`: custom development runtime and clearer native mismatch errors.
- `react-native-keyboard-controller`: native keyboard behavior for future forms.
- `expo-glass-effect`, `expo-symbols`, `expo-haptics`: Apple-native controls, SF Symbols, and tactile feedback.

## Stage 1 candidates

- `@expo/ui`: add only when a screen needs real SwiftUI or Jetpack Compose controls. Keep usage behind local wrapper components because the SDK 55 API is still beta.

## Stage 2 candidates

Add these only when the feature exists, so the starter does not request permissions too early:

- `expo-secure-store` for secrets and session tokens.
- `expo-local-authentication` for Face ID, Touch ID, or biometric gates.
- `expo-localization` for locale-aware copy, dates, and numbers.
- `expo-notifications` for local or push notifications.
- `expo-image-picker` and `expo-document-picker` for user-selected media or files.
- `expo-apple-authentication` when third-party auth is present.
- `@expo/app-integrity` only with backend attestation needs; it is alpha.

## UX guardrails

- Tabs are only for top-level navigation. Put actions in toolbars, menus, sheets, or screen content.
- Liquid Glass belongs to controls and navigation, not ordinary content cards.
- Keep SF Symbols visually consistent and use short labels.
- Let text scale with Dynamic Type; avoid truncating important copy at large accessibility sizes.
