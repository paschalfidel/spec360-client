// src/pages/AdminProductList.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Plus, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ImageWithPlaceholder from '../components/ImageWithPlaceholder';

const AdminProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/products`)
      .then(res => setProducts(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async id => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/products/${id}`);
      setProducts(p => p.filter(x => x._id !== id));
    } catch { alert('Failed to delete product.'); }
  };

  return (
    <section className="w-full bg-[#080808]" style={{ minHeight: '100vh', paddingTop: '96px', paddingBottom: '96px' }}>
      <div className="site-container">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between" style={{ marginBottom: '36px' }}>
          <div>
            <h1 className="font-display font-bold text-white tracking-tight" style={{ fontSize: '34px' }}>Products</h1>
            <p className="font-body text-[#6e6e73]" style={{ fontSize: '14px', marginTop: '4px' }}>{products.length} items in store</p>
          </div>
          <button onClick={() => navigate('/admin/add-product')} className="btn-primary">
            <Plus size={16} strokeWidth={2} /> Add Product
          </button>
        </motion.div>

        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[...Array(5)].map((_, i) => <div key={i} className="bg-[#111] rounded-2xl animate-pulse" style={{ height: '80px' }} />)}
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center" style={{ padding: '80px 0' }}>
            <div className="flex items-center justify-center rounded-2xl" style={{ width: '64px', height: '64px', background: '#111', marginBottom: '16px' }}>
              <Package size={24} className="text-[#3a3a3a]" strokeWidth={1.5} />
            </div>
            <p className="font-body text-[#6e6e73]">No products yet. Add your first product.</p>
          </div>
        ) : (
          <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', overflow: 'hidden' }}>
            <div className="grid gap-4 font-body text-[#3a3a3a] uppercase tracking-wider"
              style={{ gridTemplateColumns: '80px 1fr 130px 130px 80px 56px', padding: '14px 24px', fontSize: '11px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              {['Image', 'Product', 'Category', 'Price', 'Stock', ''].map((h, i) => <div key={i}>{h}</div>)}
            </div>
            <AnimatePresence>
              {products.map((product, i) => (
                <motion.div key={product._id} layout
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  exit={{ opacity: 0, height: 0 }} transition={{ delay: i * 0.03 }}
                  className="grid gap-4 items-center hover:bg-white/[0.02] transition-colors"
                  style={{ gridTemplateColumns: '80px 1fr 130px 130px 80px 56px', padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <div className="rounded-xl overflow-hidden" style={{ width: '52px', height: '52px', background: '#1a1a1a' }}>
                    <ImageWithPlaceholder src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-display font-semibold text-white tracking-tight truncate" style={{ fontSize: '15px' }}>{product.name}</p>
                    <p className="font-body text-[#6e6e73] line-clamp-1" style={{ fontSize: '12px', marginTop: '2px' }}>{product.description}</p>
                  </div>
                  <div>
                    <span className="font-body capitalize" style={{ background: 'rgba(229,9,20,0.1)', color: '#E50914', fontSize: '12px', padding: '4px 12px', borderRadius: '100px' }}>
                      {product.category}
                    </span>
                  </div>
                  <div className="font-display font-semibold text-white" style={{ fontSize: '15px' }}>₦{Number(product.price).toLocaleString()}</div>
                  <div className="font-body text-[#a1a1a6]" style={{ fontSize: '15px' }}>{product.stock}</div>
                  <div>
                    <button onClick={() => handleDelete(product._id)}
                      className="flex items-center justify-center text-[#3a3a3a] hover:text-red-400 transition-colors"
                      style={{ width: '36px', height: '36px' }}>
                      <Trash2 size={15} strokeWidth={1.5} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
};

export default AdminProductList;
