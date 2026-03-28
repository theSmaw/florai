import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSupplier } from '../../../api/createSupplier';
import { updateSupplier } from '../../../api/updateSupplier';
import type { Supplier, NewSupplier } from '../../../domain/Supplier';

export const saveSupplier = createAsyncThunk<Supplier, { supplier: NewSupplier; id?: string }>(
  'suppliers/save',
  async ({ supplier, id }) => {
    if (id !== undefined) {
      return updateSupplier(id, supplier);
    }
    return createSupplier(supplier);
  },
);
