// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Wifi, Server, Network, Radio, Cable, Satellite } from 'lucide-react';

const Connectivity = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const solutions = [
    { icon: Wifi, title: 'Business Wi-Fi', desc: 'Reliable high-speed internet for your office.' },
    { icon: Server, title: 'Network Setup', desc: 'Professional installation and configuration.' },
    { icon: Network, title: 'VPN Solutions', desc: 'Secure remote access for your team.' },
    { icon: Radio, title: 'Wireless Bridges', desc: 'Connect remote sites wirelessly.' },
    { icon: Cable, title: 'Structured Cabling', desc: 'Organized and future-proof cabling.' },
    { icon: Satellite, title: 'Backup Connectivity', desc: 'Redundant links to avoid downtime.' },
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
            Business <span className="text-accent">Connectivity Solutions</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mb-10">
            Keep your business connected with reliable internet, networking, and communication 
            infrastructure. We design and deploy solutions that ensure seamless operations.
          </p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-accent/50"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-accent/20 rounded-lg text-accent">
                  <solution.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-white">{solution.title}</h3>
              </div>
              <p className="text-gray-400">{solution.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-12 p-6 bg-white/5 rounded-2xl border border-white/10"
        >
          <p className="text-gray-300 text-lg text-center">
            From small offices to large enterprises, we provide connectivity solutions that scale with your business.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Connectivity;