import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateFlowerSupplier as updateFlowerSupplierApi } from '../../../api/updateFlowerSupplier';

export const updateFlowerSupplier = createAsyncThunk(
  'flowers/updateSupplier',
  async ({
    flowerId,
    id,
    name,
    wholesalePrice,
  }: {
    flowerId: string;
    id: string;
    name: string;
    wholesalePrice: number | null;
  }): Promise<{ flowerId: string; id: string; name: string; wholesalePrice: number | null }> => {
    await updateFlowerSupplierApi(id, name, wholesalePrice);
    return { flowerId, id, name, wholesalePrice };
  },
);
