import type { Flower, FlowerFilter } from '../../domain/Flower';
import type { AsyncAction } from '../AsyncAction';

export interface FlowersState {
  /** All flowers loaded from the catalogue. */
  flowers: Flower[];
  /** The active filter and search criteria applied to the flower list. */
  filter: FlowerFilter;
  /** The ID of the flower currently open in the detail panel. Null when none is selected. */
  selectedFlowerId: string | null;
  /** Tracks the lifecycle of the loadFlowers async operation. */
  loadFlowersStatus: AsyncAction;
  /** Tracks the lifecycle of the most recent overrideFlowerImage operation. */
  overrideImageStatus: AsyncAction;
  /** Tracks the lifecycle of the most recent add, update, or remove supplier operation.
   *  Shared across all three supplier mutations since only one can be in flight at a time. */
  supplierOperationStatus: AsyncAction;
  /** Tracks the lifecycle of the most recent updateCareInstructions operation. */
  updateCareInstructionsStatus: AsyncAction;
  /** Tracks the lifecycle of the most recent updateSourcingNotes operation. */
  updateSourcingNotesStatus: AsyncAction;
  /** Tracks the lifecycle of the most recent updateComplementaryFlowers operation. */
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
