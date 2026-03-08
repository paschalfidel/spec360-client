// src/components/ServiceCard.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const ServiceCard = ({ icon: Icon, title, description, link }) => {
  return (
    <Link to={link} className="block h-full group">
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative h-full bg-[#111] border border-white/[0.06] rounded-2xl p-8 overflow-hidden hover:border-white/[0.14] hover:shadow-2xl hover:shadow-black/40 transition-all duration-400"
      >
        {/* Hover glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at top left, rgba(229,9,20,0.05) 0%, transparent 60%)' }}
        />

        <div className="relative z-10 flex flex-col h-full gap-5">
          <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-white group-hover:scale-110 flex-shrink-0">
            <Icon size={22} strokeWidth={1.5} />
          </div>

          <div className="flex-1">
            <h3 className="font-display font-semibold text-white text-xl tracking-tight mb-2">{title}</h3>
            <p className="font-body text-[#6e6e73] text-[15px] leading-relaxed">{description}</p>
          </div>

          <div className="flex items-center gap-2 text-accent opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <span className="font-display font-semibold text-[13px]">Learn more</span>
            <ArrowUpRight size={13} />
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ServiceCard;
