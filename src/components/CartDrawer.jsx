import React from 'react'
import { useCart } from '../components/CartContext'
import { fmt } from '../data/products'
import { QtyControl, PrimaryButton } from '../components/UI'

export default function CartDrawer({ onCheckout }) {
  const { cartItems, cartTotal, cartOpen, setCartOpen, addItem, removeItem, itemCount } = useCart()

  if (!cartOpen) return null

  return (
    <div
      onClick={e => { if (e.target === e.currentTarget) setCartOpen(false) }}
      style={{
        position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)',
        zIndex: 200, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'
      }}
    >
      <div style={{
        background: '#fff', borderRadius: '20px 20px 0 0',
        maxHeight: '82%', display: 'flex', flexDirection: 'column',
        animation: 'slideUp .3s ease'
      }}>
        {/* Handle */}
        <div style={{ width: 40, height: 4, background: '#E0DCD6', borderRadius: 2, margin: '10px auto 0' }} />

        {/* Header */}
        <div style={{
          padding: '12px 16px 10px', display: 'flex',
          justifyContent: 'space-between', alignItems: 'center',
          borderBottom: '0.5px solid #F0ECE6'
        }}>
          <div style={{ fontSize: 16, fontWeight: 700 }}>
            My Cart 🛒 {itemCount > 0 && <span style={{ fontSize: 13, color: 'var(--txt3)', fontWeight: 500 }}>({itemCount} items)</span>}
          </div>
          <button onClick={() => setCartOpen(false)} style={{
            background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: 'var(--txt2)', lineHeight: 1
          }}>×</button>
        </div>

        {/* Items */}
        <div style={{ overflowY: 'auto', flex: 1, padding: '0 16px' }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--txt3)' }}>
              <div style={{ fontSize: 52, marginBottom: 12 }}>🛒</div>
              <p style={{ fontWeight: 600, marginBottom: 4 }}>Your cart is empty</p>
              <p style={{ fontSize: 13 }}>Add items from the store to get started</p>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px 0', borderBottom: '0.5px solid #F5F2EE'
              }}>
                <div style={{
                  fontSize: 28, width: 46, height: 46,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: item.bg, borderRadius: 10, flexShrink: 0
                }}>{item.emoji}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--txt2)' }}>
                    {fmt(item.price)} × {item.qty} = <strong style={{ color: 'var(--green)' }}>{fmt(item.price * item.qty)}</strong>
                  </div>
                </div>
                <QtyControl qty={item.qty} onAdd={() => addItem(item.id)} onRemove={() => removeItem(item.id)} small />
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div style={{ padding: '14px 16px 24px', borderTop: '0.5px solid #F0ECE6' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 14, color: 'var(--txt2)' }}>Subtotal</span>
              <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--green)' }}>{fmt(cartTotal)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
              <span style={{ fontSize: 12, color: 'var(--txt3)' }}>Delivery fee</span>
              <span style={{ fontSize: 13, color: 'var(--green)', fontWeight: 700 }}>Free 🎉</span>
            </div>
            <PrimaryButton onClick={() => { setCartOpen(false); onCheckout() }}>
              Proceed to Checkout →
            </PrimaryButton>
          </div>
        )}
      </div>
    </div>
  )
}
