import reducer, {
  filterApplied,
  flowerSelected,
  flowerDeselected,
  flowerUpdated,
  flowerAdded,
  flowerRemoved,
} from './slice';
import { initialState } from './state';
import { loadFlowers } from './asyncActions/loadFlowers';
import { overrideFlowerImage } from './asyncActions/overrideFlowerImage';
import { addFlowerSupplier } from './asyncActions/addFlowerSupplier';
import { updateFlowerSupplier } from './asyncActions/updateFlowerSupplier';
import { removeFlowerSupplier } from './asyncActions/removeFlowerSupplier';
import { updateCareInstructions } from './asyncActions/updateCareInstructions';
import { updateSourcingNotes } from './asyncActions/updateSourcingNotes';
import { updateComplementaryFlowers } from './asyncActions/updateComplementaryFlowers';
import { makeFlower, makeRootState } from '../__tests__/fixtures';
import {
  selectFlowersList,
  selectFlowersFilter,
  selectSelectedFlowerId,
  selectSelectedFlower,
  selectFilteredFlowers,
  selectGroupedFlowers,
  selectComplementaryFlowers,
  selectLoadFlowersStatus,
} from './selectors';
import type { FlowerFilter } from '../../domain/Flower';
import type { FlowerSupplier } from '../../domain/Flower';

const FAKE_FILE = {} as File;

// ── Sync reducers ──────────────────────────────────────────────────────────────

describe('filterApplied', () => {
  it('replaces the current filter', () => {
    const filter: FlowerFilter = { colors: ['red'], searchTerm: 'rose' };
    const state = reducer(initialState, filterApplied(filter));
    expect(state.filter).toEqual(filter);
  });
});

describe('flowerSelected', () => {
  it('sets selectedFlowerId', () => {
    const state = reducer(initialState, flowerSelected('f1'));
    expect(state.selectedFlowerId).toBe('f1');
  });
});

describe('flowerDeselected', () => {
  it('clears selectedFlowerId', () => {
    const withSelection = { ...initialState, selectedFlowerId: 'f1' };
    const state = reducer(withSelection, flowerDeselected());
    expect(state.selectedFlowerId).toBeNull();
  });
});

describe('flowerAdded', () => {
  it('appends the flower to the list', () => {
    const flower = makeFlower();
    const state = reducer(initialState, flowerAdded(flower));
    expect(state.flowers).toHaveLength(1);
    expect(state.flowers[0]).toEqual(flower);
  });
});

describe('flowerUpdated', () => {
  it('replaces the matching flower in the list', () => {
    const original = makeFlower();
    const updated = { ...original, name: 'Updated Rose' };
    const withFlower = { ...initialState, flowers: [original] };
    const state = reducer(withFlower, flowerUpdated(updated));
    expect(state.flowers[0]).toEqual(updated);
  });

  it('does nothing when flower id is not found', () => {
    const flower = makeFlower();
    const withFlower = { ...initialState, flowers: [flower] };
    const stranger = { ...makeFlower({ id: 'unknown' }) };
    const state = reducer(withFlower, flowerUpdated(stranger));
    expect(state.flowers).toHaveLength(1);
    expect(state.flowers[0]).toEqual(flower);
  });
});

describe('flowerRemoved', () => {
  it('removes the flower with the given id', () => {
    const f1 = makeFlower({ id: 'f1' });
    const f2 = makeFlower({ id: 'f2' });
    const withFlowers = { ...initialState, flowers: [f1, f2] };
    const state = reducer(withFlowers, flowerRemoved('f1'));
    expect(state.flowers).toHaveLength(1);
    expect(state.flowers[0]?.id).toBe('f2');
  });
});

// ── loadFlowers extra reducers ─────────────────────────────────────────────────

describe('loadFlowers.pending', () => {
  it('sets loadFlowersStatus to pending', () => {
    const state = reducer(initialState, loadFlowers.pending('r1', undefined));
    expect(state.loadFlowersStatus).toEqual({ status: 'pending' });
  });
});

describe('loadFlowers.fulfilled', () => {
  it('populates flowers and marks status fulfilled', () => {
    const flowers = [makeFlower()];
    const state = reducer(initialState, loadFlowers.fulfilled(flowers, 'r1', undefined));
    expect(state.flowers).toEqual(flowers);
    expect(state.loadFlowersStatus).toEqual({ status: 'fulfilled' });
  });
});

describe('loadFlowers.rejected', () => {
  it('sets status to rejected with error message', () => {
    const action = loadFlowers.rejected(new Error('fetch failed'), 'r1', undefined);
    const state = reducer(initialState, action);
    expect(state.loadFlowersStatus).toEqual({ status: 'rejected', errorMessage: 'fetch failed' });
  });

  it('ignores aborted rejections', () => {
    const base = loadFlowers.rejected(null, 'r1', undefined);
    const action = { ...base, meta: { ...base.meta, aborted: true } };
    const state = reducer(initialState, action);
    expect(state.loadFlowersStatus).toEqual({ status: 'idle' });
  });
});

// ── overrideFlowerImage extra reducers ─────────────────────────────────────────

describe('overrideFlowerImage.pending', () => {
  it('sets overrideImageStatus to pending and optimistically sets blob url', () => {
    const flower = makeFlower({ id: 'f1' });
    const arg = { flowerId: 'f1', file: FAKE_FILE, blobUrl: 'blob:test' };
    const action = overrideFlowerImage.pending('r1', arg);
    const state = reducer({ ...initialState, flowers: [flower] }, action);
    expect(state.overrideImageStatus).toEqual({ status: 'pending' });
    expect(state.flowers[0]?.imageUrl).toBe('blob:test');
  });
});

describe('overrideFlowerImage.fulfilled', () => {
  it('sets overrideImageStatus to fulfilled and updates image url', () => {
    const flower = makeFlower({ id: 'f1', imageUrl: 'blob:test' });
    const arg = { flowerId: 'f1', file: FAKE_FILE, blobUrl: 'blob:test' };
    const action = overrideFlowerImage.fulfilled('https://cdn/rose.jpg', 'r1', arg);
    const state = reducer({ ...initialState, flowers: [flower] }, action);
    expect(state.overrideImageStatus).toEqual({ status: 'fulfilled' });
    expect(state.flowers[0]?.imageUrl).toBe('https://cdn/rose.jpg');
  });
});

describe('overrideFlowerImage.rejected', () => {
  it('sets overrideImageStatus to rejected', () => {
    const arg = { flowerId: 'f1', file: FAKE_FILE, blobUrl: 'blob:test' };
    const action = overrideFlowerImage.rejected(new Error('upload failed'), 'r1', arg);
    const state = reducer(initialState, action);
    expect(state.overrideImageStatus).toEqual({ status: 'rejected', errorMessage: 'upload failed' });
  });
});

// ── addFlowerSupplier extra reducers ───────────────────────────────────────────

describe('addFlowerSupplier.pending', () => {
  it('sets supplierOperationStatus to pending', () => {
    const arg = { flowerId: 'f1', name: 'Acme', wholesalePrice: 1.5 };
    const state = reducer(initialState, addFlowerSupplier.pending('r1', arg));
    expect(state.supplierOperationStatus).toEqual({ status: 'pending' });
  });
});

describe('addFlowerSupplier.fulfilled', () => {
  it('adds supplier to the correct flower', () => {
    const flower = makeFlower({ id: 'f1' });
    const supplier: FlowerSupplier = { id: 's1', name: 'Acme', wholesalePrice: 1.5 };
    const action = addFlowerSupplier.fulfilled(
      { flowerId: 'f1', supplier },
      'r1',
      { flowerId: 'f1', name: 'Acme', wholesalePrice: 1.5 },
    );
    const state = reducer({ ...initialState, flowers: [flower] }, action);
    expect(state.supplierOperationStatus).toEqual({ status: 'fulfilled' });
    expect(state.flowers[0]?.suppliers).toEqual([supplier]);
  });
});

describe('addFlowerSupplier.rejected', () => {
  it('sets supplierOperationStatus to rejected', () => {
    const arg = { flowerId: 'f1', name: 'Acme', wholesalePrice: 1.5 };
    const action = addFlowerSupplier.rejected(new Error('db error'), 'r1', arg);
    const state = reducer(initialState, action);
    expect(state.supplierOperationStatus).toEqual({ status: 'rejected', errorMessage: 'db error' });
  });
});

// ── updateFlowerSupplier extra reducers ────────────────────────────────────────

describe('updateFlowerSupplier.pending', () => {
  it('sets supplierOperationStatus to pending', () => {
    const arg = { flowerId: 'f1', id: 's1', name: 'Updated', wholesalePrice: 2.0 };
    const state = reducer(initialState, updateFlowerSupplier.pending('r1', arg));
    expect(state.supplierOperationStatus).toEqual({ status: 'pending' });
  });
});

describe('updateFlowerSupplier.fulfilled', () => {
  it('updates the matching supplier on the flower', () => {
    const supplier: FlowerSupplier = { id: 's1', name: 'Old Name', wholesalePrice: 1.0 };
    const flower = { ...makeFlower({ id: 'f1' }), suppliers: [supplier] };
    const payload = { flowerId: 'f1', id: 's1', name: 'New Name', wholesalePrice: 2.5 };
    const action = updateFlowerSupplier.fulfilled(payload, 'r1', payload);
    const state = reducer({ ...initialState, flowers: [flower] }, action);
    expect(state.supplierOperationStatus).toEqual({ status: 'fulfilled' });
    expect(state.flowers[0]?.suppliers[0]).toEqual({ id: 's1', name: 'New Name', wholesalePrice: 2.5 });
  });
});

describe('updateFlowerSupplier.rejected', () => {
  it('sets supplierOperationStatus to rejected', () => {
    const arg = { flowerId: 'f1', id: 's1', name: 'New', wholesalePrice: null };
    const action = updateFlowerSupplier.rejected(new Error('fail'), 'r1', arg);
    const state = reducer(initialState, action);
    expect(state.supplierOperationStatus).toEqual({ status: 'rejected', errorMessage: 'fail' });
  });
});

// ── removeFlowerSupplier extra reducers ────────────────────────────────────────

describe('removeFlowerSupplier.pending', () => {
  it('sets supplierOperationStatus to pending', () => {
    const arg = { flowerId: 'f1', supplierId: 's1' };
    const state = reducer(initialState, removeFlowerSupplier.pending('r1', arg));
    expect(state.supplierOperationStatus).toEqual({ status: 'pending' });
  });
});

describe('removeFlowerSupplier.fulfilled', () => {
  it('removes the supplier from the flower', () => {
    const s1: FlowerSupplier = { id: 's1', name: 'Acme', wholesalePrice: 1.0 };
    const s2: FlowerSupplier = { id: 's2', name: 'Beta', wholesalePrice: 2.0 };
    const flower = { ...makeFlower({ id: 'f1' }), suppliers: [s1, s2] };
    const action = removeFlowerSupplier.fulfilled(
      { flowerId: 'f1', supplierId: 's1' },
      'r1',
      { flowerId: 'f1', supplierId: 's1' },
    );
    const state = reducer({ ...initialState, flowers: [flower] }, action);
    expect(state.supplierOperationStatus).toEqual({ status: 'fulfilled' });
    expect(state.flowers[0]?.suppliers).toHaveLength(1);
    expect(state.flowers[0]?.suppliers[0]?.id).toBe('s2');
  });
});

describe('removeFlowerSupplier.rejected', () => {
  it('sets supplierOperationStatus to rejected', () => {
    const action = removeFlowerSupplier.rejected(new Error('fail'), 'r1', { flowerId: 'f1', supplierId: 's1' });
    const state = reducer(initialState, action);
    expect(state.supplierOperationStatus).toEqual({ status: 'rejected', errorMessage: 'fail' });
  });
});

// ── updateCareInstructions extra reducers ──────────────────────────────────────

describe('updateCareInstructions.pending', () => {
  it('sets updateCareInstructionsStatus to pending', () => {
    const state = reducer(initialState, updateCareInstructions.pending('r1', { flowerId: 'f1', careInstructions: 'water daily' }));
    expect(state.updateCareInstructionsStatus).toEqual({ status: 'pending' });
  });
});

describe('updateCareInstructions.fulfilled', () => {
  it('updates careInstructions on the flower', () => {
    const flower = makeFlower({ id: 'f1' });
    const action = updateCareInstructions.fulfilled(
      { flowerId: 'f1', careInstructions: 'water daily' },
      'r1',
      { flowerId: 'f1', careInstructions: 'water daily' },
    );
    const state = reducer({ ...initialState, flowers: [flower] }, action);
    expect(state.updateCareInstructionsStatus).toEqual({ status: 'fulfilled' });
    expect(state.flowers[0]?.careInstructions).toBe('water daily');
  });
});

describe('updateCareInstructions.rejected', () => {
  it('sets updateCareInstructionsStatus to rejected', () => {
    const action = updateCareInstructions.rejected(new Error('fail'), 'r1', { flowerId: 'f1', careInstructions: 'x' });
    const state = reducer(initialState, action);
    expect(state.updateCareInstructionsStatus).toEqual({ status: 'rejected', errorMessage: 'fail' });
  });
});

// ── updateSourcingNotes extra reducers ─────────────────────────────────────────

describe('updateSourcingNotes.pending', () => {
  it('sets updateSourcingNotesStatus to pending', () => {
    const state = reducer(initialState, updateSourcingNotes.pending('r1', { flowerId: 'f1', notes: 'from farms' }));
    expect(state.updateSourcingNotesStatus).toEqual({ status: 'pending' });
  });
});

describe('updateSourcingNotes.fulfilled', () => {
  it('updates notes on the flower', () => {
    const flower = makeFlower({ id: 'f1' });
    const action = updateSourcingNotes.fulfilled(
      { flowerId: 'f1', notes: 'from farms' },
      'r1',
      { flowerId: 'f1', notes: 'from farms' },
    );
    const state = reducer({ ...initialState, flowers: [flower] }, action);
    expect(state.updateSourcingNotesStatus).toEqual({ status: 'fulfilled' });
    expect(state.flowers[0]?.notes).toBe('from farms');
  });
});

describe('updateSourcingNotes.rejected', () => {
  it('sets updateSourcingNotesStatus to rejected', () => {
    const action = updateSourcingNotes.rejected(new Error('fail'), 'r1', { flowerId: 'f1', notes: 'x' });
    const state = reducer(initialState, action);
    expect(state.updateSourcingNotesStatus).toEqual({ status: 'rejected', errorMessage: 'fail' });
  });
});

// ── updateComplementaryFlowers extra reducers ──────────────────────────────────

describe('updateComplementaryFlowers.pending', () => {
  it('sets updateComplementaryFlowersStatus to pending', () => {
    const state = reducer(initialState, updateComplementaryFlowers.pending('r1', { flowerId: 'f1', complementaryFlowerIds: ['f2'] }));
    expect(state.updateComplementaryFlowersStatus).toEqual({ status: 'pending' });
  });
});

describe('updateComplementaryFlowers.fulfilled', () => {
  it('updates complementaryFlowerIds on the flower', () => {
    const flower = makeFlower({ id: 'f1' });
    const action = updateComplementaryFlowers.fulfilled(
      { flowerId: 'f1', complementaryFlowerIds: ['f2', 'f3'] },
      'r1',
      { flowerId: 'f1', complementaryFlowerIds: ['f2', 'f3'] },
    );
    const state = reducer({ ...initialState, flowers: [flower] }, action);
    expect(state.updateComplementaryFlowersStatus).toEqual({ status: 'fulfilled' });
    expect(state.flowers[0]?.complementaryFlowerIds).toEqual(['f2', 'f3']);
  });
});

describe('updateComplementaryFlowers.rejected', () => {
  it('sets updateComplementaryFlowersStatus to rejected', () => {
    const action = updateComplementaryFlowers.rejected(new Error('fail'), 'r1', { flowerId: 'f1', complementaryFlowerIds: [] });
    const state = reducer(initialState, action);
    expect(state.updateComplementaryFlowersStatus).toEqual({ status: 'rejected', errorMessage: 'fail' });
  });
});

// ── Selectors ──────────────────────────────────────────────────────────────────

describe('flowers selectors', () => {
  const f1 = makeFlower({ id: 'f1', name: 'Rose' });
  const f2 = makeFlower({ id: 'f2', name: 'Tulip' });
  const f1WithComplement = { ...f1, complementaryFlowerIds: ['f2'] };

  it('selectFlowersList returns all flowers', () => {
    const state = makeRootState({ flowers: { ...initialState, flowers: [f1, f2] } });
    expect(selectFlowersList(state)).toEqual([f1, f2]);
  });

  it('selectFlowersFilter returns the current filter', () => {
    const filter: FlowerFilter = { colors: ['red'] };
    const state = makeRootState({ flowers: { ...initialState, filter } });
    expect(selectFlowersFilter(state)).toEqual(filter);
  });

  it('selectSelectedFlowerId returns the selected id', () => {
    const state = makeRootState({ flowers: { ...initialState, flowers: [f1], selectedFlowerId: 'f1' } });
    expect(selectSelectedFlowerId(state)).toBe('f1');
  });

  it('selectSelectedFlower returns the flower matching selectedFlowerId', () => {
    const state = makeRootState({ flowers: { ...initialState, flowers: [f1, f2], selectedFlowerId: 'f2' } });
    expect(selectSelectedFlower(state)).toEqual(f2);
  });

  it('selectSelectedFlower returns null when nothing is selected', () => {
    const state = makeRootState({ flowers: { ...initialState, flowers: [f1] } });
    expect(selectSelectedFlower(state)).toBeNull();
  });

  it('selectLoadFlowersStatus returns the load status', () => {
    const state = makeRootState({ flowers: { ...initialState, loadFlowersStatus: { status: 'pending' } } });
    expect(selectLoadFlowersStatus(state)).toEqual({ status: 'pending' });
  });

  it('selectFilteredFlowers returns all flowers when no filter is applied', () => {
    const state = makeRootState({ flowers: { ...initialState, flowers: [f1, f2] } });
    expect(selectFilteredFlowers(state)).toHaveLength(2);
  });

  it('selectFilteredFlowers filters by color', () => {
    const red = { ...f1, colors: ['red' as const] };
    const blue = { ...f2, colors: ['blue' as const] };
    const filter: FlowerFilter = { colors: ['red'] };
    const state = makeRootState({ flowers: { ...initialState, flowers: [red, blue], filter } });
    const result = selectFilteredFlowers(state);
    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe('f1');
  });

  it('selectFilteredFlowers filters by searchTerm', () => {
    const filter: FlowerFilter = { colors: [], searchTerm: 'tulip' };
    const state = makeRootState({ flowers: { ...initialState, flowers: [f1, f2], filter } });
    const result = selectFilteredFlowers(state);
    expect(result).toHaveLength(1);
    expect(result[0]?.name).toBe('Tulip');
  });

  it('selectGroupedFlowers returns a single "All Flowers" key when groupBy is none', () => {
    const state = makeRootState({ flowers: { ...initialState, flowers: [f1, f2] } });
    const grouped = selectGroupedFlowers(state);
    expect(Object.keys(grouped)).toEqual(['All Flowers']);
    expect(grouped['All Flowers']).toHaveLength(2);
  });

  it('selectGroupedFlowers groups by type', () => {
    const rose = { ...f1, type: 'Rose' };
    const tulip = { ...f2, type: 'Tulip' };
    const filter: FlowerFilter = { colors: [], groupBy: 'type' };
    const state = makeRootState({ flowers: { ...initialState, flowers: [rose, tulip], filter } });
    const grouped = selectGroupedFlowers(state);
    expect(grouped['Rose']).toHaveLength(1);
    expect(grouped['Tulip']).toHaveLength(1);
  });

  it('selectComplementaryFlowers returns flowers listed in selectedFlower.complementaryFlowerIds', () => {
    const state = makeRootState({
      flowers: { ...initialState, flowers: [f1WithComplement, f2], selectedFlowerId: 'f1' },
    });
    const result = selectComplementaryFlowers(state);
    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe('f2');
  });

  it('selectComplementaryFlowers returns empty array when nothing is selected', () => {
    const state = makeRootState({ flowers: { ...initialState, flowers: [f1, f2] } });
    expect(selectComplementaryFlowers(state)).toEqual([]);
  });
});
