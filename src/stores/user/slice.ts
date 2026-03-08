import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './state';
import { loadUserPending } from './extraReducers/loadUserPending';
import { loadUserFulfilled } from './extraReducers/loadUserFulfilled';
import { loadUserRejected } from './extraReducers/loadUserRejected';

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
