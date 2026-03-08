import type { Session } from '@supabase/supabase-js';

export interface AuthState {
  session: Session | null;
  initialized: boolean;
  loading: boolean;
  error: string | null;
}

export const initialState: AuthState = {
  session: null,
  initialized: false,
  loading: false,
  error: null,
};
