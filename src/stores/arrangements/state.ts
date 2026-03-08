import type { Arrangement, ArrangementFilter } from '../../domain/Arrangement';
import type { AsyncAction } from '../AsyncAction';

export interface ArrangementsState {
  /** All arrangements belonging to the current user. */
  arrangements: Arrangement[];
  /** The active filter and search criteria applied to the arrangements list. */
  filter: ArrangementFilter;
  /** Tracks the lifecycle of the loadArrangements async operation. */
  loadStatus: AsyncAction;
  /** Tracks the lifecycle of the most recent createArrangement operation. */
  createStatus: AsyncAction;
  /** Tracks the lifecycle of the most recent uploadArrangementImage operation. */
  uploadImageStatus: AsyncAction;
  /** Tracks the lifecycle of the most recent updateArrangementNotes operation. */
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
