import reducer, { arrangementFilterApplied, arrangementAdded } from './slice';
import { initialState } from './state';
import { loadArrangements } from './asyncActions/loadArrangements';
import { createArrangement } from './asyncActions/createArrangement';
import { uploadArrangementImage } from './asyncActions/uploadArrangementImage';
import { updateArrangementNotes } from './asyncActions/updateArrangementNotes';
import { makeArrangement, makeRootState } from '../__tests__/fixtures';
import {
  selectArrangementsList,
  selectArrangementsFilter,
  selectLoadArrangementsStatus,
  selectCreateStatus,
  selectUploadImageStatus,
  selectUpdateNotesStatus,
  selectArrangementById,
  selectFilteredArrangements,
  selectGroupedArrangements,
} from './selectors';
import type { ArrangementFilter, NewArrangement } from '../../domain/Arrangement';

const FAKE_FILE = {} as File;

// ── Sync reducers ──────────────────────────────────────────────────────────────

describe('arrangementFilterApplied', () => {
  it('replaces the current filter', () => {
    const filter: ArrangementFilter = { searchTerm: 'spring', size: 'medium' };
    const state = reducer(initialState, arrangementFilterApplied(filter));
    expect(state.filter).toEqual(filter);
  });
});

describe('arrangementAdded', () => {
  it('prepends the arrangement to the list', () => {
    const existing = makeArrangement({ id: 'a2' });
    const newArrangement = makeArrangement({ id: 'a1' });
    const withExisting = { ...initialState, arrangements: [existing] };
    const state = reducer(withExisting, arrangementAdded(newArrangement));
    expect(state.arrangements).toHaveLength(2);
    expect(state.arrangements[0]?.id).toBe('a1');
    expect(state.arrangements[1]?.id).toBe('a2');
  });
});

// ── loadArrangements extra reducers ────────────────────────────────────────────

describe('loadArrangements.pending', () => {
  it('sets loadStatus to pending', () => {
    const state = reducer(initialState, loadArrangements.pending('r1', undefined));
    expect(state.loadStatus).toEqual({ status: 'pending' });
  });
});

describe('loadArrangements.fulfilled', () => {
  it('populates arrangements and marks status fulfilled', () => {
    const arrangements = [makeArrangement()];
    const action = loadArrangements.fulfilled(arrangements, 'r1', undefined);
    const state = reducer(initialState, action);
    expect(state.arrangements).toEqual(arrangements);
    expect(state.loadStatus).toEqual({ status: 'fulfilled' });
  });
});

describe('loadArrangements.rejected', () => {
  it('sets loadStatus to rejected with error message', () => {
    const action = loadArrangements.rejected(new Error('fetch failed'), 'r1', undefined);
    const state = reducer(initialState, action);
    expect(state.loadStatus).toEqual({ status: 'rejected', errorMessage: 'fetch failed' });
  });

  it('ignores aborted rejections', () => {
    const base = loadArrangements.rejected(null, 'r1', undefined);
    const action = { ...base, meta: { ...base.meta, aborted: true } };
    const state = reducer(initialState, action);
    expect(state.loadStatus).toEqual({ status: 'idle' });
  });
});

// ── createArrangement extra reducers ───────────────────────────────────────────

describe('createArrangement.pending', () => {
  it('sets createStatus to pending', () => {
    const arg: NewArrangement = { name: 'Test', flowerIds: [], size: 'small' };
    const state = reducer(initialState, createArrangement.pending('r1', arg));
    expect(state.createStatus).toEqual({ status: 'pending' });
  });
});

describe('createArrangement.fulfilled', () => {
  it('prepends the new arrangement and marks createStatus fulfilled', () => {
    const existing = makeArrangement({ id: 'a2' });
    const created = makeArrangement({ id: 'a1' });
    const arg: NewArrangement = { name: created.name, flowerIds: created.flowerIds, size: created.size };
    const action = createArrangement.fulfilled(created, 'r1', arg);
    const state = reducer({ ...initialState, arrangements: [existing] }, action);
    expect(state.createStatus).toEqual({ status: 'fulfilled' });
    expect(state.arrangements[0]?.id).toBe('a1');
    expect(state.arrangements).toHaveLength(2);
  });
});

describe('createArrangement.rejected', () => {
  it('sets createStatus to rejected', () => {
    const arg: NewArrangement = { name: 'Test', flowerIds: [], size: 'small' };
    const action = createArrangement.rejected(new Error('db error'), 'r1', arg);
    const state = reducer(initialState, action);
    expect(state.createStatus).toEqual({ status: 'rejected', errorMessage: 'db error' });
  });
});

// ── uploadArrangementImage extra reducers ──────────────────────────────────────

describe('uploadArrangementImage.pending', () => {
  it('sets uploadImageStatus to pending and optimistically sets blob url', () => {
    const arrangement = makeArrangement({ id: 'a1' });
    const arg = { arrangementId: 'a1', file: FAKE_FILE, blobUrl: 'blob:test' };
    const action = uploadArrangementImage.pending('r1', arg);
    const state = reducer({ ...initialState, arrangements: [arrangement] }, action);
    expect(state.uploadImageStatus).toEqual({ status: 'pending' });
    expect(state.arrangements[0]?.imageUrl).toBe('blob:test');
  });
});

describe('uploadArrangementImage.fulfilled', () => {
  it('sets uploadImageStatus to fulfilled and updates image url', () => {
    const arrangement = makeArrangement({ id: 'a1', imageUrl: 'blob:test' });
    const arg = { arrangementId: 'a1', file: FAKE_FILE, blobUrl: 'blob:test' };
    const action = uploadArrangementImage.fulfilled('https://cdn/bouquet.jpg', 'r1', arg);
    const state = reducer({ ...initialState, arrangements: [arrangement] }, action);
    expect(state.uploadImageStatus).toEqual({ status: 'fulfilled' });
    expect(state.arrangements[0]?.imageUrl).toBe('https://cdn/bouquet.jpg');
  });
});

describe('uploadArrangementImage.rejected', () => {
  it('sets uploadImageStatus to rejected', () => {
    const arg = { arrangementId: 'a1', file: FAKE_FILE, blobUrl: 'blob:test' };
    const action = uploadArrangementImage.rejected(new Error('upload failed'), 'r1', arg);
    const state = reducer(initialState, action);
    expect(state.uploadImageStatus).toEqual({ status: 'rejected', errorMessage: 'upload failed' });
  });
});

// ── updateArrangementNotes extra reducers ──────────────────────────────────────

describe('updateArrangementNotes.pending', () => {
  it('sets updateNotesStatus to pending', () => {
    const arg = { arrangementId: 'a1', notes: 'Great for spring' };
    const state = reducer(initialState, updateArrangementNotes.pending('r1', arg));
    expect(state.updateNotesStatus).toEqual({ status: 'pending' });
  });
});

describe('updateArrangementNotes.fulfilled', () => {
  it('updates notes on the arrangement and marks status fulfilled', () => {
    const arrangement = makeArrangement({ id: 'a1' });
    const arg = { arrangementId: 'a1', notes: 'Great for spring' };
    const action = updateArrangementNotes.fulfilled(arg, 'r1', arg);
    const state = reducer({ ...initialState, arrangements: [arrangement] }, action);
    expect(state.updateNotesStatus).toEqual({ status: 'fulfilled' });
    expect(state.arrangements[0]?.notes).toBe('Great for spring');
  });
});

describe('updateArrangementNotes.rejected', () => {
  it('sets updateNotesStatus to rejected', () => {
    const arg = { arrangementId: 'a1', notes: 'x' };
    const action = updateArrangementNotes.rejected(new Error('db error'), 'r1', arg);
    const state = reducer(initialState, action);
    expect(state.updateNotesStatus).toEqual({ status: 'rejected', errorMessage: 'db error' });
  });
});

// ── Selectors ──────────────────────────────────────────────────────────────────

describe('arrangements selectors', () => {
  const a1 = makeArrangement({ id: 'a1', name: 'Spring Bouquet' });
  const a2 = makeArrangement({ id: 'a2', name: 'Summer Posy' });
  const a1large = { ...makeArrangement({ id: 'a1' }), size: 'large' } as typeof a1;

  it('selectArrangementsList returns all arrangements', () => {
    const state = makeRootState({ arrangements: { ...initialState, arrangements: [a1, a2] } });
    expect(selectArrangementsList(state)).toEqual([a1, a2]);
  });

  it('selectArrangementsFilter returns the current filter', () => {
    const filter: ArrangementFilter = { searchTerm: 'spring' };
    const state = makeRootState({ arrangements: { ...initialState, filter } });
    expect(selectArrangementsFilter(state)).toEqual(filter);
  });

  it('selectLoadArrangementsStatus returns load status', () => {
    const state = makeRootState({ arrangements: { ...initialState, loadStatus: { status: 'pending' } } });
    expect(selectLoadArrangementsStatus(state)).toEqual({ status: 'pending' });
  });

  it('selectCreateStatus returns create status', () => {
    const state = makeRootState({ arrangements: { ...initialState, createStatus: { status: 'fulfilled' } } });
    expect(selectCreateStatus(state)).toEqual({ status: 'fulfilled' });
  });

  it('selectUploadImageStatus returns upload status', () => {
    const state = makeRootState({ arrangements: { ...initialState, uploadImageStatus: { status: 'pending' } } });
    expect(selectUploadImageStatus(state)).toEqual({ status: 'pending' });
  });

  it('selectUpdateNotesStatus returns notes update status', () => {
    const state = makeRootState({ arrangements: { ...initialState, updateNotesStatus: { status: 'fulfilled' } } });
    expect(selectUpdateNotesStatus(state)).toEqual({ status: 'fulfilled' });
  });

  it('selectArrangementById returns the matching arrangement', () => {
    const state = makeRootState({ arrangements: { ...initialState, arrangements: [a1, a2] } });
    expect(selectArrangementById('a2')(state)).toEqual(a2);
  });

  it('selectArrangementById returns null for unknown id', () => {
    const state = makeRootState({ arrangements: { ...initialState, arrangements: [a1] } });
    expect(selectArrangementById('unknown')(state)).toBeNull();
  });

  it('selectFilteredArrangements returns all when no filter', () => {
    const state = makeRootState({ arrangements: { ...initialState, arrangements: [a1, a2] } });
    expect(selectFilteredArrangements(state)).toHaveLength(2);
  });

  it('selectFilteredArrangements filters by searchTerm', () => {
    const filter: ArrangementFilter = { searchTerm: 'spring' };
    const state = makeRootState({ arrangements: { ...initialState, arrangements: [a1, a2], filter } });
    const result = selectFilteredArrangements(state);
    expect(result).toHaveLength(1);
    expect(result[0]?.name).toBe('Spring Bouquet');
  });

  it('selectFilteredArrangements filters by size', () => {
    const filter: ArrangementFilter = { size: 'large' };
    const state = makeRootState({ arrangements: { ...initialState, arrangements: [a1large, a2], filter } });
    const result = selectFilteredArrangements(state);
    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe('a1');
  });

  it('selectGroupedArrangements returns single "All" group by default', () => {
    const state = makeRootState({ arrangements: { ...initialState, arrangements: [a1, a2] } });
    const grouped = selectGroupedArrangements(state);
    expect(Object.keys(grouped)).toEqual(['All']);
    expect(grouped['All']).toHaveLength(2);
  });

  it('selectGroupedArrangements groups by size', () => {
    const small = makeArrangement({ id: 'a1' });
    const large = { ...makeArrangement({ id: 'a2' }), size: 'large' } as typeof small;
    const filter: ArrangementFilter = { groupBy: 'size' };
    const state = makeRootState({ arrangements: { ...initialState, arrangements: [small, large], filter } });
    const grouped = selectGroupedArrangements(state);
    expect(grouped['medium']).toHaveLength(1);
    expect(grouped['large']).toHaveLength(1);
  });
});
