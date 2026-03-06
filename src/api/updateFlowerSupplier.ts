import { supabase } from '../lib/supabase';

export async function updateFlowerSupplier(
  id: string,
  name: string,
  wholesalePrice: number | null,
): Promise<void> {
  const { error } = await supabase
    .from('flower_suppliers')
    .update({ name, wholesale_price: wholesalePrice })
    .eq('id', id);

  if (error) {
    throw new Error(`Failed to update supplier: ${error.message}`);
  }
}
