// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Globe, Smartphone, Database, Rocket, Shield } from 'lucide-react';

const WebDevelopment = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const services = [
    { icon: Globe, title: 'Custom Websites', desc: 'Responsive, modern websites tailored to your brand.' },
    { icon: Smartphone, title: 'Mobile-First Design', desc: 'Optimized for all devices, especially mobile.' },
    { icon: Database, title: 'Full-Stack Applications', desc: 'Scalable web apps with Node.js, React, and MongoDB.' },
    { icon: Rocket, title: 'Performance Optimization', desc: 'Fast load times and SEO-friendly structure.' },
    { icon: Shield, title: 'Secure & Reliable', desc: 'Best practices in security and data protection.' },
    { icon: Code, title: 'Maintenance & Support', desc: 'Ongoing updates and technical support.' },
  ];

  return (
    <section className="py-16 px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Full-Stack <span className="text-accent">Web Development</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mb-10">
            We design and build functional, scalable web solutions that solve real-world problems. 
            From simple business websites to complex web applications, we deliver modern, high-performance digital experiences.
          </p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-accent/50"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-accent/20 rounded-lg text-accent">
                  <service.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-white">{service.title}</h3>
              </div>
              <p className="text-gray-400">{service.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-12 p-6 bg-gradient-to-r from-accent/10 to-transparent rounded-2xl border border-accent/20"
        >
          <p className="text-gray-300 text-lg">
            <span className="text-accent font-bold">Some of our digital products are already in production</span> – 
            with more real-world, problem-solving projects continuously in development.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WebDevelopment;