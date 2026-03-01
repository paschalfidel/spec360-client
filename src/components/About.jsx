// About.jsx
// Displays the "About" section with a background image,
// a semi‑transparent overlay for readability, and a subtle backdrop blur.
// Updated to include logistics services as per business expansion.

// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {
  // Trigger animation only once when section enters viewport
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center py-20 px-6 relative overflow-hidden bg-center bg-cover"
      // Background image from public/images – adjust path if needed
      style={{ backgroundImage: "url('/images/about.png')" }}
    >
      {/* Light overlay to dim background and improve text contrast */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/30 pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center">
            About <span className="text-accent">Spec360 Communication</span>
          </h2>

          {/* Text container with semi‑transparent background and blur */}
          <div className="bg-black/20 backdrop-blur-md p-8 rounded-2xl border border-white/10">
            <div className="space-y-5 text-gray-100 text-xl md:text-2xl leading-relaxed">
              <p>
                Spec360 Communication operates at the intersection of hardware, software, and service—providing
                smartphones, accessories, professional phone repairs, tech support, and full-stack web development
                solutions.
              </p>
              <p>
                Beyond selling and fixing devices, we design and build functional, scalable web solutions. Some of our
                digital products are already in production, with more real-world, problem-solving projects continuously
                in development.
              </p>
              <p>
                Our strength lies in our 360-degree understanding of technology. We don’t just offer tools—we understand
                how they’re used, why they matter, and how to make them work better for people and businesses.
              </p>
              {/* New paragraph added to include logistics services */}
              <p>
                Expanding our reach, we now also offer reliable logistics services to ensure your products and packages
                are delivered safely and on time. Whether you need local or interstate deliveries, our logistics team
                is dedicated to providing efficient and trustworthy service.
              </p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-8 text-center text-2xl font-bold text-accent"
          >
            #Spectacular • #Specific • #Special
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;