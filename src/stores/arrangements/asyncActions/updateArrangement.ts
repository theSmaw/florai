import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Arrangement } from '../../../domain/Arrangement';
import { updateArrangement as updateArrangementApi } from '../../../api/updateArrangement';
import type { ArrangementUpdate } from '../../../api/updateArrangement';

export const updateArrangement = createAsyncThunk<
  Arrangement,
  { id: string; updates: ArrangementUpdate }
>('arrangements/update', async ({ id, updates }) => {
  return updateArrangementApi(id, updates);
});
