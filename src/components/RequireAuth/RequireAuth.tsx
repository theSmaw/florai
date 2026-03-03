import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthInitialized, selectIsAuthenticated } from '../../stores/auth/selectors';

interface RequireAuthProps {
  children: React.ReactNode;
}

export function RequireAuth({ children }: RequireAuthProps) {
  const initialized = useSelector(selectAuthInitialized);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const location = useLocation();

  // Wait for the initial Supabase session check before deciding to redirect.
  // Without this, the Redux session starts as null and causes an immediate
  // redirect to /login on every page load, before getSession() resolves.
  if (!initialized) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
