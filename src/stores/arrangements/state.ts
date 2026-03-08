import type { Arrangement, ArrangementFilter } from '../../domain/Arrangement';
import type { AsyncAction } from '../AsyncAction';

export interface ArrangementsState {
  arrangements: Arrangement[];
  filter: ArrangementFilter;
  loadStatus: AsyncAction;
  createStatus: AsyncAction;
  uploadImageStatus: AsyncAction;
  updateNotesStatus: AsyncAction;
}

export const initialState: ArrangementsState = {
  arrangements: [],
  filter: { groupBy: 'none' } as ArrangementFilter,
  loadStatus: { status: 'idle' },
  createStatus: { status: 'idle' },
  uploadImageStatus: { status: 'idle' },
  updateNotesStatus: { status: 'idle' },
};
