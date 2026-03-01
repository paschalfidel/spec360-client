// src/components/BrandPromise.jsx
// Displays the "Brand Promise" statement and "Why Choose Us" features together in one section.
// The "Why Choose Us" cards use a 2-1-2 layout on tablet-sized screens for better visual balance.
// Fully commented and ready for deployment.

// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Clock,
  Shield,
  DollarSign,
  Briefcase,
  Users,
} from 'lucide-react';

// Reasons why customers should choose us – each with an icon, title, and short description.
const reasons = [
  { icon: Clock, title: 'Fast Service', desc: 'Quick turnaround on repairs and support.' },
  { icon: Shield, title: 'Trusted Technicians', desc: 'Experienced professionals you can rely on.' },
  { icon: DollarSign, title: 'Affordable Pricing', desc: 'Competitive rates without hidden costs.' },
  { icon: Briefcase, title: 'Business Solutions', desc: 'Tailored IT and POS services for businesses.' },
  { icon: Users, title: 'Personalized Consultation', desc: 'Expert advice to meet your needs.' },
];

const BrandPromise = () => {
  // Trigger animations only once when the section enters the viewport
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  // Staggered animation for the "Why Choose Us" cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  // Individual card animation (fade + slide up)
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, duration: 0.5 },
  };

  return (
    <section
      id="brand-why" // Used for navigation (e.g., from footer links)
      className="relative min-h-screen py-20 px-6 flex items-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/brand-promise.png')" }}
    >
      {/* Dark gradient overlay for text readability – keeps the background visible but subdued */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/80 pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="space-y-16" // Spacing between the two blocks
        >
          {/* Brand Promise Card – centered and highlighted */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-accent/10 to-transparent p-10 rounded-3xl border border-accent/20 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Our <span className="text-accent">Brand Promise</span>
              </h2>
              <p className="text-xl text-gray-200 leading-relaxed">
                At Spec360 Communication, we promise to deliver dependable tech and digital
                solutions—crafted with care, driven by expertise, and designed to work in the real world.
              </p>
            </div>
          </div>

          {/* Why Choose Us – grid of reason cards */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold text-white text-center mb-12"
            >
              Why Choose <span className="text-accent">Us</span>
            </motion.h2>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              // Responsive grid with 2-1-2 layout on medium screens:
              // - Mobile: 1 column
              // - sm & md: 2 columns, with the third card spanning both columns
              // - lg & xl: 3 columns then 5 columns, normal flow
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
            >
              {reasons.map((reason, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }} // Subtle hover effect
                  // On sm and md, make the third card span full width (2 columns)
                  // On lg, revert to normal column span
                  className={`bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-accent/50 text-center group ${
                    index === 2 ? 'sm:col-span-2 lg:col-span-1' : ''
                  }`}
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-accent/20 rounded-full text-accent group-hover:scale-110 transition-transform">
                      <reason.icon size={32} />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{reason.title}</h3>
                  <p className="text-gray-400 text-sm">{reason.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BrandPromise;