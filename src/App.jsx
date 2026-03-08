import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import PhonesAccessories from './pages/PhonesAccessories';
import Repairs from './pages/Repairs';
import WebDevelopment from './pages/WebDevelopment';
import POSServices from './pages/POSServices';
import Connectivity from './pages/Connectivity';
import Logistics from './pages/Logistics';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import AdminLogin from './pages/AdminLogin';
import AdminAddProduct from './pages/AdminAddProduct';
import AdminProductList from './pages/AdminProductList';
import ProtectedRoute from './components/ProtectedRoute';

/* ScrollToTop: every route change scrolls to top so navbar never overlaps */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      {/*
        NO pt-* on the root div or any wrapper.
        Each page/component owns its own top spacing.
        Navbar is fixed; pages that need clearance use padding-top internally.
        Hero is full-bleed and sits behind the transparent navbar intentionally.
      */}
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#080808' }}>
        <Navbar />
        <main style={{ flex: 1, width: '100%' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services/phones-accessories" element={<PhonesAccessories />} />
            <Route path="/services/repairs" element={<Repairs />} />
            <Route path="/services/web-development" element={<WebDevelopment />} />
            <Route path="/services/pos" element={<POSServices />} />
            <Route path="/services/connectivity" element={<Connectivity />} />
            <Route path="/services/logistics" element={<Logistics />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/add-product"
              element={
                <ProtectedRoute>
                  <AdminAddProduct />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/products"
              element={
                <ProtectedRoute>
                  <AdminProductList />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </BrowserRouter>
  );
}

export default App;
