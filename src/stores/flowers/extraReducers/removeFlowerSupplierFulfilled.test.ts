import { createNextState } from '@reduxjs/toolkit';
import { initialState } from '../state';
import { removeFlowerSupplierFulfilled } from './removeFlowerSupplierFulfilled';
import { makeFlower } from '../../__tests__/fixtures';
import type { FlowerSupplier } from '../../../domain/Flower';

describe('removeFlowerSupplierFulfilled', () => {
  it('removes the supplier from the flower', () => {
    const s1: FlowerSupplier = { id: 's1', name: 'Acme', wholesalePrice: 1.0 };
    const s2: FlowerSupplier = { id: 's2', name: 'Beta', wholesalePrice: 2.0 };
    const flower = { ...makeFlower({ id: 'f1' }), suppliers: [s1, s2] };
    const next = createNextState(
      { ...initialState, flowers: [flower] },
      (draft) =>
        removeFlowerSupplierFulfilled(draft, {
          type: 'flowers/removeSupplier/fulfilled',
          payload: { flowerId: 'f1', supplierId: 's1' },
        }),
    );
    expect(next.supplierOperationStatus).toEqual({ status: 'fulfilled' });
    expect(next.flowers[0]?.suppliers).toHaveLength(1);
    expect(next.flowers[0]?.suppliers[0]?.id).toBe('s2');
  });
});
