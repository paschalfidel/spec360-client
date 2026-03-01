/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchProductById } from '../services/api';
import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProductById(id)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="py-20 text-center text-gray-400">Loading...</div>;
  if (!product) return <div className="py-20 text-center text-gray-400">Product not found</div>;

  return (
    <section className="py-12 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <motion.img
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            src={product.imageUrl}
            alt={product.name}
            className="w-full rounded-2xl border border-white/10"
          />
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl font-bold text-white mb-4">{product.name}</h1>
            <p className="text-2xl text-accent font-bold mb-4">₦{product.price}</p>
            <p className="text-gray-300 text-lg mb-6">{product.description}</p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => addToCart(product)}
                className="flex items-center gap-2 bg-accent hover:bg-red-700 text-white px-6 py-3 rounded-full transition"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
              <span className="text-gray-400">In stock: {product.stock}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;