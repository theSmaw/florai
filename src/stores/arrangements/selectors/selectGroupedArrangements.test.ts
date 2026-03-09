import { initialState } from '../state';
import { makeArrangement, makeRootState } from '../../__tests__/fixtures';
import type { ArrangementFilter } from '../../../domain/Arrangement';
import { selectGroupedArrangements } from './selectGroupedArrangements';

describe('selectGroupedArrangements', () => {
  it('returns single "All" group by default', () => {
    const a1 = makeArrangement({ id: 'a1' });
    const a2 = makeArrangement({ id: 'a2' });
    const state = makeRootState({ arrangements: { ...initialState, arrangements: [a1, a2] } });
    const grouped = selectGroupedArrangements(state);
    expect(Object.keys(grouped)).toEqual(['All']);
    expect(grouped['All']).toHaveLength(2);
  });

  it('groups by size', () => {
    const small = makeArrangement({ id: 'a1' });
    const large = { ...makeArrangement({ id: 'a2' }), size: 'large' } as ReturnType<typeof makeArrangement>;
    const filter: ArrangementFilter = { groupBy: 'size' };
    const state = makeRootState({ arrangements: { ...initialState, arrangements: [small, large], filter } });
    const grouped = selectGroupedArrangements(state);
    expect(grouped['medium']).toHaveLength(1);
    expect(grouped['large']).toHaveLength(1);
  });
});
