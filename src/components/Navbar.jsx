// Navbar.jsx
import { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const navLinks = [
  { name: 'Home', to: '/', hash: 'hero' },
  { name: 'About', to: '/', hash: 'about' },
  { name: 'Services', to: '/', hash: 'services' },
  { name: 'Our Identity', to: '/', hash: 'vision-mission-values' },
  { name: 'Contact', to: '/', hash: 'contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cart } = useCart();
  const location = useLocation();

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll when landing on home with hash
  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  const handleLinkClick = () => setIsOpen(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed w-full z-50 transition-all ${
        scrolled ? 'bg-dark/95 backdrop-blur-sm py-3 shadow-lg' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo + Brand Name */}
        <Link to="/" className="flex items-center flex-shrink-0">
          <img
            src="/images/spec360-logo.PNG"
            alt="Spec360 Logo"
            className="h-8 md:h-10 w-auto mr-2"
          />
          <span className="text-white font-bold text-lg md:text-xl whitespace-nowrap">
            Spec360<span className="text-accent">Communication</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.hash ? `${link.to}#${link.hash}` : link.to}
              className="text-sm lg:text-base text-gray-300 hover:text-accent transition cursor-pointer whitespace-nowrap"
              onClick={handleLinkClick}
            >
              {link.name}
            </Link>
          ))}
          {/* Cart Icon */}
          <Link to="/cart" className="relative text-white hover:text-accent ml-2">
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile: Cart + Hamburger */}
        <div className="flex items-center gap-3 md:hidden">
          <Link to="/cart" className="relative text-white hover:text-accent">
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          <button className="text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-dark/95 backdrop-blur-sm px-6 py-4"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.hash ? `${link.to}#${link.hash}` : link.to}
              className="block py-3 text-gray-300 hover:text-accent transition cursor-pointer"
              onClick={handleLinkClick}
            >
              {link.name}
            </Link>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;