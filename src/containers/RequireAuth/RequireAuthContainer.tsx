import { useSelector } from 'react-redux';
import { selectAuthInitialized } from '../../stores/auth/selectors/selectAuthInitialized';
import { selectIsAuthenticated } from '../../stores/auth/selectors/selectIsAuthenticated';
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
