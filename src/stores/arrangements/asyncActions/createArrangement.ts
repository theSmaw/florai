import { createAsyncThunk } from '@reduxjs/toolkit';
import { createArrangement as createArrangementApi } from '../../../api/createArrangement';
import type { Arrangement, NewArrangement } from '../../../domain/Arrangement';

export const createArrangement = createAsyncThunk<Arrangement, NewArrangement>(
  'arrangements/create',
  (data) => createArrangementApi(data),
);
