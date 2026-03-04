import { supabase } from '../lib/supabase';

/**
 * Uploads an image file to Supabase Storage and upserts the per-user override row.
 *
 * Storage path: flower-images/{user_id}/{flower_id}.{ext}
 * The uploaded URL is written to user_flower_overrides.image_url.
 */
export async function upsertFlowerOverride(
  flowerId: string,
  file: File,
): Promise<string> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error('Not authenticated');
  }

  const ext = file.name.split('.').pop() ?? 'jpg';
  const storagePath = `${session.user.id}/${flowerId}.${ext}`;

  // Upload to Storage (upsert: overwrite if exists)
  const { error: uploadError } = await supabase.storage
    .from('flower-images')
    .upload(storagePath, file, { upsert: true });

  if (uploadError) {
    throw new Error(`Image upload failed: ${uploadError.message}`);
  }

  // Get public URL
  const { data: urlData } = supabase.storage
    .from('flower-images')
    .getPublicUrl(storagePath);

  const imageUrl = urlData.publicUrl;

  // Upsert the override row
  const { error: upsertError } = await supabase
    .from('user_flower_overrides')
    .upsert(
      { user_id: session.user.id, flower_id: flowerId, image_url: imageUrl },
      { onConflict: 'user_id,flower_id' },
    );

  if (upsertError) {
    throw new Error(`Failed to save override: ${upsertError.message}`);
  }

  return imageUrl;
}
