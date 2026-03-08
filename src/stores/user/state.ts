import type { User } from '../../domain/User';
import type { AsyncAction } from '../AsyncAction';

export interface UserState {
  user: User | null;
  loadUserStatus: AsyncAction;
}

export const initialState: UserState = {
  user: null,
  loadUserStatus: { status: 'idle' },
};
