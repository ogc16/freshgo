import React from 'react'

// ─── Icons ──────────────────────────────────────────────────────────────────
export const IconCart = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 01-8 0" />
  </svg>
)

export const IconSearch = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
  </svg>
)

export const IconHome = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
)

export const IconOrders = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
  </svg>
)

export const IconProfile = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
)

export const IconBack = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <path d="M15 18l-6-6 6-6" />
  </svg>
)

export const IconChevron = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M9 18l6-6-6-6" />
  </svg>
)

export const IconCheck = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

// ─── Shared UI ──────────────────────────────────────────────────────────────
export const BackButton = ({ onClick }) => (
  <button onClick={onClick} style={{
    width: 38, height: 38, borderRadius: '50%',
    border: '1.5px solid #E0DCD6', background: '#fff',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0, cursor: 'pointer'
  }}>
    <IconBack />
  </button>
)

export const PageHeader = ({ title, onBack, right }) => (
  <div style={{
    background: '#fff', padding: '14px 16px',
    display: 'flex', alignItems: 'center', gap: 12,
    borderBottom: '0.5px solid #F0ECE6', flexShrink: 0
  }}>
    <BackButton onClick={onBack} />
    <h2 style={{ fontSize: 16, fontWeight: 700, flex: 1 }}>{title}</h2>
    {right}
  </div>
)

export const PrimaryButton = ({ children, onClick, disabled, style = {} }) => (
  <button onClick={onClick} disabled={disabled} style={{
    width: '100%', background: disabled ? '#aaa' : 'var(--green)',
    color: '#fff', border: 'none', borderRadius: 12, padding: '15px 20px',
    fontSize: 15, fontWeight: 700, cursor: disabled ? 'not-allowed' : 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    transition: 'all .15s', ...style
  }}>
    {children}
  </button>
)

export const OutlineButton = ({ children, onClick }) => (
  <button onClick={onClick} style={{
    width: '100%', background: '#fff', color: 'var(--green)',
    border: '2px solid var(--green)', borderRadius: 12, padding: '14px 20px',
    fontSize: 15, fontWeight: 700, cursor: 'pointer'
  }}>
    {children}
  </button>
)

export const FormInput = ({ placeholder, type = 'text', value, onChange, style = {} }) => (
  <input
    type={type} placeholder={placeholder} value={value} onChange={onChange}
    style={{
      width: '100%', border: '1.5px solid #E0DCD6', borderRadius: 10,
      padding: '13px 14px', fontSize: 15, outline: 'none',
      fontFamily: 'inherit', color: 'var(--txt)', background: '#fff', ...style
    }}
    onFocus={e => e.target.style.borderColor = 'var(--green)'}
    onBlur={e => e.target.style.borderColor = '#E0DCD6'}
  />
)

export const SectionCard = ({ children, title, style = {} }) => (
  <div style={{
    background: '#fff', borderRadius: 'var(--rad)',
    border: '0.5px solid #E8E4DF', padding: 16,
    marginBottom: 14, ...style
  }}>
    {title && (
      <p style={{
        fontSize: 11, fontWeight: 700, color: 'var(--txt2)',
        textTransform: 'uppercase', letterSpacing: '.6px', marginBottom: 14
      }}>{title}</p>
    )}
    {children}
  </div>
)

// ─── Bottom Navigation ───────────────────────────────────────────────────────
export const BottomNav = ({ active, onNavigate }) => {
  const items = [
    { key: 'home',    label: 'Home',   Icon: IconHome },
    { key: 'orders',  label: 'Orders', Icon: IconOrders },
    { key: 'profile', label: 'Profile',Icon: IconProfile },
  ]
  return (
    <nav style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      background: '#fff', borderTop: '0.5px solid #E0DCD6',
      display: 'flex', justifyContent: 'space-around',
      padding: '8px 0 10px', zIndex: 50
    }}>
      {items.map(({ key, label, Icon }) => (
        <button key={key} onClick={() => onNavigate(key)} style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: 3, padding: '4px 20px', cursor: 'pointer', background: 'none', border: 'none',
          color: active === key ? 'var(--green)' : '#999'
        }}>
          <Icon size={22} />
          <span style={{ fontSize: 10, fontWeight: active === key ? 700 : 500 }}>{label}</span>
        </button>
      ))}
    </nav>
  )
}

// ─── Qty Controls ───────────────────────────────────────────────────────────
export const QtyControl = ({ qty, onAdd, onRemove, small = false }) => {
  const size = small ? 26 : 30
  if (qty === 0) {
    return (
      <button onClick={onAdd} style={{
        background: 'var(--green)', color: '#fff', border: 'none',
        borderRadius: 8, width: size, height: size, fontSize: 20,
        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
      }}>+</button>
    )
  }
  return (
    <div style={{
      background: 'var(--green3)', border: '1.5px solid var(--green)',
      borderRadius: 8, display: 'flex', alignItems: 'center'
    }}>
      <button onClick={onRemove} style={{
        background: 'none', border: 'none', color: 'var(--green)',
        fontSize: 18, fontWeight: 700, width: size, height: size,
        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
      }}>−</button>
      <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--green)', minWidth: 18, textAlign: 'center' }}>{qty}</span>
      <button onClick={onAdd} style={{
        background: 'none', border: 'none', color: 'var(--green)',
        fontSize: 18, fontWeight: 700, width: size, height: size,
        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
      }}>+</button>
    </div>
  )
}
