import { supabase } from '../lib/supabase';

export async function uploadToStorage(
  bucket: string,
  storagePath: string,
  file: File,
): Promise<string> {
  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(storagePath, file, { upsert: true });

  if (uploadError) {
    throw new Error(`Image upload failed: ${uploadError.message}`);
  }

  const { data: urlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(storagePath);

  return urlData.publicUrl;
}
