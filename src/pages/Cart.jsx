import { Link } from 'react-router';
import { useCart } from '../context/CartContext';

function Cart() {
  const { cartItems, removeFromCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <h2>Your Cart</h2>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cartItems.map((item) => (
        <div key={item.id} className="cart-line">
          <img src={item.image} alt={item.title} width="50" />
          <span>{item.title}</span>
          <span>Qty: {item.quantity}</span>
          <span>${(item.price * item.quantity).toFixed(2)}</span>
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}
      <h3>Total: ${total.toFixed(2)}</h3>
      <Link to="/checkout">
        <button>Proceed to Checkout</button>
      </Link>
    </div>
  );
}

export default Cart;