import type { RootState } from '../../store';
import type { Flower } from '../../../domain/Flower';

export const selectFlowersExcluding = (flowerId: string) => (state: RootState): Flower[] =>
  state.flowers.flowers.filter((f) => f.id !== flowerId);
