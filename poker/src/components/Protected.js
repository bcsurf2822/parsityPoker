import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRoute({ element: Component, ...rest }) {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const location = useLocation();

  return isAuthenticated 
    ? Component 
    : <Navigate to="/" state={{ from: location }} />
}

export default ProtectedRoute;