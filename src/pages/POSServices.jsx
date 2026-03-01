// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CreditCard, Zap, Users, TrendingUp, Smartphone, Repeat } from 'lucide-react';

const POSServices = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const features = [
    { icon: CreditCard, title: 'POS Terminals', desc: 'Reliable point-of-sale machines for seamless transactions.' },
    { icon: Zap, title: 'Fast Settlements', desc: 'Quick and secure payment processing.' },
    { icon: Users, title: 'Business Support', desc: 'Dedicated support for merchants.' },
    { icon: TrendingUp, title: 'Sales Reports', desc: 'Detailed analytics to track your business growth.' },
    { icon: Smartphone, title: 'Mobile Integration', desc: 'Manage payments from your smartphone.' },
    { icon: Repeat, title: 'Utility Subscriptions', desc: 'Easy payment for electricity, TV, and more.' },
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
            POS Services & <span className="text-accent">Utility Subscriptions</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mb-10">
            Streamlined payment solutions and utility bill payments for businesses and individuals. 
            We make transactions easy, fast, and secure.
          </p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-accent/50"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-accent/20 rounded-lg text-accent">
                  <feature.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-white">{feature.title}</h3>
              </div>
              <p className="text-gray-400">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-300 text-lg">
            Whether you need a POS terminal for your shop or want to pay utility bills instantly, 
            we’ve got you covered.
          </p>
          <a
            href="tel:08182799154"
            className="inline-block mt-4 bg-accent hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-full transition"
          >
            Call to Inquire
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default POSServices;