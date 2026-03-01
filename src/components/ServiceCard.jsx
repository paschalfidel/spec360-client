/* eslint-disable no-unused-vars */
// ServiceCard.jsx
// Displays an individual service card with icon, title, description, and link.
// Enlarged for better UI presence – increased padding, icon size, and typography.
// Uses Framer Motion for hover effects.

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ServiceCard = ({ icon: Icon, title, description, link }) => {
  return (
    <Link to={link}>
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-accent/50 group cursor-pointer"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="p-4 bg-accent/20 rounded-lg text-accent group-hover:scale-110 transition-transform">
            <Icon size={36} /> {/* Increased icon size */}
          </div>
          <h3 className="text-2xl font-bold text-white">{title}</h3> {/* Larger title */}
        </div>
        <p className="text-gray-400 text-base leading-relaxed">{description}</p> {/* Larger description */}
      </motion.div>
    </Link>
  );
};

export default ServiceCard;