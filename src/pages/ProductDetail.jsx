// src/pages/ProductDetail.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchProductById } from '../services/api';
import { useCart } from '../context/CartContext';
import { ShoppingCart, ArrowLeft, Check, Package } from 'lucide-react';
import ImageWithPlaceholder from '../components/ImageWithPlaceholder';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProductById(id)
      .then(res => setProduct(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) return (
    <div className="w-full bg-[#080808] flex items-center justify-center" style={{ minHeight: '100vh' }}>
      <div className="border border-accent/30 border-t-accent rounded-full animate-spin" style={{ width: '36px', height: '36px' }} />
    </div>
  );

  if (!product) return (
    <div className="w-full bg-[#080808] flex items-center justify-center text-center" style={{ minHeight: '100vh' }}>
      <div>
        <p className="font-body text-[#6e6e73]" style={{ fontSize: '18px', marginBottom: '16px' }}>Product not found.</p>
        <Link to="/services/phones-accessories" className="text-accent hover:underline font-body">Back to Store</Link>
      </div>
    </div>
  );

  return (
    <section className="w-full bg-[#080808]" style={{ minHeight: '100vh', paddingTop: '96px', paddingBottom: '96px' }}>
      <div className="site-container">

        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} style={{ marginBottom: '36px' }}>
          <Link to="/services/phones-accessories"
            className="inline-flex items-center gap-2 font-body text-[#6e6e73] hover:text-white transition-colors"
            style={{ fontSize: '14px' }}>
            <ArrowLeft size={15} strokeWidth={1.5} />
            Back to Store
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 items-start" style={{ gap: '56px' }}>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="rounded-2xl overflow-hidden"
            style={{ background: '#111', border: '1px solid rgba(255,255,255,0.07)', aspectRatio: '1' }}
          >
            <ImageWithPlaceholder src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}
          >
            <span className="inline-block font-body uppercase tracking-wider capitalize"
              style={{ background: 'rgba(229,9,20,0.1)', color: '#E50914', fontSize: '12px', padding: '6px 14px', borderRadius: '100px' }}>
              {product.category}
            </span>

            <div>
              <h1 className="font-display font-bold text-white leading-tight tracking-tight" style={{ fontSize: 'clamp(30px, 4vw, 52px)', marginBottom: '16px' }}>
                {product.name}
              </h1>
              <p className="font-display font-bold text-accent" style={{ fontSize: '40px' }}>
                ₦{Number(product.price).toLocaleString()}
              </p>
            </div>

            <p className="font-body text-[#a1a1a6] leading-relaxed" style={{ fontSize: '17px' }}>
              {product.description}
            </p>

            <div className="flex items-center gap-2 font-body" style={{ fontSize: '14px' }}>
              <Package size={16} className="text-[#6e6e73]" strokeWidth={1.5} />
              {product.stock > 0
                ? <span className="text-green-400 font-medium">{product.stock} in stock</span>
                : <span className="text-red-400">Out of stock</span>
              }
            </div>

            <div style={{ paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontSize: '16px', padding: '16px 32px' }}
              >
                {added ? <><Check size={18} />Added to Cart</> : <><ShoppingCart size={18} strokeWidth={1.5} />Add to Cart</>}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
