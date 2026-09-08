import { useParams } from 'react-router';
import { useFetch } from '../hooks/useFetch';
import { useCart } from '../hooks/useCart';

function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { data: product, loading } = useFetch(`https://fakestoreapi.com/products/${id}`);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="product-detail">
      <img src={product.image} alt={product.title} />
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p><strong>${product.price}</strong></p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
}

export default ProductDetail;