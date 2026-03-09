import { initialState } from '../state';
import { makeFlower, makeRootState } from '../../__tests__/fixtures';
import { selectVaseLifeBounds } from './selectVaseLifeBounds';

describe('selectVaseLifeBounds', () => {
  it('returns min/max from flower vase life days', () => {
    const f1 = { ...makeFlower({ id: 'f1' }), vaseLifeDays: 5 };
    const f2 = { ...makeFlower({ id: 'f2' }), vaseLifeDays: 14 };
    const state = makeRootState({ flowers: { ...initialState, flowers: [f1, f2] } });
    expect(selectVaseLifeBounds(state)).toEqual({ min: 5, max: 14 });
  });

  it('returns defaults when no flowers', () => {
    const state = makeRootState();
    expect(selectVaseLifeBounds(state)).toEqual({ min: 0, max: 30 });
  });
});
