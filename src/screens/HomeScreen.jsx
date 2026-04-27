import React, { useState } from 'react'
import { PRODUCTS, CATEGORY_META, fmt } from '../data/products'
import { useCart } from '../components/CartContext'
import { IconCart, IconSearch, QtyControl, BottomNav } from '../components/UI'

const PROMO_BANNERS = [
  { title: 'Fresh Produce & Essentials', sub: 'Delivered in 30 mins', badge: '30% OFF', color: '#1C5C35' },
  { title: 'Gas Cylinder Refills', sub: 'Book now, delivered today', badge: 'Book Now', color: '#D84315' },
  { title: 'Pure Water Refills', sub: '20L from UGX 2,000', badge: 'Order Now', color: '#1565C0' },
]

export default function HomeScreen({ onNavigate }) {
  const [category, setCategory] = useState('groceries')
  const [search, setSearch] = useState('')
  const [bannerIdx, setBannerIdx] = useState(0)
  const { cart, addItem, removeItem, itemCount, setCartOpen } = useCart()

  const banner = PROMO_BANNERS[bannerIdx]

  const products = search
    ? Object.values(PRODUCTS).flat().filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      )
    : PRODUCTS[category]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Top bar */}
      <div style={{ background: 'var(--green)', padding: '14px 16px 12px', flexShrink: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div>
            <div style={{ color: '#fff', fontSize: 20, fontWeight: 800 }}>
              Fresh<span style={{ color: 'var(--amber)' }}>Go</span>
            </div>
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 1 }}>📍 Kampala, Uganda</div>
          </div>
          <button
            onClick={() => setCartOpen(true)}
            style={{
              position: 'relative', background: 'rgba(255,255,255,0.15)',
              border: 'none', borderRadius: '50%', width: 40, height: 40,
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
            }}
          >
            <IconCart size={20} color="#fff" />
            {itemCount > 0 && (
              <div style={{
                position: 'absolute', top: -3, right: -3,
                background: 'var(--amber)', color: '#fff',
                borderRadius: '50%', width: 18, height: 18, fontSize: 10, fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '2px solid var(--green)'
              }}>{itemCount}</div>
            )}
          </button>
        </div>
        <div style={{
          display: 'flex', background: '#fff', borderRadius: 10,
          padding: '8px 12px', alignItems: 'center', gap: 8
        }}>
          <span style={{ color: '#999', display: 'flex' }}><IconSearch size={16} /></span>
          <input
            type="text"
            placeholder="Search groceries, food, gas, water..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              border: 'none', outline: 'none', fontSize: 14,
              color: 'var(--txt)', flex: 1, background: 'transparent', fontFamily: 'inherit'
            }}
          />
          {search && (
            <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', color: '#999', cursor: 'pointer', fontSize: 16 }}>✕</button>
          )}
        </div>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 72 }}>
        {/* Promo Banner */}
        {!search && (
          <>
            <div style={{
              margin: '14px 14px 0', background: banner.color, borderRadius: 'var(--rad)',
              padding: '20px 16px', display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', position: 'relative', overflow: 'hidden', cursor: 'pointer'
            }}
              onClick={() => setBannerIdx((bannerIdx + 1) % PROMO_BANNERS.length)}
            >
              <div style={{
                position: 'absolute', right: -20, top: -20, width: 130, height: 130,
                borderRadius: '50%', background: 'rgba(255,255,255,0.06)'
              }} />
              <div>
                <p style={{ color: 'var(--amber)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 5 }}>
                  ⚡ Limited Offer
                </p>
                <h2 style={{ color: '#fff', fontSize: 17, fontWeight: 800, lineHeight: 1.25, marginBottom: 5 }}>
                  {banner.title}
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>{banner.sub}</p>
              </div>
              <div style={{
                background: 'var(--amber)', color: '#fff', fontSize: 12, fontWeight: 700,
                padding: '8px 14px', borderRadius: 20, whiteSpace: 'nowrap', flexShrink: 0
              }}>{banner.badge}</div>
            </div>

            {/* Dots */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 10 }}>
              {PROMO_BANNERS.map((_, i) => (
                <div key={i} onClick={() => setBannerIdx(i)} style={{
                  width: i === bannerIdx ? 18 : 6, height: 6,
                  borderRadius: 3, background: i === bannerIdx ? 'var(--green)' : '#D0C8BE',
                  transition: 'all .25s', cursor: 'pointer'
                }} />
              ))}
            </div>
          </>
        )}

        {/* Categories */}
        {!search && (
          <>
            <div style={{
              padding: '14px 14px 8px', fontSize: 15, fontWeight: 700,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
              Categories
              <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--green)', cursor: 'pointer' }}>See all</span>
            </div>
            <div style={{
              display: 'flex', gap: 10, padding: '0 14px 4px',
              overflowX: 'auto', scrollbarWidth: 'none'
            }}>
              {Object.entries(CATEGORY_META).map(([key, meta]) => (
                <div key={key} onClick={() => setCategory(key)} style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  gap: 6, cursor: 'pointer', flexShrink: 0
                }}>
                  <div style={{
                    width: 64, height: 64, borderRadius: '50%',
                    background: meta.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 28, border: `2.5px solid ${category === key ? 'var(--green)' : 'transparent'}`,
                    boxShadow: category === key ? '0 0 0 3px var(--green3)' : 'none',
                    transition: 'all .2s'
                  }}>
                    {meta.emoji}
                  </div>
                  <span style={{
                    fontSize: 11, fontWeight: 600,
                    color: category === key ? 'var(--green)' : 'var(--txt2)'
                  }}>{meta.label}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Product Grid */}
        <div style={{
          padding: '14px 14px 8px', fontSize: 15, fontWeight: 700,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          {search ? `Results for "${search}"` : CATEGORY_META[category]?.label + ' Items'}
          <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--green)', cursor: 'pointer' }}>See all</span>
        </div>

        {products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--txt3)' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
            <p style={{ fontWeight: 600 }}>No items found</p>
            <p style={{ fontSize: 13, marginTop: 6 }}>Try a different search term</p>
          </div>
        ) : (
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0,1fr))',
            gap: 12, padding: '0 14px 14px'
          }}>
            {products.map(p => (
              <ProductCard
                key={p.id} product={p}
                qty={cart[p.id] || 0}
                onAdd={() => addItem(p.id)}
                onRemove={() => removeItem(p.id)}
              />
            ))}
          </div>
        )}
      </div>

      <BottomNav active="home" onNavigate={onNavigate} />
    </div>
  )
}

function ProductCard({ product: p, qty, onAdd, onRemove }) {
  return (
    <div style={{
      background: '#fff', borderRadius: 'var(--rad)', overflow: 'hidden',
      border: '0.5px solid #E8E4DF', animation: 'fadeIn .25s ease'
    }}>
      <div style={{
        height: 100, background: p.bg,
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 44
      }}>
        {p.emoji}
      </div>
      <div style={{ padding: '10px 10px 12px' }}>
        <div style={{
          fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 20,
          display: 'inline-block', marginBottom: 4,
          background: p.tagColor, color: p.tagTxt
        }}>{p.tag}</div>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 2, lineHeight: 1.3 }}>{p.name}</div>
        <div style={{ fontSize: 11, color: 'var(--txt3)', marginBottom: 8 }}>{p.unit}</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--green)' }}>{fmt(p.price)}</div>
          <QtyControl qty={qty} onAdd={onAdd} onRemove={onRemove} />
        </div>
      </div>
    </div>
  )
}
