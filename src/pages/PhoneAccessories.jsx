import { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { fetchProductsByCategory } from '../services/api';
import ProductCard from '../components/ProductCard';


const PhonesAccessories = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
 

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        let data;
        if (filter === 'all') {
          const phones = await fetchProductsByCategory('phone');
          const accessories = await fetchProductsByCategory('accessory');
          data = [...phones.data, ...accessories.data];
        } else {
          const res = await fetchProductsByCategory(filter);
          data = res.data;
        }
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products', error);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [filter]);

  return (
    <section className="py-12 px-6">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-white mb-4">Phones & Accessories</h1>
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full transition ${filter === 'all' ? 'bg-accent text-white' : 'bg-white/10 text-gray-300 hover:bg-accent/50'}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('phone')}
            className={`px-4 py-2 rounded-full transition ${filter === 'phone' ? 'bg-accent text-white' : 'bg-white/10 text-gray-300 hover:bg-accent/50'}`}
          >
            Phones
          </button>
          <button
            onClick={() => setFilter('accessory')}
            className={`px-4 py-2 rounded-full transition ${filter === 'accessory' ? 'bg-accent text-white' : 'bg-white/10 text-gray-300 hover:bg-accent/50'}`}
          >
            Accessories
          </button>
        </div>

        {loading && <p className="text-gray-400">Loading products...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && products.length === 0 && (
          <p className="text-gray-400">No products found in this category.</p>
        )}
        {!loading && !error && products.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default PhonesAccessories;