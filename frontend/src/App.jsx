import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import ShopPage from './pages/ShopPage';
import PortfolioPage from './pages/PortfolioPage';
import ProductPage from './pages/ProductPage';
import EngineersPage from './pages/EngineersPage';
import ContactPage from './pages/ContactPage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import AboutPage from './pages/AboutPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DesignerDashboard from './pages/DesignerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import MetalTagsPage from './pages/MetalTagsPage';
import CartPage from './pages/CartPage';
import PurchasesPage from './pages/PurchasesPage';
import Preloader from './components/Preloader';
import ScrollToTop from './components/ScrollToTop';
import CartDrawer from './components/CartDrawer';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ThemeProvider>
      <CartProvider>
        <AnimatePresence>
          {isLoading && <Preloader onLoadingComplete={() => setIsLoading(false)} />}
        </AnimatePresence>

        {!isLoading && (
          <Router>
            <div className="w-full overflow-x-hidden relative min-h-screen">
              <ScrollToTop />
              <CartDrawer />
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/portfolio" element={<PortfolioPage />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/engineers" element={<EngineersPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/services/:id" element={<ServiceDetailPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/dashboard" element={<DesignerDashboard />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/metal-tags" element={<MetalTagsPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/my-purchases" element={<PurchasesPage />} />
              </Routes>
            </div>
          </Router>
        )}
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
