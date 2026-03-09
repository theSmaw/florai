import type { RootState } from '../../store';
import type { FlowerFilter } from '../../../domain/Flower';

export const selectFlowersFilter = (state: RootState): FlowerFilter => state.flowers.filter;
