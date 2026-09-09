import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../hooks/useAuth';

function RequireAuth({ children }) {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    return (
      <Navigate
        to="/login"
        state={{ message: 'Log in to continue to checkout.' }}
        replace
      />
    );
  }

  return children;
}

export default RequireAuth;