// src/context/CartContext.jsx
import { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {

    case 'ADD_TO_CART': {
      const { product, stock } = action.payload;
      const existing = state.find(item => item._id === product._id);

      if (existing) {
        // Never exceed available stock
        const newQty = existing.quantity + 1;
        if (newQty > stock) return state;
        return state.map(item =>
          item._id === product._id
            ? { ...item, quantity: newQty }
            : item
        );
      }
      // First add — stock must be > 0
      if (stock <= 0) return state;
      return [...state, { ...product, quantity: 1, stock }];
    }

    case 'REMOVE_FROM_CART':
      return state.filter(item => item._id !== action.payload);

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      const item = state.find(i => i._id === id);
      if (!item) return state;
      // Clamp: min 1, max stock
      const clamped = Math.min(Math.max(1, quantity), item.stock ?? Infinity);
      return state.map(i =>
        i._id === id ? { ...i, quantity: clamped } : i
      );
    }

    case 'CLEAR_CART':
      return [];

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  const addToCart = (product) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { product, stock: product.stock ?? Infinity },
    });
  };

  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const updateQuantity = (id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  // How many of a given product ID are already in cart
  const cartQuantityFor = (productId) => {
    const item = cart.find(i => i._id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartQuantityFor }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
