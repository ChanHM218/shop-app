import { Link } from 'react-router';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';

function Navbar() {
  const { cartCount } = useCart();
  const { isLoggedIn, username, logout } = useAuth();

  return (
    <nav className="navbar">
      <Link to="/" className="logo">My Shop</Link>
      <div className="nav-links">
        <Link to="/cart">Cart ({cartCount})</Link>
        {isLoggedIn ? (
          <>
            <span>Hi, {username}</span>
            <button onClick={logout}>Log Out</button>
          </>
        ) : (
          <Link to="/login">Log In</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;