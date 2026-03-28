import type { Supplier } from '../../domain/Supplier';
import type { AsyncAction } from '../AsyncAction';

export interface SuppliersState {
  suppliers: Supplier[];
  loadStatus: AsyncAction;
  saveStatus: AsyncAction;
  deleteStatus: AsyncAction;
}

export const initialState: SuppliersState = {
  suppliers: [],
  loadStatus: { status: 'idle' },
  saveStatus: { status: 'idle' },
  deleteStatus: { status: 'idle' },
};
