// src/components/ProductCard.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product, badge }) => {
  const { addToCart, cart } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const inCart    = cart.find(i => i._id === product._id);
  const inCartQty = inCart ? inCart.quantity : 0;
  const remaining = product.stock - inCartQty;
  const outOfStock = remaining <= 0;

  const handleAdd = (e) => {
    e.preventDefault();
    if (outOfStock || justAdded) return;
    addToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  const stockLabel = () => {
    if (product.stock === 0)  return { text: 'Out of stock', color: '#6e6e73' };
    if (outOfStock)           return { text: 'All in cart',  color: '#f59e0b' };
    if (product.stock <= 5)   return { text: `Only ${remaining} left`, color: '#f59e0b' };
    return null;
  };
  const label = stockLabel();

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      style={{
        background:    '#111',
        border:        '1px solid rgba(255,255,255,0.07)',
        borderRadius:  '16px',
        overflow:      'hidden',
        display:       'flex',
        flexDirection: 'column',
        position:      'relative',
        height:        '100%',
      }}
    >
      {/* Badge */}
      {badge && (
        <span style={{
          position:   'absolute', top: '10px', left: '10px', zIndex: 2,
          background: '#E50914', color: 'white',
          fontFamily: 'DM Sans, sans-serif', fontWeight: 700,
          fontSize: '10px', letterSpacing: '0.06em', textTransform: 'uppercase',
          padding: '3px 8px', borderRadius: '100px',
        }}>{badge}</span>
      )}

      {/* Image */}
      <Link to={`/product/${product._id}`} style={{ display: 'block', flexShrink: 0 }}>
        <div style={{ width: '100%', aspectRatio: '1 / 1', overflow: 'hidden', background: '#1a1a1a' }}>
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.35s ease' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#3a3a3a', fontSize: '11px', fontFamily: 'DM Sans, sans-serif' }}>No image</span>
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
        {/* Category pill */}
        <span style={{
          fontFamily: 'DM Sans, sans-serif', fontSize: '10px', fontWeight: 500,
          color: '#6e6e73', textTransform: 'capitalize', letterSpacing: '0.04em',
        }}>{product.category}</span>

        {/* Name */}
        <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
          <p style={{
            fontFamily:   'Syne, sans-serif', fontWeight: 700,
            color:        'white', fontSize: '13px', lineHeight: 1.35,
            display:      '-webkit-box', WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical', overflow: 'hidden',
            margin: 0, transition: 'color 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.color = '#E50914'}
            onMouseLeave={e => e.currentTarget.style.color = 'white'}
          >{product.name}</p>
        </Link>

        {/* Price + cart row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '8px' }}>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, color: '#22c55e', fontSize: '14px' }}>
            ₦{Number(product.price).toLocaleString()}
          </span>
          <button
            onClick={handleAdd}
            disabled={outOfStock}
            title={outOfStock ? 'Out of stock' : 'Add to cart'}
            style={{
              width: '32px', height: '32px', borderRadius: '10px', border: 'none',
              background: justAdded ? 'rgba(34,197,94,0.15)' : outOfStock ? 'rgba(255,255,255,0.04)' : 'rgba(229,9,20,0.12)',
              color:      justAdded ? '#22c55e' : outOfStock ? '#3a3a3a' : '#E50914',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: outOfStock ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s, color 0.2s', flexShrink: 0,
            }}
            onMouseEnter={e => { if (!outOfStock && !justAdded) e.currentTarget.style.background = 'rgba(229,9,20,0.25)'; }}
            onMouseLeave={e => { if (!outOfStock && !justAdded) e.currentTarget.style.background = 'rgba(229,9,20,0.12)'; }}
          >
            {justAdded ? <Check size={14} strokeWidth={2.5} /> : <ShoppingCart size={14} strokeWidth={1.8} />}
          </button>
        </div>

        {/* Stock warning */}
        {label && (
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '10px', color: label.color, margin: 0 }}>
            {label.text}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;