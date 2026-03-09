import { initialState } from './state';
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
import { makeArrangement, makeRootState } from '../__tests__/fixtures';
import type { ArrangementFilter } from '../../domain/Arrangement';

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
