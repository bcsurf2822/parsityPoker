import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRoute({ element: Component, ...rest }) {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const initializing = useSelector(state => state.auth.initializing);
  const location = useLocation();

  if (initializing) {
    return <div>Loading...</div>; // or a loading spinner
  }

  return isAuthenticated 
    ? Component 
    : <Navigate to="/" state={{ from: location }} />
}

export default ProtectedRoute;