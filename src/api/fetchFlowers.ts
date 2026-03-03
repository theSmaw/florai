import { supabase } from '../lib/supabase';
import type { Flower } from '../domain/Flower';

// Row shape returned by Supabase (snake_case DB columns)
interface FlowerRow {
  id: string;
  name: string;
  image_url: string | null;
  colors: string[];
  type: string;
  wholesale_price: number;
  retail_price: number;
  supplier: string | null;
  origin: string | null;
  season: string[];
  availability: string;
  climate: string;
  quantity_on_hand: number;
  stem_length_cm: number | null;
  fragrance_level: string | null;
  toxicity: string | null;
  vase_life_days: number | null;
  care_instructions: string | null;
  notes: string | null;
  complementary_flower_ids: string[];
  // Joined from user_flower_overrides via a nested select alias
  user_flower_overrides: Array<{ image_url: string | null }>;
}

function rowToFlower(row: FlowerRow): Flower {
  const effectiveImageUrl =
    row.user_flower_overrides[0]?.image_url ?? row.image_url ?? null;

  // Build the flower object without optional keys first, then spread conditionally
  // to satisfy exactOptionalPropertyTypes (can't assign undefined to optional props)
  const flower: Flower = {
    id: row.id,
    name: row.name,
    colors: row.colors as Flower['colors'],
    type: row.type,
    wholesalePrice: row.wholesale_price,
    retailPrice: row.retail_price,
    supplier: row.supplier ?? '',
    origin: row.origin ?? '',
    season: row.season as Flower['season'],
    availability: row.availability as Flower['availability'],
    climate: row.climate as Flower['climate'],
    quantityOnHand: row.quantity_on_hand,
    careInstructions: row.care_instructions ?? '',
    notes: row.notes ?? '',
    complementaryFlowerIds: row.complementary_flower_ids,
  };

  if (effectiveImageUrl !== null) flower.imageUrl = effectiveImageUrl;
  if (row.stem_length_cm !== null) flower.stemLengthCm = row.stem_length_cm;
  if (row.fragrance_level !== null)
    flower.fragranceLevel = row.fragrance_level as NonNullable<Flower['fragranceLevel']>;
  if (row.toxicity !== null) flower.toxicity = row.toxicity as NonNullable<Flower['toxicity']>;
  if (row.vase_life_days !== null) flower.vaseLifeDays = row.vase_life_days;

  return flower;
}

export async function fetchFlowers(_signal?: AbortSignal): Promise<Flower[]> {
  const { data, error } = await supabase
    .from('flowers')
    .select('*, user_flower_overrides(image_url)')
    .order('name');

  if (error) {
    throw new Error(`Failed to fetch flowers: ${error.message}`);
  }

  return (data as FlowerRow[]).map(rowToFlower);
}
