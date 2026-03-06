import { supabase } from '../lib/supabase';
import type { FlowerSupplier } from '../domain/Flower';

export async function addFlowerSupplier(
  flowerId: string,
  name: string,
  wholesalePrice: number | null,
): Promise<FlowerSupplier> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error('Not authenticated');
  }

  const { data, error } = await supabase
    .from('flower_suppliers')
    .insert({ user_id: session.user.id, flower_id: flowerId, name, wholesale_price: wholesalePrice })
    .select('id, name, wholesale_price')
    .single();

  if (error) {
    throw new Error(`Failed to add supplier: ${error.message}`);
  }

  return {
    id: (data as { id: string; name: string; wholesale_price: number | null }).id,
    name: (data as { id: string; name: string; wholesale_price: number | null }).name,
    wholesalePrice: (data as { id: string; name: string; wholesale_price: number | null }).wholesale_price,
  };
}
