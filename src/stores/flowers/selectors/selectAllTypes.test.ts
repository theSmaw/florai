import { initialState } from '../state';
import { makeFlower, makeRootState } from '../../__tests__/fixtures';
import { selectAllTypes } from './selectAllTypes';

describe('selectAllTypes', () => {
  it('returns sorted unique types across all flowers', () => {
    const f1 = { ...makeFlower({ id: 'f1' }), type: 'Rose' as const };
    const f2 = { ...makeFlower({ id: 'f2' }), type: 'Tulip' as const };
    const state = makeRootState({ flowers: { ...initialState, flowers: [f1, f2] } });
    const types = selectAllTypes(state);
    expect(types).toContain('Rose');
    expect(types).toContain('Tulip');
  });
});
