import { initialState } from '../state';
import { makeFlower, makeRootState } from '../../__tests__/fixtures';
import type { FlowerFilter } from '../../../domain/Flower';
import { selectFilteredFlowers } from './selectFilteredFlowers';

describe('selectFilteredFlowers', () => {
  const f1 = makeFlower({ id: 'f1', name: 'Rose' });
  const f2 = makeFlower({ id: 'f2', name: 'Tulip' });

  it('returns all flowers when no filter is applied', () => {
    const state = makeRootState({ flowers: { ...initialState, flowers: [f1, f2] } });
    expect(selectFilteredFlowers(state)).toHaveLength(2);
  });

  it('filters by color', () => {
    const red = { ...f1, colors: ['red' as const] };
    const blue = { ...f2, colors: ['blue' as const] };
    const filter: FlowerFilter = { colors: ['red'] };
    const state = makeRootState({ flowers: { ...initialState, flowers: [red, blue], filter } });
    const result = selectFilteredFlowers(state);
    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe('f1');
  });

  it('filters by searchTerm', () => {
    const filter: FlowerFilter = { colors: [], searchTerm: 'tulip' };
    const state = makeRootState({ flowers: { ...initialState, flowers: [f1, f2], filter } });
    const result = selectFilteredFlowers(state);
    expect(result).toHaveLength(1);
    expect(result[0]?.name).toBe('Tulip');
  });
});
