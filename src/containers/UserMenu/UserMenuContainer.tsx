import { useDispatch, useSelector } from 'react-redux';
import { UserMenu } from '../../components/UserMenu/UserMenu';
import { signOut } from '../../stores/auth/slice';
import { selectSession } from '../../stores/auth/selectors';
import type { AppDispatch } from '../../stores/store';

export function UserMenuContainer() {
  const dispatch = useDispatch<AppDispatch>();
  const session = useSelector(selectSession);

  const user = session
    ? {
        id: session.user.id,
        name:
          (session.user.user_metadata?.['name'] as string | undefined) ??
          session.user.email ??
          '',
        email: session.user.email ?? '',
      }
    : null;

  function handleSignOut() {
    void dispatch(signOut());
  }

  return <UserMenu user={user} onSignOut={handleSignOut} />;
}
