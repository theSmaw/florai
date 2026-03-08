import type { Flower, FlowerFilter } from '../../domain/Flower';
import type { AsyncAction } from '../AsyncAction';

export interface FlowersState {
  flowers: Flower[];
  filter: FlowerFilter;
  selectedFlowerId: string | null;
  loadFlowersStatus: AsyncAction;
  overrideImageStatus: AsyncAction;
  supplierOperationStatus: AsyncAction;
  updateCareInstructionsStatus: AsyncAction;
  updateSourcingNotesStatus: AsyncAction;
  updateComplementaryFlowersStatus: AsyncAction;
}

export const initialState: FlowersState = {
  flowers: [],
  filter: {
    colors: [] as string[],
    groupBy: undefined as 'color' | 'type' | 'none' | undefined,
  } as FlowerFilter,
  selectedFlowerId: null,
  loadFlowersStatus: { status: 'idle' },
  overrideImageStatus: { status: 'idle' },
  supplierOperationStatus: { status: 'idle' },
  updateCareInstructionsStatus: { status: 'idle' },
  updateSourcingNotesStatus: { status: 'idle' },
  updateComplementaryFlowersStatus: { status: 'idle' },
};
