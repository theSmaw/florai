import { initialState } from './state';
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
import { makeFlower, makeRootState } from '../__tests__/fixtures';
import type { FlowerFilter } from '../../domain/Flower';

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
