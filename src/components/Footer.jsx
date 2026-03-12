// src/components/Footer.jsx
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, MessageCircle } from 'lucide-react';

const scrollToHash = (id) => {
  setTimeout(() => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, 80);
};

const NAV_LINKS = [
  { label: 'Home',        hash: 'hero' },
  { label: 'About',       hash: 'about' },
  { label: 'Services',    hash: 'services' },
  { label: 'Our Identity',hash: 'vision-mission-values' },
  { label: 'Contact',     hash: 'contact' },
];

const SERVICE_LINKS = [
  { label: 'Phones & Accessories', to: '/services/phones-accessories' },
  { label: 'Repairs',              to: '/services/repairs' },
  { label: 'Web Development',      to: '/services/web-development' },
  { label: 'POS Services',         to: '/services/pos' },
  { label: 'Connectivity',         to: '/services/connectivity' },
  { label: 'Logistics',            to: '/services/logistics' },
];

const SOCIALS = [
  { href: 'https://www.instagram.com/gadgetsbyspec360/', icon: Instagram, label: 'Instagram' },
  { href: 'https://x.com/paschalomens',                 icon: Twitter,   label: 'Twitter / X' },
  { href: 'https://web.facebook.com/spec360com',        icon: Facebook,  label: 'Facebook' },
  { href: 'https://wa.me/2348182799154',                icon: MessageCircle, label: 'WhatsApp' },
];

const linkStyle = {
  fontFamily:     'DM Sans, sans-serif',
  fontSize:       '14px',
  color:          '#6e6e73',
  textDecoration: 'none',
  cursor:         'pointer',
  transition:     'color 0.2s',
  background:     'none',
  border:         'none',
  padding:        0,
  textAlign:      'left',
  display:        'block',
};

const Footer = () => (
  <footer style={{ background: '#0c0c0c', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
    <div className="site-container" style={{ padding: '64px 20px 40px' }}>

      {/* ── Main grid ──────────────────────────────────────────────────────── */}
      <div style={{
        display:             'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap:                 '40px 32px',
      }}>

        {/* Brand column */}
        <div style={{ gridColumn: 'span 1', minWidth: 0 }}>
          <Link to="/" onClick={() => scrollToHash('hero')} style={{ textDecoration: 'none', display: 'inline-block', marginBottom: '16px' }}>
            <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, color: 'white', fontSize: '20px', letterSpacing: '-0.02em' }}>
              Spec<span style={{ color: '#E50914' }}>360</span>
            </span>
          </Link>
          <p style={{ fontFamily: 'DM Sans, sans-serif', color: '#6e6e73', fontSize: '14px', lineHeight: 1.65, margin: '0 0 20px' }}>
            Smart Tech. Smart Solutions. Done Right.
          </p>
          {/* Socials */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {SOCIALS.map(({ href, icon: Icon, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6e6e73', transition: 'background 0.2s, color 0.2s', textDecoration: 'none' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(229,9,20,0.12)'; e.currentTarget.style.color = '#E50914'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#6e6e73'; }}
              >
                <Icon size={15} strokeWidth={1.8} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div style={{ minWidth: 0 }}>
          <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: 'white', fontSize: '13px', letterSpacing: '0.06em', textTransform: 'uppercase', margin: '0 0 18px' }}>
            Quick Links
          </p>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {NAV_LINKS.map(({ label, hash }) => (
              <li key={label}>
                <button
                  onClick={() => { window.scrollTo(0, 0); scrollToHash(hash); }}
                  style={linkStyle}
                  onMouseEnter={e => e.currentTarget.style.color = 'white'}
                  onMouseLeave={e => e.currentTarget.style.color = '#6e6e73'}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div style={{ minWidth: 0 }}>
          <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: 'white', fontSize: '13px', letterSpacing: '0.06em', textTransform: 'uppercase', margin: '0 0 18px' }}>
            Services
          </p>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {SERVICE_LINKS.map(({ label, to }) => (
              <li key={label}>
                <Link
                  to={to}
                  style={linkStyle}
                  onMouseEnter={e => e.currentTarget.style.color = 'white'}
                  onMouseLeave={e => e.currentTarget.style.color = '#6e6e73'}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div style={{ minWidth: 0 }}>
          <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: 'white', fontSize: '13px', letterSpacing: '0.06em', textTransform: 'uppercase', margin: '0 0 18px' }}>
            Contact
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { label: 'Lagos, Nigeria' },
              { label: 'Owerri, Imo State' },
              { label: '+234 818 279 9154', href: 'tel:+2348182799154' },
              { label: 'spec360ng@gmail.com', href: 'mailto:spec360ng@gmail.com' },
            ].map(({ label, href }) =>
              href ? (
                <a key={label} href={href}
                  style={linkStyle}
                  onMouseEnter={e => e.currentTarget.style.color = 'white'}
                  onMouseLeave={e => e.currentTarget.style.color = '#6e6e73'}
                >{label}</a>
              ) : (
                <span key={label} style={{ ...linkStyle, cursor: 'default' }}>{label}</span>
              )
            )}
          </div>
        </div>

      </div>

      {/* ── Bottom bar ─────────────────────────────────────────────────────── */}
      <div style={{
        marginTop:  '48px',
        paddingTop: '24px',
        borderTop:  '1px solid rgba(255,255,255,0.06)',
        display:    'flex',
        flexWrap:   'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
      }}>
        <p style={{ fontFamily: 'DM Sans, sans-serif', color: '#3a3a3a', fontSize: '13px', margin: 0 }}>
          © {new Date().getFullYear()} Spec360 Communication. All rights reserved.
        </p>
        <Link to="/admin/login"
          style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#3a3a3a', textDecoration: 'none', opacity: 0.6, transition: 'opacity 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.opacity = '1'}
          onMouseLeave={e => e.currentTarget.style.opacity = '0.6'}
        >
          Admin
        </Link>
      </div>

    </div>
  </footer>
);

export default Footer;