import { useSelector } from 'react-redux';
import type { RootState } from '../stores/store';
import type { AsyncAction } from '../stores/AsyncAction';

export interface AsyncStatus {
  /** True while the operation is in flight. */
  pending: boolean;
  /** The failure message when the operation rejected, otherwise null. */
  error: string | null;
}

/**
 * Derives `{ pending, error }` from an AsyncAction status slice.
 *
 * Collapses the repeated container boilerplate of reading a `*Status` field and
 * separately deriving its pending flag and error message. Pass any selector that
 * resolves to an AsyncAction (an existing `select*Status` selector or an inline
 * `(state) => state.slice.xStatus`).
 */
export function useAsyncStatus(selector: (state: RootState) => AsyncAction): AsyncStatus {
  const status = useSelector(selector);
  return {
    pending: status.status === 'pending',
    error: status.status === 'rejected' ? status.errorMessage : null,
  };
}
