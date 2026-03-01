// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-accent/50"
    >
      <Link to={`/product/${product._id}`}>
        <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
      </Link>
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h3 className="text-lg font-bold text-white hover:text-accent transition">{product.name}</h3>
        </Link>
        <p className="text-gray-400 text-sm mt-1">{product.description}</p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-accent font-bold">₦{product.price}</span>
          <button
            onClick={() =>  {
              addToCart(product);
            }}
            className="p-2 bg-accent/20 rounded-full text-accent hover:bg-accent hover:text-white transition"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;