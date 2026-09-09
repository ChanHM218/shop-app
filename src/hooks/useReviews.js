import { useState, useEffect } from 'react';

const API_URL = 'https://jsonplaceholder.typicode.com/comments';

export function useReviews(productId) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}?postId=${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data.slice(0, 3));
        setLoading(false);
      });
  }, [productId]);

  const addReview = (name, body) => {
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId: productId, name, body }),
    })
      .then((res) => res.json())
      .then((newReview) => {
        setReviews((prev) => [newReview, ...prev]);
      });
  };

  const deleteReview = (id) => {
    fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      .then(() => {
        setReviews((prev) => prev.filter((review) => review.id !== id));
      });
  };

  return { reviews, loading, addReview, deleteReview };
}