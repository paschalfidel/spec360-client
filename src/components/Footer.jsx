// src/components/Footer.jsx
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook } from 'lucide-react';

const scrollTo = id => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

const Footer = () => {
  const year = new Date().getFullYear();
  const quickLinks = [
    { label: 'Home', hash: 'hero' },
    { label: 'About', hash: 'about' },
    { label: 'Services', hash: 'services' },
    { label: 'Our Identity', hash: 'vision-mission-values' },
    { label: 'Contact', hash: 'contact' },
  ];
  const serviceLinks = [
    { label: 'Phones & Accessories', to: '/services/phones-accessories' },
    { label: 'Repairs', to: '/services/repairs' },
    { label: 'Web Development', to: '/services/web-development' },
    { label: 'POS Services', to: '/services/pos' },
    { label: 'Connectivity', to: '/services/connectivity' },
    { label: 'Logistics', to: '/services/logistics' },
  ];
  const socials = [
    { icon: Instagram, href: 'https://www.instagram.com/gadgetsbyspec360/', label: 'Instagram' },
    { icon: Twitter, href: 'https://x.com/paschalomens', label: 'X' },
    { icon: Facebook, href: 'https://web.facebook.com/spec360com', label: 'Facebook' },
  ];

  return (
    <footer style={{ background: '#080808', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="site-container" style={{ paddingTop: '64px', paddingBottom: '64px' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4" style={{ gap: '48px' }}>

          {/* Brand */}
          <div>
            <div className="font-display font-bold text-white" style={{ fontSize: '20px', marginBottom: '12px' }}>
              Spec<span className="text-accent">360</span>
            </div>
            <p className="font-body text-[#6e6e73] leading-relaxed" style={{ fontSize: '13px', maxWidth: '200px', marginBottom: '24px' }}>
              Smart Tech. Smart Solutions. Done Right.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              {socials.map((s, i) => {
                const Icon = s.icon;
                return (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                    className="flex items-center justify-center text-[#6e6e73] hover:text-white transition-all duration-300 hover:border-white/20"
                    style={{ width: '36px', height: '36px', background: '#141414', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '8px' }}>
                    <Icon size={14} strokeWidth={1.5} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigate */}
          <div>
            <p className="font-display font-semibold text-white uppercase tracking-wider" style={{ fontSize: '12px', marginBottom: '20px' }}>Navigate</p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {quickLinks.map(link => (
                <li key={link.label}>
                  <button onClick={() => scrollTo(link.hash)}
                    className="font-body text-[#6e6e73] hover:text-white transition-colors duration-200 text-left"
                    style={{ fontSize: '14px' }}>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="font-display font-semibold text-white uppercase tracking-wider" style={{ fontSize: '12px', marginBottom: '20px' }}>Services</p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {serviceLinks.map(link => (
                <li key={link.label}>
                  <Link to={link.to} className="font-body text-[#6e6e73] hover:text-white transition-colors duration-200" style={{ fontSize: '14px' }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-display font-semibold text-white uppercase tracking-wider" style={{ fontSize: '12px', marginBottom: '20px' }}>Get In Touch</p>
            <div className="font-body text-[#6e6e73]" style={{ fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <p style={{ lineHeight: '1.6' }}>70 Njemanze Street,<br />Owerri Municipal, Imo</p>
              <a href="tel:08182799154" className="hover:text-white transition-colors">0818 279 9154</a>
              <a href="mailto:info@spec360.com.ng" className="hover:text-white transition-colors">info@spec360.com.ng</a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="site-container" style={{ paddingTop: '18px', paddingBottom: '18px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <p className="font-body text-[#3a3a3a]" style={{ fontSize: '12px' }}>© {year} Spec360 Communication. All rights reserved.</p>
          <Link to="/admin/login" className="font-body text-[#2a2a2a] hover:text-[#6e6e73] transition-colors" style={{ fontSize: '11px' }}>Admin</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
