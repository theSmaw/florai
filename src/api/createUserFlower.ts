import { supabase } from '../lib/supabase';
import type { Flower } from '../domain/Flower';
import type { NewFlower } from '../domain/Flower';
import { FLOWER_COLUMN_BY_FIELD, fullColumnPayload } from './columnMaps';
import { userFlowerRowToFlower } from './transformers/userFlowerRowToFlower';
import type { UserFlowerRow } from './transformers/userFlowerRowToFlower';

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
      ...fullColumnPayload(data, FLOWER_COLUMN_BY_FIELD),
      // complementary_flower_ids is NOT NULL (defaults to {}), so keep [] rather
      // than the null that fullColumnPayload would write for an absent value.
      complementary_flower_ids: data.complementaryFlowerIds ?? [],
    })
    .select('*')
    .single();

  if (error) {
    throw new Error(`Failed to create flower: ${error.message}`);
  }

  return userFlowerRowToFlower(row as UserFlowerRow);
}
