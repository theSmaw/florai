import { createNextState } from '@reduxjs/toolkit';
import { initialState } from '../state';
import { filterApplied } from './filterApplied';
import type { FlowerFilter } from '../../../domain/Flower';

describe('filterApplied', () => {
  it('replaces the current filter', () => {
    const filter: FlowerFilter = { colors: ['red'], searchTerm: 'rose' };
    const next = createNextState(initialState, (draft) =>
      filterApplied(draft, { type: 'flowers/filterApplied', payload: filter }),
    );
    expect(next.filter).toEqual(filter);
  });
});
