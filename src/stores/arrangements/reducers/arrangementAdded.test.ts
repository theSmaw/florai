import { createNextState } from '@reduxjs/toolkit';
import { initialState } from '../state';
import { arrangementAdded } from './arrangementAdded';
import { makeArrangement } from '../../__tests__/fixtures';

describe('arrangementAdded', () => {
  it('prepends the arrangement to the list', () => {
    const existing = makeArrangement({ id: 'a2' });
    const newArrangement = makeArrangement({ id: 'a1' });
    const next = createNextState(
      { ...initialState, arrangements: [existing] },
      (draft) =>
        arrangementAdded(draft, { type: 'arrangements/arrangementAdded', payload: newArrangement }),
    );
    expect(next.arrangements).toHaveLength(2);
    expect(next.arrangements[0]?.id).toBe('a1');
    expect(next.arrangements[1]?.id).toBe('a2');
  });
});
