import React, { createContext, useContext, useState } from 'react'
import { ALL_PRODUCTS } from '../data/products'

const CartContext = createContext(null)

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({})
  const [cartOpen, setCartOpen] = useState(false)

  const addItem = (id) => setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }))

  const removeItem = (id) => setCart(prev => {
    const next = { ...prev }
    if (next[id] > 1) next[id]--
    else delete next[id]
    return next
  })

  const clearCart = () => setCart({})

  const itemCount = Object.values(cart).reduce((a, b) => a + b, 0)

  const cartTotal = Object.entries(cart).reduce((total, [id, qty]) => {
    const p = ALL_PRODUCTS.find(x => x.id === Number(id))
    return total + (p ? p.price * qty : 0)
  }, 0)

  const cartItems = Object.entries(cart).map(([id, qty]) => ({
    ...ALL_PRODUCTS.find(x => x.id === Number(id)),
    qty
  })).filter(Boolean)

  return (
    <CartContext.Provider value={{
      cart, addItem, removeItem, clearCart,
      itemCount, cartTotal, cartItems,
      cartOpen, setCartOpen
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
