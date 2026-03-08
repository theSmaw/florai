import type { Session } from '@supabase/supabase-js';

export interface AuthState {
  /** The active Supabase session. Null when the user is not signed in. */
  session: Session | null;
  /** True once the initial session check from localStorage has completed. Used to
   *  prevent the app from rendering protected routes before auth state is known. */
  initialized: boolean;
  /** True while a sign-in or sign-up request is in flight. */
  loading: boolean;
  /** Error message from the last failed sign-in or sign-up attempt. Null when there
   *  is no error or after a new attempt begins. */
  error: string | null;
}

export const initialState: AuthState = {
  session: null,
  initialized: false,
  loading: false,
  error: null,
};
