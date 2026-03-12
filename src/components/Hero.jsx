// src/components/Hero.jsx
// Full-bleed hero behind transparent navbar. No top clearance needed.
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Truck, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const scrollTo = (id) => {
  setTimeout(() => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, 80);
};

const Hero = () => (
  <section
    id="hero"
    role="banner"
    aria-label="Spec360 — Nigeria's trusted phone shop"
    style={{ position: 'relative', width: '100%', overflow: 'hidden', background: '#080808', minHeight: '100vh' }}
  >
    {/* ── Background image ── */}
    {/* ADD YOUR HERO IMAGE: /images/spec360-bg.png
        Ideal: dark photo of iPhones/Samsung phones or a tech workspace
        Unsplash search: "iphone samsung dark" or "tech store nigeria" */}
    <div style={{ position: 'absolute', inset: 0 }}>
      <img
        src="/images/spec360-bg.png"
        alt=""
        aria-hidden="true"
        loading="eager"
        decoding="async"
        fetchPriority="high"
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        onError={e => { e.target.style.display = 'none'; }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #080808 0%, rgba(8,8,8,0.7) 50%, rgba(8,8,8,0.3) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(8,8,8,0.85) 0%, rgba(8,8,8,0.4) 60%, transparent 100%)' }} />
    </div>

    {/* Subtle grid */}
    <div aria-hidden="true" style={{
      position: 'absolute', inset: 0, opacity: 0.025,
      backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)',
      backgroundSize: '80px 80px'
    }} />

    {/* Accent glow */}
    <div aria-hidden="true" style={{
      position: 'absolute', top: '30%', left: '20%',
      width: '500px', height: '500px', borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(229,9,20,0.1) 0%, transparent 70%)',
      filter: 'blur(60px)', pointerEvents: 'none'
    }} />

    {/* ── Content ── */}
    <div className="site-container" style={{
      position: 'relative', zIndex: 10, minHeight: '100vh',
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
      paddingBottom: '80px', paddingTop: '120px'
    }}>

      {/* Location pill */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}
      >
        <div style={{ width: '32px', height: '1px', background: '#E50914' }} />
        <span style={{ fontFamily: 'DM Sans, sans-serif', color: '#E50914', fontSize: '12px', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
          Owerri · Lagos · Nigeria
        </span>
      </motion.div>

      {/* H1 — conversion copy */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          fontFamily: 'Syne, sans-serif', fontWeight: 800, color: 'white',
          lineHeight: 0.92, letterSpacing: '-0.04em',
          fontSize: 'clamp(52px, 8.5vw, 120px)',
          margin: '0 0 32px'
        }}
      >
        Fix or Upgrade<br />
        <span style={{ color: '#E50914' }}>Today.</span>
      </motion.h2>

      {/* Sub copy with price anchor */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        style={{
          fontFamily: 'DM Sans, sans-serif', color: '#a1a1a6',
          fontSize: 'clamp(17px, 2.5vw, 22px)', lineHeight: 1.5,
          maxWidth: '520px', margin: '0 0 36px'
        }}
      >
        Genuine iPhone &amp; Samsung parts, accessories &amp; same-day repairs.{' '}
        <span style={{ color: '#22c55e', fontWeight: 700 }}>From ₦4,500.</span>
      </motion.p>

      {/* CTA buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.62 }}
        style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '40px' }}
      >
        <Link
          to="/services/phones-accessories"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '16px',
            background: '#E50914', color: 'white', borderRadius: '100px',
            padding: '16px 30px', textDecoration: 'none',
            boxShadow: '0 8px 28px rgba(229,9,20,0.35)',
            transition: 'transform 0.2s, box-shadow 0.2s'
          }}
        >
          Shop Now <ArrowRight size={17} />
        </Link>

        <a
          href={`https://wa.me/2348182799154?text=${encodeURIComponent("Hi! I need a phone repair/part. Can you help?")}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: '16px',
            background: '#25D366', color: 'white', borderRadius: '100px',
            padding: '16px 30px', textDecoration: 'none',
            boxShadow: '0 8px 28px rgba(37,211,102,0.3)',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          WhatsApp Us
        </a>
      </motion.div>

      {/* Trust pills */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.85 }}
        style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}
      >
        {[
          { icon: Shield, text: '100% Genuine Parts' },
          { icon: Truck, text: 'Same-Day Delivery' },
          { icon: Star, text: '4.9★ Rated' },
        ].map(({ icon: Icon, text }) => (
          <div key={text} style={{
            display: 'inline-flex', alignItems: 'center', gap: '7px',
            background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '100px', padding: '8px 14px'
          }}>
            <Icon size={13} color="#E50914" strokeWidth={2} />
            <span style={{ fontFamily: 'DM Sans, sans-serif', color: '#a1a1a6', fontSize: '12px', fontWeight: 500 }}>{text}</span>
          </div>
        ))}
      </motion.div>
    </div>

    {/* Stats bar */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.9 }}
      style={{
        position: 'relative', zIndex: 10, width: '100%',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(8,8,8,0.85)', backdropFilter: 'blur(20px)'
      }}
    >
      <div className="site-container" style={{ paddingTop: '20px', paddingBottom: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {[
            { value: '500+', label: 'Happy Customers' },
            { value: '6+', label: 'Service Lines' },
            { value: '2hrs', label: 'Avg Repair Time' },
            { value: '30-Day', label: 'Return Policy' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, color: 'white', fontSize: 'clamp(18px, 2.5vw, 26px)' }}>{s.value}</div>
              <div style={{ fontFamily: 'DM Sans, sans-serif', color: '#6e6e73', fontSize: '12px', marginTop: '4px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  </section>
);

export default Hero;
