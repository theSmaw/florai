import { supabase } from '../lib/supabase';
import type { Flower } from '../domain/Flower';
import { rowToFlower } from './transformers/rowToFlower';
import type { FlowerRow } from './transformers/rowToFlower';
import { userFlowerRowToFlower } from './transformers/userFlowerRowToFlower';
import type { UserFlowerRow } from './transformers/userFlowerRowToFlower';

// Fetches all flowers for the current user.
// Uses a PostgREST nested select to join user_flower_overrides and flower_suppliers in a single
// round-trip. RLS on both tables ensures each user only sees their own data.
// Also fetches user_flowers (private flowers created by this user) and concatenates them.
export async function fetchFlowers(_signal?: AbortSignal): Promise<Flower[]> {
  const [globalResult, userResult] = await Promise.all([
    supabase
      .from('flowers')
      .select('*, user_flower_overrides(image_url, care_instructions, notes, complementary_flower_ids), flower_suppliers(id, name, wholesale_price)')
      .order('name'),
    supabase
      .from('user_flowers')
      .select('*')
      .order('name'),
  ]);

  if (globalResult.error) {
    throw new Error(`Failed to fetch flowers: ${globalResult.error.message}`);
  }

  if (userResult.error) {
    throw new Error(`Failed to fetch user flowers: ${userResult.error.message}`);
  }

  const globalFlowers = (globalResult.data as FlowerRow[]).map(rowToFlower);
  const userFlowers = (userResult.data as UserFlowerRow[]).map(userFlowerRowToFlower);

  return [...globalFlowers, ...userFlowers].sort((a, b) => a.name.localeCompare(b.name));
}
