import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './state';
import { loadUserPending } from './loadUserPending';
import { loadUserFulfilled } from './loadUserFulfilled';
import { loadUserRejected } from './loadUserRejected';

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    loadUserPending(builder);
    loadUserFulfilled(builder);
    loadUserRejected(builder);
  },
});

export default userSlice.reducer;
