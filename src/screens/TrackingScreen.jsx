import React, { useState, useEffect } from 'react'
import { OutlineButton } from '../components/UI'

const STEPS = [
  { icon: '✓', label: 'Order Confirmed', sub: 'Your order has been received', time: '2:14 PM' },
  { icon: '✓', label: 'Preparing Order',  sub: 'Items being packed at store',  time: '2:18 PM' },
  { icon: '🛵', label: 'Out for Delivery', sub: 'Rider is on the way to you',   time: 'Now' },
  { icon: '🏠', label: 'Delivered',        sub: 'You\'ll receive your order',     time: '~2:44 PM' },
]

export default function TrackingScreen({ orderId, onContinue }) {
  const [riderPos, setRiderPos] = useState(15)

  useEffect(() => {
    const interval = setInterval(() => {
      setRiderPos(p => p >= 68 ? 15 : p + 0.5)
    }, 80)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', animation: 'fadeIn .4s ease' }}>
      {/* Hero */}
      <div style={{
        background: 'var(--green)', padding: '24px 16px 28px', textAlign: 'center',
        position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: -30, right: -30, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, marginBottom: 4 }}>
          Order #FG-{orderId}
        </div>
        <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 800, marginBottom: 10 }}>
          🛵 On the Way!
        </h2>
        <div style={{
          background: 'rgba(255,255,255,0.15)', borderRadius: 20,
          display: 'inline-block', padding: '7px 18px',
          color: '#fff', fontSize: 13, fontWeight: 600
        }}>⏱ Arriving in ~22 mins</div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 14px 20px' }}>
        {/* Map */}
        <div style={{
          background: '#E8F5EE', height: 160, borderRadius: 'var(--rad)',
          marginBottom: 14, position: 'relative', overflow: 'hidden',
          border: '0.5px solid #C8E6C9', display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          {/* Road */}
          <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 3, background: '#B0BEC5', transform: 'translateY(-50%)' }} />
          <div style={{ position: 'absolute', top: '50%', left: '10%', right: '10%', height: 1, borderTop: '2px dashed #90A4AE', transform: 'translateY(-50%)' }} />
          {/* Destination */}
          <div style={{ position: 'absolute', right: '14%', top: '20%', fontSize: 26, animation: 'bounce 1.5s infinite' }}>📍</div>
          {/* Rider */}
          <div style={{ position: 'absolute', left: `${riderPos}%`, top: '35%', fontSize: 24, transition: 'left .08s linear' }}>🛵</div>
          <div style={{ position: 'absolute', bottom: 8, left: 0, right: 0, textAlign: 'center', fontSize: 12, color: '#546E7A', fontWeight: 600 }}>
            📡 Live Tracking
          </div>
        </div>

        {/* Rider Card */}
        <div style={{
          background: '#fff', borderRadius: 12, padding: '12px 14px',
          marginBottom: 14, display: 'flex', alignItems: 'center', gap: 12,
          border: '0.5px solid #E8E4DF'
        }}>
          <div style={{ fontSize: 34 }}>🧑</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700 }}>Mugisha Ronald</div>
            <div style={{ fontSize: 12, color: 'var(--txt3)', marginTop: 1 }}>
              Your delivery rider &nbsp;⭐ 4.9 (312 deliveries)
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {['📞', '💬'].map(icon => (
              <div key={icon} style={{
                width: 38, height: 38, background: 'var(--green3)', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', fontSize: 16
              }}>{icon}</div>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div style={{ background: '#fff', borderRadius: 'var(--rad)', border: '0.5px solid #E8E4DF', padding: '16px 16px 8px', marginBottom: 14 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '.6px', marginBottom: 14 }}>
            Order Progress
          </p>
          {STEPS.map((step, i) => {
            const done = i < 2
            const active = i === 2
            return (
              <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 32 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: done ? 13 : 16,
                    background: done ? 'var(--green)' : active ? '#fff' : '#F5F5F5',
                    border: active ? '2px solid var(--green)' : done ? 'none' : '2px solid #E0DCD6',
                    color: done ? '#fff' : 'inherit',
                    animation: active ? 'pulse 1.5s infinite' : 'none'
                  }}>{step.icon}</div>
                  {i < STEPS.length - 1 && (
                    <div style={{ width: 2, flex: 1, minHeight: 24, background: done ? 'var(--green)' : '#EEE', margin: '4px 0' }} />
                  )}
                </div>
                <div style={{ paddingBottom: 20 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: active ? 'var(--green)' : done ? 'var(--txt)' : '#AAAAAA' }}>
                    {step.label}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--txt3)', marginTop: 1 }}>{step.sub}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: active ? 'var(--amber)' : done ? 'var(--green)' : 'var(--txt3)', marginTop: 3 }}>
                    {step.time}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <OutlineButton onClick={onContinue}>Continue Shopping</OutlineButton>
      </div>
    </div>
  )
}
