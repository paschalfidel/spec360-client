// src/pages/ProductDetail.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchProductById } from '../services/api';
import { useCart } from '../context/CartContext';
import { ShoppingCart, ArrowLeft, Check, Package, Plus, Minus } from 'lucide-react';
import ImageWithPlaceholder from '../components/ImageWithPlaceholder';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct]   = useState(null);
  const [loading, setLoading]   = useState(true);
  const [qty, setQty]           = useState(1);
  const [added, setAdded]       = useState(false);
  const { addToCart, cartQuantityFor } = useCart();

  useEffect(() => {
    fetchProductById(id)
      .then(res => setProduct(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  // Re-derive every render — reflects live cart state
  const stock      = product?.stock ?? 0;
  const inCart     = product ? cartQuantityFor(product._id) : 0;
  const remaining  = stock - inCart;           // how many more can be added
  const canAdd     = remaining > 0;
  const qtyInRange = Math.min(qty, remaining); // clamp displayed qty to what's actually addable

  // When stock situation changes (cart updated elsewhere), clamp local qty
  useEffect(() => {
    if (remaining > 0 && qty > remaining) setQty(remaining);
  }, [remaining]);

  const handleAddToCart = () => {
    if (!canAdd || !product) return;
    // Add `qty` times — CartContext handles each increment safely
    for (let i = 0; i < qtyInRange; i++) addToCart(product);
    setAdded(true);
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'add_to_cart', {
        currency: 'NGN', value: product.price * qtyInRange,
        items: [{ item_id: product._id, item_name: product.name, price: product.price, quantity: qtyInRange }],
      });
    }
    setTimeout(() => setAdded(false), 2000);
  };

  // ── Loading ──
  if (loading) return (
    <div className="w-full bg-[#080808] flex items-center justify-center" style={{ minHeight: '100vh' }}>
      <div style={{ width: '36px', height: '36px', borderRadius: '50%', border: '2px solid rgba(229,9,20,0.2)', borderTopColor: '#E50914', animation: 'spin 0.7s linear infinite' }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  // ── Not found ──
  if (!product) return (
    <div className="w-full bg-[#080808] flex items-center justify-center text-center" style={{ minHeight: '100vh' }}>
      <div>
        <p className="font-body text-[#6e6e73]" style={{ fontSize: '18px', marginBottom: '16px' }}>Product not found.</p>
        <Link to="/services/phones-accessories" className="text-accent hover:underline font-body">Back to Store</Link>
      </div>
    </div>
  );

  const isOutOfStock = stock === 0;
  const isAtLimit    = !isOutOfStock && inCart >= stock;

  return (
    <section className="w-full bg-[#080808]" style={{ minHeight: '100vh', paddingTop: '96px', paddingBottom: '96px' }}>
      <div className="site-container">

        {/* Back */}
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} style={{ marginBottom: '36px' }}>
          <Link
            to="/services/phones-accessories"
            className="inline-flex items-center gap-2 font-body text-[#6e6e73] hover:text-white transition-colors"
            style={{ fontSize: '14px' }}
          >
            <ArrowLeft size={15} strokeWidth={1.5} /> Back to Store
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 items-start" style={{ gap: '56px' }}>

          {/* ── Image ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}
            className="rounded-2xl overflow-hidden"
            style={{ background: '#111', border: '1px solid rgba(255,255,255,0.07)', aspectRatio: '1' }}
          >
            <ImageWithPlaceholder src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
          </motion.div>

          {/* ── Info ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
          >
            {/* Category pill */}
            <span className="inline-block font-body uppercase tracking-wider capitalize"
              style={{ background: 'rgba(229,9,20,0.1)', color: '#E50914', fontSize: '12px', padding: '6px 14px', borderRadius: '100px', alignSelf: 'flex-start' }}>
              {product.category}
            </span>

            {/* Name + Price */}
            <div>
              <h1 className="font-display font-bold text-white leading-tight tracking-tight"
                style={{ fontSize: 'clamp(28px, 4vw, 52px)', marginBottom: '14px' }}>
                {product.name}
              </h1>
              <p className="font-display font-bold" style={{ fontSize: '38px', color: '#22c55e' }}>
                ₦{Number(product.price).toLocaleString()}
              </p>
            </div>

            {/* Description */}
            <p className="font-body text-[#a1a1a6] leading-relaxed" style={{ fontSize: '16px' }}>
              {product.description}
            </p>

            {/* Stock status */}
            <div className="flex items-center gap-2 font-body" style={{ fontSize: '14px' }}>
              <Package size={16} className="text-[#6e6e73]" strokeWidth={1.5} />
              {isOutOfStock  && <span style={{ color: '#f87171' }}>Out of stock</span>}
              {isAtLimit     && !isOutOfStock && <span style={{ color: '#f59e0b' }}>You have all {stock} in your cart</span>}
              {!isOutOfStock && !isAtLimit    && (
                <span style={{ color: stock <= 5 ? '#f59e0b' : '#4ade80' }}>
                  {stock <= 5 ? `Only ${stock} left — ` : ''}{remaining} available
                  {inCart > 0 ? ` (${inCart} in cart)` : ''}
                </span>
              )}
            </div>

            {/* Quantity selector + Add to cart */}
            <div style={{ paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex', flexDirection: 'column', gap: '14px' }}>

              {/* Qty stepper — only shown when stock > 0 and not at limit */}
              {!isOutOfStock && !isAtLimit && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
                  <span className="font-body text-[#6e6e73]" style={{ fontSize: '13px', marginRight: '14px' }}>Qty:</span>
                  <div style={{ display: 'flex', alignItems: 'center', background: '#1a1a1a', borderRadius: '12px', padding: '4px' }}>
                    <button
                      onClick={() => setQty(q => Math.max(1, q - 1))}
                      disabled={qty <= 1}
                      style={{
                        width: '32px', height: '32px', borderRadius: '8px', border: 'none',
                        background: 'transparent', color: qty <= 1 ? '#3a3a3a' : '#a1a1a6',
                        cursor: qty <= 1 ? 'not-allowed' : 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                    >
                      <Minus size={14} strokeWidth={1.5} />
                    </button>
                    <span className="font-display font-bold text-white" style={{ fontSize: '15px', width: '32px', textAlign: 'center' }}>
                      {qtyInRange}
                    </span>
                    <button
                      onClick={() => setQty(q => Math.min(remaining, q + 1))}
                      disabled={qty >= remaining}
                      style={{
                        width: '32px', height: '32px', borderRadius: '8px', border: 'none',
                        background: 'transparent', color: qty >= remaining ? '#3a3a3a' : '#a1a1a6',
                        cursor: qty >= remaining ? 'not-allowed' : 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                    >
                      <Plus size={14} strokeWidth={1.5} />
                    </button>
                  </div>
                  <span className="font-body text-[#6e6e73]" style={{ fontSize: '12px', marginLeft: '12px' }}>
                    max {remaining}
                  </span>
                </div>
              )}

              {/* Add to cart button */}
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock || isAtLimit}
                className="btn-primary w-full justify-center"
                style={{
                  fontSize: '16px', padding: '16px 32px',
                  opacity: (isOutOfStock || isAtLimit) ? 0.45 : 1,
                  cursor: (isOutOfStock || isAtLimit) ? 'not-allowed' : 'pointer',
                }}
              >
                {isOutOfStock
                  ? <><ShoppingCart size={18} strokeWidth={1.5} /> Out of Stock</>
                  : isAtLimit
                    ? <><Check size={18} /> Max Qty in Cart</>
                    : added
                      ? <><Check size={18} /> Added!</>
                      : <><ShoppingCart size={18} strokeWidth={1.5} /> Add {qtyInRange > 1 ? `${qtyInRange}x ` : ''}to Cart</>
                }
              </button>

              {/* WhatsApp order shortcut */}
              <a
                href={`https://wa.me/2348182799154?text=${encodeURIComponent(`Hi Spec360! I'd like to order: ${product.name} (₦${Number(product.price).toLocaleString()}). Is it available?`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost w-full justify-center"
                style={{ fontSize: '15px', textDecoration: 'none', color: '#25D366', borderColor: 'rgba(37,211,102,0.25)' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Order via WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
