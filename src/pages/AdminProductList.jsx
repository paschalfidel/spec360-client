import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Package, ArrowLeft, AlertTriangle } from 'lucide-react';
import { fetchProducts, deleteProduct } from '../services/api'; // ← uses API instance with interceptor
import ImageWithPlaceholder from '../components/ImageWithPlaceholder';

const AdminProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [deleting, setDeleting] = useState(null);   // id currently being deleted
  const [error, setError]       = useState('');
  const navigate                = useNavigate();

  useEffect(() => { load(); }, []);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetchProducts();             // GET /api/products — no auth needed
      setProducts(res.data);
    } catch {
      setError('Failed to load products.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;
    setDeleting(id);
    try {
      await deleteProduct(id);                       // DELETE /api/products/:id — token auto-attached
      setProducts(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to delete product.';
      alert(msg);
    } finally {
      setDeleting(null);
    }
  };

  return (
    <section style={{ width: '100%', background: '#080808', minHeight: '100vh', paddingTop: '96px', paddingBottom: '96px' }}>
      <div className="site-container">

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '40px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
              <div style={{ width: '32px', height: '1px', background: '#E50914' }} />
              <span style={{ fontFamily: 'DM Sans, sans-serif', color: '#E50914', fontSize: '12px', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase' }}>Admin</span>
            </div>
            <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, color: 'white', fontSize: 'clamp(24px, 3.5vw, 40px)', letterSpacing: '-0.03em', margin: 0 }}>
              Manage Products
            </h1>
            <p style={{ fontFamily: 'DM Sans, sans-serif', color: '#6e6e73', fontSize: '14px', marginTop: '6px' }}>
              {products.length} product{products.length !== 1 ? 's' : ''} in store
            </p>
          </div>
          <button
            onClick={() => navigate('/admin/add-product')}
            className="btn-primary"
            style={{ fontSize: '14px', padding: '12px 22px' }}
          >
            <Plus size={16} strokeWidth={2} /> Add Product
          </button>
        </div>

        {/* Error */}
        {error && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(229,9,20,0.1)', border: '1px solid rgba(229,9,20,0.2)', borderRadius: '12px', padding: '14px 18px', marginBottom: '24px' }}>
            <AlertTriangle size={16} color="#E50914" />
            <p style={{ fontFamily: 'DM Sans, sans-serif', color: '#f87171', fontSize: '14px', margin: 0 }}>{error}</p>
          </div>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[...Array(4)].map((_, i) => (
              <div key={i} className="skeleton" style={{ height: '72px', borderRadius: '16px' }} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && products.length === 0 && !error && (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '18px', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <Package size={28} color="#3a3a3a" strokeWidth={1.5} />
            </div>
            <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: 'white', fontSize: '20px', marginBottom: '8px' }}>No products yet</p>
            <p style={{ fontFamily: 'DM Sans, sans-serif', color: '#6e6e73', fontSize: '15px', marginBottom: '24px' }}>Add your first product to get started.</p>
            <button onClick={() => navigate('/admin/add-product')} className="btn-primary" style={{ fontSize: '14px' }}>
              <Plus size={16} /> Add First Product
            </button>
          </div>
        )}

        {/* Product table */}
        {!loading && products.length > 0 && (
          <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', overflow: 'hidden' }}>

            {/* Desktop table header */}
            <div style={{ display: 'grid', gridTemplateColumns: '64px 1fr 100px 110px 80px 60px', gap: '0', padding: '14px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
              className="hidden md:grid">
              {['Image', 'Product', 'Category', 'Price', 'Stock', ''].map(h => (
                <span key={h} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 600, color: '#6e6e73', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{h}</span>
              ))}
            </div>

            {/* Rows */}
            <AnimatePresence>
              {products.map((product, i) => {
                const inStock  = product.stock > 0;
                const lowStock = product.stock > 0 && product.stock <= 5;
                const isDeleting = deleting === product._id;

                return (
                  <motion.div
                    key={product._id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: isDeleting ? 0.4 : 1, y: 0 }}
                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                    transition={{ duration: 0.25 }}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '64px 1fr auto',
                      alignItems: 'center',
                      gap: '16px',
                      padding: '16px 24px',
                      borderBottom: i < products.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                      transition: 'background 0.2s',
                    }}
                  >
                    {/* Image */}
                    <div style={{ width: '56px', height: '56px', borderRadius: '12px', overflow: 'hidden', background: '#1a1a1a', flexShrink: 0 }}>
                      <ImageWithPlaceholder src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                    </div>

                    {/* Info */}
                    <div style={{ minWidth: 0 }}>
                      <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: 'white', fontSize: '15px', margin: '0 0 4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {product.name}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                        <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#6e6e73', background: 'rgba(255,255,255,0.06)', padding: '2px 10px', borderRadius: '100px', textTransform: 'capitalize' }}>
                          {product.category}
                        </span>
                        <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#22c55e', fontSize: '14px' }}>
                          ₦{Number(product.price).toLocaleString()}
                        </span>
                        <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: inStock ? (lowStock ? '#f59e0b' : '#22c55e') : '#6e6e73' }}>
                          {inStock ? (lowStock ? `Only ${product.stock} left` : `${product.stock} in stock`) : 'Out of stock'}
                        </span>
                      </div>
                    </div>

                    {/* Delete button */}
                    <button
                      onClick={() => handleDelete(product._id, product.name)}
                      disabled={isDeleting}
                      title="Delete product"
                      style={{
                        width: '38px', height: '38px', borderRadius: '10px', border: 'none',
                        background: 'rgba(229,9,20,0.1)', color: '#E50914',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: isDeleting ? 'not-allowed' : 'pointer',
                        flexShrink: 0, transition: 'background 0.2s',
                      }}
                      onMouseEnter={e => { if (!isDeleting) e.currentTarget.style.background = 'rgba(229,9,20,0.25)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(229,9,20,0.1)'; }}
                    >
                      {isDeleting
                        ? <div style={{ width: '14px', height: '14px', borderRadius: '50%', border: '2px solid rgba(229,9,20,0.3)', borderTopColor: '#E50914', animation: 'spin 0.6s linear infinite' }} />
                        : <Trash2 size={16} strokeWidth={1.5} />
                      }
                    </button>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {/* Back to site */}
        <div style={{ marginTop: '32px' }}>
          <Link to="/" style={{ fontFamily: 'DM Sans, sans-serif', color: '#6e6e73', fontSize: '13px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <ArrowLeft size={13} strokeWidth={1.5} /> Back to site
          </Link>
        </div>

      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </section>
  );
};

export default AdminProductList;