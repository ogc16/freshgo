import React from 'react'
import { BottomNav, IconChevron } from '../components/UI'

const MENU = [
  { icon: '👤', label: 'Edit Profile',      sub: 'Name, phone, email',          bg: '#E8F5EE' },
  { icon: '📍', label: 'Saved Addresses',   sub: 'Home, Work, Other',            bg: '#E3F2FD' },
  { icon: '💳', label: 'Payment Methods',   sub: 'MTN MoMo, Airtel, Card',       bg: '#FFF3D6' },
  { icon: '📦', label: 'Order History',     sub: 'View all past orders',         bg: '#F3E5F5', action: 'orders' },
  { icon: '🎁', label: 'Offers & Vouchers', sub: 'Discounts & promotions',       bg: '#FCE4EC' },
  { icon: '🔔', label: 'Notifications',     sub: 'Manage delivery alerts',       bg: '#FFF3E0' },
  { icon: '💬', label: 'Help & Support',    sub: 'FAQs, live chat, call us',     bg: '#E8F5EE' },
  { icon: '⭐', label: 'Rate the App',      sub: 'Tell us what you think',       bg: '#FFFDE7' },
]

export default function ProfileScreen({ onNavigate, onLogout }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', animation: 'fadeIn .3s ease' }}>
      {/* Hero */}
      <div style={{
        background: 'var(--green)', padding: '32px 24px 28px',
        textAlign: 'center', position: 'relative', overflow: 'hidden', flexShrink: 0
      }}>
        <div style={{ position: 'absolute', top: -30, right: -30, width: 130, height: 130, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <div style={{
          width: 76, height: 76, borderRadius: '50%',
          background: 'rgba(255,255,255,0.18)', border: '3px solid rgba(255,255,255,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 34, margin: '0 auto 12px'
        }}>👤</div>
        <div style={{ color: '#fff', fontSize: 18, fontWeight: 800, marginBottom: 3 }}>Namukasa Sarah</div>
        <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>+256 77X XXX XXX</div>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 16 }}>
          {[
            { n: '12', l: 'Orders' },
            { n: '3',  l: 'Addresses' },
            { n: '4.8',l: 'Rating' },
          ].map(({ n, l }) => (
            <div key={l} style={{ textAlign: 'center' }}>
              <div style={{ color: 'var(--amber)', fontSize: 18, fontWeight: 800 }}>{n}</div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Menu */}
      <div style={{
        background: '#fff', borderRadius: '24px 24px 0 0',
        flex: 1, overflowY: 'auto', padding: '20px 20px 80px',
        marginTop: -16
      }}>
        {MENU.map(item => (
          <div
            key={item.label}
            onClick={() => item.action && onNavigate(item.action)}
            style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '14px 0', borderBottom: '0.5px solid #F5F2EE', cursor: 'pointer'
            }}
          >
            <div style={{
              width: 40, height: 40, borderRadius: 10,
              background: item.bg, display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: 18, flexShrink: 0
            }}>{item.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{item.label}</div>
              <div style={{ fontSize: 12, color: 'var(--txt3)', marginTop: 1 }}>{item.sub}</div>
            </div>
            <span style={{ color: 'var(--txt3)' }}><IconChevron /></span>
          </div>
        ))}

        <button onClick={onLogout} style={{
          width: '100%', background: '#FEE2E2', color: '#E53935',
          border: '1.5px solid #FFCDD2', borderRadius: 12, padding: 14,
          fontSize: 14, fontWeight: 700, cursor: 'pointer', marginTop: 16, fontFamily: 'inherit'
        }}>
          🚪 Log Out
        </button>
      </div>

      <BottomNav active="profile" onNavigate={onNavigate} />
    </div>
  )
}
