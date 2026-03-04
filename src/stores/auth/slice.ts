import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Session } from '@supabase/supabase-js';
import { signIn } from './asyncActions/signIn';
import { signUp } from './asyncActions/signUp';
import { signOut } from './asyncActions/signOut';

export { signIn, signUp, signOut };

// ── Slice ─────────────────────────────────────────────────────────────────────

interface AuthState {
  session: Session | null;
  initialized: boolean; // true once the initial Supabase session check completes
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  session: null,
  initialized: false,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    sessionChanged(state, action: PayloadAction<Session | null>) {
      state.session = action.payload;
      state.initialized = true;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // signIn
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.session = action.payload;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Sign-in failed';
      })
      // signUp
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.session = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Sign-up failed';
      })
      // signOut
      .addCase(signOut.fulfilled, (state) => {
        state.session = null;
        state.loading = false;
        state.error = null;
      });
  },
});

export const { sessionChanged } = authSlice.actions;
export default authSlice.reducer;
