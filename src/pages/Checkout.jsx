import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useCart } from '../context/CartContext';

function Checkout() {
  const { cartItems, cartCount, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ name: '', email: '', address: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!formData.address.trim()) newErrors.address = 'Address is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSubmitted(true);
    clearCart();
  };

  if (submitted) {
    return (
      <div className="checkout-page">
        <h2>Thank you, {formData.name}!</h2>
        <p>Your order has been placed. (Demo only — no real payment was processed.)</p>
        <button onClick={() => navigate('/')}>Continue Shopping</button>
      </div>
    );
  }

  if (cartCount === 0) {
    return (
      <div className="checkout-page">
        <h2>Checkout</h2>
        <p>Your cart is empty — add something before checking out.</p>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="name">Full Name</label>
          <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="address">Shipping Address</label>
          <input id="address" name="address" type="text" value={formData.address} onChange={handleChange} />
          {errors.address && <p className="error">{errors.address}</p>}
        </div>

        <p><strong>Total: ${total.toFixed(2)}</strong></p>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
}

export default Checkout;