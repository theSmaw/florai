import { supabase } from '../lib/supabase';

export async function uploadArrangementImage(
  arrangementId: string,
  file: File,
): Promise<string> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error('Not authenticated');
  }

  const ext = file.name.split('.').pop() ?? 'jpg';
  const storagePath = `${session.user.id}/${arrangementId}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from('arrangement-images')
    .upload(storagePath, file, { upsert: true });

  if (uploadError) {
    throw new Error(`Image upload failed: ${uploadError.message}`);
  }

  const { data: urlData } = supabase.storage
    .from('arrangement-images')
    .getPublicUrl(storagePath);

  // Append a timestamp so the browser doesn't serve the cached previous image
  // when the same storage path is upserted with a new file.
  const imageUrl = `${urlData.publicUrl}?t=${Date.now()}`;

  const { error: patchError } = await supabase
    .from('arrangements')
    .update({ image_url: imageUrl })
    .eq('id', arrangementId);

  if (patchError) {
    throw new Error(`Failed to save image URL: ${patchError.message}`);
  }

  return imageUrl;
}
