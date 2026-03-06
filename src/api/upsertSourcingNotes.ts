import { supabase } from '../lib/supabase';

/**
 * Upserts a per-user sourcing notes override for a flower.
 * The user's value is stored in user_flower_overrides.notes
 * and wins over the global flowers.notes when fetched.
 */
export async function upsertSourcingNotes(
  flowerId: string,
  notes: string,
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
      { user_id: session.user.id, flower_id: flowerId, notes },
      { onConflict: 'user_id,flower_id' },
    );

  if (error) {
    throw new Error(`Failed to save sourcing notes: ${error.message}`);
  }
}
