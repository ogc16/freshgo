import React, { useState } from 'react'
import { FormInput, PrimaryButton } from '../components/UI'

export default function LoginScreen({ onLogin }) {
  const [phone, setPhone] = useState('')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto', animation: 'fadeIn .4s ease' }}>
      {/* Hero */}
      <div style={{
        background: 'var(--green)', padding: '52px 24px 40px',
        textAlign: 'center', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', top: -40, right: -40, width: 160, height: 160,
          borderRadius: '50%', background: 'rgba(255,255,255,0.06)'
        }} />
        <div style={{
          position: 'absolute', bottom: -30, left: -30, width: 120, height: 120,
          borderRadius: '50%', background: 'rgba(245,161,0,0.15)'
        }} />
        <div style={{ fontSize: 62, marginBottom: 14 }}>🛒</div>
        <h1 style={{ color: '#fff', fontSize: 26, fontWeight: 800, marginBottom: 8 }}>
          Fresh<span style={{ color: 'var(--amber)' }}>Go</span>
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, lineHeight: 1.5 }}>
          Groceries · Food · Gas · Water<br />
          <strong style={{ color: 'rgba(255,255,255,0.9)' }}>Delivered to your door in Kampala</strong>
        </p>
      </div>

      {/* Form */}
      <div style={{
        background: '#fff', borderRadius: '24px 24px 0 0',
        flex: 1, padding: '28px 24px 32px', marginTop: -20
      }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--txt2)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '.5px' }}>
          Phone Number
        </p>
        <div style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
          <div style={{
            border: '1.5px solid #E0DCD6', borderRadius: 10,
            padding: '13px 12px', fontSize: 14, fontWeight: 600,
            background: '#fff', whiteSpace: 'nowrap', color: 'var(--txt)'
          }}>
            🇺🇬 +256
          </div>
          <FormInput
            placeholder="7XX XXX XXX"
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            style={{ flex: 1 }}
          />
        </div>

        <PrimaryButton onClick={() => onLogin(phone)} style={{ marginTop: 16 }}>
          Continue with SMS
        </PrimaryButton>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0', color: 'var(--txt3)', fontSize: 13 }}>
          <div style={{ flex: 1, height: 1, background: '#E8E4DE' }} />
          or continue with
          <div style={{ flex: 1, height: 1, background: '#E8E4DE' }} />
        </div>

        {[
          { icon: 'G', label: 'Continue with Google', bg: '#fff', border: '#E0DCD6' },
          { icon: '💛', label: 'Continue with MTN MoMo', bg: '#FFF7E0', border: '#FBC02D' },
          { icon: '❤️', label: 'Continue with Airtel Money', bg: '#FFF0F0', border: '#EF5350' },
        ].map(({ icon, label, bg, border }) => (
          <button key={label} onClick={() => onLogin('demo')} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            width: '100%', border: `1.5px solid ${border}`, borderRadius: 12,
            padding: 13, background: bg, cursor: 'pointer',
            fontSize: 14, fontWeight: 600, color: 'var(--txt)', marginBottom: 10,
            fontFamily: 'inherit'
          }}>
            <span style={{ fontSize: 16 }}>{icon}</span> {label}
          </button>
        ))}

        <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--txt3)', marginTop: 12 }}>
          By continuing you agree to our{' '}
          <span style={{ color: 'var(--green)', fontWeight: 600 }}>Terms of Service</span>
          {' & '}
          <span style={{ color: 'var(--green)', fontWeight: 600 }}>Privacy Policy</span>
        </p>
      </div>
    </div>
  )
}
