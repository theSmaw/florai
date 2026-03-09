import { initialState } from '../state';
import { makeRootState } from '../../__tests__/fixtures';
import type { FlowerFilter } from '../../../domain/Flower';
import { selectFlowersFilter } from './selectFlowersFilter';

describe('selectFlowersFilter', () => {
  it('returns the current filter', () => {
    const filter: FlowerFilter = { colors: ['red'] };
    const state = makeRootState({ flowers: { ...initialState, filter } });
    expect(selectFlowersFilter(state)).toEqual(filter);
  });
});
