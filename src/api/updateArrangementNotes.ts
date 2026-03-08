import { supabase } from '../lib/supabase';

export async function updateArrangementNotes(
  arrangementId: string,
  notes: string,
): Promise<void> {
  const { error } = await supabase
    .from('arrangements')
    .update({ notes })
    .eq('id', arrangementId);

  if (error) {
    throw new Error(`Failed to update notes: ${error.message}`);
  }
}
