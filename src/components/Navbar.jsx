// src/components/Navbar.jsx
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingCart, ChevronDown, ArrowUpRight, Search } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { fetchProducts } from '../services/api';

const navLinks = [
  { name: 'Home', to: '/', hash: 'hero' },
  { name: 'About', to: '/', hash: 'about' },
  {
    name: 'Services',
    dropdown: [
      { name: 'Phones & Accessories', to: '/services/phones-accessories' },
      { name: 'Repairs', to: '/services/repairs' },
      { name: 'Web Development', to: '/services/web-development' },
      { name: 'POS Services', to: '/services/pos' },
      { name: 'Connectivity', to: '/services/connectivity' },
      { name: 'Logistics', to: '/services/logistics' },
    ],
  },
  { name: 'Our Identity', to: '/', hash: 'vision-mission-values' },
  { name: 'Contact', to: '/', hash: 'contact' },
];

const scrollToHash = (hash) => {
  const id = hash.replace('#', '');
  setTimeout(() => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, 80);
};

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Search state
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [allProducts, setAllProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  // Refs
  const dropdownTimeout = useRef(null);
  const desktopSearchRef = useRef(null);
  const mobileSearchRef = useRef(null);
  const searchInputRef = useRef(null);

  const { cart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const cartCount = cart.reduce((t, i) => t + i.quantity, 0);

  // Scroll listener
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu and search on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileOpen(false);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileServicesOpen(false);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSearchOpen(false);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSearchQuery('');
  }, [location.pathname]);

  // Hash scroll
  useEffect(() => {
    if (location.hash) scrollToHash(location.hash);
  }, [location.pathname, location.hash]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Fetch products when search is first opened
  useEffect(() => {
    if (searchOpen && allProducts.length === 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSearchLoading(true);
      fetchProducts()
        .then(res => setAllProducts(res.data))
        .catch(() => {})
        .finally(() => setSearchLoading(false));
    }
  }, [searchOpen, allProducts.length]);

  // Focus input when search opens (with cleanup)
  useEffect(() => {
    if (searchOpen) {
      const timeoutId = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timeoutId);
    }
  }, [searchOpen]);

  // Filter products client‑side as user types
  useEffect(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSearchResults([]);
      return;
    }
    const filtered = allProducts.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      (p.description && p.description.toLowerCase().includes(q))
    ).slice(0, 6); // cap at 6 results
    setSearchResults(filtered);
  }, [searchQuery, allProducts]);

  // Close search on outside click (uses correct container based on viewport)
  useEffect(() => {
    const handleClick = (e) => {
      // Determine which container is currently active
      const isMobile = window.innerWidth < 768;
      const container = isMobile ? mobileSearchRef.current : desktopSearchRef.current;
      if (container && !container.contains(e.target)) {
        setSearchOpen(false);
        setSearchQuery('');
      }
    };
    if (searchOpen) {
      document.addEventListener('mousedown', handleClick);
    }
    return () => document.removeEventListener('mousedown', handleClick);
  }, [searchOpen]);

  // Esc key closes search
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setSearchQuery('');
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  const handleDropdownEnter = () => {
    clearTimeout(dropdownTimeout.current);
    setDropdownOpen(true);
  };
  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setDropdownOpen(false), 150);
  };

  const handleHashClick = (e, link) => {
    setMobileOpen(false);
    setDropdownOpen(false);
    if (link.hash && location.pathname === '/') {
      e.preventDefault();
      scrollToHash(`#${link.hash}`);
    }
  };

  const isActive = (link) => {
    if (link.dropdown) return link.dropdown.some(d => location.pathname === d.to);
    return location.pathname === link.to && !link.hash;
  };

  const handleResultClick = (product) => {
    setSearchOpen(false);
    setSearchQuery('');
    navigate(`/product/${product._id}`);
  };

  return (
    <>
      {/* ── Main Navbar ───────────────────────────────────────────────────── */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#080808]/95 backdrop-blur-2xl border-b border-white/[0.06]'
            : 'bg-transparent'
        }`}
        style={{ padding: scrolled ? '18px 0' : '24px 0' }}
      >
        <div className="site-container flex items-center justify-between" style={{ gap: '24px' }}>

          {/* ── Logo ── */}
          <Link to="/" onClick={() => scrollToHash('#hero')}
            className="flex items-center flex-shrink-0" style={{ gap: '10px' }}>
            <img src="/images/spec360-logo.PNG" alt="Spec360" style={{ height: '42px', width: 'auto' }}
              onError={e => { e.target.style.display = 'none'; }} />
            <span className="font-display font-bold text-white tracking-tight" style={{ fontSize: '23px' }}>
              Spec<span className="text-accent">360</span>
            </span>
          </Link>

          {/* ── Desktop Nav Links ── */}
          <div className="hidden md:flex items-center flex-1" style={{ gap: '40px', justifyContent: 'center' }}>
            {navLinks.map(link => {
              if (link.dropdown) {
                return (
                  <div key={link.name} className="relative"
                    onMouseEnter={handleDropdownEnter} onMouseLeave={handleDropdownLeave}>
                    <button
                      className={`nav-link flex items-center font-body font-medium transition-colors duration-200 ${
                        isActive(link) ? 'text-white active' : 'text-[#a1a1a6] hover:text-white'
                      }`}
                      style={{ fontSize: '16px', gap: '6px' }}
                    >
                      {link.name}
                      <ChevronDown size={15} className={`transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.97 }}
                          transition={{ duration: 0.18 }}
                          onMouseEnter={handleDropdownEnter}
                          onMouseLeave={handleDropdownLeave}
                          className="absolute left-1/2 -translate-x-1/2 bg-[#141414] border border-white/[0.08] rounded-2xl shadow-2xl shadow-black/60 overflow-hidden"
                          style={{ top: 'calc(100% + 16px)', width: '230px', padding: '8px 0' }}
                        >
                          {link.dropdown.map(item => (
                            <Link key={item.name} to={item.to} onClick={() => setDropdownOpen(false)}
                              className={`flex items-center justify-between font-body transition-all duration-200 group ${
                                location.pathname === item.to
                                  ? 'text-white bg-white/[0.06]'
                                  : 'text-[#a1a1a6] hover:text-white hover:bg-white/[0.04]'
                              }`}
                              style={{ padding: '13px 20px', fontSize: '15px' }}
                            >
                              <span>{item.name}</span>
                              <ArrowUpRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity text-accent flex-shrink-0" />
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }
              return (
                <Link key={link.name}
                  to={link.hash ? `${link.to}#${link.hash}` : link.to}
                  onClick={e => handleHashClick(e, link)}
                  className={`nav-link font-body font-medium transition-colors duration-200 ${
                    isActive(link) ? 'text-white active' : 'text-[#a1a1a6] hover:text-white'
                  }`}
                  style={{ fontSize: '16px' }}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* ── Desktop Right: Search + Cart + CTA ── */}
          <div className="hidden md:flex items-center flex-shrink-0" style={{ gap: '14px' }}>

            {/* Search - desktop */}
            <div ref={desktopSearchRef} className="relative">
              <AnimatePresence mode="wait">
                {searchOpen ? (
                  <motion.div
                    key="search-input"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: '240px' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="relative overflow-hidden"
                    style={{ borderRadius: '100px' }}
                  >
                    <Search size={15} className="absolute text-[#6e6e73] pointer-events-none"
                      style={{ left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="font-body text-white placeholder-[#6e6e73] outline-none w-full"
                      style={{
                        background: 'rgba(255,255,255,0.07)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: '100px',
                        padding: '9px 36px 9px 38px',
                        fontSize: '14px',
                      }}
                    />
                    <button onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                      className="absolute text-[#6e6e73] hover:text-white transition-colors"
                      style={{ right: '12px', top: '50%', transform: 'translateY(-50%)' }}>
                      <X size={14} />
                    </button>
                  </motion.div>
                ) : (
                  <motion.button
                    key="search-icon"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSearchOpen(true)}
                    className="text-[#a1a1a6] hover:text-white transition-colors duration-200"
                    aria-label="Search products"
                  >
                    <Search size={21} strokeWidth={1.5} />
                  </motion.button>
                )}
              </AnimatePresence>

              {/* Search Results Dropdown (desktop) */}
              <AnimatePresence>
                {searchOpen && searchQuery.trim() && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 bg-[#141414] border border-white/[0.08] rounded-2xl shadow-2xl shadow-black/60 overflow-hidden"
                    style={{ top: 'calc(100% + 12px)', width: '300px', zIndex: 100 }}
                  >
                    {searchLoading ? (
                      <div className="font-body text-[#6e6e73] text-center" style={{ padding: '20px', fontSize: '14px' }}>
                        Searching...
                      </div>
                    ) : searchResults.length === 0 ? (
                      <div className="font-body text-[#6e6e73] text-center" style={{ padding: '20px', fontSize: '14px' }}>
                        No products found for "{searchQuery}"
                      </div>
                    ) : (
                      <>
                        <div className="font-body text-[#3a3a3a] uppercase tracking-wider"
                          style={{ padding: '12px 16px 8px', fontSize: '11px' }}>
                          {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
                        </div>
                        {searchResults.map(product => (
                          <button key={product._id} onClick={() => handleResultClick(product)}
                            className="w-full flex items-center hover:bg-white/[0.04] transition-colors text-left"
                            style={{ padding: '10px 16px', gap: '12px' }}>
                            {/* Thumbnail */}
                            <div className="rounded-lg overflow-hidden flex-shrink-0"
                              style={{ width: '40px', height: '40px', background: '#1a1a1a' }}>
                              {product.imageUrl
                                ? <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                                : <div className="w-full h-full flex items-center justify-center text-[#3a3a3a]" style={{ fontSize: '10px' }}>IMG</div>
                              }
                            </div>
                            {/* Info */}
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <p className="font-display font-semibold text-white truncate" style={{ fontSize: '14px' }}>{product.name}</p>
                              <p className="font-body text-accent font-medium" style={{ fontSize: '12px', marginTop: '1px' }}>
                                ₦{Number(product.price).toLocaleString()}
                              </p>
                            </div>
                            <span className="font-body text-[#6e6e73] capitalize flex-shrink-0"
                              style={{ fontSize: '11px', background: 'rgba(255,255,255,0.05)', padding: '3px 8px', borderRadius: '100px' }}>
                              {product.category}
                            </span>
                          </button>
                        ))}
                        {/* View all link */}
                        <Link to="/services/phones-accessories"
                          onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                          className="flex items-center justify-center gap-1.5 font-body text-accent hover:text-white transition-colors"
                          style={{ padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.06)', fontSize: '13px' }}>
                          View all products
                          <ArrowUpRight size={13} />
                        </Link>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Cart */}
            <Link to="/cart" className="relative text-[#a1a1a6] hover:text-white transition-colors duration-200">
              <ShoppingCart size={21} strokeWidth={1.5} />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                    className="absolute bg-accent text-white font-display font-bold rounded-full flex items-center justify-center"
                    style={{ top: '-9px', right: '-9px', width: '18px', height: '18px', fontSize: '10px' }}>
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            {/* CTA */}
            <Link to="/#contact"
              onClick={e => { if (location.pathname === '/') { e.preventDefault(); scrollToHash('#contact'); } }}
              className="btn-primary" style={{ fontSize: '15px', padding: '12px 24px' }}>
              Get in Touch
            </Link>
          </div>

          {/* ── Mobile: Search + Cart + Hamburger ── */}
          <div className="flex md:hidden items-center" style={{ gap: '14px' }}>
            <button onClick={() => setSearchOpen(p => !p)}
              className="text-[#a1a1a6] hover:text-white transition-colors" aria-label="Search">
              <Search size={21} strokeWidth={1.5} />
            </button>
            <Link to="/cart" className="relative text-[#a1a1a6] hover:text-white transition-colors">
              <ShoppingCart size={21} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute bg-accent text-white font-bold rounded-full flex items-center justify-center"
                  style={{ top: '-9px', right: '-9px', width: '18px', height: '18px', fontSize: '10px' }}>
                  {cartCount}
                </span>
              )}
            </Link>
            <button onClick={() => setMobileOpen(p => !p)}
              className="text-[#a1a1a6] hover:text-white transition-colors" aria-label="Toggle menu">
              {mobileOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        {/* ── Mobile Search Bar (below navbar) ── */}
        <AnimatePresence>
          {searchOpen && !mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="md:hidden overflow-hidden"
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: '#080808' }}
            >
              <div ref={mobileSearchRef} className="site-container" style={{ padding: '12px 20px' }}>
                <div className="relative">
                  <Search size={15} className="absolute text-[#6e6e73] pointer-events-none"
                    style={{ left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="font-body text-white placeholder-[#6e6e73] outline-none w-full"
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      padding: '12px 40px 12px 40px',
                      fontSize: '15px',
                    }}
                    autoFocus
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')}
                      className="absolute text-[#6e6e73] hover:text-white transition-colors"
                      style={{ right: '14px', top: '50%', transform: 'translateY(-50%)' }}>
                      <X size={15} />
                    </button>
                  )}
                </div>

                {/* Mobile search results */}
                {searchQuery.trim() && (
                  <div className="bg-[#111] border border-white/[0.07] rounded-xl overflow-hidden"
                    style={{ marginTop: '10px' }}>
                    {searchLoading ? (
                      <p className="font-body text-[#6e6e73] text-center" style={{ padding: '16px', fontSize: '14px' }}>Searching...</p>
                    ) : searchResults.length === 0 ? (
                      <p className="font-body text-[#6e6e73] text-center" style={{ padding: '16px', fontSize: '14px' }}>
                        No products found for "{searchQuery}"
                      </p>
                    ) : (
                      <>
                        {searchResults.map(product => (
                          <button key={product._id} onClick={() => handleResultClick(product)}
                            className="w-full flex items-center hover:bg-white/[0.04] transition-colors text-left"
                            style={{ padding: '12px 16px', gap: '12px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                            <div className="rounded-lg overflow-hidden flex-shrink-0"
                              style={{ width: '44px', height: '44px', background: '#1a1a1a' }}>
                              {product.imageUrl
                                ? <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                                : <div className="w-full h-full" />
                              }
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <p className="font-display font-semibold text-white truncate" style={{ fontSize: '15px' }}>{product.name}</p>
                              <p className="font-body text-accent font-medium" style={{ fontSize: '13px', marginTop: '2px' }}>
                                ₦{Number(product.price).toLocaleString()}
                              </p>
                            </div>
                            <ArrowUpRight size={15} className="text-[#6e6e73] flex-shrink-0" />
                          </button>
                        ))}
                        <Link to="/services/phones-accessories"
                          onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                          className="flex items-center justify-center gap-1.5 font-body text-accent"
                          style={{ padding: '12px 16px', fontSize: '13px' }}>
                          View all products <ArrowUpRight size={13} />
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ── Mobile Menu Overlay ───────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-overlay"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-40 md:hidden flex flex-col"
            style={{ background: '#080808', overflowY: 'auto' }}
          >
            {/* Mobile header */}
            <div className="flex items-center justify-between"
              style={{ padding: '18px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
              <Link to="/" onClick={() => { setMobileOpen(false); scrollToHash('#hero'); }}
                className="flex items-center" style={{ gap: '8px' }}>
                <img src="/images/spec360-logo.PNG" alt="Spec360" style={{ height: '36px', width: 'auto' }}
                  onError={e => { e.target.style.display = 'none'; }} />
                <span className="font-display font-bold text-white tracking-tight" style={{ fontSize: '20px' }}>
                  Spec<span className="text-accent">360</span>
                </span>
              </Link>
              <button onClick={() => setMobileOpen(false)}
                className="text-[#a1a1a6] hover:text-white transition-colors" aria-label="Close menu">
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            {/* Nav links */}
            <nav style={{ padding: '8px 0', flex: 1 }}>
              {navLinks.map((link, i) => {
                if (link.dropdown) {
                  return (
                    <div key={link.name}>
                      <motion.button
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        onClick={() => setMobileServicesOpen(p => !p)}
                        className="w-full flex items-center justify-between font-display font-semibold text-white hover:text-accent transition-colors"
                        style={{ padding: '18px 20px', fontSize: '20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
                      >
                        <span>{link.name}</span>
                        <ChevronDown size={20} className={`transition-transform duration-300 text-[#6e6e73] ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                      </motion.button>

                      <AnimatePresence>
                        {mobileServicesOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            style={{ overflow: 'hidden', background: 'rgba(255,255,255,0.02)' }}
                          >
                            {link.dropdown.map((item, j) => (
                              <motion.div key={item.name}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: j * 0.04 }}>
                                <Link to={item.to} onClick={() => setMobileOpen(false)}
                                  className={`flex items-center justify-between font-body transition-colors ${
                                    location.pathname === item.to ? 'text-accent' : 'text-[#a1a1a6] hover:text-white'
                                  }`}
                                  style={{ padding: '16px 20px 16px 36px', fontSize: '16px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                                  <span>{item.name}</span>
                                  <ArrowUpRight size={15} className="text-accent flex-shrink-0" style={{ marginLeft: '8px' }} />
                                </Link>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <motion.div key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}>
                    <Link
                      to={link.hash ? `${link.to}#${link.hash}` : link.to}
                      onClick={e => handleHashClick(e, link)}
                      className={`block font-display font-semibold hover:text-accent transition-colors ${
                        isActive(link) ? 'text-accent' : 'text-white'
                      }`}
                      style={{ padding: '18px 20px', fontSize: '20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{ padding: '20px', borderTop: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}
            >
              <Link to="/#contact"
                onClick={() => { setMobileOpen(false); scrollToHash('#contact'); }}
                className="btn-primary w-full justify-center"
                style={{ fontSize: '17px', padding: '18px 24px' }}>
                Get in Touch
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;