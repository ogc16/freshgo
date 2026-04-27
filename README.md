# FreshGo

A mobile-first delivery app prototype for groceries, food, gas, and water — built for Kampala, Uganda. FreshGo simulates a complete e-commerce flow from login and product discovery to checkout, payment, and live order tracking.

![FreshGo Preview](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite)
![License](https://img.shields.io/badge/license-MIT-green)

---

## Overview

FreshGo is a frontend prototype designed to look and feel like a native mobile app. It runs in a simulated phone frame (390×844) and showcases a realistic on-demand delivery experience tailored to the Ugandan market — with UGX pricing, local products (Matoke, Rolex, Muchomo), and mobile money login options.

---

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

### UI / UX

- Mobile app simulation with status bar and home indicator
- Smooth CSS animations (fade, slide, bounce, pulse)
- Custom design system with CSS variables
- Responsive grid layouts for product cards

---

## Tech Stack

| Technology                                                               | Purpose                 |
| ------------------------------------------------------------------------ | ----------------------- |
| [React 18](https://react.dev/)                                           | UI library              |
| [Vite](https://vitejs.dev/)                                              | Build tool & dev server |
| [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) | Typography              |
| CSS Variables & Keyframes                                                | Styling & animations    |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd freshgo-app

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173` (or the next available port).

### Build for Production

```bash
npm run build
```

The production build will be output to the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

---

## Project Structure

```
freshgo-app/
├── index.html                  # Entry HTML file
├── vite.config.js              # Vite configuration
├── package.json                # Dependencies & scripts
├── public/
│   └── favicon.svg             # App favicon
└── src/
    ├── main.jsx                # React entry point
    ├── App.jsx                 # Root component with navigation
    ├── index.css               # Global styles, CSS variables, animations
    ├── data/
    │   └── products.js         # Product catalog & helpers
    ├── components/
    │   ├── CartContext.jsx     # Cart state management (React Context)
    │   ├── CartDrawer.jsx      # Slide-up shopping cart
    │   └── UI.jsx              # Shared UI components & icons
    └── screens/
        ├── LoginScreen.jsx     # Phone / social login
        ├── OTPScreen.jsx       # OTP verification
        ├── HomeScreen.jsx      # Browse & search products
        ├── CheckoutScreen.jsx  # Delivery details
        ├── PaymentScreen.jsx   # Payment confirmation
        ├── TrackingScreen.jsx  # Live order tracking
        ├── OrdersScreen.jsx    # Order history
        └── ProfileScreen.jsx   # User profile
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

FreshGo uses a custom CSS variable-based design system:

| Token     | Value     | Usage                 |
| --------- | --------- | --------------------- |
| `--green` | `#1C5C35` | Primary brand color   |
| `--amber` | `#F5A100` | Accents, CTAs, badges |
| `--bg`    | `#F7F4EF` | App background        |
| `--card`  | `#ffffff` | Card surfaces         |
| `--txt`   | `#1A1A1A` | Primary text          |
| `--rad`   | `14px`    | Border radius         |

---

## Scripts

| Command           | Description                      |
| ----------------- | -------------------------------- |
| `npm run dev`     | Start development server         |
| `npm run build`   | Build for production             |
| `npm run preview` | Preview production build locally |

---

## Notes

- This is a **frontend prototype** — there is no backend or real payment processing.
- Login and OTP flows are simulated for demonstration purposes.
- The app is optimized for a **mobile viewport** and renders inside a simulated phone frame on desktop.

---

## License

MIT
