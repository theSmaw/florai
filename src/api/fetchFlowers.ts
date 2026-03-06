import { supabase } from '../lib/supabase';
import type { Flower } from '../domain/Flower';

// Row shape returned by Supabase (snake_case DB columns).
// user_flower_overrides is a nested one-to-many join — we only select
// image_url and wholesale_price, and there will be at most one row per flower
// per user (UNIQUE constraint on user_id, flower_id).
interface FlowerRow {
  id: string;
  name: string;
  image_url: string | null;
  colors: string[];
  type: string;
  wholesale_price: number;
  supplier: string | null;
  season: string[];
  availability: string;
  climate: string;
  stem_length_cm: number | null;
  fragrance_level: string | null;
  toxicity: string | null;
  vase_life_days: number | null;
  care_instructions: string | null;
  notes: string | null;
  complementary_flower_ids: string[];
  // Nested select result: one row when the signed-in user has an override, empty otherwise
  user_flower_overrides: Array<{
    image_url: string | null;
    wholesale_price: number | null;
  }>;
}

// Maps a raw DB row to the camelCase Flower domain type.
// Per-user image override wins over the global flower image when present.
// Optional fields (stem length, vase life, etc.) are omitted entirely when
// null rather than being set to undefined, satisfying exactOptionalPropertyTypes.
function rowToFlower(row: FlowerRow): Flower {
  // Use the user's custom image/price if they have an override, otherwise the global default
  const override = row.user_flower_overrides[0];
  const effectiveImageUrl = override?.image_url ?? row.image_url ?? null;
  const effectiveWholesalePrice = override?.wholesale_price ?? row.wholesale_price;

  const flower: Flower = {
    id: row.id,
    name: row.name,
    colors: row.colors as Flower['colors'],
    type: row.type,
    wholesalePrice: effectiveWholesalePrice,
    supplier: row.supplier ?? '',
    season: row.season as Flower['season'],
    availability: row.availability as Flower['availability'],
    climate: row.climate as Flower['climate'],
    careInstructions: row.care_instructions ?? '',
    notes: row.notes ?? '',
    complementaryFlowerIds: row.complementary_flower_ids,
  };

  // Spread optional fields only when non-null (required by exactOptionalPropertyTypes)
  if (effectiveImageUrl !== null) flower.imageUrl = effectiveImageUrl;
  if (row.stem_length_cm !== null) flower.stemLengthCm = row.stem_length_cm;
  if (row.fragrance_level !== null)
    flower.fragranceLevel = row.fragrance_level as NonNullable<Flower['fragranceLevel']>;
  if (row.toxicity !== null) flower.toxicity = row.toxicity as NonNullable<Flower['toxicity']>;
  if (row.vase_life_days !== null) flower.vaseLifeDays = row.vase_life_days;

  return flower;
}

// Fetches all flowers for the current user.
// Uses a PostgREST nested select to join user_flower_overrides in a single
// round-trip. RLS on user_flower_overrides ensures each user only sees their
// own overrides — no extra filtering needed here.
export async function fetchFlowers(_signal?: AbortSignal): Promise<Flower[]> {
  const { data, error } = await supabase
    .from('flowers')
    .select('*, user_flower_overrides(image_url, wholesale_price)')
    .order('name');

  if (error) {
    throw new Error(`Failed to fetch flowers: ${error.message}`);
  }

  return (data as FlowerRow[]).map(rowToFlower);
}
