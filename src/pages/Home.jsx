import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

function Home({ products, loading, error }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Something went wrong: {error}</p>;

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <div className="filters">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {filteredProducts.length === 0 ? (
        <p>No products match your search.</p>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;