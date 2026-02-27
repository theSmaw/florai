import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUser } from '../../../api/fetchUser';
import type { User } from '../../../domain/User';

export const loadUser = createAsyncThunk<User>('user/load', (_arg, thunkAPI) =>
  fetchUser(thunkAPI.signal),
);
