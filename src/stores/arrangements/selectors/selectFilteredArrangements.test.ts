import { initialState } from '../state';
import { makeArrangement, makeRootState } from '../../__tests__/fixtures';
import type { ArrangementFilter } from '../../../domain/Arrangement';
import { selectFilteredArrangements } from './selectFilteredArrangements';

describe('selectFilteredArrangements', () => {
  it('returns all when no filter', () => {
    const a1 = makeArrangement({ id: 'a1' });
    const a2 = makeArrangement({ id: 'a2' });
    const state = makeRootState({ arrangements: { ...initialState, arrangements: [a1, a2] } });
    expect(selectFilteredArrangements(state)).toHaveLength(2);
  });

  it('filters by searchTerm', () => {
    const a1 = makeArrangement({ id: 'a1', name: 'Spring Bouquet' });
    const a2 = makeArrangement({ id: 'a2', name: 'Summer Posy' });
    const filter: ArrangementFilter = { searchTerm: 'spring' };
    const state = makeRootState({ arrangements: { ...initialState, arrangements: [a1, a2], filter } });
    const result = selectFilteredArrangements(state);
    expect(result).toHaveLength(1);
    expect(result[0]?.name).toBe('Spring Bouquet');
  });

  it('filters by size', () => {
    const a1large = { ...makeArrangement({ id: 'a1' }), size: 'large' } as ReturnType<typeof makeArrangement>;
    const a2 = makeArrangement({ id: 'a2' });
    const filter: ArrangementFilter = { size: 'large' };
    const state = makeRootState({ arrangements: { ...initialState, arrangements: [a1large, a2], filter } });
    const result = selectFilteredArrangements(state);
    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe('a1');
  });
});
