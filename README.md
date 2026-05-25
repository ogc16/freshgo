# FreshGo

A mobile delivery app prototype for groceries, food, gas, and water — inspired by [Hercules](https://bites.onhercules.app/). FreshGo simulates a complete e-commerce flow from login and product discovery to checkout, payment, and live order tracking.

![Flutter](https://img.shields.io/badge/Flutter-3.41-02569B?logo=flutter)
![Dart](https://img.shields.io/badge/Dart-3.11-0175C2?logo=dart)
![License](https://img.shields.io/badge/license-MIT-green)

---

## Overview

FreshGo is a Flutter prototype that delivers a realistic on-demand delivery experience tailored to the Ugandan market — with UGX pricing, local products (Matoke, Rolex, Muchomo), and mobile money login options. The app renders inside a simulated phone frame (390×844) with a status bar and home indicator to mimic a native mobile experience.

---
<img width="273" height="623" alt="Screenshot 2026-05-10 160136" src="https://github.com/user-attachments/assets/89f363a3-3cfd-4878-9113-2254e69da20b" />

## Features

### Authentication

- **Phone number login** with OTP verification screen
- **Social & mobile money login** options (Google, MTN MoMo, Airtel Money — UI demo)

### Shopping

- **Category browsing**: Groceries, Food, Gas, Water
- **Product search** across all categories
- **Promotional banners** with rotating offers
- **Add to cart** with quantity controls

### Cart & Checkout

- **Slide-up cart drawer** with item list and totals
- **Checkout screen** with delivery details
- **Payment screen** with confirmation flow

### Orders & Tracking

- **Live order tracking** with animated delivery progress
- **Order history** screen
- **User profile** with logout

### Internationalization

- **6 languages**: English, Luganda, Spanish, Chinese, French, Swahili
- Language picker on login and profile screens
- Instant switch with animated transition

### UI / UX

- Mobile app simulation with status bar and home indicator
- Smooth animations (fade transitions, button press feedback)
- Rounded inputs and buttons for a modern feel
- Gradient-backed product cards and category icons with Material icons
- Subtle shadows and improved contrast for readability

---

## Tech Stack

| Technology                     | Purpose                    |
| ------------------------------ | -------------------------- |
| [Flutter](https://flutter.dev) | Cross-platform UI framework|
| [Dart](https://dart.dev)       | Programming language       |
| [Provider](https://pub.dev/packages/provider) | State management |

---

## Getting Started

### Prerequisites

- [Flutter SDK](https://docs.flutter.dev/get-started/install) (v3.41+)
- Dart (included with Flutter)

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd freshgo-app

# Install dependencies
flutter pub get

# Run the app (requires a connected device or emulator)
flutter run
```

### Build APK

```bash
flutter build apk --debug
```

The APK will be output to `build/app/outputs/flutter-apk/app-debug.apk`.

### Build for Release

```bash
flutter build apk --release
flutter build ios --release   # macOS only
```

---

## Project Structure

```
freshgo-app/
├── pubspec.yaml               # Dependencies & configuration
├── analysis_options.yaml      # Dart lint rules
├── android/                   # Android platform files
├── ios/                       # iOS platform files
├── lib/
│   ├── main.dart              # Entry point with navigation & phone frame
│   ├── data/
│   │   └── products.dart      # Product catalog
│   ├── i18n/
│   │   └── strings.dart       # Translation maps (6 languages)
│   ├── models/
│   │   └── product.dart       # Product model
│   ├── providers/
│   │   ├── cart_provider.dart # Cart state management
│   │   └── locale_provider.dart # Language selection state
│   ├── screens/
│   │   ├── login_screen.dart  # Phone / social login
│   │   ├── otp_screen.dart    # OTP verification
│   │   ├── home_screen.dart   # Browse & search products
│   │   ├── checkout_screen.dart # Delivery details
│   │   ├── payment_screen.dart  # Payment confirmation
│   │   ├── tracking_screen.dart # Live order tracking
│   │   ├── orders_screen.dart   # Order history
│   │   └── profile_screen.dart  # User profile
│   ├── utils/
│   │   └── formatters.dart    # Price formatting & color parsing
│   └── widgets/
│       ├── ui.dart            # Shared UI components (buttons, inputs, nav)
│       └── language_picker.dart # Language selector widget
├── test/
│   └── widget_test.dart       # Widget tests
└── web/                       # Web platform files
```

---

## Product Categories

| Category      | Items                                                                                  |
| ------------- | -------------------------------------------------------------------------------------- |
| **Groceries** | Tomatoes, Cooking Oil, Basmati Rice, Onions, Bread, Eggs, Bananas, Sugar               |
| **Food**      | Chicken Biryani, Rolex, Matoke Stew, Pork Muchomo, Samosa, Fresh Juice, Pilau, Mandazi |
| **Gas**       | 6kg & 13kg Cylinders, Gas Refills                                                      |
| **Water**     | 20L Jerry Can Refill, 10L & 5L Bottles, 500ml Pack                                     |

All prices are in **UGX (Ugandan Shilling)**.

---

## Design System

FreshGo uses a custom Dart constant-based design system defined in `lib/widgets/ui.dart`:

| Token      | Value     | Usage                    |
| ---------- | --------- | ------------------------ |
| `green`    | `#1C5C35` | Primary brand color      |
| `amber`    | `#F5A100` | Accents, CTAs, badges    |
| `bg`       | `#F7F4EF` | App background           |
| `txt`      | `#1A1A1A` | Primary text             |
| `txt2`     | `#333333` | Secondary text           |
| `txt3`     | `#777777` | Tertiary / hint text     |
| `rad`      | `14`      | Default border radius    |
| `radButton`| `16`      | Button / input radius    |

---

## Scripts

| Command                     | Description                      |
| --------------------------- | -------------------------------- |
| `flutter pub get`           | Install dependencies              |
| `flutter run`               | Run on connected device/emulator  |
| `flutter build apk --debug` | Build debug APK                   |
| `flutter build apk --release` | Build release APK               |
| `flutter analyze`           | Run static analysis               |
| `flutter test`              | Run tests                         |

---

## Notes

- This is a **frontend prototype** — there is no backend or real payment processing.
- Login and OTP flows are simulated for demonstration purposes.
- The app renders inside a **390×844 phone frame** on all devices to simulate the mobile experience.
- Language translations for Luganda, Swahili, Spanish, Chinese, and French are provided for demo purposes.

---

## License

Opensource
