// Services.jsx
// Displays the "Services" section with a background image, dark overlay,
// and animated service cards. Includes logistics service as per business expansion.
// Fully commented and ready for production.

// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ServiceCard from './ServiceCard';
import {
  Smartphone,
  Wrench,
  Code,
  CreditCard,
  Wifi,
  Truck, // Icon for logistics
} from 'lucide-react';

const services = [
  {
    icon: Smartphone,
    title: 'Smartphones & Accessories',
    description: 'Brand-new phones, UK-used, and a wide range of genuine accessories including cases, chargers, and more.',
    link: '/services/phones-accessories',
  },
  {
    icon: Wrench,
    title: 'Phone Repairs & Tech Support',
    description: 'Expert repairs: screen, battery, water damage, software troubleshooting, and ongoing tech support.',
    link: '/services/repairs',
  },
  {
    icon: Code,
    title: 'Full-Stack Web Development',
    description: 'Modern, scalable websites and web applications tailored to your business needs.',
    link: '/services/web-development', // fixed missing leading slash
  },
  {
    icon: CreditCard,
    title: 'POS Services & Utility Subscriptions',
    description: 'Streamlined payment solutions and easy utility bill payments for businesses.',
    link: '/services/pos',
  },
  {
    icon: Wifi,
    title: 'Business Connectivity Solutions',
    description: 'Reliable connectivity and IT infrastructure for seamless operations.',
    link: '/services/connectivity',
  },
  {
    icon: Truck, // New logistics service
    title: 'Logistics & Delivery',
    description: 'Safe, timely, and reliable delivery of products and packages – local and interstate.',
    link: '/services/logistics', // you'll need to create this page later
  },
];

const Services = () => {
  // Trigger animations only once when section enters viewport
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  // Stagger animation for children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  // Individual card animation
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, duration: 0.6 },
  };

  return (
    <section
      id="services"
      className="relative min-h-screen flex items-center justify-center py-20 px-6 overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/images/our-services.png')" }}
    >
      {/* Dark overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/70 to-black/70 pointer-events-none" />

      <div className="container mx-auto relative z-10">
        {/* Section title */}
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-white text-center mb-12"
        >
          Our <span className="text-accent">Services</span>
        </motion.h2>

        {/* Service cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={itemVariants}>
              <ServiceCard {...service} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;