import { createNextState } from '@reduxjs/toolkit';
import { initialState } from '../state';
import { arrangementFilterApplied } from './arrangementFilterApplied';
import type { ArrangementFilter } from '../../../domain/Arrangement';

describe('arrangementFilterApplied', () => {
  it('replaces the current filter', () => {
    const filter: ArrangementFilter = { searchTerm: 'spring', size: 'medium' };
    const next = createNextState(initialState, (draft) =>
      arrangementFilterApplied(draft, { type: 'arrangements/arrangementFilterApplied', payload: filter }),
    );
    expect(next.filter).toEqual(filter);
  });
});
