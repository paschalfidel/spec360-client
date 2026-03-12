// src/App.jsx
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ProtectedRoute from './components/ProtectedRoute';
import ExitIntentPopup from './components/ExitIntentPopup';
import { DarkModeProvider } from './context/DarkModeContext';

// ── Lazy-loaded routes for code splitting ────────────────────────────────────
const Home             = lazy(() => import('./pages/Home'));
const PhonesAccessories= lazy(() => import('./pages/PhonesAccessories'));
const Repairs          = lazy(() => import('./pages/Repairs'));
const WebDevelopment   = lazy(() => import('./pages/WebDevelopment'));
const POSServices      = lazy(() => import('./pages/POSServices'));
const Connectivity     = lazy(() => import('./pages/Connectivity'));
const Logistics        = lazy(() => import('./pages/Logistics'));
const ProductDetail    = lazy(() => import('./pages/ProductDetail'));
const Cart             = lazy(() => import('./pages/Cart'));
const AdminLogin       = lazy(() => import('./pages/AdminLogin'));
const AdminAddProduct  = lazy(() => import('./pages/AdminAddProduct'));
const AdminProductList = lazy(() => import('./pages/AdminProductList'));

// Loading fallback — minimal, on-brand
const PageLoader = () => (
  <div style={{
    minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: '#080808'
  }}>
    <div style={{
      width: '32px', height: '32px', borderRadius: '50%',
      border: '2px solid rgba(229,9,20,0.2)',
      borderTopColor: '#E50914',
      animation: 'spin 0.7s linear infinite'
    }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

// Track page views in GA4 on each route change
function GAPageTracker() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', { page_path: pathname });
    }
  }, [pathname]);
  return null;
}

function App() {
  return (
    <DarkModeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <GAPageTracker />
        <div style={{
          minHeight: '100vh', display: 'flex', flexDirection: 'column',
          backgroundColor: '#080808'
        }}>
          <Navbar />
          <main style={{ flex: 1, width: '100%' }}>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/"                        element={<Home />} />
                <Route path="/services/phones-accessories" element={<PhonesAccessories />} />
                <Route path="/services/repairs"        element={<Repairs />} />
                <Route path="/services/web-development" element={<WebDevelopment />} />
                <Route path="/services/pos"            element={<POSServices />} />
                <Route path="/services/connectivity"   element={<Connectivity />} />
                <Route path="/services/logistics"      element={<Logistics />} />
                <Route path="/product/:id"             element={<ProductDetail />} />
                <Route path="/cart"                    element={<Cart />} />
                <Route path="/admin/login"             element={<AdminLogin />} />
                <Route path="/admin/add-product" element={
                  <ProtectedRoute><AdminAddProduct /></ProtectedRoute>
                } />
                <Route path="/admin/products" element={
                  <ProtectedRoute><AdminProductList /></ProtectedRoute>
                } />
              </Routes>
            </Suspense>
          </main>
          <Footer />
          <WhatsAppButton />
          <ExitIntentPopup />
        </div>
      </BrowserRouter>
    </DarkModeProvider>
  );
}

export default App;
