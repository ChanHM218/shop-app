import { Link } from 'react-router';
import { useCart } from '../context/CartContext';

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.title} />
        <h3>{product.title}</h3>
      </Link>
      <p>${product.price}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
}

export default ProductCard;