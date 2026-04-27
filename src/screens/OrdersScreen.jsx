import React from 'react'
import { PageHeader, BottomNav } from '../components/UI'

const ORDERS = [
  { id: 'FG-38219', date: 'Today, 2:14 PM',     status: 'transit',   items: ['🍅', '🍚', '💧'], count: 3, total: 34000 },
  { id: 'FG-37104', date: 'Yesterday, 11:30 AM', status: 'delivered', items: ['🍛', '🥦', '🔴'], count: 5, total: 118000 },
  { id: 'FG-36881', date: 'Apr 22, 9:00 AM',     status: 'delivered', items: ['💧', '🧅', '🍞'], count: 4, total: 28000 },
  { id: 'FG-36102', date: 'Apr 19, 7:30 PM',     status: 'delivered', items: ['🥚', '🫙', '🍌'], count: 6, total: 46000 },
]

const STATUS = {
  transit:   { label: 'In Transit',  bg: '#FFF3D6', color: '#9A6800' },
  delivered: { label: 'Delivered',   bg: '#E8F5EE', color: '#1C5C35' },
}

export default function OrdersScreen({ onNavigate, onViewTracking }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', animation: 'fadeIn .3s ease' }}>
      <PageHeader title="My Orders" onBack={() => onNavigate('home')} />

      <div style={{ flex: 1, overflowY: 'auto', padding: 16, paddingBottom: 72 }}>
        {ORDERS.map(order => {
          const s = STATUS[order.status]
          return (
            <div
              key={order.id}
              onClick={() => order.status === 'transit' && onViewTracking()}
              style={{
                background: '#fff', borderRadius: 'var(--rad)',
                border: '0.5px solid #E8E4DF', padding: 14, marginBottom: 12,
                cursor: order.status === 'transit' ? 'pointer' : 'default'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>Order #{order.id}</div>
                  <div style={{ fontSize: 11, color: 'var(--txt3)', marginTop: 2 }}>{order.date}</div>
                </div>
                <div style={{
                  fontSize: 11, fontWeight: 700, padding: '4px 10px',
                  borderRadius: 20, background: s.bg, color: s.color
                }}>{s.label}</div>
              </div>

              <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                {order.items.map((emoji, i) => (
                  <div key={i} style={{
                    fontSize: 20, width: 38, height: 38, background: 'var(--bg)',
                    borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>{emoji}</div>
                ))}
                {order.count > 3 && (
                  <div style={{
                    width: 38, height: 38, background: 'var(--green3)',
                    borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 700, color: 'var(--green)'
                  }}>+{order.count - 3}</div>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 13, color: 'var(--txt2)' }}>
                  {order.count} items
                </span>
                <span style={{ fontSize: 14, fontWeight: 800, color: 'var(--green)' }}>
                  UGX {order.total.toLocaleString()}
                </span>
              </div>

              {order.status === 'transit' && (
                <div style={{
                  marginTop: 10, paddingTop: 10, borderTop: '0.5px solid #F0ECE6',
                  display: 'flex', alignItems: 'center', gap: 6
                }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--amber)', animation: 'pulse 1.2s infinite' }} />
                  <span style={{ fontSize: 12, color: 'var(--amber)', fontWeight: 700 }}>
                    Live tracking available — tap to view
                  </span>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <BottomNav active="orders" onNavigate={onNavigate} />
    </div>
  )
}
