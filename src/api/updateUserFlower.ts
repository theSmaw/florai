import { supabase } from '../lib/supabase';
import type { Flower } from '../domain/Flower';
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

// Maps each editable Flower field to its snake_case column. Shared with the
// per-user override upsert, whose table mirrors these column names.
export const FLOWER_COLUMN_BY_FIELD: Record<keyof FlowerUpdate, string> = {
  name: 'name',
  colors: 'colors',
  type: 'type',
  imageUrl: 'image_url',
  wholesalePrice: 'wholesale_price',
  supplier: 'supplier',
  season: 'season',
  availability: 'availability',
  climate: 'climate',
  stemLengthCm: 'stem_length_cm',
  fragranceLevel: 'fragrance_level',
  toxicity: 'toxicity',
  vaseLifeDays: 'vase_life_days',
  careInstructions: 'care_instructions',
  notes: 'notes',
  complementaryFlowerIds: 'complementary_flower_ids',
};

export async function updateUserFlower(id: string, updates: FlowerUpdate): Promise<Flower> {
  const payload: Record<string, unknown> = {};
  for (const key of Object.keys(updates) as (keyof FlowerUpdate)[]) {
    payload[FLOWER_COLUMN_BY_FIELD[key]] = updates[key] ?? null;
  }

  const { data: row, error } = await supabase
    .from('user_flowers')
    .update(payload)
    .eq('id', id)
    .select('*')
    .single();

  if (error) {
    throw new Error(`Failed to update flower: ${error.message}`);
  }

  return userFlowerRowToFlower(row as UserFlowerRow);
}
