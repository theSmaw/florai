import { supabase } from '../lib/supabase';

/**
 * Upserts a per-user care instructions override for a flower.
 * The user's value is stored in user_flower_overrides.care_instructions
 * and wins over the global flowers.care_instructions when fetched.
 */
export async function upsertCareInstructions(
  flowerId: string,
  careInstructions: string,
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
      { user_id: session.user.id, flower_id: flowerId, care_instructions: careInstructions },
      { onConflict: 'user_id,flower_id' },
    );

  if (error) {
    throw new Error(`Failed to save care instructions: ${error.message}`);
  }
}
