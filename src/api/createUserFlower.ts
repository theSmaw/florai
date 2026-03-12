import { supabase } from '../lib/supabase';
import type { Flower, FragranceLevel, Toxicity } from '../domain/Flower';
import type { NewFlower } from '../domain/Flower';

export async function createUserFlower(data: NewFlower): Promise<Flower> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error('Not authenticated');
  }

  const { data: row, error } = await supabase
    .from('user_flowers')
    .insert({
      user_id: session.user.id,
      name: data.name,
      colors: data.colors,
      type: data.type,
      wholesale_price: data.wholesalePrice,
      supplier: data.supplier,
      season: data.season,
      availability: data.availability,
      climate: data.climate,
      stem_length_cm: data.stemLengthCm ?? null,
      fragrance_level: data.fragranceLevel ?? null,
      toxicity: data.toxicity ?? null,
      vase_life_days: data.vaseLifeDays ?? null,
      care_instructions: data.careInstructions,
      notes: data.notes,
      complementary_flower_ids: data.complementaryFlowerIds ?? [],
      image_url: data.imageUrl ?? null,
    })
    .select('*')
    .single();

  if (error) {
    throw new Error(`Failed to create flower: ${error.message}`);
  }

  const r = row as Record<string, unknown>;

  const flower: Flower = {
    id: r['id'] as string,
    name: r['name'] as string,
    colors: r['colors'] as Flower['colors'],
    type: r['type'] as string,
    wholesalePrice: r['wholesale_price'] as number,
    supplier: (r['supplier'] as string | null) ?? '',
    suppliers: [],
    season: r['season'] as Flower['season'],
    availability: r['availability'] as Flower['availability'],
    climate: r['climate'] as Flower['climate'],
    careInstructions: (r['care_instructions'] as string | null) ?? '',
    notes: (r['notes'] as string | null) ?? '',
    complementaryFlowerIds: (r['complementary_flower_ids'] as string[]) ?? [],
  };

  if (r['image_url'] !== null && r['image_url'] !== undefined) flower.imageUrl = r['image_url'] as string;
  if (r['stem_length_cm'] !== null && r['stem_length_cm'] !== undefined) flower.stemLengthCm = r['stem_length_cm'] as number;
  if (r['fragrance_level'] !== null && r['fragrance_level'] !== undefined) flower.fragranceLevel = r['fragrance_level'] as FragranceLevel;
  if (r['toxicity'] !== null && r['toxicity'] !== undefined) flower.toxicity = r['toxicity'] as Toxicity;
  if (r['vase_life_days'] !== null && r['vase_life_days'] !== undefined) flower.vaseLifeDays = r['vase_life_days'] as number;

  return flower;
}
