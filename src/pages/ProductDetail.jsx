import { useState } from 'react';
import { useParams } from 'react-router';
import { useFetch } from '../hooks/useFetch';
import { useCart } from '../hooks/useCart';
import { useReviews } from '../hooks/useReviews';

function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { data: product, loading } = useFetch(`https://fakestoreapi.com/products/${id}`);
  const { reviews, addReview, deleteReview } = useReviews(id);

  const [name, setName] = useState('');
  const [comment, setComment] = useState('');

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    addReview(name, comment);
    setName('');
    setComment('');
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="product-detail">
      <img src={product.image} alt={product.title} />
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p><strong>${product.price}</strong></p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>

      <div className="reviews">
        <h3>Customer Reviews</h3>

        {reviews.map((review) => (
          <div key={review.id} className="review">
            <strong>{review.name}</strong>
            <p>{review.body}</p>
            <button onClick={() => deleteReview(review.id)}>Delete</button>
          </div>
        ))}

        <form onSubmit={handleReviewSubmit}>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <textarea
            placeholder="Write a review..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
          <button type="submit">Submit Review</button>
        </form>
      </div>
    </div>
  );
}

export default ProductDetail;