import type { RootState } from '../../store';
import type { Supplier } from '../../../domain/Supplier';

export const selectSuppliersList = (state: RootState): Supplier[] =>
  state.suppliers.suppliers;
