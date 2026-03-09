import { initialState } from '../state';
import { makeRootState } from '../../__tests__/fixtures';
import type { ArrangementFilter } from '../../../domain/Arrangement';
import { selectArrangementsFilter } from './selectArrangementsFilter';

describe('selectArrangementsFilter', () => {
  it('returns the current filter', () => {
    const filter: ArrangementFilter = { searchTerm: 'spring' };
    const state = makeRootState({ arrangements: { ...initialState, filter } });
    expect(selectArrangementsFilter(state)).toEqual(filter);
  });
});
