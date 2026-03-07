import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchArrangements } from '../../../api/fetchArrangements';
import type { Arrangement } from '../../../domain/Arrangement';

export const loadArrangements = createAsyncThunk<Arrangement[]>(
  'arrangements/load',
  () => fetchArrangements(),
);
