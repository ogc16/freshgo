# Changelog

## v2 (2026-05-25)

### Features
- **DB-driven products**: Product provider fetches data from Supabase — products are now served dynamically instead of hardcoded
- **Revamped profile screen**: Redesigned with menu actions and contact sheet
- **Expanded product catalog**: Added new products backed by Unsplash images
- **Offline resilience**: Graceful handling of socket exceptions with fallback to guest login

### Fixes
- **Auth stability**: Handle `AuthRetryableFetchException` in `onAuthStateChange` stream to prevent crashes
- **Android build**: Use `colors.xml` reference for green splash screen to fix build on Android

### Chores
- Renamed app display name from `freshgo_app` to `freshgo`
- Miscellaneous updates and dependency bumps

## v1 (2026-05-10)

### Features
- Phone number login with OTP verification
- Social & mobile money login options (Google, MTN MoMo, Airtel Money)
- Category browsing: Groceries, Food, Gas, Water
- Product search, promotional banners, cart with quantity controls
- Checkout flow with delivery details and payment confirmation
- Live order tracking with animated delivery progress
- Order history screen
- User profile with logout
- **6-language i18n**: English, Luganda, Spanish, Chinese, French, Swahili
- Mobile app simulation frame (390×844) with status bar and home indicator
- Supabase auth & storage integration
- Editable profile and loyalty screen
- App icon and branded splash screen (green bg, yellow loading)

### Chores
- Initial project setup and Flutter scaffolding
- README, screenshot, and license (Opensource) added
