import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Session } from '@supabase/supabase-js';
import { signIn } from './asyncActions/signIn';
import { signUp } from './asyncActions/signUp';
import { signOut } from './asyncActions/signOut';
import { initialState } from './state';
import { signInPending } from './signInPending';
import { signInFulfilled } from './signInFulfilled';
import { signInRejected } from './signInRejected';
import { signUpPending } from './signUpPending';
import { signUpFulfilled } from './signUpFulfilled';
import { signUpRejected } from './signUpRejected';
import { signOutFulfilled } from './signOutFulfilled';

export { signIn, signUp, signOut };

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
    signInPending(builder);
    signInFulfilled(builder);
    signInRejected(builder);
    signUpPending(builder);
    signUpFulfilled(builder);
    signUpRejected(builder);
    signOutFulfilled(builder);
  },
});

export const { sessionChanged } = authSlice.actions;
export default authSlice.reducer;
