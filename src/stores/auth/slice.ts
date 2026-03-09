import { createSlice } from '@reduxjs/toolkit';
import { signIn } from './asyncActions/signIn';
import { signUp } from './asyncActions/signUp';
import { signOut } from './asyncActions/signOut';
import { initialState } from './state';
import { sessionChanged as sessionChangedReducer } from './reducers/sessionChanged';
import { signInPending } from './extraReducers/signInPending';
import { signInFulfilled } from './extraReducers/signInFulfilled';
import { signInRejected } from './extraReducers/signInRejected';
import { signUpPending } from './extraReducers/signUpPending';
import { signUpFulfilled } from './extraReducers/signUpFulfilled';
import { signUpRejected } from './extraReducers/signUpRejected';
import { signOutFulfilled } from './extraReducers/signOutFulfilled';

export { signIn, signUp, signOut };

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: { sessionChanged: sessionChangedReducer },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, signInPending)
      .addCase(signIn.fulfilled, signInFulfilled)
      .addCase(signIn.rejected, signInRejected)
      .addCase(signUp.pending, signUpPending)
      .addCase(signUp.fulfilled, signUpFulfilled)
      .addCase(signUp.rejected, signUpRejected)
      .addCase(signOut.fulfilled, signOutFulfilled);
  },
});

export const { sessionChanged } = authSlice.actions;
export default authSlice.reducer;
