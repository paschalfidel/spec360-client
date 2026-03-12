// src/components/FeaturedProducts.jsx
// Shows sample products on homepage. When your backend has real products,
// this fetches from /api/products. Until then, uses SAMPLE_PRODUCTS.
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { fetchProducts } from '../services/api';

// ── SAMPLE PRODUCTS ─────────────────────────────────────────────────────────
// Replace imageUrl values with your actual Cloudinary URLs after uploading
// products in the admin panel. Categories: phone | accessory | part
const SAMPLE_PRODUCTS = [
  {
    _id: 'sample-1', name: 'iPhone 14 Clear Case', category: 'accessory', price: 8500,
    description: 'Crystal-clear slim case. MIL-grade drop protection, wireless charging compatible.',
    imageUrl: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&q=80',
    stock: 24,
  },
  {
    _id: 'sample-2', name: 'Samsung A54 Screen (OEM)', category: 'part', price: 18000,
    description: 'OEM-grade AMOLED screen. Includes tools & adhesive. Same-day fitting available.',
    imageUrl: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&q=80',
    stock: 8,
  },
  {
    _id: 'sample-3', name: '20W Fast Charger + Cable', category: 'accessory', price: 4500,
    description: 'Universal USB-C fast charger. Compatible with iPhone 15, Samsung Galaxy, and more.',
    imageUrl: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500&q=80',
    stock: 50,
  },
  {
    _id: 'sample-4', name: 'OEM Battery Replacement', category: 'part', price: 15000,
    description: 'Genuine OEM battery. 90-day warranty. Walk in, walk out same day.',
    imageUrl: 'https://images.unsplash.com/photo-1605464315542-bda3e2f4e605?w=500&q=80',
    stock: 3,
  },
  {
    _id: 'sample-5', name: 'Tempered Glass Screen Guard', category: 'accessory', price: 3000,
    description: '9H hardness, anti-fingerprint coating. Available for all iPhone & Samsung models.',
    imageUrl: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&q=80',
    stock: 100,
  },
];

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  useEffect(() => {
    fetchProducts()
      .then(res => {
        // Use real products if they exist, otherwise show samples
        const real = res.data;
        setProducts(real.length > 0 ? real.slice(0, 5) : SAMPLE_PRODUCTS);
      })
      .catch(() => setProducts(SAMPLE_PRODUCTS))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="featured-products" style={{ background: '#080808', padding: '80px 0' }}>
      <div className="site-container">

        <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} style={{ marginBottom: '40px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <div style={{ width: '32px', height: '1px', background: '#E50914' }} />
              <span style={{ fontFamily: 'DM Sans, sans-serif', color: '#E50914', fontSize: '12px', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                Shop Now
              </span>
            </div>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, color: 'white', fontSize: 'clamp(28px, 4vw, 52px)', letterSpacing: '-0.03em', margin: 0 }}>
              Fix or Upgrade Today
            </h2>
            <p style={{ fontFamily: 'DM Sans, sans-serif', color: '#6e6e73', fontSize: '16px', marginTop: '10px' }}>
              Genuine parts & accessories — from <span style={{ color: '#22c55e', fontWeight: 700 }}>₦3,000</span>
            </p>
          </div>
          <Link to="/services/phones-accessories"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: '14px',
              color: '#a1a1a6', textDecoration: 'none', transition: 'color 0.2s'
            }}>
            View all <ArrowRight size={15} />
          </Link>
        </motion.div>

        {loading ? (
          <>
            <style>{`.fp-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}@media(min-width:480px){.fp-grid{grid-template-columns:repeat(3,1fr)}}@media(min-width:768px){.fp-grid{grid-template-columns:repeat(5,1fr)}}`}</style>
            <div className="fp-grid">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="skeleton" style={{ borderRadius: '20px', aspectRatio: '0.85' }} />
              ))}
            </div>
          </>
        ) : (
          <>
            <style>{`.fp-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}@media(min-width:480px){.fp-grid{grid-template-columns:repeat(3,1fr)}}@media(min-width:768px){.fp-grid{grid-template-columns:repeat(5,1fr)}}`}</style>
            <div className="fp-grid">
              {products.map((product, i) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.07, duration: 0.5 }}
                >
                  <ProductCard product={product} badge={i === 0 ? 'New' : undefined} />
                </motion.div>
              ))}
            </div>
          </>
        )}

        <style>{`
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
        `}</style>
      </div>
    </section>
  );
};

export default FeaturedProducts;
