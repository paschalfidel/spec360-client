// src/components/Services.jsx
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { Smartphone, Wrench, Code, CreditCard, Wifi, Truck, ArrowUpRight } from 'lucide-react';

const services = [
  { icon: Smartphone, title: 'Phones & Accessories', description: 'Brand-new phones, UK-used devices, and a wide range of genuine accessories.', link: '/services/phones-accessories' },
  { icon: Wrench, title: 'Phone Repairs', description: 'Expert repairs: screen replacement, battery, water damage, and software fixes.', link: '/services/repairs' },
  { icon: Code, title: 'Web Development', description: 'Modern, scalable websites and web applications tailored to your business goals.', link: '/services/web-development' },
  { icon: CreditCard, title: 'POS Services', description: 'Streamlined payment solutions and easy utility bill payments at your fingertips.', link: '/services/pos' },
  { icon: Wifi, title: 'Connectivity', description: 'Reliable internet connectivity and IT infrastructure for seamless operations.', link: '/services/connectivity' },
  { icon: Truck, title: 'Logistics', description: 'Safe, timely device and package delivery — local and interstate.', link: '/services/logistics' },
];

const ServiceTile = ({ service, index, inView }) => {
  const Icon = service.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08 }}
    >
      <Link to={service.link} className="block h-full group">
        <div className="relative h-full rounded-2xl overflow-hidden transition-all duration-400 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/50"
          style={{ background: '#111', border: '1px solid rgba(255,255,255,0.07)', padding: '32px' }}
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: 'radial-gradient(ellipse at top left, rgba(229,9,20,0.07) 0%, transparent 65%)' }}
          />
          <div className="relative z-10 flex flex-col h-full" style={{ gap: '24px' }}>
            {/* Icon */}
            <div className="flex items-center justify-center rounded-xl text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-white group-hover:scale-110"
              style={{ width: '52px', height: '52px', background: 'rgba(229,9,20,0.1)' }}
            >
              <Icon size={24} strokeWidth={1.5} />
            </div>
            {/* Text */}
            <div style={{ flex: 1 }}>
              <h3 className="font-display font-semibold text-white tracking-tight" style={{ fontSize: '18px', marginBottom: '10px' }}>
                {service.title}
              </h3>
              <p className="font-body text-[#6e6e73] leading-relaxed" style={{ fontSize: '14px' }}>
                {service.description}
              </p>
            </div>
            {/* Arrow CTA */}
            <div className="flex items-center gap-2 text-accent opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
              <span className="font-display font-semibold" style={{ fontSize: '13px' }}>Learn more</span>
              <ArrowUpRight size={14} />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const Services = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.06 });

  return (
    <section id="services" className="w-full bg-[#080808]" style={{ padding: '96px 0' }}>
      <div className="site-container">

        <div className="flex flex-col md:flex-row md:items-end justify-between" style={{ gap: '20px', marginBottom: '56px' }}>
          <div>
            <div className="flex items-center gap-3" style={{ marginBottom: '14px' }}>
              <div className="w-8 h-px bg-accent" />
              <span className="text-accent font-body text-[12px] font-medium tracking-[0.18em] uppercase">What We Do</span>
            </div>
            <h2 className="font-display font-bold text-white leading-tight tracking-tight"
              style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}>
              Six Ways We <span className="text-accent">Serve</span>
            </h2>
          </div>
          <p className="font-body text-[#6e6e73] leading-relaxed" style={{ fontSize: '15px', maxWidth: '260px' }}>
            From devices to connectivity to digital products — we cover every angle.
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: '20px' }}>
          {services.map((s, i) => <ServiceTile key={s.title} service={s} index={i} inView={inView} />)}
        </div>
      </div>
    </section>
  );
};

export default Services;
