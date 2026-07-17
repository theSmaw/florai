import { supabase } from '../lib/supabase';
import type { Flower } from '../domain/Flower';
import { FLOWER_COLUMN_BY_FIELD, partialColumnPayload } from './columnMaps';
import { userFlowerRowToFlower } from './transformers/userFlowerRowToFlower';
import type { UserFlowerRow } from './transformers/userFlowerRowToFlower';

/**
 * The fields of a user-created (custom) flower that may be edited. An explicit
 * `undefined` for an optional field clears the corresponding column (null).
 */
export type FlowerUpdate = {
  [K in keyof Omit<Flower, 'id' | 'suppliers' | 'isCustom'>]?:
    | Omit<Flower, 'id' | 'suppliers' | 'isCustom'>[K]
    | undefined;
};

export async function updateUserFlower(id: string, updates: FlowerUpdate): Promise<Flower> {
  const { data: row, error } = await supabase
    .from('user_flowers')
    .update(partialColumnPayload(updates, FLOWER_COLUMN_BY_FIELD))
    .eq('id', id)
    .select('*')
    .single();

  if (error) {
    throw new Error(`Failed to update flower: ${error.message}`);
  }

  return userFlowerRowToFlower(row as UserFlowerRow);
}
