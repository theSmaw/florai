import { Navigate, useLocation } from 'react-router-dom';

interface RequireAuthProps {
  children: React.ReactNode;
  initialized: boolean;
  isAuthenticated: boolean;
}

export function RequireAuth({ children, initialized, isAuthenticated }: RequireAuthProps) {
  const location = useLocation();

  // Wait for the initial Supabase session check before deciding to redirect.
  if (!initialized) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
