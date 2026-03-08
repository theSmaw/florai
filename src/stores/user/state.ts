import type { User } from '../../domain/User';
import type { AsyncAction } from '../AsyncAction';

export interface UserState {
  /** The authenticated user's profile. Null until loadUser completes. */
  user: User | null;
  /** Tracks the lifecycle of the loadUser async operation. */
  loadUserStatus: AsyncAction;
}

export const initialState: UserState = {
  user: null,
  loadUserStatus: { status: 'idle' },
};
