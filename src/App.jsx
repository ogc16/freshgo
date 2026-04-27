import React, { useState } from 'react'
import { CartProvider } from './components/CartContext'
import CartDrawer from './components/CartDrawer'
import LoginScreen from './screens/LoginScreen'
import OTPScreen from './screens/OTPScreen'
import HomeScreen from './screens/HomeScreen'
import CheckoutScreen from './screens/CheckoutScreen'
import PaymentScreen from './screens/PaymentScreen'
import TrackingScreen from './screens/TrackingScreen'
import OrdersScreen from './screens/OrdersScreen'
import ProfileScreen from './screens/ProfileScreen'
import { useCart } from './components/CartContext'

function AppInner() {
  const [screen, setScreen] = useState('login')
  const [phone, setPhone] = useState('')
  const [orderId, setOrderId] = useState('')
  const { clearCart } = useCart()

  const navigate = (s) => setScreen(s)

  const handleLogin = (p) => {
    setPhone(p)
    setScreen('otp')
  }

  const handleVerify = () => setScreen('home')

  const handlePlaceOrder = () => {
    const id = Math.floor(10000 + Math.random() * 90000).toString()
    setOrderId(id)
    clearCart()
    setScreen('tracking')
  }

  const screens = {
    login: (
      <LoginScreen onLogin={handleLogin} />
    ),
    otp: (
      <OTPScreen phone={phone} onVerify={handleVerify} onBack={() => setScreen('login')} />
    ),
    home: (
      <>
        <HomeScreen onNavigate={navigate} />
        <CartDrawer onCheckout={() => setScreen('checkout')} />
      </>
    ),
    checkout: (
      <CheckoutScreen onBack={() => setScreen('home')} onContinue={() => setScreen('payment')} />
    ),
    payment: (
      <PaymentScreen onBack={() => setScreen('checkout')} onPlaceOrder={handlePlaceOrder} />
    ),
    tracking: (
      <TrackingScreen orderId={orderId} onContinue={() => setScreen('home')} />
    ),
    orders: (
      <OrdersScreen onNavigate={navigate} onViewTracking={() => setScreen('tracking')} />
    ),
    profile: (
      <ProfileScreen onNavigate={navigate} onLogout={() => setScreen('login')} />
    ),
  }

  return (
    <div style={{
      width: 390, height: 844,
      background: 'var(--bg)',
      borderRadius: 44,
      overflow: 'hidden',
      position: 'relative',
      boxShadow: '0 30px 80px rgba(0,0,0,0.6), 0 0 0 10px #1a1a1a, 0 0 0 12px #333',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Status bar */}
      <div style={{
        background: screen === 'login' || screen === 'otp' ? 'var(--green)' : (
          ['home'].includes(screen) ? 'var(--green)' : '#fff'
        ),
        padding: '12px 24px 4px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexShrink: 0
      }}>
        <span style={{
          fontSize: 12, fontWeight: 700,
          color: ['login','otp','home'].includes(screen) ? '#fff' : '#000'
        }}>9:41</span>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {['📶', '🔋'].map(i => (
            <span key={i} style={{ fontSize: 11 }}>{i}</span>
          ))}
        </div>
      </div>

      {/* Screen content */}
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column' }}>
        {screens[screen] || screens.home}
      </div>

      {/* Home indicator */}
      <div style={{
        background: screen === 'login' ? 'var(--green)' : '#fff',
        padding: '6px 0 8px', display: 'flex', justifyContent: 'center', flexShrink: 0
      }}>
        <div style={{ width: 120, height: 4, background: '#000', borderRadius: 2, opacity: .15 }} />
      </div>
    </div>
  )
}

export default function App() {
  return (
    <CartProvider>
      <AppInner />
    </CartProvider>
  )
}
