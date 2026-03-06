import { supabase } from '../lib/supabase';

/**
 * Upserts a per-user complementary flowers override for a flower.
 * The user's array is stored in user_flower_overrides.complementary_flower_ids
 * and wins over the global flowers.complementary_flower_ids when fetched.
 */
export async function upsertComplementaryFlowers(
  flowerId: string,
  complementaryFlowerIds: string[],
): Promise<void> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error('Not authenticated');
  }

  const { error } = await supabase
    .from('user_flower_overrides')
    .upsert(
      { user_id: session.user.id, flower_id: flowerId, complementary_flower_ids: complementaryFlowerIds },
      { onConflict: 'user_id,flower_id' },
    );

  if (error) {
    throw new Error(`Failed to save complementary flowers: ${error.message}`);
  }
}
