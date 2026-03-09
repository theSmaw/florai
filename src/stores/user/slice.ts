import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './state';
import { loadUser } from './asyncActions/loadUser';
import { loadUserPending } from './extraReducers/loadUserPending';
import { loadUserFulfilled } from './extraReducers/loadUserFulfilled';
import { loadUserRejected } from './extraReducers/loadUserRejected';

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadUser.pending, loadUserPending)
      .addCase(loadUser.fulfilled, loadUserFulfilled)
      .addCase(loadUser.rejected, loadUserRejected);
  },
});

export default userSlice.reducer;
