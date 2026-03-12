import { supabase } from '../lib/supabase';
import type { Flower } from '../domain/Flower';
import type { NewFlower } from '../domain/Flower';
import { userFlowerRowToFlower } from './transformers/UserFlowerRow';
import type { UserFlowerRow } from './transformers/UserFlowerRow';

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

  return userFlowerRowToFlower(row as UserFlowerRow);
}
