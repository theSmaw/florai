import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSuppliers } from '../../../api/fetchSuppliers';
import type { Supplier } from '../../../domain/Supplier';

export const loadSuppliers = createAsyncThunk<Supplier[]>(
  'suppliers/load',
  () => fetchSuppliers(),
);
