import { supabase } from '../lib/supabase';
import type { Flower } from '../domain/Flower';
import { uploadToStorage } from './uploadToStorage';
import { updateUserFlower } from './updateUserFlower';

/**
 * Uploads a custom flower's image to Storage and writes the URL onto the
 * user_flowers row. Mirrors upsertFlowerOverride's storage path convention
 * (flower-images/{user_id}/{flower_id}.{ext}) but persists to user_flowers
 * rather than the per-user override table.
 */
export async function uploadUserFlowerImage(flowerId: string, file: File): Promise<Flower> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error('Not authenticated');
  }

  const ext = file.name.split('.').pop() ?? 'jpg';
  const storagePath = `${session.user.id}/${flowerId}.${ext}`;
  const imageUrl = await uploadToStorage('flower-images', storagePath, file);

  return updateUserFlower(flowerId, { imageUrl });
}
