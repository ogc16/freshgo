import React, { useState } from 'react'
import { useCart } from '../components/CartContext'
import { fmt } from '../data/products'
import { PageHeader, SectionCard, FormInput, PrimaryButton } from '../components/UI'

const METHODS = [
  { id: 'mtn',    icon: '💛', label: 'MTN Mobile Money',   sub: 'Pay with MTN MoMo',     bg: '#FFF3D6', border: '#FBC02D' },
  { id: 'airtel', icon: '❤️', label: 'Airtel Money',        sub: 'Pay with Airtel Money',  bg: '#FFE8E8', border: '#EF5350' },
  { id: 'card',   icon: '💳', label: 'Visa / Mastercard',   sub: 'Credit or debit card',   bg: '#E3F2FD', border: '#1565C0' },
  { id: 'cod',    icon: '💵', label: 'Cash on Delivery',    sub: 'Pay when order arrives', bg: '#E8F5EE', border: '#1C5C35' },
]

export default function PaymentScreen({ onBack, onPlaceOrder }) {
  const { cartTotal } = useCart()
  const [method, setMethod] = useState('mtn')
  const [mtnNum, setMtnNum] = useState('')
  const [airtelNum, setAirtelNum] = useState('')
  const [cardNum, setCardNum] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [loading, setLoading] = useState(false)

  const handlePlace = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onPlaceOrder()
    }, 1800)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', animation: 'fadeIn .3s ease' }}>
      <PageHeader title="Payment" onBack={onBack} />

      <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
        {/* Total Banner */}
        <div style={{
          background: 'var(--amber-bg)', borderRadius: 12, padding: '14px 16px',
          marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12
        }}>
          <span style={{ fontSize: 28 }}>💰</span>
          <div>
            <div style={{ fontSize: 12, color: '#9A6800', fontWeight: 600 }}>Total to pay</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#9A6800' }}>{fmt(cartTotal)}</div>
          </div>
        </div>

        <SectionCard title="Select Payment Method">
          {METHODS.map(m => (
            <div key={m.id}>
              <div
                onClick={() => setMethod(m.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: 14, border: `1.5px solid ${method === m.id ? 'var(--green)' : '#E0DCD6'}`,
                  borderRadius: 12, marginBottom: method === m.id ? 0 : 10,
                  background: method === m.id ? 'var(--green3)' : '#fff',
                  cursor: 'pointer', transition: 'all .15s',
                  borderBottomLeftRadius: method === m.id ? 0 : 12,
                  borderBottomRightRadius: method === m.id ? 0 : 12,
                }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 10,
                  background: m.bg, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: 22, flexShrink: 0
                }}>{m.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{m.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--txt2)', marginTop: 2 }}>{m.sub}</div>
                </div>
                <div style={{
                  width: 20, height: 20, borderRadius: '50%',
                  border: `2px solid ${method === m.id ? 'var(--green)' : '#CCC'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  {method === m.id && <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--green)' }} />}
                </div>
              </div>

              {/* Expanded inputs */}
              {method === m.id && (
                <div style={{
                  background: '#FAFAF8', border: '1.5px solid var(--green)',
                  borderTop: 'none', borderRadius: '0 0 12px 12px',
                  padding: '14px 14px 14px', marginBottom: 10
                }}>
                  {m.id === 'mtn' && (
                    <div style={{ display: 'flex', gap: 8 }}>
                      <div style={{ border: '1.5px solid #E0DCD6', borderRadius: 10, padding: '12px', fontSize: 13, fontWeight: 700, background: '#fff', whiteSpace: 'nowrap' }}>🇺🇬 +256</div>
                      <FormInput placeholder="77X XXX XXX" value={mtnNum} onChange={e => setMtnNum(e.target.value)} style={{ flex: 1 }} />
                    </div>
                  )}
                  {m.id === 'airtel' && (
                    <div style={{ display: 'flex', gap: 8 }}>
                      <div style={{ border: '1.5px solid #E0DCD6', borderRadius: 10, padding: '12px', fontSize: 13, fontWeight: 700, background: '#fff', whiteSpace: 'nowrap' }}>🇺🇬 +256</div>
                      <FormInput placeholder="75X XXX XXX" value={airtelNum} onChange={e => setAirtelNum(e.target.value)} style={{ flex: 1 }} />
                    </div>
                  )}
                  {m.id === 'card' && (
                    <>
                      <FormInput placeholder="Card number" value={cardNum} onChange={e => setCardNum(e.target.value)} style={{ marginBottom: 8 }} />
                      <div style={{ display: 'flex', gap: 8 }}>
                        <FormInput placeholder="MM / YY" value={expiry} onChange={e => setExpiry(e.target.value)} style={{ flex: 1 }} />
                        <FormInput placeholder="CVV" value={cvv} onChange={e => setCvv(e.target.value)} style={{ flex: 1 }} />
                      </div>
                    </>
                  )}
                  {m.id === 'cod' && (
                    <p style={{ fontSize: 13, color: 'var(--txt2)', lineHeight: 1.5 }}>
                      💡 Please have exact change ready. Our rider will collect payment upon delivery.
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </SectionCard>

        <PrimaryButton onClick={handlePlace} disabled={loading}>
          {loading ? (
            <>
              <div style={{ width: 18, height: 18, border: '2.5px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin .7s linear infinite' }} />
              Processing...
            </>
          ) : '🔒 Place Order'}
        </PrimaryButton>
        <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--txt3)', marginTop: 10 }}>
          🔒 256-bit SSL secured payment
        </p>
      </div>
    </div>
  )
}
