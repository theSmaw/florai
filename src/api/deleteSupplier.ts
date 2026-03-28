import { supabase } from '../lib/supabase';

export async function deleteSupplier(id: string): Promise<void> {
  const { error } = await supabase
    .from('suppliers')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(`Failed to delete supplier: ${error.message}`);
  }
}
