import { initialState } from '../state';
import { makeFlower, makeRootState } from '../../__tests__/fixtures';
import type { FlowerFilter } from '../../../domain/Flower';
import { selectGroupedFlowers } from './selectGroupedFlowers';

describe('selectGroupedFlowers', () => {
  it('returns a single "All Flowers" key when groupBy is none', () => {
    const f1 = makeFlower({ id: 'f1' });
    const f2 = makeFlower({ id: 'f2' });
    const state = makeRootState({ flowers: { ...initialState, flowers: [f1, f2] } });
    const grouped = selectGroupedFlowers(state);
    expect(Object.keys(grouped)).toEqual(['All Flowers']);
    expect(grouped['All Flowers']).toHaveLength(2);
  });

  it('groups by type', () => {
    const rose = { ...makeFlower({ id: 'f1' }), type: 'Rose' as const };
    const tulip = { ...makeFlower({ id: 'f2' }), type: 'Tulip' as const };
    const filter: FlowerFilter = { colors: [], groupBy: 'type' };
    const state = makeRootState({ flowers: { ...initialState, flowers: [rose, tulip], filter } });
    const grouped = selectGroupedFlowers(state);
    expect(grouped['Rose']).toHaveLength(1);
    expect(grouped['Tulip']).toHaveLength(1);
  });
});
