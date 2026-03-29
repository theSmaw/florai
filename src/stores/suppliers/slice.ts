import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './state';
import { loadSuppliers } from './asyncActions/loadSuppliers';
import { saveSupplier } from './asyncActions/saveSupplier';
import { deleteSupplier } from './asyncActions/deleteSupplier';
import { loadSuppliersPending } from './extraReducers/loadSuppliersPending';
import { loadSuppliersFulfilled } from './extraReducers/loadSuppliersFulfilled';
import { loadSuppliersRejected } from './extraReducers/loadSuppliersRejected';
import { saveSupplierPending } from './extraReducers/saveSupplierPending';
import { saveSupplierFulfilled } from './extraReducers/saveSupplierFulfilled';
import { saveSupplierRejected } from './extraReducers/saveSupplierRejected';
import { deleteSupplierPending } from './extraReducers/deleteSupplierPending';
import { deleteSupplierFulfilled } from './extraReducers/deleteSupplierFulfilled';
import { deleteSupplierRejected } from './extraReducers/deleteSupplierRejected';

export const suppliersSlice = createSlice({
  name: 'suppliers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadSuppliers.pending, loadSuppliersPending)
      .addCase(loadSuppliers.fulfilled, loadSuppliersFulfilled)
      .addCase(loadSuppliers.rejected, loadSuppliersRejected)
      .addCase(saveSupplier.pending, saveSupplierPending)
      .addCase(saveSupplier.fulfilled, saveSupplierFulfilled)
      .addCase(saveSupplier.rejected, saveSupplierRejected)
      .addCase(deleteSupplier.pending, deleteSupplierPending)
      .addCase(deleteSupplier.fulfilled, deleteSupplierFulfilled)
      .addCase(deleteSupplier.rejected, deleteSupplierRejected);
  },
});

export default suppliersSlice.reducer;
