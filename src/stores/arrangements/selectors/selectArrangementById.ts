import type { RootState } from '../../store';
import type { Arrangement } from '../../../domain/Arrangement';

export const selectArrangementById = (id: string) => (state: RootState): Arrangement | null =>
  state.arrangements.arrangements.find((a) => a.id === id) ?? null;
