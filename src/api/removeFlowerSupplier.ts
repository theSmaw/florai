import { supabase } from '../lib/supabase';

export async function removeFlowerSupplier(id: string): Promise<void> {
  const { error } = await supabase
    .from('flower_suppliers')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(`Failed to remove supplier: ${error.message}`);
  }
}
