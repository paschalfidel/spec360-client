// src/pages/PhonesAccessories.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import TrustBadges from '../components/TrustBadges';
import { Search } from 'lucide-react';

const FILTERS = [
  { key: 'all',       label: 'All'         },
  { key: 'phone',     label: 'Phones'      },
  { key: 'accessory', label: 'Accessories' },
  { key: 'part',      label: 'Parts'       },
];

// ── Sample products (all categories) ─────────────────────────────────────────
// Shown only when backend has no products yet. Replace imageUrl values with
// your actual Cloudinary URLs once products are uploaded via admin panel.
const SAMPLE_PRODUCTS = [
  {
    _id: 's1', name: 'iPhone 14 Clear Case', category: 'accessory', price: 8500,
    description: 'Crystal-clear slim case. MIL-grade drop protection, wireless charging compatible.',
    imageUrl: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&q=80', stock: 24,
  },
  {
    _id: 's2', name: 'Samsung A54 Screen Replacement', category: 'part', price: 18000,
    description: 'OEM-grade AMOLED screen. Includes tools & adhesive. Same-day fitting available.',
    imageUrl: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&q=80', stock: 8,
  },
  {
    _id: 's3', name: '20W Fast Charger + Cable', category: 'accessory', price: 4500,
    description: 'Universal USB-C fast charger. Compatible with iPhone 15, Samsung Galaxy, and more.',
    imageUrl: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500&q=80', stock: 50,
  },
  {
    _id: 's4', name: 'iPhone/Samsung Battery (OEM)', category: 'part', price: 15000,
    description: 'Genuine OEM replacement battery. 90-day warranty. Walk in, walk out same day.',
    imageUrl: 'https://images.unsplash.com/photo-1605464315542-bda3e2f4e605?w=500&q=80', stock: 3,
  },
  {
    _id: 's5', name: 'Tempered Glass Screen Guard', category: 'accessory', price: 3000,
    description: '9H hardness, anti-fingerprint coating. Available for all iPhone & Samsung models.',
    imageUrl: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&q=80', stock: 100,
  },
  {
    _id: 's6', name: 'iPhone 13/14 Charging Port', category: 'part', price: 6500,
    description: 'OEM lightning/USB-C charging port flex cable. Fixes no-charge and loose port issues.',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80', stock: 12,
  },
  {
    _id: 's7', name: 'Samsung Galaxy A Series Back Glass', category: 'part', price: 7000,
    description: 'OEM replacement back glass panel. Compatible with A52, A53, A54 series.',
    imageUrl: 'https://images.unsplash.com/photo-1610945264803-c22b62d2a7b3?w=500&q=80', stock: 7,
  },
  {
    _id: 's8', name: 'Tecno Camon Phone (128GB)', category: 'phone', price: 85000,
    description: 'Brand new, sealed. 6.7" display, 50MP camera, 5000mAh battery. 1-year warranty.',
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80', stock: 5,
  },
];

const PhonesAccessories = () => {
  const [products, setProducts]   = useState([]);
  const [filtered, setFiltered]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [filter, setFilter]       = useState('all');
  const [search, setSearch]       = useState('');

  // Fetch all products once on mount
  useEffect(() => {
    fetchProducts()
      .then(res => {
        const data = res.data.length > 0 ? res.data : SAMPLE_PRODUCTS;
        setProducts(data);
        setFiltered(data);
      })
      .catch(() => {
        setProducts(SAMPLE_PRODUCTS);
        setFiltered(SAMPLE_PRODUCTS);
      })
      .finally(() => setLoading(false));
  }, []);

  // Client-side filter + search whenever filter, search or products change
  useEffect(() => {
    let result = products;
    if (filter !== 'all') result = result.filter(p => p.category === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q)
      );
    }
    setFiltered(result);
  }, [filter, search, products]);

  const clearFilters = () => { setFilter('all'); setSearch(''); };

  return (
    <>
      {/* SEO H1 — screen-reader only; visible heading is the h2 below */}
      <h1 className="sr-only">
        Buy iPhone &amp; Samsung Phones, Parts &amp; Accessories in Nigeria — Spec360
      </h1>

      <section style={{ width: '100%', background: '#080808', minHeight: '100vh', paddingTop: '96px', paddingBottom: '96px' }}>
        <div className="site-container">

          {/* ── Page header ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            style={{ paddingBottom: '36px', borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: '32px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: '32px', height: '1px', background: '#E50914' }} />
              <span style={{ fontFamily: 'DM Sans, sans-serif', color: '#E50914', fontSize: '12px', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                Store
              </span>
            </div>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, color: 'white', fontSize: 'clamp(32px, 5vw, 64px)', letterSpacing: '-0.03em', margin: '0 0 12px' }}>
              Phones, Parts &amp; <span style={{ color: '#E50914' }}>Accessories</span>
            </h2>
            <p style={{ fontFamily: 'DM Sans, sans-serif', color: '#6e6e73', fontSize: '16px', margin: 0 }}>
              Genuine phones, OEM parts and accessories — carefully selected for Nigeria.
            </p>
          </motion.div>

          {/* ── Trust badges ── */}
          <div style={{ marginBottom: '36px' }}>
            <TrustBadges compact />
          </div>

          {/* ── Filter + Search bar ── */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            style={{ marginBottom: '36px' }}
          >
            {/* Filter pills row — scrollable on mobile */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              overflowX: 'auto', paddingBottom: '4px',
              scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch',
              marginBottom: '14px',
            }}>
              {FILTERS.map(f => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  style={{
                    flexShrink: 0,
                    fontFamily: 'DM Sans, sans-serif', fontSize: '13px',
                    padding: '9px 20px', borderRadius: '100px',
                    background: filter === f.key ? '#E50914' : 'transparent',
                    color: filter === f.key ? 'white' : '#6e6e73',
                    fontWeight: filter === f.key ? 600 : 400,
                    border: filter === f.key ? 'none' : '1px solid rgba(255,255,255,0.08)',
                    cursor: 'pointer', transition: 'all 0.2s',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {f.label}
                  {/* show count per category */}
                  {f.key !== 'all' && (
                    <span style={{
                      marginLeft: '6px', fontSize: '11px', opacity: 0.7,
                      background: filter === f.key ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)',
                      padding: '1px 6px', borderRadius: '100px',
                    }}>
                      {products.filter(p => p.category === f.key).length}
                    </span>
                  )}
                </button>
              ))}

              {/* Search — sits in same row on desktop, wraps to below on mobile */}
              <div style={{ position: 'relative', marginLeft: 'auto', flexShrink: 0 }}>
                <Search
                  size={14}
                  style={{
                    position: 'absolute', left: '12px', top: '50%',
                    transform: 'translateY(-50%)', color: '#6e6e73', pointerEvents: 'none',
                  }}
                />
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  style={{
                    fontFamily: 'DM Sans, sans-serif', color: 'white', fontSize: '13px',
                    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '100px', padding: '9px 16px 9px 34px', outline: 'none',
                    width: '180px', transition: 'border-color 0.2s, width 0.3s',
                  }}
                  onFocus={e => { e.target.style.borderColor = '#E50914'; e.target.style.width = '220px'; }}
                  onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.width = '180px'; }}
                />
              </div>
            </div>

            {/* Active filter summary */}
            {(filter !== 'all' || search.trim()) && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontFamily: 'DM Sans, sans-serif', color: '#6e6e73', fontSize: '13px' }}>
                  {filtered.length} result{filtered.length !== 1 ? 's' : ''}
                  {filter !== 'all' ? ` in ${FILTERS.find(f => f.key === filter)?.label}` : ''}
                  {search.trim() ? ` for "${search}"` : ''}
                </span>
                <button
                  onClick={clearFilters}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontFamily: 'DM Sans, sans-serif', color: '#E50914', fontSize: '13px',
                  }}
                >
                  Clear
                </button>
              </div>
            )}
          </motion.div>

          {/* ── Product grid ── */}
          {loading ? (
            <>
              <style>{`
                .prod-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }
                @media (min-width: 480px)  { .prod-grid { grid-template-columns: repeat(3, 1fr); } }
                @media (min-width: 768px)  { .prod-grid { grid-template-columns: repeat(4, 1fr); } }
                @media (min-width: 1100px) { .prod-grid { grid-template-columns: repeat(5, 1fr); } }
              `}</style>
              <div className="prod-grid">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="skeleton" style={{ borderRadius: '20px', aspectRatio: '0.85' }} />
                ))}
              </div>
            </>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <p style={{ fontFamily: 'DM Sans, sans-serif', color: '#6e6e73', fontSize: '16px', marginBottom: '12px' }}>
                No products found.
              </p>
              <button
                onClick={clearFilters}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontFamily: 'DM Sans, sans-serif', color: '#E50914', fontSize: '15px',
                }}
              >
                Clear filters
              </button>
            </div>
          ) : (
            <>
              {/* ── GRID: 2 cols on all phones, 3 on ≥480px, 4 on ≥768px, 5 on ≥1100px ── */}
              <style>{`
                .prod-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }
                @media (min-width: 480px)  { .prod-grid { grid-template-columns: repeat(3, 1fr); } }
                @media (min-width: 768px)  { .prod-grid { grid-template-columns: repeat(4, 1fr); } }
                @media (min-width: 1100px) { .prod-grid { grid-template-columns: repeat(5, 1fr); } }
              `}</style>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="prod-grid"
              >
                {filtered.map((product, i) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(i * 0.04, 0.4) }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            </>
          )}

        </div>
      </section>
    </>
  );
};

export default PhonesAccessories;
