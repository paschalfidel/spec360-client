// src/pages/Home.jsx
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import VisionMissionValues from '../components/VisionMissionValues';
import BrandPromise from '../components/BrandPromise';
import Contact from '../components/Contact';
import Testimonials from '../components/Testimonials';
import BundleBanner from '../components/BundleBanner';
import FeaturedProducts from '../components/FeaturedProducts';
import useHashScroll from '../hooks/useHashScroll';

const Home = () => {
  useHashScroll();
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      {/* Hidden H1 for SEO — the Hero h1 is visually prominent */}
      <h1 className="sr-only">
        Spec360 — Genuine iPhone &amp; Samsung Parts, Phone Accessories &amp; Repairs in Nigeria
      </h1>
      <Hero />
      <FeaturedProducts />
      <BundleBanner />
      <About />
      <Services />
      <Testimonials />
      <VisionMissionValues />
      <BrandPromise />
      <Contact />
    </motion.div>
  );
};

export default Home;
