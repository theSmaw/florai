import { createNextState } from '@reduxjs/toolkit';
import { initialState } from '../state';
import { updateFlowerSupplierFulfilled } from './updateFlowerSupplierFulfilled';
import { makeFlower } from '../../__tests__/fixtures';
import type { FlowerSupplier } from '../../../domain/Flower';

describe('updateFlowerSupplierFulfilled', () => {
  it('updates the matching supplier on the flower', () => {
    const supplier: FlowerSupplier = { id: 's1', name: 'Old Name', wholesalePrice: 1.0 };
    const flower = { ...makeFlower({ id: 'f1' }), suppliers: [supplier] };
    const next = createNextState(
      { ...initialState, flowers: [flower] },
      (draft) =>
        updateFlowerSupplierFulfilled(draft, {
          type: 'flowers/updateSupplier/fulfilled',
          payload: { flowerId: 'f1', id: 's1', name: 'New Name', wholesalePrice: 2.5 },
        }),
    );
    expect(next.supplierOperationStatus).toEqual({ status: 'fulfilled' });
    expect(next.flowers[0]?.suppliers[0]).toEqual({ id: 's1', name: 'New Name', wholesalePrice: 2.5 });
  });
});
