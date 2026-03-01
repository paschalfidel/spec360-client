import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PhonesAccessories from './pages/PhoneAccessories';
import Repairs from './pages/Repairs';
import WebDevelopment from './pages/WebDevelopment';
import POSServices from './pages/POSServices';
import Connectivity from './pages/Connectivity';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import AdminLogin from './pages/AdminLogin';
import AdminAddProduct from './pages/AdminAddProduct';
import AdminProductList from './pages/AdminProductList';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  return (
      <BrowserRouter>
        <div className="min-h-screen bg-dark flex flex-col">
          <Navbar />
          <main className="flex-grow pt-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services/phones-accessories" element={<PhonesAccessories />} />
              <Route path="/services/repairs" element={<Repairs />} />
              <Route path="/services/web-development" element={<WebDevelopment />} />
              <Route path="/services/pos" element={<POSServices />} />
              <Route path="/services/connectivity" element={<Connectivity />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/add-product" 
              element={
               <ProtectedRoute>
                <AdminAddProduct />
               </ProtectedRoute>
              } 
              />
              <Route path="/admin/products" 
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

export default App
