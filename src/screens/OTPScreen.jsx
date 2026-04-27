import React, { useState, useRef, useEffect } from 'react'
import { BackButton, PrimaryButton } from '../components/UI'

export default function OTPScreen({ phone, onVerify, onBack }) {
  const [digits, setDigits] = useState(['', '', '', ''])
  const [timer, setTimer] = useState(30)
  const refs = [useRef(), useRef(), useRef(), useRef()]

  useEffect(() => {
    refs[0].current?.focus()
  }, [])

  useEffect(() => {
    if (timer === 0) return
    const t = setTimeout(() => setTimer(t => t - 1), 1000)
    return () => clearTimeout(t)
  }, [timer])

  const handleDigit = (i, val) => {
    if (!/^\d?$/.test(val)) return
    const next = [...digits]
    next[i] = val
    setDigits(next)
    if (val && i < 3) refs[i + 1].current?.focus()
  }

  const handleKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) {
      refs[i - 1].current?.focus()
    }
  }

  const filled = digits.every(d => d !== '')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', animation: 'fadeIn .3s ease' }}>
      <div style={{ padding: '20px 20px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
        <BackButton onClick={onBack} />
        <div>
          <div style={{ fontSize: 16, fontWeight: 700 }}>Verify Phone</div>
          <div style={{ fontSize: 12, color: 'var(--txt3)' }}>Code sent to +256 {phone || '7XX XXX XXX'}</div>
        </div>
      </div>

      <div style={{ padding: '32px 24px', flex: 1 }}>
        <div style={{ fontSize: 48, marginBottom: 16, textAlign: 'center' }}>📱</div>
        <h2 style={{ fontSize: 20, fontWeight: 800, textAlign: 'center', marginBottom: 8 }}>Enter OTP</h2>
        <p style={{ fontSize: 14, color: 'var(--txt2)', textAlign: 'center', marginBottom: 28 }}>
          We've sent a 4-digit code to your number
        </p>

        <div style={{ display: 'flex', gap: 8, marginBottom: 28 }}>
          {digits.map((d, i) => (
            <input
              key={i}
              ref={refs[i]}
              type="tel"
              maxLength={1}
              value={d}
              onChange={e => handleDigit(i, e.target.value)}
              onKeyDown={e => handleKeyDown(i, e)}
              style={{
                flex: 1, height: 52, border: `2px solid ${d ? 'var(--green)' : '#E0DCD6'}`,
                borderRadius: 10, textAlign: 'center', fontSize: 20, fontWeight: 700,
                outline: 'none', background: d ? 'var(--green3)' : '#fff',
                color: 'var(--txt)', fontFamily: 'inherit', transition: 'all .15s',
                minWidth: 0
              }}
            />
          ))}
        </div>

        <PrimaryButton onClick={onVerify} disabled={!filled}>
          ✓ Verify & Continue
        </PrimaryButton>

        <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--txt3)', marginTop: 20 }}>
          {timer > 0
            ? <>Didn't receive? Resend in <strong style={{ color: 'var(--green)' }}>0:{String(timer).padStart(2, '0')}</strong></>
            : <span onClick={() => setTimer(30)} style={{ color: 'var(--green)', fontWeight: 600, cursor: 'pointer' }}>Resend Code</span>
          }
        </p>

        <div style={{
          marginTop: 32, background: 'var(--green3)', borderRadius: 12,
          padding: '12px 14px', display: 'flex', gap: 10, alignItems: 'center'
        }}>
          <span>💡</span>
          <p style={{ fontSize: 12, color: 'var(--txt2)' }}>
            For demo purposes, enter any 4 digits to continue.
          </p>
        </div>
      </div>
    </div>
  )
}