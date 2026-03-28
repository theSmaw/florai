import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteSupplier as deleteSupplierApi } from '../../../api/deleteSupplier';

export const deleteSupplier = createAsyncThunk<string, string>(
  'suppliers/delete',
  async (id) => {
    await deleteSupplierApi(id);
    return id;
  },
);
