import { initialState } from '../state';
import { makeFlower, makeRootState } from '../../__tests__/fixtures';
import { selectSelectedFlowerId } from './selectSelectedFlowerId';

describe('selectSelectedFlowerId', () => {
  it('returns the selected id', () => {
    const f1 = makeFlower({ id: 'f1' });
    const state = makeRootState({ flowers: { ...initialState, flowers: [f1], selectedFlowerId: 'f1' } });
    expect(selectSelectedFlowerId(state)).toBe('f1');
  });
});
