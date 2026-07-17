import { supabase } from '../lib/supabase';
import type { Arrangement, NewArrangement } from '../domain/Arrangement';
import { ARRANGEMENT_COLUMN_BY_FIELD, partialColumnPayload } from './columnMaps';
import { rowToArrangement } from './fetchArrangements';
import type { ArrangementRow } from './fetchArrangements';

/**
 * The arrangement fields a user may edit after creation. An explicit `undefined`
 * for an optional field clears the corresponding column (mapped to null).
 */
export type ArrangementUpdate = {
  [K in keyof NewArrangement]?: NewArrangement[K] | undefined;
};

export async function updateArrangement(
  id: string,
  updates: ArrangementUpdate,
): Promise<Arrangement> {
  const { data: row, error } = await supabase
    .from('arrangements')
    .update(partialColumnPayload(updates, ARRANGEMENT_COLUMN_BY_FIELD))
    .eq('id', id)
    .select('*')
    .single();

  if (error) {
    throw new Error(`Failed to update arrangement: ${error.message}`);
  }

  return rowToArrangement(row as ArrangementRow);
}
