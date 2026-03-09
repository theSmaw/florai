import type { RootState } from '../../store';
import type { Flower } from '../../../domain/Flower';

export const selectFlowersList = (state: RootState): Flower[] => state.flowers.flowers;
