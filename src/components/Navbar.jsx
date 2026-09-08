import { Link } from 'react-router';
import { useCart } from '../hooks/useCart';

function Navbar() {
  const { cartCount } = useCart();

  return (
    <nav className="navbar">
      <Link to="/" className="logo">My Shop</Link>
      <Link to="/cart">Cart ({cartCount})</Link>
    </nav>
  );
}

export default Navbar;