import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProductForm from './pages/ProductForm';
import Sell from './pages/Sell';
import ProductDetails from './pages/ProductDetails';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [wishlist, setWishlist] = React.useState([]);

  React.useEffect(() => {
    const storedAuth = localStorage.getItem('campusmart_auth') === 'true';
    setIsAuthenticated(storedAuth);
    const storedWishlist = JSON.parse(localStorage.getItem('campusmart_wishlist') || '[]');
    setWishlist(storedWishlist);
  }, []);

  const handleAuth = (value) => {
    setIsAuthenticated(value);
    localStorage.setItem('campusmart_auth', value ? 'true' : 'false');
  };

  const addToWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) return prev;
      const updated = [...prev, product];
      localStorage.setItem('campusmart_wishlist', JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prev) => {
      const updated = prev.filter((p) => p.id !== productId);
      localStorage.setItem('campusmart_wishlist', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <Router>
      <Navbar
        isAuthenticated={isAuthenticated}
        onSignOut={() => handleAuth(false)}
        wishlistCount={wishlist.length}
      />
      <div className="app-container">
        <Routes>
          <Route path="/" element={
            <Home
              wishlist={wishlist}
              onAddToWishlist={addToWishlist}
              onRemoveFromWishlist={removeFromWishlist}
            />
          } />
          <Route path="/wishlist" element={
            <Wishlist wishlist={wishlist} onRemove={removeFromWishlist} />
          } />
          <Route path="/post-item" element={<ProductForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login setAuth={handleAuth} />} />
          <Route path="/register" element={<Register setAuth={handleAuth} />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/add-product" element={<ProductForm />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;