import { Link, useNavigate } from 'react-router';
import { useCart } from '../hooks/useCart';

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    const added = addToCart(product);
    if (!added) {
      navigate('/login', { state: { message: 'Log in to add items to your cart.' } });
    }
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.title} />
        <h3>{product.title}</h3>
      </Link>
      <p>${product.price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}

export default ProductCard;