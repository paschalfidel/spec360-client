// VisionMissionValues.jsx
// Combines Vision, Mission, and Core Values into one cohesive section.
// Core values display as 2-1-2 on tablets (medium screens) for better balance.
// Fully commented and ready for deployment.

// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Sparkles, Target, Heart, Rocket, Shield } from 'lucide-react';

const VisionMissionValues = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const values = [
    { icon: Sparkles, title: 'Spectacular Quality', desc: 'Excellence in devices, repairs, and code' },
    { icon: Target, title: 'Specific Solutions', desc: 'Tailored, need-based services' },
    { icon: Heart, title: 'Special Service', desc: 'People-first, trust-driven approach' },
    { icon: Rocket, title: 'Innovation & Growth', desc: 'Continuous improvement and learning' },
    { icon: Shield, title: 'Integrity & Transparency', desc: 'Honest advice and reliable solutions' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, duration: 0.5 },
  };

  return (
    <section
      id="vision-mission-values"
      className="relative min-h-screen py-20 px-6 bg-cover bg-center flex items-center"
      style={{ backgroundImage: "url('/images/vision-mission.png')" }}
    >
      {/* Dark overlay – matches Services section */}
      <div className="absolute inset-0 bg-black/75 pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="space-y-16"
        >
          {/* Vision & Mission Cards (unchanged) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Vision Card */}
            <div
              className="relative bg-cover bg-center rounded-2xl overflow-hidden"
              style={{ backgroundImage: "url('/images/core-values.png')" }}
            >
              <div className="absolute inset-0 bg-black/60" />
              <div className="relative z-10 p-8 backdrop-blur-sm border border-white/10">
                <h3 className="text-3xl md:text-4xl font-bold text-accent mb-4">Our Vision</h3>
                <p className="text-gray-100 text-lg md:text-xl leading-relaxed">
                  To become a leading 360° tech and digital solutions brand in Nigeria and beyond,
                  known for delivering spectacular quality, specific solutions, and special service.
                </p>
              </div>
            </div>

            {/* Mission Card */}
            <div
              className="relative bg-cover bg-center rounded-2xl overflow-hidden"
              style={{ backgroundImage: "url('/images/core-values.png')" }}
            >
              <div className="absolute inset-0 bg-black/60" />
              <div className="relative z-10 p-8 backdrop-blur-sm border border-white/10">
                <h3 className="text-3xl md:text-4xl font-bold text-accent mb-4">Our Mission</h3>
                <ul className="text-gray-100 text-lg md:text-xl leading-relaxed space-y-3 list-disc list-inside">
                  <li>Provide reliable smartphones, accessories, and professional repair services</li>
                  <li>Design modern, scalable web solutions for individuals and businesses</li>
                  <li>Combine technical expertise with customer-centric thinking</li>
                  <li>Continuously evolve through innovation and execution</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Core Values Section */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold text-white text-center mb-12"
            >
              Core <span className="text-accent">Values</span>
            </motion.h2>

            {/* Responsive grid with 2-1-2 layout on medium screens */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
            >
              {values.map((val, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  // On sm & md screens (2 columns), the third item spans both columns,
                  // creating a centered row. On larger screens it reverts to normal.
                  className={`bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-accent/50 text-center group ${
                    idx === 2 ? 'sm:col-span-2 lg:col-span-1' : ''
                  }`}
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-accent/20 rounded-full text-accent group-hover:scale-110 transition-transform">
                      <val.icon size={32} />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{val.title}</h3>
                  <p className="text-gray-400 text-sm">{val.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VisionMissionValues;