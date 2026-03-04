import { useSelector } from 'react-redux';
import { selectAuthInitialized, selectIsAuthenticated } from '../../stores/auth/selectors';
import { RequireAuth } from '../../components/RequireAuth/RequireAuth';

interface RequireAuthContainerProps {
  children: React.ReactNode;
}

export function RequireAuthContainer({ children }: RequireAuthContainerProps) {
  const initialized = useSelector(selectAuthInitialized);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <RequireAuth initialized={initialized} isAuthenticated={isAuthenticated}>
      {children}
    </RequireAuth>
  );
}
