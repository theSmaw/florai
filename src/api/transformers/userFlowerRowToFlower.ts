import type { Flower, FragranceLevel, Toxicity } from '../../domain/Flower';

export interface UserFlowerRow {
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
}

/**
 * Maps a user_flowers row to the Flower domain type.
 * User flowers have no overrides (they are already fully user-owned) and no suppliers.
 */
export function userFlowerRowToFlower(row: UserFlowerRow): Flower {
  const flower: Flower = {
    id: row.id,
    name: row.name,
    colors: row.colors as Flower['colors'],
    type: row.type,
    wholesalePrice: row.wholesale_price,
    supplier: row.supplier ?? '',
    suppliers: [],
    season: row.season as Flower['season'],
    availability: row.availability as Flower['availability'],
    climate: row.climate as Flower['climate'],
    careInstructions: row.care_instructions ?? '',
    notes: row.notes ?? '',
    complementaryFlowerIds: row.complementary_flower_ids,
  };

  if (row.image_url !== null) flower.imageUrl = row.image_url;
  if (row.stem_length_cm !== null) flower.stemLengthCm = row.stem_length_cm;
  if (row.fragrance_level !== null) flower.fragranceLevel = row.fragrance_level as FragranceLevel;
  if (row.toxicity !== null) flower.toxicity = row.toxicity as Toxicity;
  if (row.vase_life_days !== null) flower.vaseLifeDays = row.vase_life_days;

  return flower;
}
