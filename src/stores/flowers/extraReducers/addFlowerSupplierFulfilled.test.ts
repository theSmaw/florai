import { createNextState } from '@reduxjs/toolkit';
import { initialState } from '../state';
import { addFlowerSupplierFulfilled } from './addFlowerSupplierFulfilled';
import { makeFlower } from '../../__tests__/fixtures';
import type { FlowerSupplier } from '../../../domain/Flower';

describe('addFlowerSupplierFulfilled', () => {
  it('adds supplier to the correct flower', () => {
    const flower = makeFlower({ id: 'f1' });
    const supplier: FlowerSupplier = { id: 's1', name: 'Acme', wholesalePrice: 1.5 };
    const next = createNextState(
      { ...initialState, flowers: [flower] },
      (draft) =>
        addFlowerSupplierFulfilled(draft, {
          type: 'flowers/addSupplier/fulfilled',
          payload: { flowerId: 'f1', supplier },
        }),
    );
    expect(next.supplierOperationStatus).toEqual({ status: 'fulfilled' });
    expect(next.flowers[0]?.suppliers).toEqual([supplier]);
  });
});
