import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = () => setCartCount((prev) => prev + 1);

  return (
    <BrowserRouter>
      <Navbar cartCount={cartCount} />
      <Routes>
        <Route
          path="/"
          element={<Home products={products} loading={loading} error={error} onAddToCart={handleAddToCart} />}
        />
        <Route path="/product/:id" element={<ProductDetail onAddToCart={handleAddToCart} />} />
        <Route path="/cart" element={<Cart cartCount={cartCount} />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;