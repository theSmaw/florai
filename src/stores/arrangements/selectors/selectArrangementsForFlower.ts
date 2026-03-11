import type { RootState } from '../../store';
import type { Arrangement } from '../../../domain/Arrangement';

export const selectArrangementsForFlower =
  (flowerId: string) =>
  (state: RootState): Arrangement[] =>
    state.arrangements.arrangements.filter((a) => a.flowerIds.includes(flowerId));
