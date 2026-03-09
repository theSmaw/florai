import type { RootState } from '../../store';
import type { Arrangement } from '../../../domain/Arrangement';

export const selectArrangementsList = (state: RootState): Arrangement[] =>
  state.arrangements.arrangements;
