import { supabase } from '../lib/supabase';
import { FLOWER_COLUMN_BY_FIELD, partialColumnPayload } from './columnMaps';
import type { FlowerUpdate } from './updateUserFlower';

/**
 * Upserts per-user field overrides for a global catalogue flower. Only the keys
 * present in `updates` are written; each maps to a matching column on
 * user_flower_overrides. A present-but-undefined optional clears the override
 * (null), so the catalogue default shows through again.
 *
 * Returns the applied domain updates so the caller can patch Redux state without
 * a re-fetch.
 */
export async function upsertFlowerFieldOverride(
  flowerId: string,
  updates: FlowerUpdate,
): Promise<FlowerUpdate> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error('Not authenticated');
  }

  const payload = {
    user_id: session.user.id,
    flower_id: flowerId,
    ...partialColumnPayload(updates, FLOWER_COLUMN_BY_FIELD),
  };

  const { error } = await supabase
    .from('user_flower_overrides')
    .upsert(payload, { onConflict: 'user_id,flower_id' });

  if (error) {
    throw new Error(`Failed to save override: ${error.message}`);
  }

  return updates;
}
