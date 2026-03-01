import { Link as ScrollLink } from 'react-scroll';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer
      className="relative border-t border-white/10 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/footer.png')" }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      <div className="container mx-auto px-6 py-16 relative z-10">
        {/* Responsive grid: 1 col mobile, 2 cols medium, 3 cols large */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Column 1: Brand + Connect (on medium) */}
          <div className="flex flex-col space-y-8 text-center md:text-left">
            {/* Brand */}
            <div>
              <h3 className="text-3xl font-bold text-white tracking-tight">
                Spec360<span className="text-accent">Communication</span>
              </h3>
              <p className="mt-4 text-gray-400 max-w-sm mx-auto md:mx-0">
                Smart Tech. Smart Solutions. Done Right.
              </p>
            </div>

            {/* Connect - visible only on medium screens (hidden on large) */}
            <div className="md:block lg:hidden">
              <h4 className="text-white font-semibold text-lg mb-4">Connect</h4>
              <div className="flex justify-center md:justify-start gap-6 mb-6">
                <a
                  href="https://www.instagram.com/gadgetsbyspec360/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white/5 hover:bg-accent/20 transition-all duration-300 text-gray-400 hover:text-accent"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="https://x.com/paschalomens"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white/5 hover:bg-accent/20 transition-all duration-300 text-gray-400 hover:text-accent"
                >
                  <Twitter size={20} />
                </a>
                <a
                  href="https://web.facebook.com/spec360com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white/5 hover:bg-accent/20 transition-all duration-300 text-gray-400 hover:text-accent"
                >
                  <Facebook size={20} />
                </a>
              </div>
              <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} Spec360 Communication. All rights reserved.
              </p>
              <p className="text-gray-600 text-xs mt-4">
                <Link to="/admin/login" className="hover:text-accent opacity-50 hover:opacity-100">
                  Admin
                </Link>
              </p>
            </div>
          </div>

          {/* Column 2: Quick Links (centered) */}
          <div className="flex flex-col items-center">
            <h4 className="text-white font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3 text-gray-400 text-center">
              <li>
                <ScrollLink to="hero" smooth duration={500} className="hover:text-accent transition-colors cursor-pointer">
                  Home
                </ScrollLink>
              </li>
              <li>
                <ScrollLink to="about" smooth duration={500} className="hover:text-accent transition-colors cursor-pointer">
                  About
                </ScrollLink>
              </li>
              <li>
                <ScrollLink to="services" smooth duration={500} className="hover:text-accent transition-colors cursor-pointer">
                  Services
                </ScrollLink>
              </li>
              <li>
                <ScrollLink to="vision-mission-values" smooth duration={500} className="hover:text-accent transition-colors cursor-pointer">
                  Our Identity
                </ScrollLink>
              </li>
              <li>
                <ScrollLink to="contact" smooth duration={500} className="hover:text-accent transition-colors cursor-pointer">
                  Contact
                </ScrollLink>
              </li>
            </ul>
          </div>

          {/* Column 3: Connect (visible only on large screens) */}
          <div className="hidden lg:block text-center lg:text-right">
            <h4 className="text-white font-semibold text-lg mb-4">Connect</h4>
            <div className="flex justify-center lg:justify-end gap-6 mb-6">
              <a
                href="https://www.instagram.com/gadgetsbyspec360/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 hover:bg-accent/20 transition-all duration-300 text-gray-400 hover:text-accent"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://x.com/paschalomens"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 hover:bg-accent/20 transition-all duration-300 text-gray-400 hover:text-accent"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://web.facebook.com/spec360com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 hover:bg-accent/20 transition-all duration-300 text-gray-400 hover:text-accent"
              >
                <Facebook size={20} />
              </a>
            </div>
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Spec360 Communication. All rights reserved.
            </p>
            <p className="text-gray-600 text-xs mt-4">
              <Link to="/admin/login" className="hover:text-accent opacity-50 hover:opacity-100">
                Admin
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;