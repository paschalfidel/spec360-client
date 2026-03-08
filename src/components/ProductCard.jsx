// src/components/ProductCard.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart, ArrowUpRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import ImageWithPlaceholder from './ImageWithPlaceholder';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group bg-[#111] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-white/[0.14] transition-all duration-400 hover:shadow-2xl hover:shadow-black/40"
    >
      <Link to={`/product/${product._id}`} className="block relative overflow-hidden aspect-square bg-[#1a1a1a]">
        <ImageWithPlaceholder
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <ArrowUpRight size={14} className="text-[#080808]" />
          </div>
        </div>
      </Link>

      <div className="p-5">
        <Link to={`/product/${product._id}`}>
          <h3 className="font-display font-semibold text-white text-[16px] tracking-tight mb-1 hover:text-accent transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="font-body text-[#6e6e73] text-[13px] line-clamp-2 mb-4 leading-relaxed">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="font-display font-bold text-white text-lg">₦{Number(product.price).toLocaleString()}</span>
          <button
            onClick={() => addToCart(product)}
            className="w-9 h-9 bg-accent/10 rounded-xl flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-all duration-300"
          >
            <ShoppingCart size={16} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
