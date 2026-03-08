// src/pages/Cart.jsx
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ImageWithPlaceholder from '../components/ImageWithPlaceholder';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  if (cart.length === 0) {
    return (
      <section className="w-full bg-[#080808] flex items-center justify-center" style={{ minHeight: '100vh' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center" style={{ padding: '0 24px' }}>
          <div className="flex items-center justify-center rounded-2xl mx-auto" style={{ width: '72px', height: '72px', background: '#111', marginBottom: '24px' }}>
            <ShoppingBag size={32} className="text-[#3a3a3a]" strokeWidth={1.5} />
          </div>
          <h2 className="font-display font-bold text-white tracking-tight" style={{ fontSize: '28px', marginBottom: '10px' }}>Your cart is empty</h2>
          <p className="font-body text-[#6e6e73]" style={{ fontSize: '16px', marginBottom: '28px' }}>Add some products to get started.</p>
          <Link to="/services/phones-accessories" className="btn-primary inline-flex">
            Browse Products <ArrowRight size={16} />
          </Link>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="w-full bg-[#080808]" style={{ minHeight: '100vh', paddingTop: '96px', paddingBottom: '96px' }}>
      <div className="site-container">

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '40px' }}>
          <div className="flex items-center gap-3" style={{ marginBottom: '12px' }}>
            <div className="w-8 h-px bg-accent" />
            <span className="text-accent font-body text-[12px] tracking-[0.18em] uppercase">Cart</span>
          </div>
          <h1 className="font-display font-bold text-white tracking-tight" style={{ fontSize: '38px' }}>Shopping Cart</h1>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '36px' }}>
          <AnimatePresence>
            {cart.map(item => (
              <motion.div key={item._id} layout
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20, height: 0 }} transition={{ duration: 0.25 }}
                className="flex items-center"
                style={{ gap: '20px', background: '#111', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '20px 24px' }}
              >
                <Link to={`/product/${item._id}`} style={{ flexShrink: 0 }}>
                  <div className="rounded-xl overflow-hidden" style={{ width: '72px', height: '72px', background: '#1a1a1a' }}>
                    <ImageWithPlaceholder src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                </Link>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <Link to={`/product/${item._id}`}>
                    <h3 className="font-display font-semibold text-white hover:text-accent transition-colors truncate" style={{ fontSize: '16px' }}>
                      {item.name}
                    </h3>
                  </Link>
                  <p className="font-body text-accent font-semibold" style={{ fontSize: '15px', marginTop: '4px' }}>₦{Number(item.price).toLocaleString()}</p>
                </div>
                <div className="flex items-center" style={{ gap: '4px', background: '#1a1a1a', borderRadius: '10px', padding: '4px' }}>
                  <button onClick={() => updateQuantity(item._id, item.quantity - 1)} disabled={item.quantity <= 1}
                    className="flex items-center justify-center text-[#6e6e73] hover:text-white disabled:opacity-30 transition-colors"
                    style={{ width: '32px', height: '32px' }}>
                    <Minus size={14} strokeWidth={1.5} />
                  </button>
                  <span className="font-display font-semibold text-white text-center" style={{ fontSize: '15px', width: '24px' }}>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    className="flex items-center justify-center text-[#6e6e73] hover:text-white transition-colors"
                    style={{ width: '32px', height: '32px' }}>
                    <Plus size={14} strokeWidth={1.5} />
                  </button>
                </div>
                <div className="text-right hidden sm:block" style={{ minWidth: '100px' }}>
                  <p className="font-display font-bold text-white" style={{ fontSize: '16px' }}>₦{(item.price * item.quantity).toLocaleString()}</p>
                </div>
                <button onClick={() => removeFromCart(item._id)}
                  className="flex items-center justify-center text-[#6e6e73] hover:text-red-400 transition-colors"
                  style={{ width: '36px', height: '36px' }}>
                  <Trash2 size={16} strokeWidth={1.5} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', padding: '32px 36px' }}>
          <div className="flex justify-between items-center" style={{ marginBottom: '28px' }}>
            <span className="font-body text-[#a1a1a6]" style={{ fontSize: '17px' }}>Order Total</span>
            <span className="font-display font-bold text-white" style={{ fontSize: '28px' }}>₦{total.toLocaleString()}</span>
          </div>
          <div className="flex flex-col sm:flex-row" style={{ gap: '12px' }}>
            <button onClick={clearCart} className="btn-ghost flex-1 justify-center">Clear Cart</button>
            <button onClick={() => alert('Checkout — integrate payment gateway here')}
              className="btn-primary flex-1 justify-center group">
              Proceed to Checkout
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
