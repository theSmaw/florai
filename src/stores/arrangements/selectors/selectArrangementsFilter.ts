import type { RootState } from '../../store';
import type { ArrangementFilter } from '../../../domain/Arrangement';

export const selectArrangementsFilter = (state: RootState): ArrangementFilter =>
  state.arrangements.filter;
