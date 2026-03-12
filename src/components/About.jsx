// src/components/About.jsx
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ImageWithPlaceholder from './ImageWithPlaceholder';

const About = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 32 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.75, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  });

  return (
    <section id="about" className="w-full bg-[#080808]" style={{ padding: '96px 0' }}>
      <div className="site-container">

        <motion.div {...fadeUp(0)} className="flex items-center gap-3" style={{ marginBottom: '48px' }}>
          <div className="w-8 h-px bg-accent" />
          <span className="text-accent font-body text-[12px] font-medium tracking-[0.18em] uppercase">About Us</span>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 items-center" style={{ gap: '64px' }}>

          {/* Image */}
          <motion.div {...fadeUp(0.1)} className="relative">
            <div className="relative rounded-2xl overflow-hidden bg-[#141414]" style={{ aspectRatio: '4/5' }}>
              <ImageWithPlaceholder
                src="/images/spec-team.png" alt="Spec360 Team"
                className="w-full h-full object-cover"
                placeholderText="Our Team"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/50 to-transparent" />
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="absolute bg-accent text-white rounded-2xl shadow-xl shadow-accent/20"
              style={{ bottom: '-28px', right: '-10px', padding: '20px 20px' }}
            >
              <div className="font-display font-bold text-3xl leading-none">360°</div>
              <div className="font-body text-white/80 text-sm mt-1.5">Full Coverage</div>
            </motion.div>
          </motion.div>

          {/* Text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <motion.h2
              {...fadeUp(0.15)}
              className="font-display font-bold text-white leading-[1.05] tracking-tight"
              style={{ fontSize: 'clamp(32px, 3.8vw, 54px)' }}
            >
              Where Hardware Meets{' '}
              <span className="text-accent">Software</span>{' '}
              Meets Service
            </motion.h2>

            <motion.div {...fadeUp(0.25)}
              className="font-body text-[#a1a1a6] leading-relaxed"
              style={{ fontSize: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              <p>Spec360 Communication operates at the intersection of hardware, software, and service — providing smartphones, accessories, professional repairs, tech support, and full-stack web development.</p>
              <p>Beyond devices, we design and build scalable web solutions with more real-world projects continuously in development.</p>
              <p>Our 360-degree understanding means we don't just offer tools — we make them work better for people and businesses.</p>
            </motion.div>

            <motion.div {...fadeUp(0.35)}
              style={{ paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexWrap: 'wrap', gap: '20px' }}
            >
              {['#Spectacular', '#Specific', '#Special'].map(tag => (
                <span key={tag} className="font-display font-semibold text-accent" style={{ fontSize: '18px' }}>{tag}</span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
