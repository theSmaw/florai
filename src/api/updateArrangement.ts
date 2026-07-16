import { supabase } from '../lib/supabase';
import type { Arrangement, NewArrangement } from '../domain/Arrangement';
import { rowToArrangement } from './fetchArrangements';
import type { ArrangementRow } from './fetchArrangements';

/**
 * The arrangement fields a user may edit after creation. An explicit `undefined`
 * for an optional field clears the corresponding column (mapped to null).
 */
export type ArrangementUpdate = {
  [K in keyof NewArrangement]?: NewArrangement[K] | undefined;
};

// Maps a camelCase domain field to its snake_case column name. Only the keys
// present in `updates` are written; a present-but-undefined optional clears the
// column (mapped to null).
const COLUMN_BY_FIELD: Record<keyof ArrangementUpdate, string> = {
  name: 'name',
  imageUrl: 'image_url',
  description: 'description',
  flowerIds: 'flower_ids',
  size: 'size',
  style: 'style',
  occasion: 'occasion',
  stemCount: 'stem_count',
  estimatedWeightGrams: 'estimated_weight_grams',
  timeToBuildMinutes: 'time_to_build_minutes',
  vaseLifeDays: 'vase_life_days',
  wholesaleCost: 'wholesale_cost',
  retailPrice: 'retail_price',
  notes: 'notes',
};

export async function updateArrangement(
  id: string,
  updates: ArrangementUpdate,
): Promise<Arrangement> {
  const payload: Record<string, unknown> = {};
  for (const key of Object.keys(updates) as (keyof ArrangementUpdate)[]) {
    payload[COLUMN_BY_FIELD[key]] = updates[key] ?? null;
  }

  const { data: row, error } = await supabase
    .from('arrangements')
    .update(payload)
    .eq('id', id)
    .select('*')
    .single();

  if (error) {
    throw new Error(`Failed to update arrangement: ${error.message}`);
  }

  return rowToArrangement(row as ArrangementRow);
}
