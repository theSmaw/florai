import { createAsyncThunk } from '@reduxjs/toolkit';
import { removeFlowerSupplier as removeFlowerSupplierApi } from '../../../api/removeFlowerSupplier';

export const removeFlowerSupplier = createAsyncThunk(
  'flowers/removeSupplier',
  async ({
    flowerId,
    supplierId,
  }: {
    flowerId: string;
    supplierId: string;
  }): Promise<{ flowerId: string; supplierId: string }> => {
    await removeFlowerSupplierApi(supplierId);
    return { flowerId, supplierId };
  },
);
