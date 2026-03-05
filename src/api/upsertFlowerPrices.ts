import { supabase } from '../lib/supabase';

/**
 * Upserts per-user wholesale and retail price overrides for a flower.
 */
export async function upsertFlowerPrices(
  flowerId: string,
  wholesalePrice: number,
  retailPrice: number,
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
      {
        user_id: session.user.id,
        flower_id: flowerId,
        wholesale_price: wholesalePrice,
        retail_price: retailPrice,
      },
      { onConflict: 'user_id,flower_id' },
    );

  if (error) {
    throw new Error(`Failed to save price override: ${error.message}`);
  }
}
