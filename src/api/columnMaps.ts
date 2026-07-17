import type { FlowerUpdate } from './updateUserFlower';
import type { ArrangementUpdate } from './updateArrangement';
import type { NewSupplier } from '../domain/Supplier';

// ─── Field → column maps ────────────────────────────────────────────────────
// Single source of truth for the camelCase-domain-field → snake_case-DB-column
// mapping of each entity. Shared by the create/update/upsert API functions so
// the column names are never re-typed. The `Record<keyof …>` typing forces every
// editable field to be mapped.

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

export const ARRANGEMENT_COLUMN_BY_FIELD: Record<keyof ArrangementUpdate, string> = {
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

export const SUPPLIER_COLUMN_BY_FIELD: Record<keyof NewSupplier, string> = {
  name: 'name',
  emails: 'emails',
  phones: 'phones',
  website: 'website',
  address: 'address',
  contactPerson: 'contact_person',
  paymentTerms: 'payment_terms',
  notes: 'notes',
};

// ─── Payload builders ───────────────────────────────────────────────────────

/**
 * Builds a snake_case DB payload from ONLY the keys present in `updates` — for
 * partial updates where absent fields must be left untouched. A present-but-
 * undefined value clears the column (mapped to null).
 */
export function partialColumnPayload<K extends string>(
  updates: Partial<Record<K, unknown>>,
  columnByField: Record<K, string>,
): Record<string, unknown> {
  const payload: Record<string, unknown> = {};
  for (const field of Object.keys(updates) as K[]) {
    payload[columnByField[field]] = updates[field] ?? null;
  }
  return payload;
}

/**
 * Builds a snake_case DB payload for EVERY mapped column — for creates and
 * full-row replacements. Absent/undefined optional fields become null.
 */
export function fullColumnPayload<K extends string>(
  source: Partial<Record<K, unknown>>,
  columnByField: Record<K, string>,
): Record<string, unknown> {
  const payload: Record<string, unknown> = {};
  for (const field of Object.keys(columnByField) as K[]) {
    payload[columnByField[field]] = source[field] ?? null;
  }
  return payload;
}
