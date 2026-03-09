import { initialState } from '../state';
import { makeArrangement, makeRootState } from '../../__tests__/fixtures';
import { selectArrangementsList } from './selectArrangementsList';

describe('selectArrangementsList', () => {
  it('returns all arrangements', () => {
    const a1 = makeArrangement({ id: 'a1' });
    const a2 = makeArrangement({ id: 'a2' });
    const state = makeRootState({ arrangements: { ...initialState, arrangements: [a1, a2] } });
    expect(selectArrangementsList(state)).toEqual([a1, a2]);
  });
});
