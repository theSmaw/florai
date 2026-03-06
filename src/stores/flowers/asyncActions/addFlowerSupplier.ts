import { createAsyncThunk } from '@reduxjs/toolkit';
import { addFlowerSupplier as addFlowerSupplierApi } from '../../../api/addFlowerSupplier';
import type { FlowerSupplier } from '../../../domain/Flower';

export const addFlowerSupplier = createAsyncThunk(
  'flowers/addSupplier',
  async ({
    flowerId,
    name,
    wholesalePrice,
  }: {
    flowerId: string;
    name: string;
    wholesalePrice: number | null;
  }): Promise<{ flowerId: string; supplier: FlowerSupplier }> => {
    const supplier = await addFlowerSupplierApi(flowerId, name, wholesalePrice);
    return { flowerId, supplier };
  },
);
