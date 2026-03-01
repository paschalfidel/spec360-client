// src/components/Hero.jsx
// Hero section – the first thing users see.
// Features a background image with dark overlay, animated headline, subtext, and call‑to‑action buttons.
// Fully commented and ready for deployment.

// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';

const Hero = () => {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center px-6 pt-24 pb-16 relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/images/spec360-bg.png')" }}
    >
      {/* Dark overlay – ensures text is readable against the background */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />

      {/* Optional subtle gradient overlay for depth (kept from original) */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-transparent to-accent/10 pointer-events-none" />

      <div className="container mx-auto text-center relative z-10">
        {/* Main headline with fade-up animation */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-6"
        >
          Smart Tech. <br />
          <span className="text-accent">Smart Solutions.</span> Done Right.
        </motion.h1>

        {/* Subtext with delayed animation */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10"
        >
          Spec360 Communication is a modern tech and digital solutions brand built to serve today’s connected world.
        </motion.p>

        {/* Call‑to‑action buttons with staggered animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="services"
            smooth
            duration={500}
            offset={-70}
            className="bg-accent hover:bg-red-700 text-white font-semibold px-8 py-4 rounded-full transition transform hover:scale-105 cursor-pointer"
          >
            Explore Services
          </Link>
          <Link
            to="contact"
            smooth
            duration={500}
            offset={-70}
            className="bg-transparent border-2 border-accent text-accent hover:bg-accent hover:text-white font-semibold px-8 py-4 rounded-full transition transform hover:scale-105 cursor-pointer"
          >
            Contact Us
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;