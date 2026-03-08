// src/pages/PhonesAccessories.jsx
// paddingTop: 96px = 64px navbar + 32px breathing
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchProductsByCategory } from '../services/api';
import ProductCard from '../components/ProductCard';
import { SlidersHorizontal } from 'lucide-react';

const filters = [
  { key: 'all', label: 'All Products' },
  { key: 'phone', label: 'Phones' },
  { key: 'accessory', label: 'Accessories' },
];

const PhonesAccessories = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const load = async () => {
      setLoading(true); setError(null);
      try {
        let data;
        if (filter === 'all') {
          const [phones, accessories] = await Promise.all([
            fetchProductsByCategory('phone'),
            fetchProductsByCategory('accessory'),
          ]);
          data = [...phones.data, ...accessories.data];
        } else {
          const res = await fetchProductsByCategory(filter);
          data = res.data;
        }
        setProducts(data);
      } catch {
        setError('Failed to load products. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [filter]);

  return (
    <section className="w-full bg-[#080808]" style={{ minHeight: '100vh', paddingTop: '96px', paddingBottom: '96px' }}>
      <div className="site-container">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ paddingBottom: '36px', borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: '32px' }}
        >
          <div className="flex items-center gap-3" style={{ marginBottom: '16px' }}>
            <div className="w-8 h-px bg-accent" />
            <span className="text-accent font-body text-[12px] font-medium tracking-[0.18em] uppercase">Store</span>
          </div>
          <h1 className="font-display font-bold text-white tracking-tight" style={{ fontSize: 'clamp(36px, 5vw, 68px)', marginBottom: '12px' }}>
            Phones & <span className="text-accent">Accessories</span>
          </h1>
          <p className="font-body text-[#6e6e73]" style={{ fontSize: '16px' }}>
            Genuine devices and accessories — brand new and carefully selected.
          </p>
        </motion.div>

        {/* Filter bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center"
          style={{ gap: '12px', paddingBottom: '32px', borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: '40px' }}
        >
          <SlidersHorizontal size={16} className="text-[#6e6e73]" strokeWidth={1.5} />
          <div style={{ display: 'flex', gap: '8px' }}>
            {filters.map(f => (
              <button key={f.key} onClick={() => setFilter(f.key)}
                className="font-body transition-all duration-200"
                style={{
                  fontSize: '13px', padding: '8px 18px', borderRadius: '100px',
                  background: filter === f.key ? '#E50914' : 'transparent',
                  color: filter === f.key ? 'white' : '#6e6e73',
                  fontWeight: filter === f.key ? 600 : 400,
                  border: filter === f.key ? 'none' : '1px solid rgba(255,255,255,0.08)',
                }}>
                {f.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid */}
        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4" style={{ gap: '20px' }}>
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-[#111] rounded-2xl animate-pulse" style={{ aspectRatio: '1' }} />
            ))}
          </div>
        )}
        {error && <div className="text-center" style={{ padding: '80px 0' }}><p className="font-body text-[#6e6e73]">{error}</p></div>}
        {!loading && !error && products.length === 0 && (
          <div className="text-center" style={{ padding: '80px 0' }}>
            <p className="font-body text-[#6e6e73]">No products in this category yet.</p>
          </div>
        )}
        {!loading && !error && products.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
            style={{ gap: '20px' }}
          >
            {products.map((product, i) => (
              <motion.div key={product._id}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default PhonesAccessories;
