import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchFlowers } from '../../../api/fetchFlowers';
import type { Flower } from '../../../domain/Flower';

export const loadFlowers = createAsyncThunk<Flower[]>('flowers/load', (_arg, thunkAPI) =>
  fetchFlowers(thunkAPI.signal),
);
