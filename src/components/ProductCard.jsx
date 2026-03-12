// src/components/ProductCard.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart, Check, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product, badge }) => {
  const { addToCart, cartQuantityFor } = useCart();
  const [added, setAdded] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const stock      = product.stock ?? 0;
  const inCart     = cartQuantityFor(product._id);   // live quantity already in cart
  const remaining  = stock - inCart;                 // how many more can actually be added
  const inStock    = stock > 0;
  const canAdd     = remaining > 0;                  // false when cart has ALL available stock
  const lowStock   = inStock && stock <= 5;

  const handleAdd = (e) => {
    e.preventDefault();
    if (!canAdd) return;
    addToCart(product);
    setAdded(true);
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'add_to_cart', {
        currency: 'NGN',
        value: product.price,
        items: [{ item_id: product._id, item_name: product.name, price: product.price }],
      });
    }
    setTimeout(() => setAdded(false), 1800);
  };

  // ── Stock label shown under price ──────────────────────────────────────────
  const stockLabel = (() => {
    if (!inStock)      return { text: 'Out of Stock',          color: '#6e6e73' };
    if (!canAdd)       return { text: `All ${stock} in cart`,  color: '#f59e0b' };
    if (lowStock)      return { text: `Only ${remaining} left`,color: '#f59e0b' };
    return               { text: 'In Stock',                   color: '#22c55e' };
  })();

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        background: '#111',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '20px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {/* ── Badges ── */}
      <div style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 2, display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {!inStock && (
          <span style={{
            fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 600,
            background: 'rgba(0,0,0,0.8)', color: '#6e6e73',
            padding: '4px 10px', borderRadius: '100px', backdropFilter: 'blur(8px)',
          }}>Out of Stock</span>
        )}
        {lowStock && inStock && (
          <motion.span
            animate={{ opacity: [1, 0.6, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{
              fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 700,
              background: 'rgba(229,9,20,0.9)', color: 'white',
              padding: '4px 10px', borderRadius: '100px',
              display: 'flex', alignItems: 'center', gap: '4px',
            }}
          >
            <Zap size={10} fill="white" /> Limited Stock
          </motion.span>
        )}
        {badge && (
          <span style={{
            fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 700,
            background: '#E50914', color: 'white',
            padding: '4px 10px', borderRadius: '100px',
          }}>{badge}</span>
        )}
      </div>

      {/* ── Image with zoom on hover ── */}
      <Link to={`/product/${product._id}`} style={{ display: 'block', overflow: 'hidden', aspectRatio: '1' }}>
        <motion.div
          whileHover={{ scale: 1.07 }}
          transition={{ duration: 0.4 }}
          style={{ width: '100%', height: '100%', background: '#1a1a1a', position: 'relative' }}
        >
          {!imgLoaded && (
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(90deg, #1a1a1a 25%, #222 50%, #1a1a1a 75%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 1.4s infinite',
            }} />
          )}
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={`${product.name} — buy in Nigeria`}
              loading="lazy"
              decoding="async"
              onLoad={() => setImgLoaded(true)}
              style={{
                width: '100%', height: '100%', objectFit: 'cover',
                opacity: imgLoaded ? 1 : 0, transition: 'opacity 0.3s',
              }}
            />
          ) : (
            <div style={{
              width: '100%', height: '100%', display: 'flex', alignItems: 'center',
              justifyContent: 'center', color: '#3a3a3a', fontSize: '13px',
              fontFamily: 'DM Sans, sans-serif',
            }}>
              No Image
            </div>
          )}
        </motion.div>
      </Link>

      {/* ── Info ── */}
      <div style={{ padding: '16px 18px 18px', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
        <Link to={`/product/${product._id}`}>
          <h3 style={{
            fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '15px',
            color: 'white', lineHeight: 1.3, margin: 0,
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}>
            {product.name}
          </h3>
        </Link>

        <p style={{
          fontFamily: 'DM Sans, sans-serif', color: '#6e6e73', fontSize: '13px',
          lineHeight: 1.5, margin: 0,
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {product.description}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '10px' }}>
          {/* Price */}
          <span style={{
            fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '20px',
            color: '#22c55e', letterSpacing: '-0.02em',
          }}>
            ₦{Number(product.price).toLocaleString()}
          </span>

          {/* Add to cart — disabled when out of stock OR all stock is already in cart */}
          <motion.button
            onClick={handleAdd}
            disabled={!canAdd}
            whileTap={canAdd ? { scale: 0.9 } : {}}
            title={!inStock ? 'Out of stock' : !canAdd ? `All ${stock} already in your cart` : 'Add to cart'}
            style={{
              width: '40px', height: '40px', borderRadius: '12px', border: 'none',
              background: added ? '#22c55e' : canAdd ? '#E50914' : 'rgba(255,255,255,0.06)',
              color: canAdd ? 'white' : '#3a3a3a',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: canAdd ? 'pointer' : 'not-allowed',
              transition: 'background 0.3s', flexShrink: 0,
            }}
            aria-label="Add to cart"
          >
            <AnimatePresence mode="wait">
              {added
                ? <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    <Check size={17} strokeWidth={2.5} />
                  </motion.span>
                : <motion.span key="cart" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    <ShoppingCart size={17} strokeWidth={1.5} />
                  </motion.span>
              }
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Stock indicator — shows remaining after cart deduction */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: stockLabel.color }} />
          <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: stockLabel.color }}>
            {stockLabel.text}
          </span>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
      `}</style>
    </motion.div>
  );
};

export default ProductCard;
