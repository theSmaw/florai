import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserMenu } from '../../components/UserMenu/UserMenu';
import { loadUser } from '../../stores/user/asyncActions/loadUser';
import type { AppDispatch, RootState } from '../../stores/store';

export function UserMenuContainer() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    const promise = dispatch(loadUser());
    return () => promise.abort();
  }, [dispatch]);

  return <UserMenu user={user} />;
}
