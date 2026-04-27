import React, { useState } from 'react'
import { useCart } from '../components/CartContext'
import { fmt } from '../data/products'
import { PageHeader, SectionCard, FormInput, PrimaryButton } from '../components/UI'

const TIME_SLOTS = ['Now (~30 min)', '12:00 – 1:00 PM', '2:00 – 3:00 PM', '5:00 – 6:00 PM', 'Tomorrow 8 AM']
const ADDR_TYPES = ['🏠 Home', '💼 Work', '📍 Other']

export default function CheckoutScreen({ onBack, onContinue }) {
  const { cartItems, cartTotal } = useCart()
  const [addrType, setAddrType] = useState(0)
  const [timeSlot, setTimeSlot] = useState(0)
  const [street, setStreet] = useState('')
  const [landmark, setLandmark] = useState('')
  const [pinned, setPinned] = useState(false)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', animation: 'fadeIn .3s ease' }}>
      <PageHeader title="Checkout" onBack={onBack} />

      <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
        {/* Delivery Address */}
        <SectionCard title="Delivery Address">
          <div
            onClick={() => setPinned(true)}
            style={{
              background: pinned ? '#E8F5EE' : '#E3F2FD',
              border: `1.5px dashed ${pinned ? 'var(--green)' : '#90CAF9'}`,
              borderRadius: 10, height: 90,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', marginBottom: 12, fontSize: 13, fontWeight: 600,
              color: pinned ? 'var(--green)' : '#1565C0', gap: 8, transition: 'all .2s'
            }}
          >
            <span style={{ fontSize: 22 }}>{pinned ? '📍' : '🗺️'}</span>
            {pinned ? 'Kampala City Centre — Pinned ✓' : 'Tap to pin your location on map'}
          </div>

          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            {ADDR_TYPES.map((t, i) => (
              <button key={t} onClick={() => setAddrType(i)} style={{
                flex: 1, padding: '8px 4px', borderRadius: 8, cursor: 'pointer',
                border: `1.5px solid ${addrType === i ? 'var(--green)' : '#E0DCD6'}`,
                background: addrType === i ? 'var(--green3)' : '#fff',
                color: addrType === i ? 'var(--green)' : 'var(--txt2)',
                fontSize: 11, fontWeight: 700, fontFamily: 'inherit', transition: 'all .15s'
              }}>{t}</button>
            ))}
          </div>

          <FormInput placeholder="Building / Street details" value={street} onChange={e => setStreet(e.target.value)} style={{ marginBottom: 8 }} />
          <FormInput placeholder="Landmark (e.g. near Owino Market)" value={landmark} onChange={e => setLandmark(e.target.value)} />
        </SectionCard>

        {/* Delivery Time */}
        <SectionCard title="Delivery Time">
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {TIME_SLOTS.map((slot, i) => (
              <button key={slot} onClick={() => setTimeSlot(i)} style={{
                padding: '8px 14px', borderRadius: 20, cursor: 'pointer',
                border: `1.5px solid ${timeSlot === i ? 'var(--green)' : '#E0DCD6'}`,
                background: timeSlot === i ? 'var(--green3)' : '#fff',
                color: timeSlot === i ? 'var(--green)' : 'var(--txt2)',
                fontSize: 12, fontWeight: 700, fontFamily: 'inherit',
                transition: 'all .15s'
              }}>{slot}</button>
            ))}
          </div>
        </SectionCard>

        {/* Order Summary */}
        <SectionCard title="Order Summary">
          <div style={{ maxHeight: 150, overflowY: 'auto' }}>
            {cartItems.map(item => (
              <div key={item.id} style={{
                display: 'flex', justifyContent: 'space-between',
                padding: '6px 0', borderBottom: '0.5px solid #F5F2EE',
                fontSize: 13
              }}>
                <span style={{ color: 'var(--txt2)' }}>
                  {item.emoji} {item.name} ×{item.qty}
                </span>
                <span style={{ fontWeight: 700 }}>{fmt(item.price * item.qty)}</span>
              </div>
            ))}
          </div>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            marginTop: 12, paddingTop: 10, borderTop: '1px solid #F0ECE6'
          }}>
            <span style={{ fontSize: 13, color: 'var(--txt2)' }}>Delivery fee</span>
            <span style={{ fontSize: 13, color: 'var(--green)', fontWeight: 700 }}>Free 🎉</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
            <span style={{ fontSize: 15, fontWeight: 700 }}>Total</span>
            <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--green)' }}>{fmt(cartTotal)}</span>
          </div>
        </SectionCard>

        <PrimaryButton onClick={onContinue}>Continue to Payment →</PrimaryButton>
      </div>
    </div>
  )
}
