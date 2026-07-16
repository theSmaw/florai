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
    name: string | null;
    type: string | null;
    colors: string[] | null;
    wholesale_price: number | null;
    supplier: string | null;
    season: string[] | null;
    availability: string | null;
    climate: string | null;
    stem_length_cm: number | null;
    fragrance_level: string | null;
    toxicity: string | null;
    vase_life_days: number | null;
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

  // Per-user overrides win over the catalogue default (null override = use default).
  const effectiveStemLength = override?.stem_length_cm ?? row.stem_length_cm;
  const effectiveFragrance = override?.fragrance_level ?? row.fragrance_level;
  const effectiveToxicity = override?.toxicity ?? row.toxicity;
  const effectiveVaseLife = override?.vase_life_days ?? row.vase_life_days;

  const flower: Flower = {
    id: row.id,
    name: override?.name ?? row.name,
    colors: (override?.colors ?? row.colors) as Flower['colors'],
    type: override?.type ?? row.type,
    wholesalePrice: override?.wholesale_price ?? row.wholesale_price,
    supplier: override?.supplier ?? row.supplier ?? '',
    suppliers,
    season: (override?.season ?? row.season) as Flower['season'],
    availability: (override?.availability ?? row.availability) as Flower['availability'],
    climate: (override?.climate ?? row.climate) as Flower['climate'],
    careInstructions: override?.care_instructions ?? row.care_instructions ?? '',
    notes: override?.notes ?? row.notes ?? '',
    complementaryFlowerIds: override?.complementary_flower_ids ?? row.complementary_flower_ids,
  };

  if (effectiveImageUrl !== null) flower.imageUrl = effectiveImageUrl;
  if (effectiveStemLength !== null) flower.stemLengthCm = effectiveStemLength;
  if (effectiveFragrance !== null) flower.fragranceLevel = effectiveFragrance as FragranceLevel;
  if (effectiveToxicity !== null) flower.toxicity = effectiveToxicity as Toxicity;
  if (effectiveVaseLife !== null) flower.vaseLifeDays = effectiveVaseLife;

  return flower;
}
