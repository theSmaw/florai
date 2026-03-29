import type { Flower, FlowerSupplier, FragranceLevel, Toxicity } from '../../domain/Flower';

export interface FlowerRow {
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
  user_flower_overrides: Array<{
    image_url: string | null;
    care_instructions: string | null;
    notes: string | null;
    complementary_flower_ids: string[] | null;
  }>;
  flower_suppliers: Array<{
    id: string;
    name: string;
    wholesale_price: number | null;
  }>;
}

/**
 * Maps a global flowers row (with optional per-user overrides and suppliers) to the Flower domain type.
 * The user's override wins over global defaults when present.
 */
export function rowToFlower(row: FlowerRow): Flower {
  const override = row.user_flower_overrides[0];
  const effectiveImageUrl = override?.image_url ?? row.image_url ?? null;

  const suppliers: FlowerSupplier[] = row.flower_suppliers.map((s) => ({
    id: s.id,
    name: s.name,
    wholesalePrice: s.wholesale_price,
  }));

  const flower: Flower = {
    id: row.id,
    name: row.name,
    colors: row.colors as Flower['colors'],
    type: row.type,
    wholesalePrice: row.wholesale_price,
    supplier: row.supplier ?? '',
    suppliers,
    season: row.season as Flower['season'],
    availability: row.availability as Flower['availability'],
    climate: row.climate as Flower['climate'],
    careInstructions: override?.care_instructions ?? row.care_instructions ?? '',
    notes: override?.notes ?? row.notes ?? '',
    complementaryFlowerIds: override?.complementary_flower_ids ?? row.complementary_flower_ids,
  };

  if (effectiveImageUrl !== null) flower.imageUrl = effectiveImageUrl;
  if (row.stem_length_cm !== null) flower.stemLengthCm = row.stem_length_cm;
  if (row.fragrance_level !== null) flower.fragranceLevel = row.fragrance_level as FragranceLevel;
  if (row.toxicity !== null) flower.toxicity = row.toxicity as Toxicity;
  if (row.vase_life_days !== null) flower.vaseLifeDays = row.vase_life_days;

  return flower;
}
