import { createSlice } from '@reduxjs/toolkit';
import { loadUser } from './asyncActions/loadUser';
import type { User } from '../../domain/User';
import type { AsyncAction } from '../AsyncAction';

const initialState = {
  user: null as User | null,
  loadUserStatus: { status: 'idle' } as AsyncAction,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadUser.pending, (state) => {
        state.loadUserStatus = { status: 'pending' };
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loadUserStatus = { status: 'fulfilled' };
      })
      .addCase(loadUser.rejected, (state, action) => {
        if (action.meta.aborted) return;
        state.loadUserStatus = {
          status: 'rejected',
          errorMessage: action.error.message ?? 'Failed to load user',
        };
      });
  },
});

export default userSlice.reducer;
