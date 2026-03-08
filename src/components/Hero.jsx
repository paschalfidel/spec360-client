// src/components/Hero.jsx
// Hero is full-bleed — sits behind the transparent navbar deliberately.
// No top clearance needed here; navbar transparency makes it look intentional.
import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-scroll';

const Hero = () => (
  <section
    id="hero"
    className="relative w-full overflow-hidden bg-[#080808]"
    style={{ minHeight: '100vh' }}
  >
    {/* Background image + overlays */}
    <div className="absolute inset-0">
      <img
        src="/images/spec360-bg.png" alt=""
        className="w-full h-full object-cover object-center"
        onError={e => { e.target.style.display = 'none'; }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/60 to-[#080808]/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/80 via-[#080808]/30 to-transparent" />
    </div>

    {/* Subtle grid */}
    <div className="absolute inset-0 opacity-[0.03]" style={{
      backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)',
      backgroundSize: '80px 80px'
    }} />

    {/* Accent glow */}
    <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none"
      style={{ background: 'radial-gradient(circle, rgba(229,9,20,0.08) 0%, transparent 70%)' }} />

    {/* Content — pushed to bottom of the viewport */}
    <div className="relative z-10 site-container flex flex-col justify-end" style={{ minHeight: '100vh', paddingBottom: '80px', paddingTop: '120px' }}>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex items-center gap-3 mb-8"
      >
        <div className="w-8 h-px bg-accent" />
        <span className="text-accent font-body text-[12px] font-medium tracking-[0.18em] uppercase">Lagos & Owerri · Nigeria</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="font-display font-bold text-white leading-[0.9] tracking-[-0.04em] mb-10"
        style={{ fontSize: 'clamp(56px, 9vw, 130px)' }}
      >
        Smart Tech.<br />
        <span className="text-accent">Smart</span><br />
        Solutions.
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.55 }}
        className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 max-w-5xl"
      >
        <p className="font-body text-[#a1a1a6] text-[18px] leading-relaxed max-w-md">
          Spec360 Communication — where hardware meets software meets service. Built for Nigeria's connected world.
        </p>
        <div className="flex items-center gap-4 flex-shrink-0">
          <Link to="services" smooth duration={700} offset={-70} className="btn-primary cursor-pointer group">
            Explore Services
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link to="contact" smooth duration={700} offset={-70} className="btn-ghost cursor-pointer">
            Contact Us
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-16 flex items-center gap-3 text-[#6e6e73]"
      >
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ArrowDown size={16} strokeWidth={1.5} />
        </motion.div>
        <span className="font-body text-[11px] tracking-[0.12em] uppercase">Scroll to explore</span>
      </motion.div>
    </div>

    {/* Stats bar */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="relative z-10 w-full border-t border-white/[0.06] bg-[#080808]/80 backdrop-blur-xl"
    >
      <div className="site-container py-5 grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { value: '360°', label: 'Tech Coverage' },
          { value: '6+', label: 'Service Lines' },
          { value: 'Lagos & Owerri', label: 'Based In Nigeria' },
          { value: '∞', label: 'Problems Solved' },
        ].map((s, i) => (
          <div key={i} className="text-center">
            <div className="font-display font-bold text-white text-2xl">{s.value}</div>
            <div className="font-body text-[#6e6e73] text-[12px] mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </motion.div>
  </section>
);

export default Hero;
